use std::sync::Arc;
use axum::{ extract::State, http::StatusCode, response::{ IntoResponse, Response }, Json };
use serde::{ Deserialize, Serialize };
use serde_json::json;
use tokio_postgres::Client;
use validator::Validate;
use crate::auth::jwt_tokken_genrate::create_jwt;

#[derive(Debug, Serialize, Deserialize, Validate)]
pub struct Login {
    #[validate(email(message = "Invalid email format"))]
    email: String,
    #[validate(length(min = 8, message = "Password must be at least 8 characters"))]
    password: String,
}

pub async fn login(
    State(client): State<Arc<Client>>,
    Json(data): Json<Login>
) -> Result<Response, (StatusCode, String)> {
    // Step 1: Validate input
    if let Err(_) = data.validate() {
        return Err((StatusCode::BAD_REQUEST, "Invalid input ".to_string()));
    }

    // Step 2: Fetch user by email
    let user_row = match
        client.query_opt("SELECT id, password FROM users WHERE email = $1", &[&data.email]).await
    {
        Ok(Some(row)) => row,
        Ok(None) => {
            return Err((StatusCode::BAD_REQUEST, "Invalid email or password".to_string()));
        }
        Err(e) => {
            eprintln!("Database error: {}", e);
            return Err((StatusCode::INTERNAL_SERVER_ERROR, "Database query failed".to_string()));
        }
    };

    let id: i32 = user_row.get("id");
    let hashed_password: String = user_row.get("password");

    // Step 3: Compare passwords
    match bcrypt::verify(&data.password, &hashed_password) {
        Ok(true) => {
            // Step 4: Create JWT
            match create_jwt(id.to_string()).await {
                Ok(token) => Ok((StatusCode::OK, Json(json!({ "token": token }))).into_response()),
                Err(e) => {
                    eprintln!("JWT creation failed: {}", e);
                    Err((StatusCode::INTERNAL_SERVER_ERROR, "Failed to create token".to_string()))
                }
            }
        }
        Ok(false) => Err((StatusCode::BAD_REQUEST, "Invalid email or password".to_string())),
        Err(e) => {
            eprintln!("Bcrypt error: {}", e);
            Err((StatusCode::INTERNAL_SERVER_ERROR, "Password verification failed".to_string()))
        }
    }
}

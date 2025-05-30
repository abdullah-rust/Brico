use std::sync::Arc;
use axum::{ extract::State, http::StatusCode, response::{ IntoResponse, Response }, Json };
use serde::{ Deserialize, Serialize };
use serde_json::json;
use tokio_postgres::Client;
use validator::Validate;

use crate::auth::jwt_tokken_genrate::create_jwt;

#[derive(Debug, Serialize, Deserialize, Validate)]
pub struct SignUp {
    #[validate(length(min = 3, message = "Name must be at least 3 characters long"))]
    name: String,

    #[validate(range(min = 13, max = 120, message = "Age must be between 13 and 120"))]
    age: i32,

    #[validate(length(min = 1, message = "Gender is required"))]
    gender: String,

    #[validate(email(message = "Email format is invalid"))]
    email: String,

    #[validate(length(min = 8, message = "Password must be at least 8 characters long"))]
    password: String,
}

pub async fn sign_up(
    State(client): State<Arc<Client>>,
    Json(data): Json<SignUp>
) -> Result<Response, (StatusCode, String)> {
    // ✅ Step 1: Validate input
    if let Err(e) = data.validate() {
        eprintln!("Validation error: {:?}", e);
        return Err((StatusCode::BAD_REQUEST, format!("Invalid input: {:?}", e.field_errors())));
    }

    // ✅ Step 2: Check if user already exists
    let user_exists = client.query_opt(
        "SELECT 1 FROM users WHERE email = $1",
        &[&data.email]
    ).await;

    match user_exists {
        Ok(Some(_)) => {
            return Err((StatusCode::CONFLICT, "User already exists".to_string()));
        }
        Err(e) => {
            eprintln!("DB error (check exist): {}", e);
            return Err((StatusCode::INTERNAL_SERVER_ERROR, "Database error".to_string()));
        }
        _ => {}
    }

    // ✅ Step 3: Hash password
    let hashed_password = match bcrypt::hash(&data.password, 12) {
        Ok(hash) => hash,
        Err(e) => {
            eprintln!("Password hashing error: {}", e);
            return Err((StatusCode::INTERNAL_SERVER_ERROR, "Password hashing failed".to_string()));
        }
    };

    // ✅ Step 4: Insert new user into DB
    let insert_result = client.execute(
        "INSERT INTO users (name, age, gender, email, password) VALUES ($1, $2, $3, $4, $5)",
        &[&data.name, &data.age, &data.gender, &data.email, &hashed_password]
    ).await;

    if let Err(e) = insert_result {
        eprintln!("DB error (insert): {}", e);
        return Err((StatusCode::INTERNAL_SERVER_ERROR, "Database insertion error".to_string()));
    }

    // ✅ Step 5: Fetch newly created user id
    let fetch_result = client.query_opt(
        "SELECT id FROM users WHERE email = $1",
        &[&data.email]
    ).await;

    let id = match fetch_result {
        Ok(Some(row)) => row.get::<_, i32>("id"),
        Ok(None) => {
            return Err((
                StatusCode::INTERNAL_SERVER_ERROR,
                "User not found after insertion".to_string(),
            ));
        }
        Err(e) => {
            eprintln!("DB error (fetch ID): {}", e);
            return Err((StatusCode::INTERNAL_SERVER_ERROR, "Database fetch error".to_string()));
        }
    };

    // ✅ Step 6: Generate JWT token
    match create_jwt(id.to_string()).await {
        Ok(token) => Ok((StatusCode::OK, Json(json!({ "token": token }))).into_response()),
        Err(e) => {
            eprintln!("JWT creation failed: {}", e);
            Err((StatusCode::INTERNAL_SERVER_ERROR, "JWT creation failed".to_string()))
        }
    }
}

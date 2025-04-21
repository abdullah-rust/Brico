use serde::{Deserialize, Serialize};
use serde_json::json;
use actix_web::{post, web, HttpResponse, Responder};
use bcrypt::verify; // Import bcrypt functions

use super::jwt;

#[post("/login")]
pub async fn login(
    pool: web::Data<sqlx::PgPool>,
    user: web::Json<UserLogin>,
) -> impl Responder {
    // Fetch user from database by email
    let result = sqlx::query!(
        "SELECT id, userpassword FROM users WHERE useremail = $1",
        user.useremail
    )
    .fetch_one(pool.get_ref())
    .await;

    match result {
        Ok(db_user) => {
            // Verify the password using bcrypt
            let password_match = verify(user.userpassword.as_str(), &db_user.userpassword)
                .unwrap_or(false);

            if password_match {
                println!("Login successful for user: {:?}", user.useremail);
                HttpResponse::Ok().json(json!({
                    "message": "Login successful",
                    "token": jwt::create_jwt(db_user.id),
                }))
            } else {
                HttpResponse::Unauthorized().json(json!({
                    "message": "Invalid email or password"
                }))
            }
        },
        Err(_) => HttpResponse::Unauthorized().json(json!({
            "message": "Invalid email or password"
        })),
    }
}

#[derive(Deserialize, Serialize, Debug)]
struct UserLogin {
    useremail: String,
    userpassword: String,
}

// Example of password hashing during registration
// pub async fn register_user(user_email: String, user_password: String, pool: web::Data<sqlx::PgPool>) -> impl Responder {
//     // Hash the password before saving to the database
//     let hashed_password = hash(user_password, DEFAULT_COST).unwrap();

//     let result = sqlx::query!(
//         "INSERT INTO users (useremail, userpassword) VALUES ($1, $2)",
//         user_email,
//         hashed_password
//     )
//     .execute(pool.get_ref())
//     .await;

//     match result {
//         Ok(_) => HttpResponse::Created().body("User registered successfully"),
//         Err(_) => HttpResponse::InternalServerError().body("Error during registration"),
//     }
// }

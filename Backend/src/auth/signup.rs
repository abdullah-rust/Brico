use super::jwt;
use actix_web::{HttpResponse, Responder, web};
use bcrypt::hash;
use serde::Deserialize;

#[derive(Deserialize)]
pub struct Signup {
    pub username: String,
    pub useremail: String,
    pub userpassword: String,
}

pub async fn signup(pool: web::Data<sqlx::PgPool>, user: web::Json<Signup>) -> impl Responder {
    // Check if user already exists
    if sqlx::query!("SELECT id FROM users WHERE useremail = $1", user.useremail)
        .fetch_optional(pool.get_ref())
        .await
        .unwrap()
        .is_some()
    {
        return HttpResponse::Ok().json("User already exists");
    }


// Hash the password using bcrypt
match hash(user.userpassword.clone(), bcrypt::DEFAULT_COST) {
    Ok(p) => {
        let insert_result = sqlx::query!(
            "INSERT INTO users (username, useremail, userpassword) VALUES ($1, $2, $3)",
            user.username,
            user.useremail,
            p
        )
        .execute(pool.get_ref())
        .await;

if insert_result.is_err() {
    return HttpResponse::InternalServerError().json("Failed to create user");
}
    },
    Err(_) => return HttpResponse::InternalServerError().json("Hashing failed"),
};

let user_id = match sqlx::query!("SELECT id FROM users WHERE useremail = $1", user.useremail)
    .fetch_one(pool.get_ref())
    .await
{
    Ok(row) => row.id,
    Err(_) => return HttpResponse::InternalServerError().json("Failed to fetch user ID"),
};

let token = jwt::create_jwt(user_id);
HttpResponse::Ok().json(token)
    


    
}

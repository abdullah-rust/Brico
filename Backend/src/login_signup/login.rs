use serde::Deserialize;
use serde::Serialize;

use serde_json::json;
use actix_web::{post, web, HttpResponse, Responder};



#[post("/login")]
pub async fn login(
    pool: web::Data<sqlx::PgPool>,
    user: web::Json<UserLogin>,
) -> impl Responder {
    let result = sqlx::query!("SELECT * FROM users WHERE useremail = $1 AND userpassword = $2", user.useremail, user.userpassword)
        .fetch_one(pool.get_ref())
        .await;

    match result {
        Ok(user) =>
        {
         println!("User found: {:?}", user);
            HttpResponse::Ok().json(json!({
                "useremail": user.useremail,
                "message": "Login successful",
            }))
            
        },
        Err(_) => HttpResponse::Unauthorized().finish(),
    }
}

#[derive(Deserialize,Serialize,Debug)]
struct UserLogin {
    useremail: String,
    userpassword: String,
} 













// let  user = UserLogin {
            //     useremail: user.useremail,
            //     userpassword: user.userpassword,
            // };
            // let json_string = serde_json::to_string(&user).unwrap();

use actix_web::{ web, HttpResponse, Responder};

use serde_json::json;



 pub async fn get_users(pool: web::Data<sqlx::PgPool>) -> impl Responder {



    let rows = sqlx::query!("SELECT id ,username FROM users")
        .fetch_all(pool.get_ref())
        .await;

    match rows {
        Ok(users) => HttpResponse::Ok().json(users.iter()
            .map(|user| json!({
                "id": user.id,
                "username": user.username
            }))
            .collect::<Vec<_>>()
            ),
        Err(e) => HttpResponse::InternalServerError().body(format!("DB Error: {}", e)),
    }
}
    // let auth_header = req.headers().get("Authorization");
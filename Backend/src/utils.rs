
use actix_web::{get, web, HttpResponse, Responder};



#[get("/users")]

 pub async fn get_users(pool: web::Data<sqlx::PgPool>) -> impl Responder {
    let rows = sqlx::query!("SELECT id ,username FROM users")
        .fetch_all(pool.get_ref())
        .await;

    match rows {
        Ok(users) => HttpResponse::Ok().body(users.iter()
            .map(|user| format!("ID: {}, Username: {}", user.id, user.username))
            .collect::<Vec<_>>()
            .join("\n")),
        Err(e) => HttpResponse::InternalServerError().body(format!("DB Error: {}", e)),
    }
}
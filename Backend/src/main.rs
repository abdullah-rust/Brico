use actix_cors::Cors;
use actix_web::{App, HttpResponse, HttpServer, Responder, get, web};
use dotenv::dotenv;
use sqlx::postgres::PgPoolOptions;
use std::env;
mod auth;
mod middleware;
mod utils;

#[get("/index.html")]
async fn index() -> impl Responder {
    HttpResponse::Ok().json("Hello, world!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await
        .expect("Failed to create pool.");

    HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header()
            .max_age(3600);

        App::new()
            .app_data(web::Data::new(pool.clone())) // Inject the DB pool
            .wrap(cors)
            .service(index)
            // .service(utils::get_users.wrap(middleware::jwt_varify::MySimpleMiddleware))
            .service(
                web::scope("/users")
                    .wrap(middleware::jwt_varify::MySimpleMiddleware)
                    .route("", web::get().to(utils::get_users)),
            ) // Register the get_users route
            .service(auth::login::login) // Register the get_users route
            .service(web::scope("/signup").route("", web::post().to(auth::signup::signup))) // Register the get_users route
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}

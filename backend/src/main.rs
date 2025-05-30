use axum::{ http::HeaderValue, response::IntoResponse, routing::{ get, post }, Router };
use dotenvy::dotenv;
use tower_http::cors::{ Any, CorsLayer };
use std::sync::Arc;
use tokio_postgres::Client;
use local_ip_address::local_ip;

#[tokio::main]
async fn main() {
    dotenv().ok();
    let client = backend::db().await;
    let my_local_ip = local_ip().unwrap();
    let location = format!("{}:3000", my_local_ip);
    let listener = tokio::net::TcpListener::bind(&location).await.unwrap();
    let app = app(client);
    println!("server running on : {:?}", listener.local_addr());
    axum::serve(listener, app).await.unwrap();
}

fn app(client: Client) -> Router {
    let cors = CorsLayer::new()
        .allow_origin("http://192.168.109.186:1420".parse::<HeaderValue>().unwrap()) // Ya specific origins: .allow_origin("http://localhost:1420".parse::<HeaderValue>().unwrap())
        .allow_methods(Any) // GET, POST, etc.
        .allow_headers(Any)
        .allow_credentials(false); // Agar cookies nahi use kar rahe

    Router::new()
        .route("/", get(hello))
        .route("/signup", post(auth::signup::sign_up))
        .route("/login", post(auth::login::login))
        .with_state(Arc::new(client))
        .layer(cors)
}

async fn hello() -> impl IntoResponse {
    "hello from Brico Backend ".to_string().into_response()
}

// import mods
mod auth;
mod middleware;

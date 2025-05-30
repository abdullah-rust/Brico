use dotenvy::dotenv;
use std::env;
use tokio_postgres::{Client, NoTls};

pub async fn db() -> Client {
    dotenv().ok();
    let db_url = env::var("DATABASE_URL").expect("DATABASE_URL not set in .env");
    let (client, connection) = tokio_postgres::connect(&db_url, NoTls)
        .await
        .expect("Failed to connect to database postgresql");
    tokio::spawn(async move {
        if let Err(e) = connection.await {
            eprintln!("Connection error: {}", e);
        }
    });
    client
}

use axum::{
    extract::Request,
    http::StatusCode,
    middleware::Next,
    response::{ IntoResponse, Response },
    Json,
};
use serde_json::json;

use crate::auth::jwt_tokken_genrate::{ create_jwt, verify_jwt, TokenStatus };

pub async fn varify_tokken(mut req: Request, next: Next) -> Response {
    let token = req
        .headers()
        .get("Authorization")
        .and_then(|h| h.to_str().ok());

    match token {
        Some(tok) => {
            match verify_jwt(tok).await {
                TokenStatus::Valid(data) => {
                    req.extensions_mut().insert(data.sub);
                    next.run(req).await
                } // ✅ Valid case
                TokenStatus::ExpiredButValid(data, message) => {
                    match create_jwt(data.sub).await {
                        Ok(tok) =>
                            (
                                StatusCode::ACCEPTED,
                                Json(
                                    json!({ "token": tok,
                                           "message":message })
                                ),
                            ).into_response(), // ✅ IntoResponse use kiya
                        Err(_) =>
                            (
                                StatusCode::INTERNAL_SERVER_ERROR,
                                Json(json!({ "error": "Token regeneration failed" })),
                            ).into_response(),
                    }
                }
                TokenStatus::Invalid =>
                    (
                        StatusCode::UNAUTHORIZED,
                        Json(json!({ "error": "Invalid token" })),
                    ).into_response(),
            }
        }
        None =>
            (StatusCode::UNAUTHORIZED, Json(json!({ "error": "Missing token" }))).into_response(),
    }
}

// use crate::auth::jwt;
use actix_service::Service;
use actix_web::HttpMessage;
use actix_web::dev::{ServiceRequest, ServiceResponse, Transform};
use actix_web::http::header::{HeaderName, HeaderValue};
use actix_web::{HttpResponse, body::EitherBody};
use serde_json::json;
use std::future::{Future, Ready, ready};
use std::pin::Pin;
use std::rc::Rc;
use std::task::{Context, Poll}; // This is the trait we need for `extensions_mut`

pub struct MySimpleMiddleware;

impl<S, B> Transform<S, ServiceRequest> for MySimpleMiddleware
where
    S: Service<ServiceRequest, Response = ServiceResponse<B>, Error = actix_web::Error> + 'static,
    B: 'static,
{
    type Response = ServiceResponse<EitherBody<B>>;
    type Error = actix_web::Error;
    type Transform = MySimpleMiddlewareMiddleware<S>;
    type InitError = ();
    type Future = Ready<Result<Self::Transform, Self::InitError>>;

    fn new_transform(&self, service: S) -> Self::Future {
        ready(Ok(MySimpleMiddlewareMiddleware {
            service: Rc::new(service),
        }))
    }
}

pub struct MySimpleMiddlewareMiddleware<S> {
    service: Rc<S>,
}

impl<S, B> Service<ServiceRequest> for MySimpleMiddlewareMiddleware<S>
where
    S: Service<ServiceRequest, Response = ServiceResponse<B>, Error = actix_web::Error> + 'static,
    B: 'static,
{
    type Response = ServiceResponse<EitherBody<B>>;
    type Error = actix_web::Error;
    type Future = Pin<Box<dyn Future<Output = Result<Self::Response, Self::Error>>>>;

    fn poll_ready(&self, cx: &mut Context<'_>) -> Poll<Result<(), Self::Error>> {
        self.service.poll_ready(cx)
    }

    fn call(&self, req: ServiceRequest) -> Self::Future {
        println!("✅ Request received at: {}", req.path());

        let srv = Rc::clone(&self.service);
        let auth_header_opt = req.headers().get("Authorization").cloned();

        Box::pin(async move {
            if let Some(auth_header) = auth_header_opt {
                if let Ok(auth_str) = auth_header.to_str() {
                    if let Some(token) = auth_str.strip_prefix("Bearer ") {
                        match crate::auth::jwt::verify_jwt(token) {
                            crate::auth::jwt::JwtVerificationResult::Valid(claims) => {
                                // ✅ Token valid, user ID inject
                                req.extensions_mut().insert(claims.sub);
                                let res = srv.call(req).await?;
                                return Ok(res.map_into_left_body());
                            }
                            crate::auth::jwt::JwtVerificationResult::Expired(claims) => {
                                // ⏳ Token expired, generate new one
                                let new_token = crate::auth::jwt::create_jwt(claims.sub);
                                req.extensions_mut().insert(claims.sub);

                                let mut res = srv.call(req).await?;
                                res.headers_mut().insert(
                                    HeaderName::from_static("x-new-token"),
                                    HeaderValue::from_str(&new_token).unwrap(),
                                );
                                return Ok(res.map_into_left_body());
                            }
                            crate::auth::jwt::JwtVerificationResult::Invalid => {
                                // ❌ Invalid token
                            }
                        }
                    }
                }
            }

            // ❌ Unauthorized (missing or invalid token)
            let response = req.into_response(HttpResponse::Unauthorized().json(json!({
                "message": "Unauthorized",
            })));

            Ok(response.map_into_right_body())
        })
    }
}

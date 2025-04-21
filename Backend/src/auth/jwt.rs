use chrono;
use jsonwebtoken::{
    Algorithm, DecodingKey, EncodingKey, Header, Validation, decode, encode, errors::ErrorKind,
};
use serde::{Deserialize, Serialize};
use std::env;
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Claims {
    pub sub: i32,   // user ID
    pub exp: usize, // expiry timestamp (in seconds)
}

pub enum JwtVerificationResult {
    Valid(Claims),
    Expired(Claims),
    Invalid,
}

/// ✅ Create a new JWT
pub fn create_jwt(user_id: i32) -> String {
    let secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set");
    let expiration = env::var("jwt_expiration")
        .expect("JWT_EXPIRATION must be set")
        .parse::<u64>()
        .expect("JWT_EXPIRATION must be a number");

    let expiration_timestamp = chrono::Utc::now()
        .checked_add_signed(chrono::Duration::seconds(expiration as i64))
        .unwrap()
        .timestamp() as usize;

    let claims = Claims {
        sub: user_id,
        exp: expiration_timestamp,
    };

    encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(secret.as_bytes()),
    )
    .unwrap()
}

/// ✅ Verify JWT and handle valid, expired, and invalid cases
pub fn verify_jwt(token: &str) -> JwtVerificationResult {
    let secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set");

    let validation = Validation::new(Algorithm::HS256);

    match decode::<Claims>(
        token,
        &DecodingKey::from_secret(secret.as_bytes()),
        &validation,
    ) {
        Ok(token_data) => JwtVerificationResult::Valid(token_data.claims),
        Err(err) => {
            match *err.kind() {
                ErrorKind::ExpiredSignature => {
                    // Decode again without exp check to extract claims
                    if let Some(claims) = decode_without_exp_check(token) {
                        return JwtVerificationResult::Expired(claims);
                    }
                    JwtVerificationResult::Invalid
                }
                _ => JwtVerificationResult::Invalid,
            }
        }
    }
}

/// 🔍 Decode JWT without checking expiration (for Expired token logic)
pub fn decode_without_exp_check(token: &str) -> Option<Claims> {
    let secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set");

    let mut validation = Validation::new(Algorithm::HS256);
    validation.validate_exp = false;

    decode::<Claims>(
        token,
        &DecodingKey::from_secret(secret.as_bytes()),
        &validation,
    )
    .map(|token_data| token_data.claims)
    .ok()
}

use chrono::{ Duration, Utc };
use dotenvy::dotenv;
use jsonwebtoken::{
    DecodingKey,
    EncodingKey,
    Header,
    Validation,
    decode,
    encode,
    errors::Error as JwtError,
    errors::ErrorKind, // 👈 Fixed import
};
use serde::{ Deserialize, Serialize };
use std::env;

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String,
    pub exp: usize,
}

pub enum TokenStatus {
    Valid(Claims),
    ExpiredButValid(Claims, String),
    Invalid,
}

pub async fn create_jwt(user_id: String) -> Result<String, JwtError> {
    dotenv().ok();
    let secret = env::var("JWT_SECRET").expect("env secret not loaded");
    let exp_minutes = env::var("JWT_EXP_MINUTES").expect("JWT_EXP_MINUTES not loaded");

    let expiration = Utc::now()
        .checked_add_signed(Duration::minutes(exp_minutes.parse().unwrap_or(60)))
        .expect("Invalid timestamp")
        .timestamp() as usize;

    let token = encode(
        &Header::default(),
        &(Claims {
            sub: user_id.to_owned(),
            exp: expiration,
        }),
        &EncodingKey::from_secret(secret.as_bytes())
    )?;

    Ok(token)
}

pub async fn verify_jwt(token: &str) -> TokenStatus {
    dotenv().ok();
    let secret = env::var("JWT_SECRET").expect("JWT_SECRET NOT LOADED");

    match
        decode::<Claims>(
            token,
            &DecodingKey::from_secret(secret.as_bytes()),
            &Validation::default()
        )
    {
        Ok(data) => TokenStatus::Valid(data.claims),

        Err(err) =>
            match *err.kind() {
                ErrorKind::ExpiredSignature => {
                    // ⚠️ Try to decode anyway, ignoring expiration
                    let mut validation = Validation::default();
                    validation.validate_exp = false;

                    match
                        decode::<Claims>(
                            token,
                            &DecodingKey::from_secret(secret.as_bytes()),
                            &validation
                        )
                    {
                        Ok(data) =>
                            TokenStatus::ExpiredButValid(
                                data.claims,
                                "Token expired but data is still valid".to_string()
                            ),
                        Err(_) => TokenStatus::Invalid,
                    }
                }
                _ => TokenStatus::Invalid,
            }
    }
}

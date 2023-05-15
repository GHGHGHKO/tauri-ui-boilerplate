use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct TenorError {
    pub error: Error
}

#[derive(Serialize, Deserialize)]
pub struct Error {
    pub code: u32,
    pub message: String,
    pub status: String,
}

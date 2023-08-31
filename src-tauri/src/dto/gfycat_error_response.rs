use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GfycatError {
    pub error_message: Error
}

#[derive(Serialize, Deserialize)]
pub struct Error {
    pub code: String,
    pub description: String,
}

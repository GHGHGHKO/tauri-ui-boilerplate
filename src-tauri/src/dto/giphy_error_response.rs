use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct GiphyError {
    pub meta: Meta
}

#[derive(Serialize, Deserialize)]
pub struct Meta {
    pub status: u32,
    pub msg: String,
    pub response_id: String
}

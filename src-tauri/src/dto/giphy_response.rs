use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct GiphyResults {
    pub data: Vec<Data>
}

#[derive(Serialize, Deserialize)]
pub struct Data {
    pub images: Images
}

#[derive(Serialize, Deserialize)]
pub struct Images {
    pub fixed_width: FixedWidth
}

#[derive(Serialize, Deserialize)]
pub struct FixedWidth {
    pub height: String,
    pub width: String,
    pub size: String,
    pub url: String
}

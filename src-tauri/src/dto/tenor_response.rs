use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct TenorResults {
    pub results: Vec<Results>
}

#[derive(Serialize, Deserialize)]
pub struct Results {
    pub media_formats: MediaFormats
}

#[derive(Serialize, Deserialize)]
pub struct MediaFormats {
    #[serde(rename = "tinygif")]
    pub tiny_gif: GifFields
}

#[derive(Serialize, Deserialize)]
pub struct GifFields {
    pub url: String,
    pub duration: f32,
    pub dims: Vec<u32>,
    pub size: u32
}

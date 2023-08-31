use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct GfycatResults {
    pub cursor: String,
    pub gfycats: Vec<Results>
}

#[derive(Serialize, Deserialize)]
pub struct Results {
    pub max1mb_gif: String
}

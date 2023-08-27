use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct GithubErrorResponse {
    pub message: String,
    pub documentation_url: String,
}

use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct GithubLatestTag {
    pub html_url: String,
    pub tag_name: String,
}

#[derive(Serialize, Deserialize)]
pub struct GithubLatestTagResult {
    pub is_latest: bool,
    pub github_latest: GithubLatestTag,
}

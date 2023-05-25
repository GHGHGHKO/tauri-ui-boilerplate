use reqwest::header::USER_AGENT;
use reqwest::StatusCode;
use crate::dto::github_error_response::GithubErrorResponse;
use crate::dto::github_latest_release_response::GithubLatestTag;
use crate::dto::github_latest_release_response::GithubLatestTagResult;

#[tauri::command]
pub async fn github_latest_tag_client()
    -> Result<GithubLatestTagResult, GithubErrorResponse> {
    let current_release = format!(
        "v{version}",
        version = env!("CARGO_PKG_VERSION").to_string()
    );
    let authors = env!("CARGO_PKG_AUTHORS");

    let url = format!(
        "https://api.github.com/repos/{owner}/Dalgona/releases/latest",
        owner = authors
     );

    let client = reqwest::Client::new();
    let response = client
        .get(url)
        .header(USER_AGENT, "rust")
        .send()
        .await
        .unwrap();

    match response.status() {
        StatusCode::OK => {
            let parsed: GithubLatestTag = response.json().await.unwrap();
            let is_latest: bool;

            if parsed.tag_name == current_release {
                is_latest = true;
            } else {
                is_latest = false;
            }

            let result: GithubLatestTagResult = GithubLatestTagResult {
                is_latest,
                current_release,
                github_latest: parsed
            };

            Ok(result)
        }

        status if status.is_client_error() => {
            let parsed: GithubErrorResponse = response.json().await.unwrap();
            Err(parsed)
        }

        status if status.is_server_error() => {
            let parsed: GithubErrorResponse = response.json().await.unwrap();
            Err(parsed)
        }

        other => {
            panic!("Uh oh! Github API unexpected happened: {:?}", other);
        }
    }
}
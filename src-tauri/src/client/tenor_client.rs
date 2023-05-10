use reqwest::StatusCode;
use crate::dto::tenor_response::TenorResults;
use std::env;

#[tauri::command]
pub async fn tenor_call(query: &str, key: &str, limit: &str)
    -> Result<TenorResults, String> {
    let tenor_key = env::var("TENOR_API_KEY")
        .unwrap_or_else(|_| String::from(key));

    let url = format!(
        "https://tenor.googleapis.com/v2/search?random=true&q={query}&key={key}&limit={limit}",
        query = query,
        key = tenor_key,
        limit = limit
    );

    let client = reqwest::Client::new();
    let response = client
        .get(url)
        .send()
        .await
        .unwrap();

    match response.status() {
        StatusCode::OK => {
            let parsed: TenorResults = response.json().await.unwrap();
            Ok(parsed)
        }
        StatusCode::UNAUTHORIZED => {
            Err("Need to grab a new token".parse().unwrap())
        }
        other => {
            panic!("Uh oh! Something unexpected happened: {:?}", other);
        }
    }
}

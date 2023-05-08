use reqwest::StatusCode;
use crate::dto::tenor_response::TenorResults;

#[tauri::command]
pub async fn tenor_call(query: &str, api_key: &str, limit: u32)
    -> Result<TenorResults, String> {
    let url = format!(
        "https://tenor.googleapis.com/v2/search?random=true&q={query}&key={api_key}&limit={limit}",
        query = query,
        api_key = api_key,
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

use crate::dto::tenor_response::TenorResults;
use std::env;

#[tauri::command]
pub async fn tenor_request(search: &str) -> Result<TenorResults, String> {
    let tenor_key = env::var("TENOR_API_KEY")
        .unwrap_or_else(|_| String::from("<default_api_key>"));

    let url = format!(
        "https://tenor.googleapis.com/v2/search?q={}&key={}&limit={}&random=true",
        search, tenor_key, 3
    );

    let response = reqwest::get(url);
    let body = response.await;

    if body.is_err() {
        return Err(format!("tenor response body error log"))
    }

    let unwrapped = body.unwrap();
    let text = unwrapped.text();

    let body = text.await;
    if body.is_err() {
        return Err(format!("tenor response body error log : {}", body.unwrap()));
    }

    let unwrap_body = body.unwrap();
    let real_body: TenorResults = serde_json::from_str(&unwrap_body).unwrap();

    Ok(real_body)
}

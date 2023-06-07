use reqwest::StatusCode;
use crate::dto::giphy_error_response::{GiphyError, Meta};
use crate::dto::giphy_response::GiphyResults;
use std::env;
use rand::Rng;

const MIN_OFFSET: u32 = 50;
const MAX_OFFSET: u32 = 1200;

#[tauri::command]
pub async fn giphy_call(query: &str, key: &str, limit: &str)
    -> Result<GiphyResults, GiphyError>{
    let giphy_key = env::var("GIPHY_API_KEY")
        .unwrap_or_else(|_| String::from(key));

    let random_offset = rand::thread_rng()
        .gen_range(MIN_OFFSET..=MAX_OFFSET)
        .to_string();

    let url = format!(
        "https://api.giphy.com/v1/stickers/search?api_key={key}&q={query}&limit={limit}&offset={random_offset}&rating=g&lang=en",
        query = query,
        key = giphy_key,
        limit = limit,
        random_offset = random_offset
    );

    let client = reqwest::Client::new();
    let response = client
        .get(url)
        .send()
        .await
        .unwrap();

    match response.status() {
        StatusCode::OK => {
            let parsed: GiphyResults = response.json().await.unwrap();
            Ok(parsed)
        }

        status if status.is_client_error() => {
            let parsed: GiphyError = response.json().await.unwrap();
            Err(parsed)
        }

        status if status.is_server_error() => {
            let meta = Meta {
                status: 500,
                msg: String::from("I encountered an unknown error. Please post the steps to reproduce the error at https://github.com/GHGHGHKO/Dalgona/issues"),
                response_id: String::from("Unknown exception")
            };

            let giphy_error = GiphyError {
                meta
            };
            Err(giphy_error)
        }

        other => {
            panic!("Uh oh! Something unexpected happened: {:?}", other);
        }
    }
}

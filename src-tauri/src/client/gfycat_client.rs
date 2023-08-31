use std::env;

use reqwest::StatusCode;
use crate::dto::gfycat_error_response::GfycatError;
use crate::dto::gfycat_error_response::Error;
use crate::dto::gfycat_response::GfycatResults;

#[tauri::command]
pub async fn gfycat_call(query: &str)
    -> Result<GfycatResults, GfycatError> {

    let url = format!(
        "https://api.gfycat.com/v1/gfycats/search?search_text={query}",
        query = query,
    );

    let client = reqwest::Client::new();
    let response = client
        .get(url)
        .send()
        .await
        .unwrap();

    match response.status() {
        StatusCode::OK => {
            let parsed: GfycatResults = response.json().await.unwrap();
            Ok(parsed)
        }

        status if status.is_client_error() => {
            let parsed: GfycatError = response.json().await.unwrap();
            Err(parsed)
        }

        status if status.is_server_error() => {
            let error = Error {
                code: String::from("Internal Server error"),
                description: String::from("I encountered an unknown error. Please post the steps to reproduce the error at https://github.com/GHGHGHKO/Dalgona/issues"),
            };

            let gfycat_error = GfycatError {
                error_message: error
            };
            Err(gfycat_error)
        }

        other => {
            panic!("Uh oh! Something unexpected happened: {:?}", other);
        }
    }
}

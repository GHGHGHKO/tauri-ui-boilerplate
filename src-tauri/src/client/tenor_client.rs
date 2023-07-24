use reqwest::StatusCode;

use crate::dto::tenor_error_response::Error;
use crate::dto::tenor_error_response::TenorError;
use crate::dto::tenor_response::TenorResults;

#[tauri::command]
pub async fn tenor_call(query: &str, limit: &str)
    -> Result<TenorResults, TenorError> {
    let tenor_key = "GITHUB_ACTIONS_WORKFLOW_TENOR_API_KEY";

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

        status if status.is_client_error() => {
            let parsed: TenorError = response.json().await.unwrap();
            Err(parsed)
        }

        status if status.is_server_error() => {
            let error = Error {
                code: 500,
                message: String::from("I encountered an unknown error. Please post the steps to reproduce the error at https://github.com/GHGHGHKO/Dalgona/issues"),
                status: String::from("Unknown exception")
            };

            let tenor_error = TenorError {
                error
            };
            Err(tenor_error)
        }

        other => {
            panic!("Uh oh! Something unexpected happened: {:?}", other);
        }
    }
}

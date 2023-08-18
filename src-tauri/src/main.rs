// Prevents additional console window on Windows in release
#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod dto;
mod client;
mod dotenv_file;

use client::tenor_client::tenor_call;
use client::giphy_client::giphy_call;
use dotenv_file::make_dotenv::check_or_create_dotenv;
use dotenv::dotenv;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tokio::main]
async fn main() {
    dotenv().ok();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet,
            check_or_create_dotenv,
            tenor_call,
            giphy_call
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

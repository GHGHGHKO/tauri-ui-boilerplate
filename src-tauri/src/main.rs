// Prevents additional console window on Windows in release
#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod dto;
mod client;

use client::tenor_client::tenor_call;
use client::get_github_latest_tag_client::github_latest_tag_client;
use client::giphy_client::giphy_call;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tokio::main]
async fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet,
            tenor_call,
            github_latest_tag_client,
            giphy_call
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

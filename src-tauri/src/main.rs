// Prevents additional console window on Windows in release
#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod client;
mod dto;

use client::tenor_client::tenor_request;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn greet(name: &str) -> Result<String, ()> {
    Ok(format!("Hello, {}! You've been greeted from Rust!", name))
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet, tenor_request
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

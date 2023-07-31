use std::path::Path;
use std::fs::File;

#[tauri::command]
pub fn check_or_create_dotenv() -> Result<bool, bool> {
    let file_name = ".env";

    match Path::new(file_name).exists() {
        true => {
            println!("exist");
            Ok(false)
        }
        false => {
            println!("not exist");
            match File::create(file_name) {
                Ok(_) => Ok(false),
                Err(_) => Err(true),
            }
        }
    }
}

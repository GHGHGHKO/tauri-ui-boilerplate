"use client"

import {useEffect, useState} from "react"
import {invoke} from "@tauri-apps/api/tauri"
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";


export function CheckOrCreateDotenv() {
    const [hasDotEnv, setDotEnv] = useState(false);
    const alertMessage =
        hasDotEnv.valueOf();
    console.log(alertMessage);

    async function check_or_create_dotenv() {
        setDotEnv(await invoke("check_or_create_dotenv"));
    }

    useEffect(() => {
        check_or_create_dotenv()
            .catch(e => console.error(e));
    }, []);

    return (
        <Dialog open={hasDotEnv} onOpenChange={setDotEnv}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Oops!</DialogTitle>
                <DialogDescription>
                    Cannot create .env file to store the key.<br />
                    Please check the permissions, and if the issue persists,<br />
                    contact us at https://github.com/GHGHGHKO/dalgona/issues
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>
    )
}

"use client"

import { useEffect, useState } from "react"
import { invoke } from "@tauri-apps/api/tauri"

export function Tenor() {
  const [results, setResults] = useState("")
  const [search, setSearch] = useState("")

  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  async function tenor_request() {
    setResults(await invoke("tenor_request", { search }))
  }

  // inspect console: Hello, World! You've been greeted from Rust!
  useEffect(() => {
    invoke("tenor_request", { search: "excited" }).then(console.log).catch(console.error)
  })

  return <></>
}

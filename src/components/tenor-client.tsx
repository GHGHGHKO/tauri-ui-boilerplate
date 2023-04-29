"use client"

import { useEffect, useState } from "react"
import { invoke } from "@tauri-apps/api/tauri"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

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

  return (
      <Card className={cn("w-[500px]")}>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Get Memes</CardTitle>
          <CardDescription>
            Enter your Tenor Key and keywords
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Let's toss some meme keywords, folks!</Label>
            <Input id="email" type="email" placeholder="Fimally!" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Where might my key be hiding, Gustaf?</Label>
            <Input id="password" type="password" placeholder="xxxxxxACSKexUfqoKqSQxxxxxxh63zdC25ubpuA"/>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Get Memes</Button>
        </CardFooter>
      </Card>
  )
}

"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"
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
import {TenorResults} from "@/app/examples/music/data/tenor-gifs";
import {GifTenor} from "@/app/examples/music/components/gif-tenor";

export function Tenor() {
  const [results, setResults] = useState<TenorResults>({ results: [] })
  const [search, setSearch] = useState("")
  const [key, setKey] = useState("")

  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  async function tenor_request() {
    setResults(await invoke("tenor_request", { search, key }))
    console.log(results);
  }

  return (
      <Card className={cn("w-[500px]")}>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Get Memes</CardTitle>
          <CardDescription>
            Enter your Tenor Key and keywords
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 p-1.5">
          <div className="grid gap-2">
            <Label htmlFor="email">Let's toss some meme keywords, folks!</Label>
            <Input id="email" type="email" placeholder="Fimally!"
                   onChange={(e) => setSearch(e.target.value)} />
          </div>          <div className="grid gap-2">
            <Label htmlFor="password">Where might my key be hiding, Gustaf?</Label>
            <Input id="password" type="password" placeholder="xxxxxxACSKexUfqoKqSQxxxxxxh63zdC25ubpuA"
                   onChange={(e) => setKey(e.target.value)} />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={tenor_request}>Get Memes</Button>
        </CardFooter>
        <div className="relative">
          <ScrollArea>
            <div className="flex space-x-4 pb-4">
              {results.results.map((gif) => (
                  <GifTenor
                      key={gif.media_formats.tinygif.url}
                      tenorGif={gif.media_formats.tinygif}
                      className="w-[250px]"
                      aspectRatio="portrait"
                      width={250}
                      height={330}
                  />
              ))}
            </div>
          </ScrollArea>
        </div>
      </Card>
  )
}

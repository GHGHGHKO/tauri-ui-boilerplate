"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"
import { invoke } from "@tauri-apps/api/tauri"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TenorResults } from "@/app/memes/tenor/data/tenor-fields";
import { TenorError } from "@/app/memes/tenor/data/tenor-error-fields";
import { TenorGifs } from "@/app/memes/tenor/components/tenor-gifs";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

export function Tenor() {
  const initialState: TenorError = {
    error: {
      code: '',
      message: '',
      status: '',
    },
  };

  const [results, setResults] = useState<TenorResults>({ results: [] })
  const [errors, setError] = useState<TenorError>(initialState)
  const [query, setQuery] = useState("welcome")
  const [key, setKey] = useState("")
  const [limit, setLimit] = useState("50")
  const [openDialog, setOpenDialog] = useState(false);

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await tenor_call();
    } catch (err: any) {
      console.error(err);
    }
  }

  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  async function tenor_call() {
    try {
      setResults(await invoke("tenor_call", {query, key, limit}));
      console.log(results);
    } catch (error) {
      setError(error)
      setOpenDialog(true);
      console.log(errors, openDialog)
    }
  }

  return (
      <form onSubmit={onFormSubmit}>
        <div className="flex-1 space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className={cn("w-[500px]")}>
              <CardContent className="grid gap-4 p-1.5">
                <div className="grid gap-2">
                  <Label htmlFor="search">Let's toss some meme keywords, folks!</Label>
                  <Input id="search" type="text" value={query}
                         onChange={(e) => setQuery(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">
                    Where might my key be hiding, Gustaf?{" "}
                    <a
                        href="https://github.com/GHGHGHKO/tauri-get-memes/wiki/I-hate-key-input"
                        className="font-medium text-primary underline underline-offset-4"
                        target="_blank" rel="noopener noreferrer">
                      I hate key input
                    </a>
                  </Label>
                  <Input id="password" type="password" placeholder="xxxxxxACSKexUfqoKqSQxxxxxxh63zdC25ubpuA"
                         onChange={(e) => setKey(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="search">Hit me with your best shot!! (1~50)</Label>
                  <Input id="limit" type="text" value={limit}
                         onChange={(e) => setLimit(e.target.value)} />
                </div>
              </CardContent>
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <CardFooter>
                  <Button className="w-full">Get Memes</Button>
                </CardFooter>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Oops!</DialogTitle>
                    <DialogDescription>
                      {errors.error.message}
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </Card>
          </div>
          <div>
            <Separator className="my-4" />
            <div className="relative">
              <ScrollArea>
                <div className="flex flex-wrap gap-x-4 pb-4">
                  {results.results.map((gif) => (
                      <TenorGifs
                          key={gif.media_formats.tinygif.url}
                          gifFields={gif.media_formats.tinygif}
                          className="w-[250px] my-4"
                          aspectRatio="portrait"
                          width={250}
                          height={330}
                      />
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </form>
  )
}

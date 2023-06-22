"use client"

import { useState } from "react"
import { invoke } from "@tauri-apps/api/tauri"
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {ScrollArea} from "@/components/ui/scroll-area";
import {GiphyError} from "@/components/memes/data/giphy-error-fields";
import {GiphyResults} from "@/app/memes/giphy/data/giphy-fields";
import {GiphyGifs} from "@/app/memes/giphy/components/giphy-gifs";

export function GiphyClient() {
  const initialState: GiphyError = {
    meta: {
      status: 0,
      msg: '',
      response_id: '',
    },
  };

  const [results, setResults] = useState<GiphyResults>({ data: [] })
  const [errors, setError] = useState<GiphyError>(initialState)
  const [query, setQuery] = useState("welcome")
  const [key, setKey] = useState("")
  const [limit, setLimit] = useState("50")
  const [openDialog, setOpenDialog] = useState(false);

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await giphy_call();
    } catch (err: any) {
      console.error(err);
    }
  }

  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  async function giphy_call() {
    try {
      setResults(await invoke("giphy_call", {query, key, limit}));
      console.log(results);
    } catch (error) {
      setError(error)
      setOpenDialog(true);
      console.log(errors, openDialog)
    }
  }

  return (
      <div className="flex-1 space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <form onSubmit={onFormSubmit}>
            <Card className={cn("w-[500px]")}>
              <CardContent className="grid gap-4 p-1.5">
                <div className="grid gap-2">
                  <Label htmlFor="search">Let's toss some meme keywords, folks!</Label>
                  <Input id="search" type="text" value={query}
                         onChange={(e) => setQuery(e.target.value)} />
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
                      {errors.meta.msg}
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </Card>
          </form>
        </div>
        <div>
          <Separator className="my-4" />
          <div className="relative">
            <ScrollArea>
              <div className="flex flex-wrap gap-x-4 pb-4">
                {results.data.map((gif) => (
                    <GiphyGifs
                        key={gif.images.fixed_width.url}
                        fixedWidth={gif.images.fixed_width}
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
  )
}

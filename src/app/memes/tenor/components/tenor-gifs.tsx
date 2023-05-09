import Image from "next/image"
import { ListMusic, PlusCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

import { gifsList } from "../data/gifs-list"
import { GifFields } from "@/app/memes/tenor/data/tenor-fields";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface TenorGifsProps extends React.HTMLAttributes<HTMLDivElement> {
  gifFields: GifFields
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
}

export function TenorGifs({
  gifFields,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: TenorGifsProps) {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => {
    setIsCopied(true)
  };
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="overflow-hidden rounded-md">
            <Image
              src={gifFields.url}
              alt={gifFields.url}
              width={width}
              height={height}
              className={cn(
                "h-auto w-auto object-cover transition-all hover:scale-105",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}
            />
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuItem>Add to Library</ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Add to Playlist</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Playlist
              </ContextMenuItem>
              <ContextMenuSeparator />
              {gifsList.map((gifs) => (
                <ContextMenuItem key={gifs}>
                  <ListMusic className="mr-2 h-4 w-4" /> {gifs}
                </ContextMenuItem>
              ))}
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem>Play Next</ContextMenuItem>
          <ContextMenuItem>Play Later</ContextMenuItem>
          <ContextMenuItem>Create Station</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Like</ContextMenuItem>
          <ContextMenuItem>Share</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div className="flex space-x-2">
        <input value={gifFields.url} readOnly/>
        <CopyToClipboard text={gifFields.url} onCopy={handleCopy}>
          <Button onClick={handleCopy} variant="secondary" className="shrink-0">
            Copy Link
          </Button>
        </CopyToClipboard>
      </div>
    </div>
  )
}

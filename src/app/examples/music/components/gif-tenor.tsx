"use client"

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

import { TenorGif } from "../data/tenor-gifs"
import { playlists } from "../data/playlists"
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {useState} from "react";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  tenorGif: TenorGif
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
}

export function GifTenor({
  tenorGif,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: AlbumArtworkProps) {
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
              src={tenorGif.url}
              alt={tenorGif.url}
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
              {playlists.map((playlist) => (
                <ContextMenuItem key={playlist}>
                  <ListMusic className="mr-2 h-4 w-4" /> {playlist}
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
        <Input value={tenorGif.url} readOnly />
        <CopyToClipboard text={tenorGif.url} onCopy={handleCopy}>
          <Button onClick={handleCopy} variant="secondary" className="shrink-0">
            Copy Link
          </Button>
        </CopyToClipboard>
      </div>
    </div>
  )
}

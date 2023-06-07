import Image from "next/image"

import { cn } from "@/lib/utils"

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button } from "@/components/ui/button";
import { saveAs } from "file-saver";
import {FixedWidth} from "@/app/memes/giphy/data/giphy-fields";

interface GiphyGifsProps extends React.HTMLAttributes<HTMLDivElement> {
  fixedWidth: FixedWidth
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
}

export function GiphyGifs({
  fixedWidth,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: GiphyGifsProps) {

  const handleClick = (url: string) => {
    const fileName = url.split('/').pop();
    saveAs(url, fileName);
  }
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <div className="overflow-hidden rounded-md">
        <Image
          src={fixedWidth.url}
          alt={fixedWidth.url}
          width={width}
          height={height}
          className={cn(
            "h-auto w-auto object-cover transition-all hover:scale-105",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
        />
      </div>
      <div className="flex space-x-2">
        <Button onClick={() => handleClick(fixedWidth.url)} variant="secondary" className="shrink-0">
          Download Gif
        </Button>
        <CopyToClipboard text={fixedWidth.url}>
          <Button variant="secondary" className="shrink-0">
            Copy Link
          </Button>
        </CopyToClipboard>
      </div>
    </div>
  )
}

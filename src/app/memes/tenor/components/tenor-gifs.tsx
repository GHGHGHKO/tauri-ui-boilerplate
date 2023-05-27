import Image from "next/image"

import { cn } from "@/lib/utils"

import { GifFields } from "@/app/memes/tenor/data/tenor-fields";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { saveAs } from "file-saver";

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

  const handleClick = (url: string) => {
    const fileName = url.split('/').pop();
    saveAs(url, fileName);
  }
  return (
    <div className={cn("space-y-3", className)} {...props}>
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
      <div className="flex space-x-2">
        <Button onClick={() => handleClick(gifFields.url)} variant="secondary" className="shrink-0">
          Download Gif
        </Button>
        <CopyToClipboard text={gifFields.url} onCopy={handleCopy}>
          <Button onClick={handleCopy} variant="secondary" className="shrink-0">
            Copy Link
          </Button>
        </CopyToClipboard>
      </div>
    </div>
  )
}

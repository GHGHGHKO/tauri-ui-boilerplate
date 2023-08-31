import {
  AlertCircleIcon,
  CloudIcon, Code, FileText, LayoutTemplateIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

import { GifsList } from "@/components/memes/data/gifs-list"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  gifs: GifsList[]
}

export function Sidebar({ className, gifs }: SidebarProps) {
  return (
    <div className={cn("h-screen pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Github
          </h2>
          <div className="space-y-1">
            <a
                href="https://github.com/GHGHGHKO/dalgona"
                target="_blank" rel="noopener noreferrer"
            >
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Code className="mr-2 h-4 w-4" />
                Code
              </Button >
            </a>
            <a
                href="https://github.com/GHGHGHKO/dalgona/wiki"
                target="_blank" rel="noopener noreferrer"
            >
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Wiki
              </Button>
            </a>
            <a
                href="https://github.com/GHGHGHKO/dalgona/issues"
                target="_blank" rel="noopener noreferrer"
            >
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <AlertCircleIcon className="mr-2 h-4 w-4" />
                Issue
              </Button>
            </a>
            <a
                href="https://github.com/agmmnn/tauri-ui"
                target="_blank" rel="noopener noreferrer"
            >
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <LayoutTemplateIcon className="mr-2 h-4 w-4" />
                Template
              </Button>
            </a>
          </div>
        </div>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Get memes
          </h2>
          <div className="space-y-1">
            <a href="/memes/tenor" key="Tenor">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Code className="mr-2 h-4 w-4" />
                Tenor
              </Button >
            </a>
          </div>
          <div className="space-y-1">
            <a href="/memes/giphy" key="Giphy">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Code className="mr-2 h-4 w-4" />
                Giphy
              </Button >
            </a>
          </div>
        </div>
        <div className="py-2">
          <h2 className="relative px-6 text-lg font-semibold tracking-tight">
            I'll make it someday..
          </h2>
          <ScrollArea className="h-[1000px] px-2">
            <a
                href="https://github.com/GHGHGHKO/dalgona/issues"
                target="_blank" rel="noopener noreferrer"
            >
            <div className="space-y-1 p-2">
              {gifs?.map((gif) => (
                <Button
                  key={gif}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start font-normal"
                >
                  <CloudIcon className="mr-2 h-4 w-4" />
                  {gif}
                </Button>
              ))}
            </div>
            </a>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}

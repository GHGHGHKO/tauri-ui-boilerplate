import {
  CloudIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

import { GifsList } from "../data/gifs-list"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  gifs: GifsList[]
}

export function Sidebar({ className, gifs }: SidebarProps) {
  return (
    <div className={cn("h-screen pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="py-2">
          <h2 className="relative px-6 text-lg font-semibold tracking-tight">
            I'll make it someday..
          </h2>
          <ScrollArea className="h-[1000px] px-2">
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
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}

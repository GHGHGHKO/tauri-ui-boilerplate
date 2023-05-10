import { Metadata } from "next"

import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { PodcastEmptyPlaceholder } from "./components/podcast-empty-placeholder"
import { Sidebar } from "./components/sidebar"
import { gifsList } from "./data/gifs-list"
import "./styles.css"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {Tenor} from "@/app/memes/tenor/components/tenor-client";

export const metadata: Metadata = {
  title: "Music App",
  description: "Example music app using the components.",
}

export default function TenorPage() {
  return (
    <div>
      {/* <Menu /> */}
      <div className="bg-background">
        <div className="grid lg:grid-cols-5">
          <Sidebar gifs={gifsList} className="hidden lg:block" />
          <div className="col-span-3 lg:col-span-4 lg:border-l">
            <div className="h-full px-4 py-6 lg:px-8">
              <Tabs defaultValue="tenor" className="h-full space-y-6">
                <div className="space-between flex items-center">
                  <TabsList>
                    <TabsTrigger value="tenor" className="relative">
                      Tenor Gifs
                    </TabsTrigger>
                    <TabsTrigger value="podcasts">Coming soon</TabsTrigger>
                    <TabsTrigger value="live" disabled>
                      Coming soon
                    </TabsTrigger>
                  </TabsList>
                  <div className="ml-auto mr-4">
                    <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Hey
                    </Button>
                  </div>
                </div>
                <TabsContent
                  value="tenor"
                  className="border-none p-0 outline-none"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        Get memes
                      </h2>
                      <h2 className="text-l font-semibold tracking-tight">
                        You must have a Tenor API key!{" "}
                        <a
                            href="https://developers.google.com/tenor/guides/quickstart#setup"
                            className="font-medium text-primary underline underline-offset-4"
                            target="_blank" rel="noopener noreferrer"
                        >
                          Click here
                        </a>
                        {" "}to get one.
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Enter your Tenor Key and keyword
                      </p>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <Tenor />
                </TabsContent>
                <TabsContent
                  value="podcasts"
                  className="h-full flex-col border-none p-0 data-[state=active]:flex"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        New Episodes
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Your favorite podcasts. Updated daily.
                      </p>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <PodcastEmptyPlaceholder />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

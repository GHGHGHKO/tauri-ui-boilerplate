"use client"

import { useEffect, useState } from "react"
import { invoke } from "@tauri-apps/api/tauri"
import {GithubLatestTagResults} from "@/app/memes/tenor/data/github-latest-tag-fields";
import {Button} from "@/components/ui/button";
import {ExternalLinkIcon} from "lucide-react";

export function GetVersion(text: string, latestResult: GithubLatestTagResults) {
  return (
      <>
        {text}
        <br />
        {`${latestResult.current_release} -> ${latestResult.github_latest.tag_name}`}
      </>
  )
}

export function GithubLatestTag() {

  const initialState: GithubLatestTagResults = {
    github_latest: {
      html_url: '',
      tag_name: '',
    },
    is_latest: true,
    current_release: '',
  };

  const [latestResult, setLatestResult] = useState<GithubLatestTagResults>(initialState)
  const text =
      latestResult.is_latest
          ? GetVersion("up-to-date", latestResult)
          : GetVersion("update Dalgona", latestResult)

  async function github_latest_tag_client() {
    setLatestResult(await invoke("github_latest_tag_client"));
  }

  useEffect(() => {
    github_latest_tag_client()
    .catch(e => console.error(e));
  }, []);

  return (
          <div className="ml-auto mr-4">
            <a
                href={latestResult.github_latest.html_url}
                target="_blank" rel="noopener noreferrer"
            >
              <Button size="lg">
                <ExternalLinkIcon className="mr-4 h-6 w-6" />
                {text}
              </Button>
            </a>
          </div>
      )
}

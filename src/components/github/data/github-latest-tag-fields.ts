export interface GithubLatestTagResults {
  github_latest: GithubLatest;
  is_latest: boolean;
  current_release: string;
}

export interface GithubLatest {
  html_url: string;
  tag_name: string;
}

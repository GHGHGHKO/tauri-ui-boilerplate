export interface GiphyError {
  meta: Meta;
}

export interface Meta {
  status: number;
  msg: string;
  response_id: string;
}

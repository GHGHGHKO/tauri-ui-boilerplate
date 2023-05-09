export interface TenorResults {
  results: Results[];
}

export interface Results {
  media_formats: MediaFormats;
}

export interface MediaFormats {
  tinygif: GifFields;
}

export interface GifFields {
  url: string;
  duration: number;
  dims: [number, number];
  size: number;
}

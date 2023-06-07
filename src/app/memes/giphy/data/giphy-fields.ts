export interface GiphyResults {
  data: Data[];
}

export interface Data {
  images: Images;
}

export interface Images {
  fixed_width: FixedWidth;
}

export interface FixedWidth {
  height: string;
  width: string;
  size: string;
  url: string;
}

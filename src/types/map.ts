export interface Point {
  longitude: number;
  latitude: number;
}

export interface MarkerPoint extends Point {
  metadata?: {
    label: string;
  }
}

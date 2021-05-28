export interface Marker {
  position?: {
    lat: number,
    lng: number,
  };
  map?: any,
  title: string;
  name?: string;
  photo?: string;
  distanceFromOrigin?: string;
}

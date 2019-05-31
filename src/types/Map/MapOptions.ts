/**
 * the map options
 */

export interface MapOptions {

    bearing?: number;

    tilt?: number;
    /**
     * center of the map
     */
    center?: map4d.LatLng;

    /**
     * zoom
     */
    zoom?: number;

    markerLatlon?: map4d.LatLng;

    directionFrom?: map4d.LatLng;

    directionTo?: map4d.LatLng;

    search?: string;

    mode?: string;

    category?: string;

    tags?: string
  }
export const defaultMapLocation = new map4d.LatLng(16.071662, 108.224540)
export const defaultMapOption: MapOptions = {
    search: "",
    center: defaultMapLocation,
    bearing: 0,
    zoom: 16,
    tilt: 0,
  }

import { MapOptions, defaultMapLocation, defaultMapOption } from "../types/Map/MapOptions";
import { UriParams } from "../types/Map/UriParams";

/**
 * get uri parameters
 * @param mapState
 */

let searchParams: any = null
export function getUriParams(): MapOptions {
  const option: MapOptions = {center: defaultMapLocation};
  const pathNames = document.location.pathname.split("/")

  let parameters: any = []
  for (const path of pathNames) {
    if (path.startsWith("@")) {
      parameters = path.substr(1).split(",")
    }
  }

  if (parameters.length == 6) {
    option.center!.lat = parseFloat(parameters[0])
    option.center!.lng = parseFloat(parameters[1])
    option.zoom = parseFloat(parameters[2])
    option.tilt = parseFloat(parameters[3])
    option.bearing = parseFloat(parameters[4])
    option.mode = parseInt(parameters[5]) == 0 ? "2d" : "3d"
  }

  searchParams = new URLSearchParams(location.search);

  option.search = searchParams.get(UriParams.search)
  option.tags = searchParams.get(UriParams.tags)

  return option;
}

export function updateUriParams(option: MapOptions = defaultMapOption) {
  let center = option.center;
  if (!center || center.lat == null || center.lng == null) {
    center = defaultMapLocation
  }
  const cameraParams = `@${center.lat.toFixed(6)},${center.lng.toFixed(6)},` +
  `${option.zoom!.toFixed(2)},` +
  `${option.tilt!.toFixed(1)},` +
  `${option.bearing!.toFixed(1)},` +
  `${option.mode == "3d" ? 1 : 0}`

  let pathName = document.location.pathname

  const pathNames = pathName.split("/")

  for (const path of pathNames) {
    if (path.startsWith("@")) {
      pathName = pathName.replace(path, cameraParams)
    }
  }
  if (pathName.indexOf("@") == -1) {
    pathName = pathName == "/" ? `/${cameraParams}` : `${pathName}/${cameraParams}`
  }

  if (option.search) {
    searchParams.set(UriParams.search, option.search)
  } else {
    searchParams.delete(UriParams.search)
  }

  const search = searchParams.toString()
  history.replaceState(null, "", pathName + (search.length > 0 ? `?${search}` : ""))
}

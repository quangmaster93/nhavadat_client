import React from "react";
import { MapOptions, defaultMapOption } from "./types/Map/MapOptions";
import { getUriParams } from "./utils/MapUri";
import { Mode3D } from "./types/Map/Mode3D";

interface AppState {
}

class App extends React.Component<any, AppState> {
  private map: any;
  private mapView: HTMLElement

  constructor(props: any) {
    super(props)
    this.mapView = document.createElement('div');
    this.mapView.id = 'iotlink-mapview';
    this.mapView.className = 'iotlink-mapview';
    const option: MapOptions = { ...defaultMapOption, ...getUriParams() };
    this.map = new map4d.Map(this.mapView,
      {
        zoom: option.zoom,
        center: [option.center!.lat, option.center!.lng],
        geolocate: true,
        accessKey: "98fd21346d83bee24dc734231f7609c9",
        controls: false,
        tilt: option.tilt,
        bearing: option.bearing,
      },
    );
    this.map.setSwitchMode(map4d.SwitchMode.Auto)
    this.map.enable3dMode(option.mode == Mode3D.M3)
    this.map.setMinZoom(4)
    appStore.actions.updateUri(option)
    appStore.getState().map = this.map;
    
    // init map setting
    const showWaterEffect = Helper.getCookie(cookieName.waterEffect) == "true" || Helper.getCookie(cookieName.waterEffect) == null
    const showEffect = Helper.getCookie(cookieName.effect) == "true" || Helper.getCookie(cookieName.effect) == null
    const showObject = Helper.getCookie(cookieName.object) == "true" || Helper.getCookie(cookieName.object) == null
    const showShadow = Helper.getCookie(cookieName.shadow) == "true" || false

    let timeSetting = map4d.TimeEffect.None;
    let weatherSetting = map4d.Weather.None;

    if (showEffect) {
      const cookieTime = Helper.getCookie(cookieName.time)
      if (!Helper.isNullOrEmpty(cookieTime)) {
        timeSetting = parseInt(cookieTime)
      } else {
        timeSetting = map4d.TimeEffect.Live
      }

      const cookieWeather = Helper.getCookie(cookieName.weather)
      if (!Helper.isNullOrEmpty(cookieWeather)) {
        weatherSetting = parseInt(cookieWeather)
      } else {
        weatherSetting = map4d.Weather.Live
      }
    }

    this.map.setTimeEffect(timeSetting)
    this.map.setWeather(weatherSetting)
    this.map.setShadowEffect(showShadow)
    this.map.setObjectsEnabled(showObject)
    this.map.setWaterEffect(showWaterEffect)

    // set filter
    let selectedLayers = sessionStorage.getItem('selectedLayers');
    let types = []
    if (selectedLayers) {
      types = selectedLayers.split(",")
    }
    this.map.setFilterPlaceTypes(selectedLayers ? types : null)
  }
  componentDidMount() {
    document.getElementById('iotlink-map').appendChild(this.mapView);
  }


  public render() {
    return (
      <div className="iotlink-map" id='iotlink-map'>
        <div id='iotlink-mapview' />       
        <SidebarControl />        
      </div>
    )
  }
}

export default App;

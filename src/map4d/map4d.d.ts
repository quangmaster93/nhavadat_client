// Type definitions for map4dsdk 1.0
// Project: https://github.com/iotlinkadmin/map4d-web-sdk (Does not have to be to GitHub, but prefer linking to a source code repository rather than to a project website.)
// Definitions by: Sua Le <https://github.com/sua8051>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module map4d {
    interface CircleOptions {
        center: ILatLng
        radius?: number
        fillColor?: string
        fillOpacity?: number
        visible?: boolean
        draggable?: boolean
    }

    type MapObjectData = {
        reuseId?: string
        data: string,
    }

    interface MapObjectOptions {
        id: string
        location?: ILatLng
        name?: string
        scale?: number
        bearing?: number
        elevation?: number
        height?: number
        obj?:  string | MapObjectData
        texture?: string | MapObjectData
        coordinates?: ILatLng[]
        draggable?: boolean
    }

    class Circle {
        constructor(options: CircleOptions)
        getMap(): Map
        setMap(map: Map): void
        setCenter(center: ILatLng): void
        setRadius(radius: number): void
        setFillColor(fillColor: string)
        setFillOpacity(fillOpacity: number)
        setStrokeColor(fillColor: string)
        setStrokeWidth(fillOpacity: number)
        setVisible(visible: boolean)
        getCenter(): LatLng
        getRadius(): number
        getFillColor(): string
        getFillOpacity(): number
        getStrokeColor(): string
        getStrokeWidth(): number
        isVisible(): boolean
        setDraggable(draggable: boolean): void
        isDraggable(): boolean

        getUserData(): any
        setUserData(data: any)
    }

    type ICameraPosition  = CameraPosition | {target?: ILatLng, tilt?: number, bearing?: number, zoom?: number}
    class CameraPosition{
        setTarget(target: ILatLng): void
        setTilt(degrees: number): void
        setBearing(degrees: number): void
        setZoom(zoom: number)
        getTarget(): LatLng
        getTilt(): number
        getBearing(): number
        getZoom(): number
    }

    class MapObject {
        constructor(options?: MapObjectOptions)
        getId(): string
        getName(): string
        getPlaces() : string[]
        getScale(): any
        getBearing(): number
        getLocation(): LatLng
        getElevation(): number
        getHeight(): number
        getCamera(): CameraPosition
        getTypes(): string[]
        getMinZoom(): number
        getMaxZoom(): number
        getStartDate(): number
        getEndDate(): number
        getCoordinates(): LatLng[]
        isDraggable(): boolean
        setMap(map: Map): void
        setLocation(location: ILatLng): void
        setScale(scale: number): void
        setTexture(texture: string | MapObjectData): void
        setObj(obj: string | MapObjectData): void
        setElevation(elevation: number): void
        setHeight(height: number)
        setBearing(bearing: number): void
        setName(name: string): void
        setCoordinates(coordinates: ILatLng[]): void
        setDraggable(draggable: boolean): void
        getTileCovers(zooms: number[], completion: Function): void
        getTransformedCoordinates(): LatLng[]
    }

    class Icon {
        constructor(width: number, height: number, url: string)
        clone(): Icon
        getWidth(): number
        getHeight(): number
        getUrl(): string
    }

    class Measure {
        constructor(coordinates: ILatLng[])
        area: number
        primiter: number
    }

    type ILatLng  = LatLng | {lat: number, lng: number} | [number, number]
    class LatLng {
        constructor(lat: number, lng: number)
        equals(other: LatLng): boolean
        valid(): boolean
        lat: number
        lng: number
        toString(): string
        normalize(): LatLng
    }

    type ILatLngBounds = LatLngBounds | [ILatLng, ILatLng] | [number, number, number, number]
    class LatLngBounds {
        constructor(sw?: ILatLng, ne?: ILatLng)
        getCenter(): LatLng
        getNortheast(): LatLng
        getSouthwest(): LatLng
        extend(point: ILatLng): LatLngBounds
    }

    enum MapEvent {
        cameraWillChange = 0,
        cameraChanging,
        idle,
        click,
        dblClick,
        drag,
        dragEnd,
        dragStart,
        mouseMove,
        mouseOut,
        mouseOver,
        projectionChanged,
        rightClick,
        tilesLoaded,
        modeChanged,
        longClick,
    }

    enum ControlOptions {
        TOP_LEFT,
        TOP_RIGHT,
        BOTTOM_LEFT,
        BOTTOM_RIGHT
    }

    enum SwitchMode {
        Auto2DTo3D,
        Auto3DTo2D,
        Auto,
        Manual
    }

    enum Weather {
        Rainy = 0,
        Snowy,
        Sunny,
        Cloudy,
        Live,
        None
    }

    enum TimeEffect{
        Live,
        Morning,
        Noon,
        AfterNoon,
        Evening,
        None
    }

    interface MapOptions {
        center?: ILatLng
        zoom?: number
        minZoom?: number
        maxZoom?: number
        geolocate?: boolean
        accessKey?: string
        tilt?: number,
        bearing?: number,
        controls?: boolean
        controlOptions?: ControlOptions
    }

    interface AnimationOptions {
        duration?: number
        easing?: (arg0: number) => number
        animate?: boolean
    }

    interface PaddingOptions {
        top?: number
        bottom?: number
        left?: number
        right?: number
    }

    interface EventOptions {

        marker?: boolean

        polygon?: boolean

        polyline?: boolean

        circle?: boolean

        object?: boolean

        location?: boolean
    }

    namespace Data {

        interface Geometry {

            getType(): string

            forEachLatLng(callback: (LatLng) => void): void
        }

        class LineString implements Geometry {

            constructor(elements: ILatLng[])

            forEachLatLng(callback: (LatLng) => void): void

            getType(): string
        }

        class LinearRing {

            constructor(elements: ILatLng[])

            elements: LatLng[]
        }

        class Polygon implements Geometry {

            constructor(element: LinearRing)

            forEachLatLng(callback: (LatLng) => void): void

            getType(): string

        }

        class MultiPolygon implements Geometry {

            constructor(elements: Data.Polygon[])

            forEachLatLng(callback: (LatLng) => void): void

            getAt(n: number): Data.Polygon

            getLength(): number

            getType(): string

        }

        class MultiLineString implements Geometry {

            constructor(elements: Data.LineString[])

            forEachLatLng(callback: (LatLng) => void): void

            getAt(n: number): Data.LineString

            getLength(): number

            getType(): string
        }

        class Feature {

            constructor(id: number | string, geometry: Geometry, properties: any)

            getId(): number | string

            getGeometry(): Geometry

            getProperties(): any

        }


        type FeatureOptions = {

            id : number | string

            geometry: Data.Geometry

            properties?: any
        }

    }

    class MapData {

        addGeoJson(geoJson: string): Data.Feature[]

        add(feature: Data.Feature | Data.FeatureOptions): Data.Feature

        remove(feature: Data.Feature): void

        addListener(event: string | MapEvent, func: Function): MapsEventListener

    }


    class Map {
        constructor(container: HTMLElement, options?: MapOptions)

        data: MapData

        enable3dMode(enabled: boolean): void

        getBounds(paddingOptions?: PaddingOptions): LatLngBounds

        setMapUrl(mapUrl: string, _3dMode: boolean): void
        getMapUrl(): string

        setMinZoom(minZoom: number): void
        setMaxZoom(maxZoom: number): void

        setWeather(weather: Weather): void
        getWeather(): Weather

        panBy(offset: IPoint, animationOptions?: AnimationOptions): void
        panTo(latLng: ILatLng, animationOptions?: AnimationOptions): void

        moveToMyLocation(animate: boolean): void
        moveCamera(position: ICameraPosition, animationOptions?: AnimationOptions): void
        getCamera(): CameraPosition

        fitBounds(bounds: ILatLngBounds, padding?: PaddingOptions, animationOptions?: AnimationOptions): void
        setSwitchMode(mode: SwitchMode): void

        addListener(event: string | MapEvent, func: Function, options?: EventOptions): MapsEventListener
        setDate(date: Date): void

        is3dMode(): boolean

        getMinZoom(): number
        getPreferMinZoom(): number
        getMaxZoom(): number
        getMaxNativeZoom(): number

        getTimeEffect(): number
        setTimeEffect(timeEffect : TimeEffect): void
        setShadowEffect(enabled: boolean): void

        setObjectsEnabled(enabled: boolean): void
        isObjectsEnabled(): boolean
        setFilterPlaceTypes(placeTypes: string[]): void
        getFilterPlaceTypes(): string[]
        setWaterEffect(enabled: boolean): void

        setSelectedObjects(ids: string[]): void
        getSelectedObjects(): string[]
        setHiddenObject(id: string): void
        setUnhiddenObject(id: string): void
        getMapObjectById(id: string): MapObject
    }

    interface MapsEventListener {
        remove(): void
        updateEventOptions(options: EventOptions): void
    }

    interface MarkerOptions {
        position: ILatLng
        visible?: boolean
        anchor?: IPoint
        labelAnchor?: IPoint
        icon?: Icon | string
        elevation?: number
        title?: string
        snippet?: string
        windowAnchor?: IPoint
        zIndex?: number
        label?: string | MarkerLabel
        draggable?: boolean
        iconView?: string | Node
    }

    interface MarginOptions {
        top?: number,
        bottom?: number,
        left?: number,
        right?: number
    }

    interface MarkerLabelOptions {
        text: string
        color?: string
        fontWeight?: string
        fontSize?: number
        maxWidth?: number
        line?: number
        halo?: boolean
        haloColor?: string
        anchor?: IPoint,
        margin?: MarginOptions
    }

    class Marker {
        constructor(options: MarkerOptions)
        setMap(map: Map)
        setPosition(position: ILatLng)
        setVisible(visible: boolean)
        setAnchor(anchor: IPoint)
        setLabelAnchor(labelAnchor: IPoint): void
        setIcon(icon: Icon | string)
        setElevation(elevation: number)
        setZIndex(zIndex: number): void
        getZIndex(): number
        getPosition(): LatLng
        isVisible(): boolean
        getAnchor(): Point
        getLabelAnchor(): Point
        getIcon(): Icon | string
        getElevation(): number
        getMap(): Map
        hideInfoWindow(): void
        showInfoWindow(): void
        getTitle(): string
        setTitle(title: string): void
        getSnippet(): string
        setSnippet(snippet: string): void
        setWindowAnchor(anchor: IPoint): void
        setInfoWindow(infoWindow: string | Node): void
        setInfoContents(infoContents: string | Node): void
        isInfoWindowShown(): boolean
        setDraggable(draggable: boolean): void
        isDraggable(): boolean

        getUserData(): any
        setUserData(data: any)
        setLabel(label: string | MarkerLabel): void
        setIconView(iconView: string | Node ): void
        getIconView():  string | Node
    }

    class MarkerLabel {
        constructor(options: MarkerLabelOptions)
        getColor(): string
        getFontWeight(): string
        getFontSize(): number
        getText(): string
        hasHalo(): boolean
        getHaloColor(): string
        getAnchor(): Point
        getMargin(): MarginOptions
    }

    type IPoint  = Point | {x: number, y: number} | [number, number]
    class Point {
        x: number
        y: number
        constructor(x: number, y: number)
        equals(other: Point): boolean
        toString(): string
    }

    interface PolygonOptions {
        paths: ILatLng[][]
        fillColor?: string
        fillOpacity?: number
        visible?: boolean
        strokeColor?: string
        strokeWidth?: number
        draggable?: boolean
    }

    class Polygon {
        constructor(options: PolygonOptions)
        getMap(): Map
        setMap(map: Map): void
        setPaths(paths: ILatLng[][]): void
        setFillColor(fillColor: string): void
        setFillOpacity(fillOpacity: number): void
        setStrokeColor(strokeColor: string): void
        setStrokeWidth(strokeWidth: number): void
        setVisible(visible: boolean): void
        getPaths(): LatLng[][]
        getFillColor(): string
        getFillOpacity(): number
        getStrokeColor(): string
        getStrokeWidth(): number
        isVisible(): boolean
        setDraggable(isDraggable: boolean): void
        isDraggable(): boolean
        getUserData(): any
        setUserData(data: any)
    }

    interface PolylineOptions {
        path: ILatLng[]
        strokeWidth?: number
        strokeColor?: string
        strokeOpacity?: number
        visible?: boolean
        closed?: boolean
        draggable?: boolean
    }

    class Polyline {
        constructor(options: PolylineOptions)
        getPath(): LatLng[]
        getMap(): Map
        setMap(map: Map): void
        setPath(path: ILatLng[]): void
        setStrokeWidth(strokeWidth: number): void
        setClosed(closed: boolean): void
        setStrokeColor(strokeColor: string): void
        setStrokeOpacity(strokeOpacity: number): void
        setVisible(visible: boolean): void
        getStrokeWidth(): number
        getStrokeColor(): string
        getStrokeOpacity(): number
        isVisible(): boolean
        isClosed(): boolean

        getUserData(): any
        setUserData(data: any)
        isDraggable(): boolean
        setDraggable(value: boolean): void
    }

    class Projection {
        constructor(map: Map)
        fromLatLngToScreen(latLng: LatLng, elevation?: number): Point
        fromScreenToLatLng(screenCoordinate: IPoint, elevation?: number): LatLng
    }

    type TileAreaId = number
    interface TileAreaOptions {
        bounds: ILatLngBounds
        url?: string
        minZoom?: number
        maxZoom?: number
    }

    class TileArea {
        constructor(options: TileAreaOptions)
        getBounds(): LatLngBounds
        getUrl(): string
        getMinZoom(): number
        getMaxZoom(): number
        getMap(): Map
        setMap(map: Map): void
        setBounds(bounds: ILatLngBounds): void
        setMinZoom(minZoom: number): void
        setMaxZoom(maxZoom: number): void
        setUrl(url: string): void
    }

    interface MarkerClusterOptions {

        minZoom?: number

        maxZoom?: number

        radius?: number

        zoomOnClick?: boolean
    }

    class MarkerClusterer {
        constructor(markers: Marker[], options?: MarkerClusterOptions)
        setZoomOnClick(zoomOnClick: boolean): void
        setMap(map: Map): void
    }
}
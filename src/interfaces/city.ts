export default interface City {
    coord: object
    base: string
    clouds: object
    cod: number
    dt: number
    id: number
    main: {
        temp: number,
        humidity: number,
        pressure: number
    }
    name: string
    sys: object
    visibility: number
    weather: Array<object>
    wind: object
}
import City from "../../interfaces/city";
import Location from "../../interfaces/location";

export enum WeatherActionTypes {
    FETCH_WEATHER_SUCCESS = "FETCH_WEATHER_SUCCESS",
    FETCH_WEATHER_FAILURE = "FETCH_WEATHER_FAILURE",
    CURRENT_LOCATION_WEATHER = "CURRENT_LOCATION_WEATHER",
    FAVORITE_CITY = "FAVORITE_CITY",
    RESET_SEARCH = "RESET_SEARCH",
    SET_CENTER = "SET_CENTER"
}

export const fetchWeatherByCity = (weather: City) => ({
    type: WeatherActionTypes.FETCH_WEATHER_SUCCESS,
    weather
});
export const fetchWeatherByCityFailure = (error:string) => ({
    type: WeatherActionTypes.FETCH_WEATHER_FAILURE,
    error
});

export const resetSearch = () => ({
    type: WeatherActionTypes.RESET_SEARCH,
});
export const currentLocationWeather = (weather:City) => ({
    type: WeatherActionTypes.CURRENT_LOCATION_WEATHER,
    weather
});

export const addToFavorite = (city:City) => ({
    type: WeatherActionTypes.FAVORITE_CITY,
    city
});
export const setCenter = (center:Location) => ({
    type: WeatherActionTypes.SET_CENTER,
    center
});

export function getWeatherByCity(city: string) {
    return dispatch => {
        dispatch(fetchWeatherByCityFailure(''));
        return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=460b9db0ea047489fb2ea4268d497563&units=metric`)
            .then(response => response.json())
            .then((response) => {
                if(response.cod){
                    dispatch(fetchWeatherByCityFailure(response.message));
                }
                dispatch(fetchWeatherByCity(response));
            }).catch(e => console.log(e))
    }
}

export function getWeatherByLocation(location: Location) {
    return dispatch => {
        return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=460b9db0ea047489fb2ea4268d497563&units=metric`)
            .then(response => response.json())
            .then((response) => {
                dispatch(currentLocationWeather(response));
            })
    }
}


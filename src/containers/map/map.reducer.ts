import {WeatherActionTypes} from "./map.actions";
import _ from "lodash";

export const initialState = {
    weather: {},
    currentLocation: [],
    favoriteCities: [],
    center: {},
    errorMsg: ''
};

const mapReducer = (state = initialState, action) => {
    switch (action.type) {
        case WeatherActionTypes.FETCH_WEATHER_SUCCESS:
            return {
                ...state, weather: action.weather, center: {
                    lat: action.weather.coord.lat,
                    lng: action.weather.coord.lon
                }
            };
        case WeatherActionTypes.CURRENT_LOCATION_WEATHER :
            return {
                ...state,
                currentLocation: action.weather,
                center: {
                    lat: action.weather.coord.lat,
                    lng: action.weather.coord.lon
                }
            };
        case WeatherActionTypes.FAVORITE_CITY :
            const cities: any = [...state.favoriteCities];
            cities.push(action.city);
            return {...state, favoriteCities: _.uniqBy([...cities], 'id')};
        case WeatherActionTypes.RESET_SEARCH :
            return {...state, weather: {}};
        case WeatherActionTypes.FETCH_WEATHER_FAILURE :
            return {...state, errorMsg: action.error};
        case WeatherActionTypes.SET_CENTER :
            return {
                ...state, center: {
                    lat: action.center.lat,
                    lng: action.center.lon
                }
            };
        default:
            return state;
    }
};
export default mapReducer;

import React from 'react'
import {
    addToFavorite,
    currentLocationWeather,
    fetchWeatherByCity,
    fetchWeatherByCityFailure,
    resetSearch, setCenter,
    WeatherActionTypes
} from "./map.actions";

describe('Map actions', () => {
    const city = {
        "coord": {"lon": 23.97, "lat": 54.91},
        "weather": [{"id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n"}],
        "base": "stations",
        "main": {"temp": 6, "pressure": 1027, "humidity": 93, "temp_min": 6, "temp_max": 6},
        "visibility": 10000,
        "wind": {"speed": 2.1, "deg": 350},
        "clouds": {"all": 90},
        "dt": 1557796800,
        "sys": {
            "type": 1,
            "id": 1880,
            "message": 0.0073,
            "country": "LT",
            "sunrise": 1557800367,
            "sunset": 1557858097
        },
        "id": 6618486,
        "name": "Dainava (Kaunas)",
        "cod": 200
    };
    it('should fetchWeatherByCity', () => {
        expect(fetchWeatherByCity(city)).toEqual(
            expect.objectContaining({
                type: WeatherActionTypes.FETCH_WEATHER_SUCCESS,
                weather: city
            })
        );
    });

    it('should fetchWeatherByCityFailure', () => {
        expect(fetchWeatherByCityFailure("error")).toEqual(
            expect.objectContaining({
                type: WeatherActionTypes.FETCH_WEATHER_FAILURE,
                error: "error"
            })
        );
    });

    it('should resetSearch', () => {
        expect(resetSearch()).toEqual(
            expect.objectContaining({
                type: WeatherActionTypes.RESET_SEARCH
            })
        );
    });


    it('should currentLocationWeather', () => {

        expect(currentLocationWeather(city)).toEqual(
            expect.objectContaining({
                type: WeatherActionTypes.CURRENT_LOCATION_WEATHER,
                weather: city
            })
        );
    });

    it('should addToFavorite', () => {

        expect(addToFavorite(city)).toEqual(
            expect.objectContaining({
                type: WeatherActionTypes.FAVORITE_CITY,
                city
            })
        );
    });

    it('should setCenter', () => {
        const center = {
            latitude: 0,
            longitude: 0
        };
        expect(setCenter(center)).toEqual(
            expect.objectContaining({
                type: WeatherActionTypes.SET_CENTER,
                center
            })
        );
    })
});

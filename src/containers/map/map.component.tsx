import React, {useEffect, useState} from 'react';
import _ from "lodash";
import GoogleMapReact from 'google-map-react';
import WeatherBadge from '../../components/weather-marker'
import WeatherInfo from '../../components/weather-info'
import City from "../../interfaces/city";

export default (props: MapComponent) => {
    const [query, setQuery] = useState('');
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        if (!mounted) {
            setMounted(true);
            props.resetSearch();
            if (window.navigator) {
                window.navigator.geolocation.getCurrentPosition(setCurrentLocation);
            }
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props, mounted]);
    const markersList = _.uniqBy([...props.favoriteCities, props.weather, props.currentLocationWeather], "id");
    const setCurrentLocation = (location) => {
        props.getWeatherByLocation(location.coords);
    };
    const currentPositionTemperature = () => {
        return <h4 className={'text-center'}>
            {props.currentLocationWeather.name}
            {
                props.currentLocationWeather
                && props.currentLocationWeather.main
                && (props.currentLocationWeather.main.temp > 0
                    ? `+${props.currentLocationWeather.main.temp}`
                    : props.currentLocationWeather.main.temp)
            }
        </h4>
    };
    const defaultProps = {
        center: {
            lat: 54.907699199999996,
            lng: 23.9665152
        },
        zoom: 11
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        props.getWeatherByCity(query);
    };
    const handleOnChange = (event) => {
        setQuery(event.target.value)
    };
    return (
        <div>
            <div className={'map-wrapper'}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: 'AIzaSyBRkj6z2M5D26oHmJalc0b-TAJZ2VjSKII'}}
                    center={props.center}
                    defaultCenter={defaultProps.center}
                    defaultZoom={12}
                >
                    {
                        markersList.filter(marker => !_.isEmpty(marker, true)).map((city) => {
                            return <WeatherBadge
                                key={city.id}
                                lat={city.coord.lat}
                                lng={city.coord.lon}
                                city={city}
                                addToFavorite={(city) => {
                                    props.addToFavorite(city)
                                }}
                            />
                        })
                    }

                </GoogleMapReact>
            </div>
            <div className="container">
                {currentPositionTemperature()}
                <form onSubmit={handleSubmit}>
                    <input type="text" onChange={handleOnChange}/>
                    <button type={"submit"}>Search</button>
                </form>
                {props.errorMsg !== "" && <div>
                    {props.errorMsg}
                </div>}
                {
                    props.weather && props.weather.name &&
                    <div className={"favorite-cities-wrapper mt-15"}>
                        <WeatherInfo city={props.weather} cityOnClick={(center) => props.setCenter(center)}/>
                    </div>
                }
                <div>
                    {props.favoriteCities.length > 0 && <h4>Favorite cities</h4>}
                    <div className={"favorite-cities-wrapper"}>
                        {
                            props.favoriteCities.map((city) => {
                                return <WeatherInfo key={city.id} city={city}
                                                    cityOnClick={(center) => props.setCenter(center)}/>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );

}

interface MapComponent {
    resetSearch: () => void,
    favoriteCities: Array<City>,
    weather: City,
    currentLocationWeather: City,
    getWeatherByLocation: (object) => void,
    getWeatherByCity: (string) => void,
    center: {
        lat: number,
        lng: number
    },
    addToFavorite: (city: City) => void,
    errorMsg: string,
    setCenter: (object) => void
}

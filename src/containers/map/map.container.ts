import {connect} from "react-redux";
import MapsPage from './map.component'
import {
    getWeatherByCity,
    getWeatherByLocation,
    addToFavorite,
    resetSearch,
    setCenter,
    fetchWeatherByCityFailure
} from "./map.actions"


const mapDispatchToProps = (dispatch) => ({
    getWeatherByCity: (city) => dispatch(getWeatherByCity(city)),
    getWeatherByLocation: (location) => dispatch(getWeatherByLocation(location)),
    addToFavorite: (city) => dispatch(addToFavorite(city)),
    resetSearch: () => dispatch(resetSearch()),
    setCenter: (center) => dispatch(setCenter(center)),
    fetchWeatherByCityFailure: dispatch(fetchWeatherByCityFailure(''))
});

const mapStateToProps = store => {
    return {
        currentLocationWeather: store.map.currentLocation,
        weather: store.map.weather,
        center: store.map.center,
        favoriteCities: store.map.favoriteCities,
        errorMsg: store.map.errorMsg
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MapsPage)
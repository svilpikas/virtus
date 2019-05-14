import React from 'react'

export default (props) => {
    return (<div className={'city-info-wrapper'} onClick={() => props.cityOnClick(props.city.coord)}>
        <div className={'font-weight-bold city-info-header'}>{props.city.name}</div>
        <div className={'city-info-content d-flex'}>
            <div className={'font-weight-bold city-content-headers'}>
                <div>country</div>
                <div>temp</div>
                <div>clouds</div>
                <div>humidity</div>
                <div>pressure</div>
                <div>wind direction</div>
                <div>wind speed</div>
            </div>
            <div>
                <div>{props.city.sys.country}</div>
                <div>{props.city.main.temp}ºC</div>
                <div>{props.city.clouds.all}%</div>
                <div>{props.city.main.humidity}%</div>
                <div>{props.city.main.pressure}hPa</div>
                <div>{props.city.wind.deg || 0}°</div>
                <div>{props.city.wind.speed}m/s</div>
            </div>
        </div>
    </div>)
}
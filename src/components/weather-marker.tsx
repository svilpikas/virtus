import React from 'react'
import styled from "styled-components";
import {ifProp} from "styled-tools";
import City from "../interfaces/city";

const Wrapper = styled.div`
    position: absolute;
    left: 14px;
`;
const Dot = styled.span`
    &:after {
        position: absolute;
        left: 4px;
        top: 4px;
        background-color: #000;
        border-radius: 50%;
        width: 4px;
        height: 4px;
        display: block;
        content: "";
    }`;

const Temperature = styled.span`
    background-color: black;
    color: white;
    padding: 5px;
`;

const CityBlock = styled.span<{temp:boolean}>`
    background-color: ${ifProp('temp', "#E8D024" ,"#60bdfa")};
    color: white;
    padding: 5px;
    white-space: nowrap;
`;
export default (props: WeatherMarker) => {
    return (<React.Fragment>
        <Dot/>
        <Wrapper onClick={() => props.addToFavorite(props.city)}>
            <Temperature >{props.city.main.temp}</Temperature>
            <CityBlock temp={props.city.main.temp > 0}>{props.city.name}</CityBlock>

        </Wrapper>
    </React.Fragment>)
}
interface WeatherMarker {
    lat: number,
    lng: number,
    city: City,
    addToFavorite: (city) => void
}
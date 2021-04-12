import axios from 'axios';
import { BASE_URL } from '../config';

export const GET_CITIES = 'GET_CITIES';
export const GET_CURRENT_TEMP = 'GET_CURRENT_TEMP';


export const ADD_TO_BOOKMARK_LIST = 'ADD_TO_BOOKMARK_LIST';
export const REMOVE_FROM_BOOKMARK_LIST = 'REMOVE_FROM_BOOKMARK_LIST';

export const getCities = () => {
    try {
        return async dispatch => {
            const response = await axios.get(`${BASE_URL}`);
            if (response.data) {
                console.log(response, 'RESPONSE')
                dispatch({
                    type: GET_CITIES,
                    payload: response.data.list
                });
            } else {
                console.log('Unable to fetch data from the API BASE URL!');
            }
        };
    } catch (error) {
        // Add custom logic to handle errors
        console.log(error);
    }
};

export const getTempdata = (lat, long) => {
    try {
        console.log(lat, long)
        return async dispatch => {
            const response = await axios.get(`http://API.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=5f10307a0e7ec1ff80e9e95c4dea8067`);
            if (response.data) {
                console.log(response, 'TEMP')
                dispatch({
                    type: GET_CURRENT_TEMP,
                    payload: response.data
                });
            } else {
                console.log('Unable to fetch data from the API BASE URL!');
            }
        };
    } catch (error) {
        // Add custom logic to handle errors
        console.log(error);
    }
};

export const getCurrentTemp = book => dispatch => {
    dispatch({
        type: ADD_TO_BOOKMARK_LIST,
        payload: book
    });
};

export const removeBookmark = book => dispatch => {
    dispatch({
        type: REMOVE_FROM_BOOKMARK_LIST,
        payload: book
    });
};

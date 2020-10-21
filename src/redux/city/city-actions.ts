import axios from 'axios';
import { Dispatch } from 'redux';
import normalize from 'json-api-normalizer';

import { baseURL } from '../../../constant';
import { City } from '../../types/location';

import { FETCH_CITIES_REQUEST, FETCH_CITIES_SUCCESS, FETCH_CITIES_FAILURE } from './city-types';

export const fetchCitiesRequest = () => ({
    type: FETCH_CITIES_REQUEST
});

export const fetchCitiesSuccess = (cities: City) => ({
    type: FETCH_CITIES_SUCCESS,
    payload: cities
});

export const fetchCitiesFailure = (error: Error) => ({
    type: FETCH_CITIES_FAILURE,
    payload: error
});

export const fetchCities = (countryId: string) => (dispatch: Dispatch) => {
    dispatch(fetchCitiesRequest());
    return axios
        .get(`${baseURL}/country/${countryId}/city`)
        .then(response => dispatch(fetchCitiesSuccess(normalize(response.data))))
        .catch(error => dispatch(fetchCitiesFailure(error.message)));
};

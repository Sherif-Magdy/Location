import axios from 'axios';
import { Dispatch } from 'redux';
import normalize from 'json-api-normalizer';

import { baseURL } from '../../../constant';
import { Country } from '../../types/location';

import { FETCH_COUNTRIES_REQUEST, FETCH_COUNTRIES_SUCCESS, FETCH_COUNTRIES_FAILURE } from './country-types';

export const fetchCountriesRequest = () => {
    return {
        type: FETCH_COUNTRIES_REQUEST
    };
};

export const fetchCountriesSuccess = (countries: Country) => ({
    type: FETCH_COUNTRIES_SUCCESS,
    payload: countries
});

export const fetchCountriesFailure = (error: Error) => ({
    type: FETCH_COUNTRIES_FAILURE,
    payload: error
});

export const fetchCountries = () => {
    return (dispatch: Dispatch) => {
        dispatch(fetchCountriesRequest());
        return axios
            .get(`${baseURL}/countries`)
            .then(response => {
                dispatch(fetchCountriesSuccess(normalize(response.data)));
            })
            .catch(error => {
                dispatch(fetchCountriesFailure(error.message));
            });
    };
};

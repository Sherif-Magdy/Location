import axios from 'axios';
import { Dispatch } from 'redux';

import { baseURL } from '../../../constant';
import { Area } from '../../types/location';

import { FETCH_AREAS_REQUEST, FETCH_AREAS_SUCCESS, FETCH_AREAS_FAILURE } from './area-types';

export const fetchAreasRequest = () => ({
    type: FETCH_AREAS_REQUEST
});

export const fetchAreasSuccess = (areas: Area) => ({
    type: FETCH_AREAS_SUCCESS,
    payload: areas
});

export const fetchAreasFailure = (error: Error) => ({
    type: FETCH_AREAS_FAILURE,
    payload: error
});

export const fetchAreas = (countryId: string, cityId: string) => (dispatch: Dispatch) => {
    dispatch(fetchAreasRequest());
    return axios
        .get(`${baseURL}/country/${countryId}/city/${cityId}/area`)
        .then(response => dispatch(fetchAreasSuccess(response.data.data)))
        .catch(error => dispatch(fetchAreasFailure(error.message)));
};

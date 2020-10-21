import { FluxStandardAction } from 'flux-standard-action';
import { Reducer } from 'redux';

import { FETCH_CITIES_REQUEST, FETCH_CITIES_SUCCESS, FETCH_CITIES_FAILURE } from './city-types';

const initialState = {
    loading: false,
    cities: [],
    error: null
};

export interface cityState {
    loading: boolean;
    cities: string[];
    error: string | null;
}

const cityReducer: Reducer<cityState, FluxStandardAction<string, any>> = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CITIES_REQUEST:
            return {
                ...state,
                loading: true
            };

        case FETCH_CITIES_SUCCESS: {
            return {
                ...state,
                loading: false,
                cities: { ...state.cities, ...action.payload.city }
            };
        }

        case FETCH_CITIES_FAILURE:
            return {
                ...state,
                loading: false,
                cities: [],
                error: action.payload
            };

        default:
            return state;
    }
};

export { cityReducer };

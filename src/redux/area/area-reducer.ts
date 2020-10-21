import { FluxStandardAction } from 'flux-standard-action';
import { Reducer } from 'redux';

import { FETCH_AREAS_REQUEST, FETCH_AREAS_SUCCESS, FETCH_AREAS_FAILURE } from './area-types';

const initialState = {
    loading: false,
    areas: [],
    error: null
};

export interface areaState {
    loading: boolean;
    areas: string[];
    error: string | null;
}

const areaReducer: Reducer<areaState, FluxStandardAction<string, any>> = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_AREAS_REQUEST:
            return {
                ...state,
                loading: true
            };

        case FETCH_AREAS_SUCCESS:
            return {
                ...state,
                loading: false,
                areas: { ...state.areas, ...action.payload.area }
            };

        case FETCH_AREAS_FAILURE:
            return {
                ...state,
                loading: false,
                areas: [],
                error: action.payload
            };

        default:
            return state;
    }
};

export { areaReducer };

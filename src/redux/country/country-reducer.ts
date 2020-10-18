import {FluxStandardAction} from 'flux-standard-action';
import {Reducer} from 'redux';

import {
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_FAILURE,
} from './country-types';

const initialState = {
  loading: false,
  countries: [],
  error: null,
};

export interface countryState {
  loading: boolean;
  countries: string[];
  error: string | null;
}

const countryReducer: Reducer<countryState, FluxStandardAction<string, any>> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case FETCH_COUNTRIES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_COUNTRIES_SUCCESS:
      return {
        ...state,
        loading: false,
        countries: action.payload,
      };

    case FETCH_COUNTRIES_FAILURE:
      return {
        ...state,
        loading: false,
        countries: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export {countryReducer};

import {combineReducers} from 'redux';

import {countryReducer} from './country/country-reducer';

const rootReducer = combineReducers({
  countryReducer,
});

export {rootReducer};

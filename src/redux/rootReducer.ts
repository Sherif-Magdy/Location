import { combineReducers } from 'redux';

import { countryReducer } from './country/country-reducer';
import { cityReducer } from './city/city-reducer';

const rootReducer = combineReducers({
    countryReducer,
    cityReducer
});

export { rootReducer };

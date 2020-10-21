import { combineReducers } from 'redux';

import { countryReducer } from './country/country-reducer';
import { cityReducer } from './city/city-reducer';
import { areaReducer } from './area/area-reducer';

const rootReducer = combineReducers({
    countryReducer,
    cityReducer,
    areaReducer
});

export { rootReducer };


import { combineReducers } from 'redux';

import { homeReducer } from '../screens/HomeScreen';

function emptyReducer(state = {}, action) {
    return state;
}

const reducers = combineReducers({
    homeReducer,
    emptyReducer
});

export default reducers;

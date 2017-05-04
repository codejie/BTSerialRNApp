
import { combineReducers } from 'redux';

import { homeReducer } from '../screens/HomeScreen';
import { connectionReducer } from '../screens/ConnectionScreen';

function emptyReducer(state = {}, action) {
    return state;
}

const reducers = combineReducers({
    homeReducer,
    connectionReducer,
    emptyReducer
});

export default reducers;

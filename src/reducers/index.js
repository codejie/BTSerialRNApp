
import { combineReducers } from 'redux';

import { homeReducer } from '../screens/HomeScreen';
import { connectionReducer } from '../screens/ConnectionScreen';
import { sagaReducer } from '../screens/SagaScreen';
function emptyReducer(state = {}, action) {
    return state;
}

const reducers = combineReducers({
    homeReducer,
    connectionReducer,
    sagaReducer,
    emptyReducer
});

export default reducers;

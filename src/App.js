import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
// import sagas from './sagas'
import { helloSaga, sagaTest, sagaFetch } from './sagas';

import HomeScreen from './screens/HomeScreen';
import ConnectionScreen from './screens/ConnectionScreen';
import SagaScreen from './screens/SagaScreen';


const Navigator = StackNavigator({
    home: {
        screen: HomeScreen
    },
    connection: {
        screen: ConnectionScreen
    },
    saga: {
        screen: SagaScreen
    }
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware)
    // applyMiddleware(createSagaMiddleware(sagas))
);

// sagaMiddleware.run(helloSaga);
sagaMiddleware.run(sagaTest);
sagaMiddleware.run(sagaFetch);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Navigator />
            </Provider>
        );
    }
}
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';

import reducers from './reducers';

import HomeScreen from './screens/HomeScreen';


const Navigator = StackNavigator({
    home: {
        screen: HomeScreen
    }
});

const store = createStore(reducers);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Navigator />
            </Provider>
        );
    }
}
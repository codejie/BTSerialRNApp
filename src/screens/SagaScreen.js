import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Button } from 'react-native';

import styles from './styles';

export const ACTION_FETCH_URL = 'ACTION_FETCH_URL';
export const ACTION_SAGA_TEST = 'ACTION_SAGA_TEST';

export function sagaReducer(state = {
    status: false,
    url: 'undefined'
}, action) {
    console.log('sagaReducer = ', state, action);
    switch (action.type) {
        case ACTION_FETCH_URL:
            return Object.assign({}, state, {
                url: action.url
            });
            case ACTION_SAGA_TEST:
                return Object.assign({}, state, {
                    url: action.url
                });
        default:
            return state;
    }
}


class SagaScreen extends React.Component {
    static navigationOptions = {
        title: 'Saga',
    };

    constructor(props) {
        super(props);

        console.log('saga props = ', this.props);
        this.onButtonClick = this.onButtonClick.bind(this);
        this.onTestClick = this.onTestClick.bind(this);
    }

    onButtonClick() {
        console.log('click - ', this.props);
        this.props.btnClick('http://bing.com');
    }

    onTestClick() {
        console.log('test click - ', this.props);
        this.props.btnTestClick();
    }

    render() {
        return (
            <View style={styles.main}>
                <Button title='push' onPress={() => this.onButtonClick()} />
                <Text>{this.props.url}</Text>
                <Button title='test' onPress={() => this.onTestClick()} />
            </View>
        );
    }

}

SagaScreen.propTypes = {
    url: React.PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
    return {
        url: state.sagaReducer.url
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        btnClick: (url) => dispatch({
            type: ACTION_FETCH_URL,
            url: url
        }),
        btnTestClick: () => dispatch({
            type: ACTION_SAGA_TEST
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SagaScreen);
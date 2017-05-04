import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';

import BluetoothSerial from 'react-native-bluetooth-serial';

import styles from './styles';

const ACTION_UPDATE_STATUS = 'ACTION_UPDATE_STATUS';

export function connectionReducer(state = {
    status: false
}, action) {
    console.log('connectionReducer  = ', state, action);
    switch (action.type) {
        case ACTION_UPDATE_STATUS:
            return Object.assign({}, state, {
                status: action.status
            });
        default:
            return state;
    }
}

class ConnectionScreen extends React.Component {
    static navigationOptions = {
        title: 'Connection'
    }

    constructor(props) {
        super(props);

        console.log('props = ', props);
        
        this.devices = this.props.navigation.state.params;

        this.onConnected = this.onConnected.bind(this);
    }

    componentDidMount() {
        BluetoothSerial.on('connectionSuccess', () => this.onConnected(true));
        BluetoothSerial.on('connectionLost', () => onConnected(false));

        BluetoothSerial.connect(this.devices.address)
            .then(result => {
                console.log('connect result = ', result);
            }).catch(err => {
                console.log('connecti fail - ', err);
            });
    }

    onConnected(connected) {
        console.log('onConnected = ', connected);
        this.props.updateStatus(connected);
    }

    render() {
        return (
            <View style={styles.main}>
                <Text>{this.devices.name}</Text>
                <Text>connection status: {this.props.status.toString()}</Text>
            </View>
        );
    }
}

ConnectionScreen.propTypes = {
    // status: React.PropTypes.bool.isRequired,
    updateStatus: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    status: state.connectionReducer.status
});

const mapDispatchToProps = (dispatch) => ({
    updateStatus: (status) => dispatch({
        type: ACTION_UPDATE_STATUS,
        status: status
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionScreen);
import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TextInput, Button, ListView } from 'react-native';

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
        this.ds = new ListView.DataSource({rowHasChanged : (r1, r2) => r1 !== r2});

        this.state = {};
        this.state.timer = undefined;
        this.state.input = '';
        this.state.recv = [];

        this.onConnected = this.onConnected.bind(this);
        this.checkDeviceData = this.checkDeviceData.bind(this);
        this.onSubmitPress = this.onSubmitPress.bind(this);
        this.onReadData = this.onReadData.bind(this);
        this.getReadData = this.getReadData.bind(this);
    }

    componentDidMount() {
        BluetoothSerial.on('connectionSuccess', () => this.onConnected(true));
        BluetoothSerial.on('connectionLost', () => this.onConnected(false));

        BluetoothSerial.connect(this.devices.address)
            .then(result => {
                console.log('connect result = ', result);
            }).catch(err => {
                console.log('connecti fail - ', err);
            });
    }

    componentWillUnmount() {
        // if (this.props.status) {
            BluetoothSerial.disconnect();
        // }
    }

    onConnected(connected) {
        console.log('onConnected = ', connected);

        this.checkDeviceData(connected);

        this.props.updateStatus(connected);
    }

    checkDeviceData(connected) {
        if (connected) {
            console.log('checkDeviceData');
            this.state.timer = setInterval(() => {
                BluetoothSerial.readFromDevice()
                    .then(data => {
                        this.onReadData(data);
                    }).catch(err => {
                        console.log('read from device fail - ', err);
                    });
            }, 1000); 
        } else {
            if (this.state.timer) {
                console.log('clearInterval');
                clearInterval(this.state.timer);
            }
        }
    }

    onReadData(data) {
        console.log('recv - ', data);
        if (data && data.length > 0) {
            let tmp = this.state.recv;
            tmp.push(data.replace(/(\r\n|\n|\r)/gm,''));
            this.setState({recv: tmp});
        }
    }

    onSubmitPress() {
        console.log('submit - ', this.state.input);
        BluetoothSerial.write(this.state.input)
            .then(result => {
                console.log('write succ - ', result);
            }).catch(err => {
                console.log('write fail - ', err);
            });
    }

    getReadData() {
        return this.ds.cloneWithRows(this.state.recv);
    }

    render() {
        return (
            <View style={styles.main_left}>
                <Text style={styles.font_24}>{this.devices.name}</Text>
                <Text style={styles.font_20}>connection status: {this.props.status.toString()}</Text>
                <View style={{flexDirection: 'row'}}>
                    <TextInput style={{flex:1}} onChangeText={(data) => this.setState({input: data})}/>
                </View>
                <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
                <Button style={{flex: 1}} onPress={() => this.onSubmitPress() } title='submit' />
                    </View>
                <Text style={styles.font_20}>Recv</Text>
                <ListView style={{flex:1}} enableEmptySections={true} dataSource={this.getReadData()} renderRow={(row) => <Text>{row}</Text>} />
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
import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button, ListView } from 'react-native';

import BluetoothSerial from 'react-native-bluetooth-serial';
// import co from 'co';

import styles from './styles';

const ACTION_SCAN_DEVICES = 'ACTION_SCAN_DEVICES';
const ACTION_UPDATE_DEVICES = 'ACTION_UPDATE_DEVICES';


export function homeReducer(state = {
    isScanning: false,
    devices: []
}, action) {
    console.log('homeReducer = ', state, action);
    switch(action.type) {
        case ACTION_SCAN_DEVICES:
            return Object.assign({}, state,{
                isScanning: action.isScanning
            });
        case ACTION_UPDATE_DEVICES:
            return Object.assign({}, state, {
                devices: action.devices
            });
        default:
            return state;
    }
}


class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Devices'
    }

    constructor(props) {
        super(props);

        console.log('props = ', this.props);

        this.ds = new ListView.DataSource({rowHasChanged : (r1, r2) => r1!== r2});

        this.getTitle = this.getTitle.bind(this);
        this.onButtonPress = this.onButtonPress.bind(this);
        this.getDataSource = this.getDataSource.bind(this);
        this.initBluetoothSerial = this.initBluetoothSerial.bind(this);
        this.onDevicePress = this.onDevicePress.bind(this);
    }

    initBluetoothSerial() {
        BluetoothSerial.isEnabled()
            .then(result => {
                console.log('Bluetooth checked - ', result);
                if (result) {
                    BluetoothSerial.list()
                        .then(values => {
                            console.log('list result = ', values);
                            this.props.update(values);
                        }).catch(err => {
                            console.log('list failed - ', err);
                        });
                } else {
                    //
                }
            }).catch(err => {
                console.log('Bluetooth is disabled.');
            });
    }

    stopBluetoothSerial() {

    }

    onButtonPress() {
        console.log('press = ', this.props);
        if (this.props.isScanning) {
            this.stopBluetoothSerial();
        } else {
            this.initBluetoothSerial();
        }
        this.props.press(!this.props.isScanning);
    }

    getTitle() {
        return (this.props.isScanning ? 'Stop Scanning' : 'Start Scanning');
    }

    getDataSource() {
        // return this.ds.cloneWithRows(this.props.devices);
        console.log('getData - ', this.props.devices);
        if (this.props.devices) {
            return this.ds.cloneWithRows(this.props.devices);
        } else {
            return this.ds.cloneWithRows([]);
        }
    }

    onDevicePress(device) {
        console.log('navigation = ', this.props.navigation);
        console.log('on = ', device);

        this.props.navigation.navigate('connection', device);

        this.props.press(false);
    }

    render() {
        return (
            <View style={styles.main}>
                <Button title={this.getTitle()} onPress={()=> this.onButtonPress()} />
                {/*<Text style={styles.font_24}>Hello</Text>*/}
                <ListView enableEmptySections={true} dataSource={this.getDataSource()} renderRow={(row) => <Text style={styles.font_24} onPress={() => this.onDevicePress(row)}>{row.name}</Text>} />
            </View>
        );
    }
}

HomeScreen.propTypes = {
  isScanning: React.PropTypes.bool.isRequired,
  press: React.PropTypes.func.isRequired,
  update: React.PropTypes.func.isRequired,
//   devices: React.PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    isScanning: state.homeReducer.isScanning,
    devices: state.homeReducer.devices
});

const mapDispatchToProps = (dispatch) => ({
    press: (isScanning) => dispatch({
        type: ACTION_SCAN_DEVICES,
        isScanning: isScanning
    }),
    update: (devices) => dispatch({
        type: ACTION_UPDATE_DEVICES,
        devices: devices
    })
});


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
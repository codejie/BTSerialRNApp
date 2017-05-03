import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button, ListView } from 'react-native';

import styles from './styles';

const ACTION_SCAN_DEVICES = 'ACTION_SCAN_DEVICES';

export function homeReducer(state = {
    isScanning: false
}, action) {
    switch(action.type) {
        case ACTION_SCAN_DEVICES:
            return {
                isScanning: action.isScanning
            };
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
    }

    onButtonPress() {
        console.log('press = ', this.props);
        this.props.press(!this.props.isScanning);
    }

    getTitle() {
        return (this.props.isScanning ? 'Stop Scanning' : 'Start Scanning');
    }

    getDataSource() {
        return this.ds.cloneWithRows(['1', '2']);
    }

    render() {
        return (
            <View style={styles.main}>
                <Button title={this.getTitle()} onPress={()=> this.onButtonPress()} />
                <Text style={styles.font_24}>Hello</Text>
                <ListView dataSource={this.getDataSource()} renderRow={(row) => <Text>{row}</Text>} />
            </View>
        );
    }
}

HomeScreen.propTypes = {
  isScanning: React.PropTypes.bool.isRequired,
  press: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    isScanning: state.homeReducer.isScanning
});

const mapDispatchToProps = (dispatch) => ({
    press: (isScanning) => dispatch({
        type: ACTION_SCAN_DEVICES,
        isScanning: isScanning
    })
});


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
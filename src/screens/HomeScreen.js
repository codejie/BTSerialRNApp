import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';

import styles from './styles';

const ACTION_SCAN_DEVICES = 'ACTION_SCAN_DEVICES';

export function homeReducer(state = {
    text: 'Scan Device'
}, action) {
    switch(action.type) {
        case ACTION_SCAN_DEVICES:
            return {
                text: action.text
            };
        default:
            return state;
    }
}


class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home'
    }

    constructor(props) {
        super(props);

        console.log('props = ', this.props);
        this.onButtonPress = this.onButtonPress.bind(this);
    }

    onButtonPress() {
        console.log('press = ', this.props);
        this.props.press();
    }

    render() {
        return (
            <View style={styles.main}>
                <Button title={this.props.text} onPress={()=> this.onButtonPress()} />
                <Text style={styles.font_24}>Hello</Text>
            </View>
        );
    }
}

HomeScreen.propTypes = {
  text: React.PropTypes.string.isRequired,
  press: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    text: state.homeReducer.text
});

const mapDispatchToProps = (dispatch) => ({
    press: () => dispatch({
        type: ACTION_SCAN_DEVICES,
        text: 'Stop Scanning'
    })
});


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
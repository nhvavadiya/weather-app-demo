import React, { Component } from 'react';
import {
    View,
    StatusBar, SafeAreaView, Image, Text
} from 'react-native';
import styles from './styles';

export default class SplashScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {


        this.timeoutHandle = setTimeout(async () => {
            this.props.navigation.replace('Homescreen')
        }, 1000);
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutHandle);
    }

    render() {
        return (

            <View style={styles.appContainer}>
                <Text style={styles.centerText}>WeatherApp</Text>
            </View>

        );
    }
}

import React, { Component } from 'react';
import {
    Text, View, FlatList, Image, SafeAreaView, StatusBar, TouchableOpacity, PermissionsAndroid,
    Platform,
    ActivityIndicator,
} from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCities, getTempdata } from '../redux/actions';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import COLOR_CONST from '../theme/ColorConstants'
export class Homescreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            currentLatitudedata: '',
            currentLongitudedata: '', activityloader: true
        };
    }

    async componentDidMount() {
        await this.props.getCities()
        this.setState({
            data: this.props.citiesdata, activityloader: false
        })
        await this.getLocation()
        this.createChannel();

    }

    async locationtemp() {
        await this.props.getTempdata(this.state.currentLatitudedata, this.state.currentLongitudedata)
        this.showNotification();

    }

    showNotification() {
        let now = new Date();
        now.setDate(now.getDate());
        now.setHours(14);
        now.setMinutes(35);
        // this.getLocation()
        PushNotification.localNotificationSchedule({
            channelId: 'com.waveneuro',
            largeIconUrl: `http://openweathermap.org/img/w/${this.props?.tempdata?.weather[0]?.icon}.png`,
            message: `Current Temperature ${Math.round(this.props?.tempdata?.main.temp - 273.15) + " \u2103"}`,
            date: new Date(Date.now() + 5 * 1000),
            repeatType: 'day',
            invokeApp: true,
            allowWhileIdle: false,
            onlyAlertOnce: true,
            ignoreInForeground: false,
            foreground: true,
        });

    }
    createChannel() {
        PushNotification.createChannel(
            {
                channelId: 'com.waveneuro', // (required)
                channelName: 'Wave Neuro', // (required)
                channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
                playSound: true, // (optional) default: true
                soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
                importance: 4, // (optional) default: 4. Int value of the Android notification importance
                vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
            },
            (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
        );
    }

    async getLocation() {
        if (Platform.OS === 'ios') {
            this.getOneTimeLocation();
            this.subscribeLocationLocation();
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Access Required',
                        message: 'This App needs to Access your location',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    //To Check, If Permission is granted
                    this.getOneTimeLocation();
                    this.subscribeLocationLocation();
                } else {
                    alert('Permission Denied')
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
    getOneTimeLocation = () => {
        Geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
                //getting the Longitude from the location json
                const currentLongitude =
                    JSON.stringify(position.coords.longitude);

                //getting the Latitude from the location json
                const currentLatitude =
                    JSON.stringify(position.coords.latitude);

                //Setting Longitude state
                this.setState({
                    currentLongitudedata: currentLongitude, currentLatitudedata: currentLatitude
                }, () => {
                    this.locationtemp()
                    console.log(this.state.currentLongitudedata)
                })

            },
            (error) => {
                // alert(error.message)
            },
            {
                enableHighAccuracy: false,
                timeout: 30000,
                maximumAge: 1000
            },
        );
    };

    subscribeLocationLocation = () => {
        const watchID = Geolocation.watchPosition(
            (position) => {
                //Will give you the location on location change
                console.log(position);

                //getting the Longitude from the location json        
                const currentLongitude =
                    JSON.stringify(position.coords.longitude);

                //getting the Latitude from the location json
                const currentLatitude =
                    JSON.stringify(position.coords.latitude);

                //Setting Longitude state
                this.setState({
                    currentLongitudedata: currentLongitude, currentLatitudedata: currentLatitude
                }, () => {
                    // this.locationtemp()
                    console.log(this.state.currentLongitudedata)
                })

            },
            (error) => {
                // alert(error.message)
            },
            {
                enableHighAccuracy: false,
                maximumAge: 1000
            },
        );
    };

    render() {
        return (

            <View style={{ flex: 1 }}>
                <View style={styles.headerView}>
                    <Text style={styles.headerText}>WeatherApp</Text>
                </View>

                <View style={{ flex: 1 }}>
                    {this.state.activityloader && <ActivityIndicator size='large' color={COLOR_CONST.darkGreen} />
                    }
                    <FlatList
                        data={this.state.data}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item.id}
                        renderItem={({ item, index }) => {

                            return (
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Map', { data: item }) }} style={styles.boxView}>
                                    <View style={styles.box1}>
                                        <Text style={styles.cityname}>{item.name}</Text>
                                        <Text style={styles.weatherdes}>{item?.weather[0]?.description}</Text>

                                    </View>
                                    <View style={styles.box2}>
                                        <Text style={styles.tempText}>{Math.round(item.main.temp - 273.15) + " \u2103"}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>

            </View>
        );
    }
}
function mapStateToProps(state) {
    if (state) {
        return {
            citiesdata: state.booksReducer.cities,
            tempdata: state.booksReducer.currentdata
        };
    }
}
const mapDispatchToProps = {
    getCities,
    getTempdata
}

export default connect(mapStateToProps, mapDispatchToProps)(Homescreen);

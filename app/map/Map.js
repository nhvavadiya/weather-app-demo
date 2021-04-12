import React, { Component } from 'react';
import { Text, View, FlatList, Image, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MapView from 'react-native-maps';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import COLOR_CONST from '../theme/ColorConstants';
import AntDesign from "react-native-vector-icons/AntDesign";
export class Map extends Component {
    componentDidMount() {

    }
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    name: 'CENE',
                    temperature: '30'
                },
                {
                    id: 2,
                    name: 'CENE',
                    temperature: '30'

                },
                {
                    id: 3,
                    name: 'CENE',
                    temperature: '30'

                },
                {
                    id: 4,
                    name: 'CENE',
                    temperature: '30'

                },
            ]
        };
    }

    render() {
        const { weather, coord, main, name, wind } = this.props.route.params.data
        console.log(this.props.route.params.data)
        return (
            <View style={{ flex: 1 }}>

                <MapView
                    style={styles.mapStyle}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: coord.lat,
                        longitude: coord.lon,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    customMapStyle={mapStyle}>
                    <Marker
                        draggable
                        coordinate={{
                            latitude: coord.lat,
                            longitude: coord.lon,
                        }}
                        onDragEnd={
                            (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
                        }
                        title={'Test Marker'}
                        description={'This is a description of the marker'}
                    />
                </MapView>
                <View style={{ flex: 1, justifyContent: "space-between" }}>
                    <View style={{
                        justifyContent: 'center',
                    }}>
                        <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={styles.backAroow}>
                            <AntDesign
                                color='white'
                                name='arrowleft'
                                size={30}
                            />
                        </TouchableOpacity>
                        <View style={styles.headerView}>
                            <Text style={styles.headerText}>WeatherApp</Text>
                        </View>
                    </View>

                    <View style={styles.bottomsheet}>
                        <View style={styles.box1}>
                            <Text style={styles.citiText}>{name}</Text>
                            <View style={styles.subBox1}>
                                <Text style={styles.tempText}>{weather[0].description}</Text>
                                <Text style={styles.tempText}>Humidity: {main.humidity}</Text>
                                <Text style={styles.tempText}>Wind Speed: {wind.speed}</Text>
                                <Text style={styles.tempText}>Max. Temp.: {Math.round(main.temp_max - 273.15) + "\u2103"}</Text>
                                <Text style={styles.tempText}>Min. Temp.: {Math.round(main.temp_min - 273.15) + "\u2103"}</Text>
                            </View>

                        </View>
                        <View style={styles.box2}>
                            <Text style={styles.mainTemp}>{Math.round(main.temp - 273.15) + " \u2103"}</Text>
                            <Image resizeMode="cover" style={{ height: 80, width: 120 }} source={{ uri: `http://openweathermap.org/img/w/${weather[0].icon}.png` }} />
                        </View>
                    </View>

                </View>

            </View>
        );
    }
}
function mapStateToProps(state) {
    if (state) {
        return {
        };
    }
}
function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
const mapStyle = [
];

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    mapStyle: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    bottomsheet: {
        height: 200, backgroundColor: 'white', flexDirection: 'row'
    },
    box1: {
        flex: 1,
        paddingLeft: 20,
        paddingVertical: 20

    },
    subBox1: {
        justifyContent: 'space-evenly',
        marginTop: 10,
        flex: 1
    },
    box2: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 30
    },
    citiText: {
        fontSize: 18,
        fontFamily: 'Roboto-Bold',
    },
    tempText: {
        fontFamily: 'Roboto-Regular',
    },
    mainTemp: {
        fontSize: 26,
        fontFamily: 'Roboto-Regular',

    },
    headerView: {
        height: 55,
        backgroundColor: COLOR_CONST.green,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Roboto-Medium',

    },
    backAroow: {
        height: 30,
        width: 30,
        position: 'absolute',
        left: 0,
        zIndex: 1,
        marginLeft: 20
    }
});
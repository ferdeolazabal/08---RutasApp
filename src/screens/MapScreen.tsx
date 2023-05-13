import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

const MapScreen = () => {
    return (
        <View style={StyleSheet.absoluteFillObject}>
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={StyleSheet.absoluteFillObject}
                region={{
                    latitude: -34.603683,
                    longitude: -58.381557,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            />
        </View>
    );
};

export default MapScreen;

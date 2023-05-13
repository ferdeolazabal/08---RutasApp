import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

const Map = () => {
    return (
        <>
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={{ flex: 1 }}
                region={{
                    latitude: -34.603683,
                    longitude: -58.381557,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            />
        </>
    );
};

export default Map;

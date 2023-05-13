import React from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import LoadingScreen from '../screens/LoadingScreen';

interface Props {
    markers?: (typeof Marker)[];
}

const Map = ({ markers }: Props) => {
    const { initialPosition, hasLocation } = useLocation();

    if (!hasLocation) {
        return <LoadingScreen />;
    }

    return (
        <>
            <MapView
                style={{ flex: 1 }}
                provider={PROVIDER_GOOGLE}
                showsUserLocation
                // tintColor="true"
                // followsUserLocation
                // liteMode={true}
                loadingEnabled={true}
                // showsBuildings={true}
                // showsTraffic={true}
                initialRegion={{
                    latitude: initialPosition?.latitude,
                    longitude: initialPosition?.longitude,
                    // latitude: -34.603683,
                    // longitude: -58.381557,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}>
                <Marker
                    coordinate={{
                        latitude: initialPosition?.latitude,
                        longitude: initialPosition?.longitude,
                    }}
                    title="Esto es un titulo"
                    description="Esta es una descripción!"
                />
            </MapView>
        </>
    );
};

export default Map;

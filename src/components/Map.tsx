import React, { useRef } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import LoadingScreen from '../screens/LoadingScreen';
import Fab from './Fab';

interface Props {
    markers?: (typeof Marker)[];
}

const Map = ({ markers }: Props) => {
    const { initialPosition, hasLocation, getCurrentLocation } = useLocation();

    const mapViewRef = useRef<MapView>();

    const centerPosition = async () => {
        const location = await getCurrentLocation();
        mapViewRef.current?.animateCamera({
            center: location,
            zoom: 15,
        });
    };

    if (!hasLocation) {
        return <LoadingScreen />;
    }

    return (
        <>
            <MapView
                ref={(el) => (mapViewRef.current = el as MapView)}
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
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}>
                {/* <Marker
                    coordinate={{
                        latitude: initialPosition?.latitude,
                        longitude: initialPosition?.longitude,
                    }}
                    title="Esto es un titulo"
                    description="Esta es una descripción!"
                /> */}
            </MapView>
            <Fab
                iconName="locate"
                style={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20,
                }}
                onPress={centerPosition}
            />
        </>
    );
};

export default Map;

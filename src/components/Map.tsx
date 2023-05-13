import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import LoadingScreen from '../screens/LoadingScreen';
import Fab from './Fab';

interface Props {
    markers?: (typeof Marker)[];
}

const Map = ({ markers }: Props) => {
    const { initialPosition, hasLocation, getCurrentLocation, followUserLocation, userLocation } =
        useLocation();

    const mapViewRef = useRef<MapView>();

    useEffect(() => {
        followUserLocation();
        return () => {
            // cancelar seguimiento
            console.log('destroy');
        };
    }, []);

    useEffect(() => {
        mapViewRef.current?.animateCamera({
            center: userLocation,
            zoom: 15,
        });
    }, [userLocation]);

    // const centerPosition = async () => {
    //     const location = await getCurrentLocation();
    //     mapViewRef.current?.animateCamera({
    //         center: location,
    //         zoom: 15,
    //     });
    // };

    const [showTraffic, setShowTraffic] = useState(false);

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
                userLocationUpdateInterval={1}
                zoomControlEnabled
                loadingEnabled={true}
                showsBuildings={true}
                showsTraffic={showTraffic}
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
                iconName="car"
                style={{
                    position: 'absolute',
                    bottom: 17,
                    right: 60,
                }}
                onPress={() => setShowTraffic(!showTraffic)}
            />
        </>
    );
};

export default Map;

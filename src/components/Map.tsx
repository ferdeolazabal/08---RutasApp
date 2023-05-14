import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import LoadingScreen from '../screens/LoadingScreen';
import Fab from './Fab';

interface Props {
    markers?: (typeof Marker)[];
}

const Map = ({ markers }: Props) => {
    const [showTraffic, setShowTraffic] = useState(false);
    const [showPolyline, setShowPolyline] = useState(false);

    const {
        initialPosition,
        hasLocation,
        // getCurrentLocation,
        followUserLocation,
        userLocation,
        stopFollowUserLocation,
        routeLines,
    } = useLocation();

    const mapViewRef = useRef<MapView>();
    const following = useRef<boolean>(true);

    useEffect(() => {
        followUserLocation();
        return () => {
            stopFollowUserLocation();
        };
    }, []);

    useEffect(() => {
        following.current = false;
        // if (!following.current) return;
        mapViewRef.current?.animateCamera({
            center: userLocation,
            zoom: 15,
        });
    }, [userLocation]);

    // const centerPosition = async () => {
    //     following.current =true
    //     const location = await getCurrentLocation();
    //     mapViewRef.current?.animateCamera({
    //         center: location,
    //         zoom: 15,
    //     });
    // };

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
                // loadingEnabled={true}
                showsBuildings={true}
                showsTraffic={showTraffic}
                // onTouchStart={(e) => JSON.stringify(e)}
                initialRegion={{
                    latitude: initialPosition?.latitude,
                    longitude: initialPosition?.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}></MapView>

            {showPolyline && (
                <Polyline coordinates={routeLines} strokeColor="black" strokeWidth={3} />
            )}
            {/* <Marker
                    coordinate={{
                        latitude: initialPosition?.latitude,
                        longitude: initialPosition?.longitude,
                    }}
                    title="Esto es un titulo"
                    description="Esta es una descripción!"
                /> */}
            {hasLocation && (
                <>
                    <Fab
                        iconName="car"
                        style={{
                            position: 'absolute',
                            bottom: 105,
                            right: 12,
                        }}
                        onPress={() => setShowTraffic(!showTraffic)}
                        isActive={showTraffic}
                    />
                    <Fab
                        iconName="brush"
                        style={{
                            position: 'absolute',
                            bottom: 155,
                            right: 12,
                        }}
                        onPress={() => setShowPolyline(!showPolyline)}
                        isActive={showPolyline}
                    />
                </>
            )}
        </>
    );
};

export default Map;

import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline, MapType, MAP_TYPES } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import LoadingScreen from '../screens/LoadingScreen';
import Fab from './Fab';

interface Props {
    markers?: (typeof Marker)[];
}

const Map = ({ markers }: Props) => {
    const [showTraffic, setShowTraffic] = useState(false);
    const [centerPositionActivity, setCenterPositionActivity] = useState(false);
    const [showPolyline, setShowPolyline] = useState(false);
    const [mapType, setMapType] = useState<MapType>(MAP_TYPES.STANDARD);

    const {
        initialPosition,
        hasLocation,
        getCurrentLocation,
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
        if (!following.current) return;
        mapViewRef.current?.animateCamera({
            center: userLocation,
            zoom: 15,
        });
    }, [userLocation]);

    const centerPosition = async () => {
        setCenterPositionActivity(true);
        const { latitude, longitude } = await getCurrentLocation();

        following.current = true;

        mapViewRef.current?.animateCamera({
            center: { latitude, longitude },
            zoom: 15,
        });
        setCenterPositionActivity(false);
    };
    const onChangeMapType = () => {
        if (mapType === MAP_TYPES.STANDARD) setMapType(MAP_TYPES.SATELLITE);
        if (mapType === MAP_TYPES.SATELLITE) setMapType(MAP_TYPES.HYBRID);
        if (mapType === MAP_TYPES.HYBRID) setMapType(MAP_TYPES.TERRAIN);
        if (mapType === MAP_TYPES.TERRAIN) setMapType(MAP_TYPES.STANDARD);
    };

    if (!hasLocation) {
        return <LoadingScreen />;
    }
    console.log({ hasLocation });
    // console.log({ initialPosition });
    return (
        <>
            <MapView
                mapType={mapType}
                ref={(el) => (mapViewRef.current = el as MapView)}
                showsIndoors={true}
                followsUserLocation
                style={{ flex: 1 }}
                provider={PROVIDER_GOOGLE}
                showsUserLocation
                zoomControlEnabled
                loadingEnabled={true}
                showsBuildings={true}
                showsTraffic={showTraffic}
                onTouchStart={() => (following.current = false)}
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
            <Fab
                isActive
                iconName="map-outline"
                onPress={onChangeMapType}
                style={{
                    position: 'absolute',
                    bottom: 255,
                    right: 12,
                }}
            />
            <Fab
                iconName="compass-outline"
                onPress={centerPosition}
                style={{
                    position: 'absolute',
                    bottom: 205,
                    right: 12,
                }}
                isActive={centerPositionActivity}
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
        </>
    );
};

export default Map;

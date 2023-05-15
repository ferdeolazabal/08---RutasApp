import { useEffect, useState, useRef } from 'react';
import { Location } from '../interfaces/appInterfaces';
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';

export const useLocation = () => {
    const initialLocation = {
        latitude: 0,
        longitude: 0,
    };
    const [hasLocation, setHasLocation] = useState(false);
    const [initialPosition, setInitialPosition] = useState<Location>(initialLocation);
    const [userLocation, setUserLocation] = useState<Location>(initialLocation);
    const [routeLines, setRouteLines] = useState<Location[]>([]);

    const watchId = useRef<number>();
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        getCurrentLocation().then((location) => {
            if (!isMounted.current) return;

            setInitialPosition(location);
            setUserLocation(location);
            setRouteLines((routes) => [...routes, location]);
            setHasLocation(true);
        });
    }, []);

    const getCurrentLocation = (): Promise<Location> => {
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                ({ coords }: GeolocationResponse) => {
                    resolve({
                        latitude: coords?.latitude,
                        longitude: coords?.longitude,
                    });
                },
                (err: any) => reject({ err }),
                {
                    enableHighAccuracy: true,
                    // timeout: 2000000,
                    // maximumAge: 1000,
                },
            );
        });
    };

    const followUserLocation = () => {
        watchId.current = Geolocation.watchPosition(
            ({ coords }: GeolocationResponse) => {
                const location: Location = {
                    latitude: coords?.latitude,
                    longitude: coords?.longitude,
                };
                setUserLocation(location);
                setRouteLines((routes) => [...routes, location]);
            },
            (err: any) => console.log({ err }),
            {
                distanceFilter: 10,
                enableHighAccuracy: true,
                // timeout: 2000000,
                // maximumAge: 1000,
            },
        );
    };

    const stopFollowUserLocation = () => {
        if (watchId.current) Geolocation.clearWatch(watchId.current);
    };

    return {
        initialPosition,
        hasLocation,
        getCurrentLocation,
        followUserLocation,
        userLocation,
        stopFollowUserLocation,
        routeLines,
    };
};

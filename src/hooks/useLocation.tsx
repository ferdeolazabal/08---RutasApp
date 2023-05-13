import { useEffect, useState, useRef } from 'react';
import { Location } from '../interfaces/appInterfaces';
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';

export const useLocation = () => {
    const [hasLocation, setHasLocation] = useState(false);
    const [initialPosition, setInitialPosition] = useState<Location>({
        latitude: 0,
        longitude: 0,
    });
    const [userLocation, setUserLocation] = useState<Location>({
        latitude: 0,
        longitude: 0,
    });

    const watchId = useRef<number>();

    useEffect(() => {
        getCurrentLocation().then((location) => {
            setInitialPosition(location);
            setUserLocation(location);
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
                setUserLocation({
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                });
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
    };
};

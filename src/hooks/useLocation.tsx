import { Location } from '../interfaces/appInterfaces';
import { useEffect, useState } from 'react';
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
                    console.log('getCurrentLocation', JSON.stringify(coords, null, 5));
                    resolve({
                        latitude: coords?.latitude,
                        longitude: coords?.longitude,
                    });
                },
                (err: any) => reject({ err }),
                {
                    enableHighAccuracy: true,
                    // timeout: 2000000,
                    // maximumAge:1000
                },
            );
        });
    };

    const followUserLocation = () => {
        Geolocation.watchPosition(
            ({ coords }: GeolocationResponse) => {
                console.log('followUserLocation', JSON.stringify(coords, null, 5));
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
                // maximumAge:1000
            },
        );
    };

    return {
        initialPosition,
        hasLocation,
        getCurrentLocation,
        followUserLocation,
        userLocation,
    };
};

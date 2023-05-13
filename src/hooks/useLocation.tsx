import { Location } from '../interfaces/appInterfaces';
import { useEffect, useState } from 'react';
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';

export const useLocation = () => {
    const [hasLocation, setHasLocation] = useState(false);
    const [initialPosition, setInitialPosition] = useState<Location>({
        latitude: 0,
        longitude: 0,
    });

    useEffect(() => {
        getCurrentLocation().then((location) => {
            setInitialPosition(location);
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
                    distanceFilter: 100,
                    enableHighAccuracy: true,
                    // timeout: 2000000,
                    // maximumAge:1000
                },
            );
        });
    };

    return {
        initialPosition,
        hasLocation,
        getCurrentLocation,
    };
};

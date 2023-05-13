import { useEffect, useState } from 'react';
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';
import { Location } from '../interfaces/appInterfaces';

export const useLocation = () => {
    const [hasLocation, setHasLocation] = useState(false);
    const [initialPosition, setInitialPosition] = useState<Location>({
        latitude: 0,
        longitude: 0,
    });

    const location = ({ coords }: GeolocationResponse) => {
        setInitialPosition({
            latitude: coords?.latitude,
            longitude: coords?.longitude,
        });
        setHasLocation(true);
    };

    useEffect(() => {
        Geolocation.getCurrentPosition(location, (err: any) => console.log({ err }), {
            distanceFilter: 100,
            enableHighAccuracy: true,
        });
    }, []);

    return {
        initialPosition,
        hasLocation,
    };
};

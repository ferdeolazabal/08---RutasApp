import { createContext, useEffect, useState } from 'react';
import { AppState, Platform } from 'react-native';
import { PERMISSIONS, PermissionStatus, check, request } from 'react-native-permissions';

export interface PermissionsState {
    locationStatus: PermissionStatus;
}

export const permissionInitState: PermissionsState = {
    locationStatus: 'unavailable',
};

type PermissionsContextProps = {
    permissions: PermissionsState;
    askLocationPermission: () => void;
    checkLocationPermission: () => void;
};

export const PermissionContext = createContext({} as PermissionsContextProps);

export const PermissionsProvider = ({ children }: any) => {
    const [permissions, setPermissions] = useState(permissionInitState);

    useEffect(() => {
        AppState.addEventListener('change', (state) => {
            console.log('state', state);
            state !== 'active' ? null : checkLocationPermission();
        });
    }, []);

    const askLocationPermission = async () => {
        let permissionStatus: PermissionStatus;
        if (Platform.OS === 'ios') {
            permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        } else {
            permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }
        console.log({ permissionStatus });
        setPermissions({ ...permissions, locationStatus: permissionStatus });
    };

    const checkLocationPermission = async () => {
        let permissionStatus: PermissionStatus;
        if (Platform.OS === 'ios') {
            permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        } else {
            permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }
        console.log({ permissionStatus });
        setPermissions({ ...permissions, locationStatus: permissionStatus });
    };

    return (
        <PermissionContext.Provider
            value={{
                permissions,
                askLocationPermission,
                checkLocationPermission,
            }}>
            {children}
        </PermissionContext.Provider>
    );
};

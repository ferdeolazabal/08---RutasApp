import { createContext, useState } from 'react';
import { PermissionStatus } from 'react-native-permissions';

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

    const askLocationPermission = () => {};
    const checkLocationPermission = () => {};
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

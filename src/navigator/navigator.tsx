import { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PermissionContext } from '../context/PermissionsContext';
import LoadingScreen from '../screens/LoadingScreen';
import MapScreen from '../screens/MapScreen';
import PermissionsScreen from '../screens/PermissionsScreen';

const Stack = createStackNavigator();

export const Navigator = () => {
    const { permissions } = useContext(PermissionContext);

    if (permissions.locationStatus === 'unavailable') {
        return <LoadingScreen />;
    }

    return (
        <Stack.Navigator
            initialRouteName="PermissionsScreen"
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: 'white',
                },
            }}>
            {permissions.locationStatus === 'granted' ? (
                <Stack.Screen name="MapScreen" component={MapScreen} />
            ) : (
                <Stack.Screen name="PermissionsScreen" component={PermissionsScreen} />
            )}
        </Stack.Navigator>
    );
};

import React, { useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { PermissionContext } from '../context/PermissionsContext';

const PermissionsScreen = () => {
    const { permissions, askLocationPermission } = useContext(PermissionContext);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>PermissionsScreen</Text>

            <Button title="Permiso" onPress={askLocationPermission} />
            <View>
                <Text style={styles.text}>{JSON.stringify(permissions, null, 5)}</Text>
            </View>
        </View>
    );
};

export default PermissionsScreen;

const styles = StyleSheet.create({
    text: { color: 'black' },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

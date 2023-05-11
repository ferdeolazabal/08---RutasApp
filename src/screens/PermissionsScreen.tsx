import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PermissionContext } from '../context/PermissionsContext';
import BlackButton from '../components/BlackButton';

const PermissionsScreen = () => {
    const { permissions, askLocationPermission } = useContext(PermissionContext);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Es necesario el uso del GPS para usar esta aplicación</Text>

            <BlackButton title="༼ つ ◕_◕ ༽つ" onPress={askLocationPermission} />
            <View>
                <Text style={{ color: 'black', marginBottom: 30 }}>
                    {JSON.stringify(permissions, null, 5)}
                </Text>
            </View>
        </View>
    );
};

export default PermissionsScreen;

const styles = StyleSheet.create({
    text: {
        color: 'black',
        // marginVertical: 30,
        width: 250,
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 30,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

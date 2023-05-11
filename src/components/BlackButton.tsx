import React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle, StyleSheet, Text, View } from 'react-native';

interface Props {
    title: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

const BlackButton = ({ title, onPress, style = {} }: Props) => {
    return (
        <TouchableOpacity
            style={{
                ...(style as any),
                ...styles.blackButton,
            }}
            activeOpacity={0.8}
            onPress={onPress}>
            <Text style={{ color: 'white' }}>{title}</Text>
        </TouchableOpacity>
    );
};

export default BlackButton;

const styles = StyleSheet.create({
    blackButton: {
        height: 45,
        margin: 20,
        width: 200,
        backgroundColor: 'black',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#200',
        shadowOffset: {
            width: 1110,
            height: 5,
        },
        shadowOpacity: 0.27,
    },
});

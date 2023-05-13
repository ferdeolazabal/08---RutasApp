import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    iconName: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

const Fab = ({ iconName, onPress, style = {} }: Props) => {
    return (
        <View style={{ ...(style as any) }}>
            <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.blackButton}>
                <Icon name={iconName} size={29} color="black" />
            </TouchableOpacity>
        </View>
    );
};

export default Fab;

const styles = StyleSheet.create({
    blackButton: {
        zIndex: 999,
        height: 41,
        width: 40,
        backgroundColor: 'rgba(245,245,245,0.7)',
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 20,
    },
});

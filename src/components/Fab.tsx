import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    iconName: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    isActive?: boolean;
}

const Fab = ({ iconName, onPress, style = {}, isActive }: Props) => {
    return (
        <View style={{ ...(style as any) }}>
            <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.blackButton}>
                <Icon
                    name={iconName}
                    size={25}
                    color={isActive ? '#006DCC' : 'rgba(100,100,100,0.9)'}
                />
            </TouchableOpacity>
        </View>
    );
};

export default Fab;

const styles = StyleSheet.create({
    blackButton: {
        zIndex: 999,
        height: 40,
        width: 38,
        backgroundColor: 'rgba(245,245,245,1)',
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 20,
    },
});

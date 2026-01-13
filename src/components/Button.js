import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeColors, ThemeFonts } from '../utils/Theme';
import LinearGradient from 'react-native-linear-gradient';

const Button = ({ ...props }) => {
    const { title, onPress, style, disabled = false } = props;
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.5}>
            <View>
                <LinearGradient
                    colors={['#3BA20F', '#3BA20F']} // Replace with your desired colors
                    start={{ x: 0, y: 0 }} // Optional: Set the starting point of the gradient
                    end={{ x: 0, y: 1 }}   // Optional: Set the ending point of the gradient
                    style={styles.LinearGradientContainer}
                >
                    <Text style={styles.buttonText}>{title}</Text>
                </LinearGradient>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    LinearGradientContainer: {
        height: 55,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        //borderWidth: 1,
        //borderColor: ThemeColors.BLACK,
    },
    buttonBox: {
        height: 55,
        //borderWidth: 1,
        //borderColor: ThemeColors.BLACK,
        borderRadius: 10,
        marginVertical: 5,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonBoxDisable: {
        height: 55,
        marginVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 3,
        //backgroundColor: '#CED5DB',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: ThemeFonts.SEMI_BOLD,
        color: ThemeColors.WHITE,
        fontSize: 20,
        textAlign: 'center'
    }
});

export default Button;

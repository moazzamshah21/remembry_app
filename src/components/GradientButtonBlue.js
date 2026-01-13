import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {GradientColors, ThemeColors, ThemeFonts} from '../utils/Theme';
import LinearGradient from 'react-native-linear-gradient';

const GradientButtonBlue = ({...props}) => {
  const {
    title,
    ButtonViewStyle,
    buttonTextStyles,
    onPress,
    style,
    disabled = false,
  } = props;
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.5}>
      <View style={styles.buttonText}>
        <LinearGradient
          colors={GradientColors.BLUE} // Replace with your desired colors
          start={{x: 0, y: 0}} // Optional: Set the starting point of the gradient
          end={{x: 0, y: 1}} // Optional: Set the ending point of the gradient
          style={
            ButtonViewStyle ? ButtonViewStyle : styles.LinearGradientContainer
          }>
          <Text style={buttonTextStyles ? buttonTextStyles : styles.buttonText}>
            {title}
          </Text>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  LinearGradientContainer: {
    height: 60,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonBox: {
    height: 55,
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: ThemeFonts.SEMI_BOLD,
    color: ThemeColors.WHITE,
    fontSize: 20,
    textAlign: 'center',
  },
});

export default GradientButtonBlue;

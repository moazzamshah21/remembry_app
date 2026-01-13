import React, {createRef, useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {FontSize, ThemeColors, ThemeFonts} from '../utils/Theme';

const RadioButton = ({...props}) => {
  const {item, checked, onChange, displayValue, disabled} = props;

  const [ischecked, setIsChecked] = useState(checked);
  const [data, setData] = useState(item);
  const colorScheme = useColorScheme();

  const handleOnPressRadioButton = () => {
    if (onChange) {
      onChange(item);
    }
  };

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  useEffect(() => {
    setData(item);
  }, [data]);

  return (
    <TouchableOpacity disabled={disabled} onPress={handleOnPressRadioButton}>
      <View style={styles.MainContainer}>
        {ischecked == true ? (
          <View style={styles.radioButtonChecked}>
            <View
              style={[
                styles.radioButtonCheckedCircle,
                {
                  backgroundColor: disabled
                    ? ThemeColors.LIGHT_GRAY
                    : '#E91D29',
                },
              ]}
            />
          </View>
        ) : (
          <View
            style={[
              styles.radioButtonUnChecked,
              {
                backgroundColor:
                  colorScheme === 'dark'
                    ? ThemeColors.DARK_THEME_COLOR
                    : ThemeColors?.WHITE,
              },
            ]}></View>
        )}
        {displayValue && (
          <Text style={styles.radioButtonText}>{item[displayValue]}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flexDirection: 'row',
    height: 21,
    width: 21,
  },
  radioButtonUnChecked: {
    height: 21,
    width: 21,
    borderWidth: 1.5,
    borderRadius: 15,
    borderColor: '#707070',
    backgroundColor: '#FFF',
  },
  radioButtonChecked: {
    height: 21,
    width: 21,
    borderWidth: 1.5,
    borderRadius: 15,
    borderColor: '#707070',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonCheckedCircle: {
    height: 13,
    width: 13,
    borderRadius: 13 / 2,
  },
  borderBoxTouchArea: {
    height: 45,
    flexGrow: 1,
    width: '100%',
    marginVertical: 5,
    paddingRight: 0,
    paddingVertical: 15,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonText: {
    flexGrow: 1,
    fontSize: FontSize.medium,
    lineHeight: FontSize.medium * 2.2,
    fontFamily: ThemeFonts.MEDIUM,
    color: ThemeColors.DARK_GRAY,
    textAlignVertical: 'center',
  },
});

export default RadioButton;

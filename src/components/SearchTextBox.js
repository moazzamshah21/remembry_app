import React, {useState} from 'react';
import {View, StyleSheet, TextInput, useColorScheme} from 'react-native';
import {FontSize, ThemeColors} from '../utils/Theme';
import {useSelector} from 'react-redux';

const SearchTextBox = props => {
  const {
    Icon,
    value,
    placeholder,
    secureTextEntry,
    onFocus,
    onBlur,
    visiableIcon,
    onChangeText,
  } = props;
  const ThemeMode = useSelector(state => state.CommonReducer.themeMode);

  return (
    <View>
      <View
        style={[
          styles.TextBoxView,
          {
            backgroundColor:
              ThemeMode === 'dark'
                ? ThemeColors.DARK_THEME_COLOR
                : ThemeColors?.WHITE,
            borderColor: ThemeColors?.WHITE,
            borderWidth: ThemeMode === 'dark' ? 1 : 0,
          },
        ]}>
        {!visiableIcon && <View style={styles.Icon}>{Icon}</View>}
        <TextInput
          cursorColor={
            ThemeMode === 'dark' ? ThemeColors?.WHITE : ThemeColors.BLACK
          }
          value={value}
          onChangeText={onChangeText}
          multiline={false}
          placeholderTextColor={
            ThemeMode === 'dark'
              ? ThemeColors.WHITE
              : ThemeColors.LightGrayColor
          }
          style={[
            styles.TextBox,
            {
              color:
                ThemeMode === 'dark' ? ThemeColors.WHITE : ThemeColors?.BLACK,
            },
          ]}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {visiableIcon && <View style={styles.Icon}>{Icon}</View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  TextBoxView: {
    flexDirection: 'row',
    borderRadius: 28,
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    backgroundColor: ThemeColors.WHITE,
    shadowOffset: {width: 0, height: 0},
    shadowColor: ThemeColors.GRAY,
    shadowOpacity: 1,
    elevation: 5,
    shadowRadius: 5,
    minWidth: '99%',
  },
  TextBox: {
    height: 55,
    fontSize: FontSize.medium,
    color: ThemeColors.BLACK,
    flexShrink: 1,
    paddingHorizontal: 15,
    minWidth: '85%',
  },
  Icon: {
    paddingHorizontal: 15,
  },
});

export default SearchTextBox;

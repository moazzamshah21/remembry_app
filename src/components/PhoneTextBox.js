import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  useColorScheme,
} from 'react-native';
import {FontSize, ThemeColors, ThemeFonts} from '../utils/Theme';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {CountryPicker} from 'react-native-country-codes-picker';
import {useSelector} from 'react-redux';
const {width, height} = Dimensions.get('window');

const PhoneTextBox = ({label, defaultCountry = 'PK', ...props}) => {
  const {textBoxStyle, isRequired, ifDark} = props;
  const [secureTextEntry, setSecureTextEntry] = useState(
    props?.secureTextEntry,
  );
  const ThemeMode = useSelector(state => state.CommonReducer.themeMode);
  const [show, setShow] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    code: 'US',
    dial_code: '+1',
    flag: '🇺🇸',
    name: {
      ar: 'الولايات المتحدة الأمريكية',
      bg: 'Съединени щати',
      by: 'Злучаныя Штаты',
      cn: '美国',
      cz: 'Spojené státy',
      da: 'USA',
      de: 'Vereinigte Staaten',
      ee: 'Ühendriigid',
      el: 'Ηνωμένες Πολιτείες Αμερικής',
      en: 'United States s',
      es: 'Estados Unidos',
      fr: 'États-Unis',
      he: 'ארצות הברית',
      it: 'stati Uniti',
      jp: 'アメリカ',
      nl: 'Verenigde Staten',
      pl: 'Stany Zjednoczone',
      pt: 'Estados Unidos',
      ro: 'Statele Unite',
      ru: 'Соединенные Штаты',
      tr: 'Amerika Birleşik Devletleri',
      ua: 'Сполучені Штати',
      zh: '美國',
    },
  });

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (props?.onDoneTyping) {
        props?.onDoneTyping();
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [props?.value]);

  return (
    <View>
      {label && (
        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
            marginLeft: 5,
            alignItems: 'center',
          }}>
          <Text style={styles.InputLabel}>
            {label} {isRequired && <Text style={{color: 'red'}}>*</Text>}
          </Text>
        </View>
      )}
      <View
        style={[
          styles.TextBoxView,
          {
            borderColor:
              ThemeMode === 'dark' ? ThemeColors?.WHITE : ThemeColors?.BLACK,
          },
        ]}>
        <TouchableOpacity
          onPress={() => setShow(previousState => !previousState)}>
          <Text
            style={{color: ThemeMode === 'dark' ? ThemeColors?.WHITE : ThemeColors?.BLACK}}>
            {selectedCountry.flag} {selectedCountry.dial_code}
          </Text>
        </TouchableOpacity>
        <View style={styles.PipeSignView} />
        <TextInput
          {...props}
          cursorColor={
            ThemeMode == 'dark' ? ThemeColors?.WHITE : ThemeColors.BLACK
          }
          value={props.value == null ? '' : props.value.replace(/^\s+/, '')}
          multiline={false}
          keyboardType="number-pad"
          placeholderTextColor={ThemeColors.LightGrayColor}
          style={[styles.TextBox, textBoxStyle]}
          secureTextEntry={secureTextEntry}
          onChangeText={value => {
            if (props.onChangeText) {
              props.onChangeText({
                code: selectedCountry.code,
                dialCode: selectedCountry.dial_code,
                value: `${value}`,
              });
            }
          }}
        />
        {props?.secureTextEntry != undefined && (
          <TouchableOpacity
            style={{paddingHorizontal: 5}}
            onPress={() => setSecureTextEntry(previousState => !previousState)}>
            {secureTextEntry == true ? (
              <EntypoIcon
                name="eye"
                style={{color: ThemeColors.WHITE}}
                size={20}
              />
            ) : (
              <EntypoIcon
                name="eye-with-line"
                style={{color: ThemeColors.WHITE}}
                size={20}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
      <CountryPicker
        show={show}
        lang={'en'}
        style={{
          modal: {
            height: height / 2,
            marginBottom: -10,
          },
          textInput: {
            fontFamily: ThemeFonts.REGULAR,
            paddingHorizontal: 10,
          },
          dialCode: {
            fontFamily: ThemeFonts.LIGHT,
            color: ThemeColors.BLACK,
          },
          countryName: {
            fontFamily: ThemeFonts.LIGHT,
            color: ThemeColors.BLACK,
          },
          flag: {
            opacity: 1,
            color: 'red',
          },
          line: {
            backgroundColor: 'transparent',
          },
        }}
        pickerButtonOnPress={item => {
          if (props.onChangeText) {
            props.onChangeText({
              code: item.code,
              dialCode: item.dial_code,
              value: ``,
            });
          }
          setSelectedCountry(item);
          setShow(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  TextBoxView: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: ThemeColors.BLACK,
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    overflow: 'hidden',
  },
  PipeSignView: {
    width: 1,
    height: 25,
    marginHorizontal: 5,
    backgroundColor: ThemeColors.BLACK,
  },
  TextBox: {
    height: 55,
    fontSize: FontSize.medium,
    color: ThemeColors.BLACK,
    backgroundColor: ThemeColors.WHITE,
    width: '100%',
    flexShrink: 1,
  },
  InputLabel: {
    fontSize: 15,
    color: ThemeColors.GRAY,
    fontFamily: ThemeFonts.LIGHT,
    textAlign: 'left',
  },
});

export default PhoneTextBox;

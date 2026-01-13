import React, {useState, useEffect} from 'react';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  useColorScheme,
} from 'react-native';
import TextBox from '../components/TextBox';
import Button from '../components/Button';
import {ThemeColors} from '../utils/Theme';
import styles from '../styles/ForgotPasswordEmailStyle';
import {validateEmail} from '../utils/Helper';
import {showMessage} from 'react-native-flash-message';
import AuthenticationService from '../services/Authentication/AuthenticationService';
import {useSelector} from 'react-redux';

const ForgotPasswordEmailScreen = ({navigation}) => {
  const ThemeMode = useSelector(state => state.CommonReducer.themeMode);
  const [email, setEmail] = useState('');

  const handleOnPressContinue = async () => {
    if (!email) {
      showMessage({
        message: 'Email must be required',
        type: 'danger',
      });
      return;
    }
    if (!validateEmail(email.trim())) {
      showMessage({
        message: 'Invalid Email Address',
        type: 'danger',
      });
      return;
    }

    var payload = {
      email: email.trim().toLowerCase(),
    };
    var response = await AuthenticationService.SendForgotPasswordCode(payload);
    if (response) {
      if (response?.success) {
        showMessage({
          message: response?.message,
          type: 'success',
        });
        navigation.navigate('VerificationCode', {
          email: email.trim().toLowerCase(),
          token: response?.token,
        });
      } else {
        showMessage({
          message: response?.message,
          type: 'danger',
        });
      }
    }
  };

  return (
    <ScrollView
      style={{
        backgroundColor:
          ThemeMode === 'dark'
            ? ThemeColors.DARK_THEME_COLOR
            : ThemeColors?.WHITE,
      }}
      contentContainerStyle={[
        styles.ScrollViewContentContainerStyle,
        {
          backgroundColor:
            ThemeMode === 'dark'
              ? ThemeColors.DARK_THEME_COLOR
              : ThemeColors?.WHITE,
        },
      ]}
      showsVerticalScrollIndicator={false}>
      <View
        style={[
          styles.MainContainer,
          {
            backgroundColor:
              ThemeMode === 'dark'
                ? ThemeColors.DARK_THEME_COLOR
                : ThemeColors?.WHITE,
          },
        ]}>
        <View
          style={[
            styles.LogoContainer,
            {
              backgroundColor:
                ThemeMode === 'dark'
                  ? ThemeColors.DARK_THEME_COLOR
                  : ThemeColors?.WHITE,
            },
          ]}>
          <Image
            source={require('../../assets/images/app-icon.png')}
            style={{width: 200, height: 200}}
            resizeMode="contain"
          />
        </View>
        <View
          style={[
            styles.ContentContainer,
            {
              backgroundColor:
                ThemeMode === 'dark'
                  ? ThemeColors.DARK_THEME_COLOR
                  : ThemeColors?.WHITE,
            },
          ]}>
          <View style={styles.TitleTextContainer}>
            <Text
              style={[
                styles.TitleText,
                {
                  color:
                    ThemeMode === 'dark'
                      ? ThemeColors.WHITE
                      : ThemeColors?.BLACK,
                },
              ]}>
              Forgot Password
            </Text>
          </View>
          <TextBox
            onChangeText={value => setEmail(value)}
            label={'Email Address'}
            value={email}
            textBoxStyle={{
              backgroundColor:
                ThemeMode === 'dark'
                  ? ThemeColors.DARK_THEME_COLOR
                  : ThemeColors?.WHITE,
              color:
                ThemeMode === 'dark' ? ThemeColors.WHITE : ThemeColors?.BLACK,
            }}
            ifDark={true}
          />
          <View style={styles.ContinueButtonContainer}>
            <Button title={`Continue`} onPress={handleOnPressContinue} />
          </View>
          <View style={styles.SignInTextContainer}>
            <TouchableOpacity
              style={styles.SignInTextTouch}
              onPress={() => navigation.pop()}>
              <Text style={styles.SignInText}>Back to:</Text>
              <Text
                style={[
                  styles.SignInText2,
                  {
                    color: ThemeMode === 'dark' ? '#00DCFF' : ThemeColors.BLACK,
                  },
                ]}>
                {' '}
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ForgotPasswordEmailScreen;

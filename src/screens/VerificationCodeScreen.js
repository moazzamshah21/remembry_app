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
import styles from '../styles/VerificationCodeStyle';
import {CommonActions} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import AuthenticationService from '../services/Authentication/AuthenticationService';
import {useSelector} from 'react-redux';

const VerificationCodeScreen = ({navigation, route}) => {
  const ThemeMode = useSelector(state => state.CommonReducer.themeMode);
  const {email = ''} = route.params;

  const [code, setCode] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [token, setToken] = useState(route?.params?.token);

  const handleOnPressContinue = async () => {
    if (!code) {
      showMessage({
        message: 'Code must be required',
        type: 'danger',
      });
      return;
    }

    var payload = {
      email,
      code,
      token,
    };
    var response = await AuthenticationService.VerifyForgotPasswordCode(
      payload,
    );
    if (response) {
      if (response?.success) {
        showMessage({
          message: response?.message,
          type: 'success',
        });
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              {name: 'SignIn'},
              {
                name: 'ForgotPassword',
                params: {email, code, token},
              },
            ],
          }),
        );
      } else {
        showMessage({
          message: response?.message,
          type: 'danger',
        });
        setCode('');
      }
    }
  };

  const handleResend = () => {
    setSeconds(60);
  };

  const handleOnPressResendCode = async () => {
    var payload = {
      email,
    };
    var response = await AuthenticationService.SendForgotPasswordCode(payload);
    if (response) {
      if (response?.success) {
        setToken(response?.token);
        showMessage({
          message: response?.message,
          type: 'success',
        });
        handleResend();
      } else {
        showMessage({
          message: response?.message,
          type: 'danger',
        });
      }
    }
  };

  useEffect(() => {
    handleResend();
  }, []);

  useEffect(() => {
    let timer;
    if (seconds > 0) {
      timer = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [seconds]);

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
            onChangeText={value => setCode(value)}
            label={'Verification Code'}
            value={code}
            textBoxStyle={{
              backgroundColor:
                ThemeMode === 'dark'
                  ? ThemeColors.DARK_THEME_COLOR
                  : ThemeColors?.WHITE,
              color:
                ThemeMode === 'dark' ? ThemeColors.WHITE : ThemeColors?.BLACK,
            }}
          />
          <View style={styles.ResendCodeTextContainer}>
            <TouchableOpacity
              disabled={seconds != 0}
              style={styles.ResendCodeTextTouch}
              onPress={handleOnPressResendCode}>
              <Text
                style={[
                  styles.ResendCodeText,
                  {
                    color:
                      ThemeMode === 'dark'
                        ? ThemeColors.WHITE
                        : ThemeColors?.BLACK,
                  },
                ]}>
                Resend Code{seconds != 0 && ` ${seconds}`}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ContinueButtonContainer}>
            <Button title={`Continue`} onPress={handleOnPressContinue} />
          </View>
          <View style={styles.SignInTextContainer}>
            <TouchableOpacity
              style={styles.SignInTextTouch}
              onPress={() => navigation.pop(2)}>
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

export default VerificationCodeScreen;

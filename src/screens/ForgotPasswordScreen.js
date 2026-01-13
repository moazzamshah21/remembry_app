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
import styles from '../styles/ForgotPasswordStyle';
import {showMessage} from 'react-native-flash-message';
import AuthenticationService from '../services/Authentication/AuthenticationService';
import {useSelector} from 'react-redux';

const ForgotPasswordScreen = ({navigation, route}) => {
  const {email = '', code = '', token = ''} = route.params;
  const ThemeMode = useSelector(state => state.CommonReducer.themeMode);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleOnPressUpdate = async () => {
    if (!password) {
      showMessage({
        message: 'Password must be required',
        type: 'danger',
      });
      return;
    }
    if (!confirmPassword) {
      showMessage({
        message: 'Confirm Password must be required',
        type: 'danger',
      });
      return;
    }
    if (password != confirmPassword) {
      showMessage({
        message: 'Password not match',
        type: 'danger',
      });
      return;
    }
    var payload = {
      code,
      email,
      password,
      token,
    };
    var response = await AuthenticationService.ForgotPassword(payload);
    if (response?.success) {
      showMessage({
        message: response?.message,
        type: 'success',
      });
      navigation.pop();
    } else {
      showMessage({
        message: response?.message,
        type: 'danger',
      });
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
      contentContainerStyle={styles.ScrollViewContentContainerStyle}
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
            onChangeText={value => setPassword(value)}
            label={'Password'}
            value={password}
            secureTextEntry={true}
            textBoxStyle={{
              backgroundColor:
                ThemeMode === 'dark'
                  ? ThemeColors.DARK_THEME_COLOR
                  : ThemeColors?.WHITE,
              color:
                ThemeMode === 'dark' ? ThemeColors.WHITE : ThemeColors?.BLACK,
            }}
          />
          <TextBox
            onChangeText={value => setConfirmPassword(value)}
            label={'Confirm Password'}
            value={confirmPassword}
            secureTextEntry={true}
            textBoxStyle={{
              backgroundColor:
                ThemeMode === 'dark'
                  ? ThemeColors.DARK_THEME_COLOR
                  : ThemeColors?.WHITE,
              color:
                ThemeMode === 'dark' ? ThemeColors.WHITE : ThemeColors?.BLACK,
            }}
          />
          <View style={styles.UpdateButtonContainer}>
            <Button title={`Update`} onPress={handleOnPressUpdate} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ForgotPasswordScreen;

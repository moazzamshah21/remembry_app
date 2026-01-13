import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  useColorScheme,
} from 'react-native';
import styles from '../styles/SettingStyles';
import {GradientColors, ThemeColors} from '../utils/Theme';
import SecondHeader from '../components/SecondHeader';
import {EditIcon} from '../../assets/svg/SvgIcons';
import {useSelector, useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import LocalStorage from '../utils/LocalStorage';
import {CommonActions, NavigationContainer} from '@react-navigation/native';
import UserService from '../services/UserServices/UserService';
import {showMessage} from 'react-native-flash-message';
import * as ActionTypes from '../actions/ActionTypes';

const SettingScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const info = useSelector(state => state.CommonReducer.user);
  const ThemeMode = useSelector(state => state.CommonReducer.themeMode);

  const handleOnPressDeleteMyAccount = async () => {
    var result = await UserService.DeleteUserAccount();
    if (result.success) {
      showMessage({
        message: result.message,
        type: 'success',
      });
      // Clear Redux state
      dispatch({ type: ActionTypes.LOGOUT });
      LocalStorage.RemoveData('token');
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'SignIn'}],
        }),
      );
    } else {
      showMessage({
        message: result.message,
        type: 'danger',
      });
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.ScrollViewContentContainerStyle}
      showsVerticalScrollIndicator={false}>
      <SecondHeader
        title={'Setting'}
        subTitle="Update Account Setting"
        navigation={navigation}
      />
      <View
        style={[
          styles.MainContainer,
          {
            backgroundColor:
              ThemeMode === 'dark' ? ThemeColors?.BLACK : ThemeColors?.WHITE,
          },
        ]}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{alignItems: 'center', justifyContent: 'center'}}
          onPress={() => {
            navigation.navigate('EditSettingScreen');
          }}>
          <Image
            defaultSource={require('../../assets/images/avatar.png')}
            source={
              info?.profileImage
                ? {uri: info?.profileImage}
                : require('../../assets/images/avatar.png')
            }
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
            }}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <View
          style={[
            styles.ContentContainer,
            {
              backgroundColor:
                ThemeMode === 'dark' ? ThemeColors?.BLACK : ThemeColors?.WHITE,
            },
          ]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text
                style={[
                  styles?.nameText,
                  {
                    color:
                      ThemeMode === 'dark'
                        ? ThemeColors?.WHITE
                        : ThemeColors.DARK_GRAY,
                  },
                ]}>
                Name:
              </Text>
              <Text style={styles.NameSubText}>{info?.fullName}</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation?.navigate('EditSettingScreen')}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <EditIcon
                fillColor={
                  ThemeMode === 'dark'
                    ? ThemeColors?.WHITE
                    : ThemeColors.DARK_GRAY
                }
              />
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 15}}>
            <Text
              style={[
                styles?.nameText,
                {
                  color:
                    ThemeMode === 'dark'
                      ? ThemeColors?.WHITE
                      : ThemeColors.DARK_GRAY,
                },
              ]}>
              Email:
            </Text>
            <Text style={[styles.NameSubText]}>{info?.email}</Text>
          </View>
          <View style={{marginTop: 15}}>
            <Text
              style={[
                styles?.nameText,
                {
                  color:
                    ThemeMode === 'dark'
                      ? ThemeColors?.WHITE
                      : ThemeColors.DARK_GRAY,
                },
              ]}>
              Phone Number:
            </Text>
            <Text style={[styles.NameSubText]}>{info?.phoneNumber}</Text>
          </View>
          <View style={{marginTop: 15}}>
            <TouchableOpacity onPress={handleOnPressDeleteMyAccount}>
              <LinearGradient
                colors={GradientColors.GREEN}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                style={styles.saveAndContinueBtnView}>
                <Text style={styles.saveAndContinueBtnText}>
                  Delete My Account
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SettingScreen;

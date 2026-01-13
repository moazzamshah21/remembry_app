import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from 'react-native';
import styles from '../styles/HomeStyle';
import { GradientColors, ThemeColors } from '../utils/Theme';
import LinearGradient from 'react-native-linear-gradient';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import UserService from '../services/UserServices/UserService';
import messaging from '@react-native-firebase/messaging';
import { AppEventsLogger } from 'react-native-fbsdk-next';
import * as commonAction from '../actions/Common/CommonAction';
import { CommonActions } from '@react-navigation/native';
import useNetworkStatus from '../hooks/useNetworkStatus';
import { useModal } from '../modals/ModalProvider';

const HomeScreen = ({ navigation, route }) => {

  const dispatch = useDispatch();
  const { openPlansModal } = useModal();

  const user = useSelector(state => state.CommonReducer.user);
  const ThemeMode = useSelector(state => state.CommonReducer.themeMode);
  const isConnected = useNetworkStatus();

  const saveFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    let payload = {
      token: fcmToken,
    };
    await UserService.AddDeviceToken(payload);
  };


  // useEffect(() => {
  //   if (user) {
  //     if (user?.isQuestionSubmit == false) {
  //       navigation.dispatch(
  //         CommonActions.reset({
  //           index: 1,
  //           routes: [
  //             { name: 'SignIn' },
  //             {
  //               name: 'QuestionScreen',
  //             },
  //           ],
  //         }),
  //       );
  //     } else if (user?.isQuestionApproved == false) {
  //       navigation.dispatch(
  //         CommonActions.reset({
  //           index: 1,
  //           routes: [
  //             { name: 'SignIn' },
  //             {
  //               name: 'TimerScreen',
  //             },
  //           ],
  //         }),
  //       );
  //     }
  //   }
  // }, [user]);

  useEffect(() => {
    dispatch(commonAction.fetchUserDetail());
    saveFcmToken();
  }, []);

  return (
    <React.Fragment>
      <Header navigation={navigation} />
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
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={!isConnected}
            style={[styles.HomeItemContainer, {
              opacity: isConnected ? 1 : 0.5
            }]}
            onPress={() => {
              AppEventsLogger.logEvent('test_event', {
                param1: 'value1',
                param2: 'value2',
              });
              navigation.navigate('AddItem');
            }}>
            <LinearGradient
              colors={GradientColors.GREEN}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.LinearGradientContainer}>
              <View style={styles.TextView}>
                <Text numberOfLines={1} adjustsFontSizeToFit style={styles.MainTitleText}>
                  ADD ITEMS / APPOINTMENTS
                </Text>
                <Text numberOfLines={1} style={styles.SubTitleText}>
                  OF YOUR DAILY ROUTINE HERE
                </Text>
              </View>
              <View style={styles.IconView}>
                <View style={styles.IconRing}>
                  <LinearGradient
                    colors={GradientColors.BLUE}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.IconCircleLinearGradient}>
                    <View
                      style={[styles.IconCircle, { backgroundColor: '#3fc8b0' }]}>
                      <EntypoIcon
                        name="chevron-small-right"
                        style={{ color: ThemeColors.WHITE }}
                        size={30}
                      />
                    </View>
                  </LinearGradient>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={!isConnected}
            style={[styles.HomeItemContainer, {
              opacity: isConnected ? 1 : 0.5
            }]}
            onPress={() => {
              navigation.navigate('DailySchecule', { time: null });
            }}>
            <LinearGradient
              colors={GradientColors.GREEN}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.LinearGradientContainer}>
              <View style={styles.TextView}>
                <Text numberOfLines={1} style={styles.MainTitleText} adjustsFontSizeToFit>
                  DAILY SCHEDULE
                </Text>
                <Text numberOfLines={1} style={styles.SubTitleText}>
                  OF YOUR DAILY ROUTINE HERE
                </Text>
              </View>
              <View style={styles.IconView}>
                <View style={styles.IconRing}>
                  <LinearGradient
                    colors={GradientColors.ORANGE}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.IconCircleLinearGradient}>
                    <View
                      style={[styles.IconCircle, { backgroundColor: '#af9d39' }]}>
                      <EntypoIcon
                        name="chevron-small-right"
                        style={{ color: ThemeColors.WHITE }}
                        size={30}
                      />
                    </View>
                  </LinearGradient>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={!isConnected}
            style={[styles.HomeItemContainer, {
              opacity: isConnected ? 1 : 0.5
            }]}
            onPress={() => {
              navigation.navigate('UnplannedStops');
            }}>
            <LinearGradient
              colors={GradientColors.GREEN}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.LinearGradientContainer}>
              <View style={styles.TextView}>
                <Text numberOfLines={1} style={styles.MainTitleText} adjustsFontSizeToFit>
                  UNPLANNED STOPS
                </Text>
                <Text numberOfLines={1} style={styles.SubTitleText}>
                  OF YOUR DAILY ROUTINE HERE
                </Text>
              </View>
              <View style={styles.IconView}>
                <View style={styles.IconRing}>
                  <LinearGradient
                    colors={GradientColors.RED}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.IconCircleLinearGradient}>
                    <View
                      style={[styles.IconCircle, { backgroundColor: '#d05f4a' }]}>
                      <EntypoIcon
                        name="chevron-small-right"
                        style={{ color: ThemeColors.WHITE }}
                        size={30}
                      />
                    </View>
                  </LinearGradient>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={!isConnected}
            style={[styles.HomeItemContainer, {
              opacity: isConnected ? 1 : 0.5
            }]}
            onPress={() => {
              navigation.navigate('LocateItem');
            }}>
            <LinearGradient
              colors={GradientColors.GREEN}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.LinearGradientContainer}>
              <View style={styles.TextView}>
                <Text numberOfLines={1} style={styles.MainTitleText} adjustsFontSizeToFit>
                  LOCATE ITEMS
                </Text>
                <Text numberOfLines={1} style={styles.SubTitleText}>
                  OF YOUR DAILY ROUTINE HERE
                </Text>
              </View>
              <View style={styles.IconView}>
                <View style={styles.IconRing}>
                  <LinearGradient
                    colors={GradientColors.GREEN}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.IconCircleLinearGradient}>
                    <View
                      style={[styles.IconCircle, { backgroundColor: '#5da441' }]}>
                      <EntypoIcon
                        name="chevron-small-right"
                        style={{ color: ThemeColors.WHITE }}
                        size={30}
                      />
                    </View>
                  </LinearGradient>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.HomeItemContainer}
            onPress={() => {
              if (user.isSubscribed === true) {
                navigation.navigate('Remembrance');
              } else {
                openPlansModal()
              }
            }}>
            <LinearGradient
              colors={GradientColors.GREEN}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.LinearGradientContainer}>
              <View style={styles.TextView}>
                <Text numberOfLines={1} style={styles.MainTitleText} adjustsFontSizeToFit>
                  OFFLINE NOTEBOOK
                </Text>
                <Text numberOfLines={1} style={styles.SubTitleText}>
                  OF YOUR DAILY ROUTINE HERE
                </Text>
              </View>
              <View style={styles.IconView}>
                <View style={styles.IconRing}>
                  <LinearGradient
                    colors={GradientColors.GREEN}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.IconCircleLinearGradient}>
                    <View
                      style={[styles.IconCircle, { backgroundColor: '#A19495' }]}>
                      <EntypoIcon
                        name="chevron-small-right"
                        style={{ color: ThemeColors.WHITE }}
                        size={30}
                      />
                    </View>
                  </LinearGradient>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default HomeScreen;

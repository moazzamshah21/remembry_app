import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  useColorScheme,
  Platform,
  PermissionsAndroid,
  Alert,
  Linking,
  FlatList,
} from 'react-native';
import styles from '../styles/CreateAddItemStyle';
import SecondHeader from '../components/SecondHeader';
import { GradientColors, ThemeColors } from '../utils/Theme';
import GradientButton from '../components/GradientButton';
import { showMessage } from 'react-native-flash-message';
import { getFormatedTime } from '../utils/Helper';
import ReminderService from '../services/ReminderServices/ReminderService';
import { useDispatch, useSelector } from 'react-redux';
import * as reminderAction from '../actions/Reminder/ReminderAction';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import { GOOGLE_API_KEY } from '../utils/Config';
import Location from '../utils/Location';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { showLoader, hideLoader } from '../actions/Common/CommonAction'
import { useModal } from '../modals/ModalProvider';

const CreateUnplannedStopsScreen = ({ navigation, route }) => {

  const { openPlansModal } = useModal();
  const dispatch = useDispatch();
  const ThemeMode = useSelector(state => state.CommonReducer.themeMode);
  const unplannedStops = useSelector(state => state.ReminderReducer.unplannedStopsreminders);
  const user = useSelector(state => state.CommonReducer.user);


  const { item = '', time } = route?.params;

  const [itemName, setItemName] = useState('');
  const [isFocusedName, setIsFocusedName] = useState(false);

  const [place, setPlace] = useState(item);
  const [isFocusedPlace, setIsFocusedPlace] = useState(false);

  const [reminderTime, setReminderTime] = useState(time);
  const [address, setAddress] = useState('');
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    setReminderTime(time);
  }, [time]);

  const handleOnPressContinue = async () => {
    if (!itemName) {
      showMessage({
        message: 'Please Enter Item',
        type: 'danger',
      });
      return;
    } else if (!place) {
      showMessage({
        message: 'Please Enter Stop',
        type: 'danger',
      });
      return;
    }
    //  else if (!reminderTime) {
    //   showMessage({
    //     message: 'Please Select Time For Reminder',
    //     type: 'danger',
    //   });
    //   return;
    // }

    // Check freemium limit: 1 unplanned stop for non-subscribed users
    if (user?.isSubscribed != true && unplannedStops && unplannedStops.length >= 1) {
      showMessage({
        message: 'Upgrade now to Premium',
        type: 'warning',
      });
      setTimeout(() => {
        openPlansModal();
      }, 700);
      return;
    }

    var payload = {
      name: itemName,
      place: place,
      time: !reminderTime ? null : new Date(new Date(reminderTime)),
      latitude: coords && coords?.latitude ? coords?.latitude : 0,
      longitude: coords && coords?.longitude ? coords?.longitude : 0,
    };
    var response = await ReminderService.AddUnplannedStop(payload);
    if (response.success) {
      setItemName('');
      setPlace('');
      setReminderTime(null);
      setAddress('');
      setCoords(null);
      showMessage({
        message: response?.message,
        type: 'success',
      });
      dispatch(reminderAction.fetchAllReminders());
      dispatch(reminderAction.fetchAllUnplannedStopsReminders());
    }
    else if (response.success === false && response?.isLimitReached === true) {
      showMessage({
        message: response?.message,
        type: 'warning',
      });
      setTimeout(() => {
        openPlansModal()
      }, 700)
    }
    else {
      showMessage({
        message: response?.message,
        type: 'danger',
      });
    }
  };

  const getAddress = async cords => {
    try {
      var data = await Location.GetCurrentLocationAddress(
        cords?.latitude,
        cords?.longitude,
      );
      if (data) {
        setPlace(data);
        setAddress(data);
      } else {
        showMessage({
          message: 'Error fetching address',
          type: 'danger',
        });
      }
    } catch (error) {
      showMessage({
        message: 'Error fetching address',
        type: 'danger',
      });
    }
  };

  const getCurrentLocation = () => {
    dispatch(showLoader());
    if (Platform.OS == 'ios') {
      Geolocation.requestAuthorization('whenInUse').then(status => {
        if (status === 'granted') {
          Geolocation.getCurrentPosition(
            position => {
              setCoords(position?.coords);
              getAddress(position?.coords);
            },
            error => {
              dispatch(hideLoader());
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
          );
        }
      });
    } else {
      Geolocation.getCurrentPosition(
        position => {
          setCoords(position?.coords);
          getAddress(position?.coords);
        },
        error => {
          dispatch(hideLoader());
          showMessage({
            message: 'error getting location',
            type: 'danger',
          });
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    }
  };

  const onPressGetLocation = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'App needs access to your location',
            buttonNeutral: ' ',
            buttonNegative: ' ',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          Alert.alert(
            'Location Permission',
            'Location services are required for this feature. Please enable them in settings.',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'Go to Settings',
                onPress: () => {
                  // Linking.openURL('app-settings:');
                  Linking.openSettings();
                },
              },
            ],
            { cancelable: false },
          );
        }
      } else {
        getCurrentLocation();
      }
    } catch (error) {
      showMessage({
        message: error,
        type: 'danger',
      });
    }
  };

  return (
    <React.Fragment>
      <SecondHeader
        navigation={navigation}
        title="UNPLANNED STOPS"
        subTitle="OF YOUR DAILY ROUTINE HERE"
        backButtonGradient={GradientColors.RED}
        backButtonColor={'#d05f4a'}
      />
      <ScrollView
        keyboardShouldPersistTaps='handled'
        style={{
          backgroundColor: ThemeMode === 'dark'
            ? ThemeColors.DARK_THEME_COLOR
            : ThemeColors?.WHITE
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
            style={[
              styles.ItemViewContainer,
              {
                backgroundColor:
                  ThemeMode === 'dark'
                    ? ThemeColors.DARK_THEME_COLOR
                    : ThemeColors?.WHITE,
              },
            ]}>
            <TextInput
              value={itemName}
              onChangeText={value => setItemName(value)}
              onFocus={() => {
                setIsFocusedName(true)
                setIsFocusedPlace(false)
              }}
              onBlur={() => { setTimeout(() => { setIsFocusedName(false) }, 1000) }}
              placeholderTextColor={
                ThemeMode === 'dark' ? ThemeColors?.WHITE : ThemeColors.GRAY
              }
              style={[
                styles.ItemViewTextBox,
                {
                  color:
                    ThemeMode === 'dark'
                      ? ThemeColors.WHITE
                      : ThemeColors?.BLACK,
                },
              ]}
              placeholder="ENTER ITEM"
            />
          </TouchableOpacity>
          {isFocusedName && unplannedStops.map(x => x.name).filter(item => item.toLowerCase().startsWith(itemName.toLowerCase())).length > 0 && (
            <FlatList
              keyboardShouldPersistTaps='handled'
              nestedScrollEnabled
              data={unplannedStops.map(x => x.name).filter(item => item.toLowerCase().startsWith(itemName.toLowerCase()))}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setItemName(item);
                    setIsFocusedName(false);
                    setIsFocusedPlace(false);
                  }}
                  style={styles.suggestionItem}
                >
                  <Text style={styles.suggestionText}>{item}</Text>
                </TouchableOpacity>
              )}
              style={styles.suggestionsList}
            />
          )}
          <TouchableOpacity
            disabled={address !== ''}
            style={[
              styles.ItemViewContainer,
              {
                backgroundColor:
                  ThemeMode === 'dark'
                    ? ThemeColors.DARK_THEME_COLOR
                    : ThemeColors?.WHITE,
              },
            ]}>
            <View style={styles.NewView}>
              <TextInput
                editable={address === ''}
                onFocus={() => {
                  setIsFocusedName(false)
                  setIsFocusedPlace(true)
                }}
                onBlur={() => { setTimeout(() => { setIsFocusedPlace(false) }, 1000) }}
                value={place}
                placeholderTextColor={
                  ThemeMode === 'dark' ? ThemeColors?.WHITE : ThemeColors.GRAY
                }
                onChangeText={value => setPlace(value)}
                style={[
                  styles.ItemViewTextBox2,
                  {
                    color:
                      ThemeMode === 'dark'
                        ? ThemeColors.WHITE
                        : ThemeColors?.BLACK,
                  },
                ]}
                placeholder="ENTER STOP"
              />
              {address == '' ? (
                <TouchableOpacity
                  style={styles.LocationIconView}
                  onPress={onPressGetLocation}>
                  <EntypoIcon
                    name="location-pin"
                    style={{ color: ThemeColors?.WHITE }}
                    size={25}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.LocationIconView}
                  onPress={() => {
                    setAddress('');
                    setPlace('');
                  }}>
                  <EntypoIcon
                    name="circle-with-cross"
                    style={{ color: ThemeColors?.WHITE }}
                    size={20}
                  />
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
          {isFocusedPlace && unplannedStops.map(x => x.place).filter(item => item?.toLowerCase().startsWith(place?.toLowerCase())).length > 0 && (
            <FlatList
              keyboardShouldPersistTaps='handled'
              nestedScrollEnabled
              data={unplannedStops.map(x => x.place).filter(item => item?.toLowerCase().startsWith(place?.toLowerCase()))}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setPlace(item);
                    setIsFocusedName(false);
                    setIsFocusedPlace(false);
                  }}
                  style={styles.suggestionItem}
                >
                  <Text style={styles.suggestionText}>{item}</Text>
                </TouchableOpacity>
              )}
              style={styles.suggestionsList}
            />
          )}
          <TouchableOpacity
            style={[
              styles.ItemViewContainer,
              {
                backgroundColor:
                  ThemeMode === 'dark'
                    ? ThemeColors.DARK_THEME_COLOR
                    : ThemeColors?.WHITE,
              },
            ]}
            onPress={() => {
              navigation.navigate('SetTimerForUnplannedStops', {
                value: reminderTime,
              });
            }}>
            <View style={styles.ListTextView}>
              <Text
                style={[
                  styles.ListTitleText,
                  {
                    color:
                      ThemeMode === 'dark'
                        ? ThemeColors.WHITE
                        : ThemeColors?.GRAY,
                  },
                ]}>
                TIME FOR REMINDER (OPTIONAL)
              </Text>
            </View>
            <Text
              style={[
                styles.ListTitleText,
                {
                  color:
                    ThemeMode === 'dark'
                      ? ThemeColors.WHITE
                      : ThemeColors?.BLACK,
                },
              ]}>
              {reminderTime && getFormatedTime(reminderTime)}
            </Text>
          </TouchableOpacity>
          <View style={styles.ButtonView}>
            <GradientButton
              title={`Continue`}
              onPress={handleOnPressContinue}
            />
          </View>
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default CreateUnplannedStopsScreen;

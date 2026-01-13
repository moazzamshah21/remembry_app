import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  useColorScheme,
  TextInput,
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import styles from '../styles/UnplannedStops';
import SecondHeader from '../components/SecondHeader';
import { GradientColors, ThemeColors } from '../utils/Theme';
import GradientButton from '../components/GradientButton';
import RadioButton from '../components/RadioButton';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import { showLoader } from '../actions/Common/CommonAction';
import Geolocation from 'react-native-geolocation-service';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Location from '../utils/Location';
import ReminderService from '../services/ReminderServices/ReminderService';
import * as reminderAction from '../actions/Reminder/ReminderAction';
import { useModal } from '../modals/ModalProvider';

const UnplannedStopsScreen = ({ navigation, route }) => {

  const dispatch = useDispatch();
  const { openPlansModal } = useModal();

  const [selectedItem, setSelectedItem] = useState(null);
  const ThemeMode = useSelector(state => state.CommonReducer.themeMode);
  const user = useSelector(state => state.CommonReducer.user);
  const unplannedStops = useSelector(state => state.ReminderReducer.unplannedStopsreminders);

  const [address, setAddress] = useState('');
  const [coords, setCoords] = useState(null);

  const handleRadioButton = item => {
    setSelectedItem(item);
  };

  const getAddress = async cords => {
    try {
      var data = await Location.GetCurrentLocationAddress(
        cords?.latitude,
        cords?.longitude,
      );
      if (data) {
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

  const items = [
    { label: 'GAS STATION' },
    { label: 'CONVENIENCE STORE' },
    { label: 'DAYCARE' },
    { label: 'SCHOOL' },
    { label: 'OTHER' },
  ];

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
            }
          ]}>
          <View style={styles.TitleView}>

            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('UnplannedStopsLocateItem')
                }}
                style={styles.CreateAddView}
              >
                <Text style={styles.CreateAddText}>
                  Show Unplanned Stops{'            >'}
                </Text>
              </TouchableOpacity>
            </View>

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
              UNPLANNED STOPS
            </Text>
          </View>
          {items.map((item, index) => (
            <TouchableOpacity
              activeOpacity={0.7}
              key={index}
              style={[
                styles.ListViewContainer,
                {
                  backgroundColor:
                    ThemeMode === 'dark'
                      ? ThemeColors.DARK_THEME_COLOR
                      : ThemeColors?.WHITE,
                },
              ]}
              onPress={() => {
                handleRadioButton(item);
              }}>
              <View style={styles.ListTextView}>
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
                  {item.label}
                </Text>
              </View>
              <View style={styles.RadioButton}>
                <RadioButton
                  checked={item.label === selectedItem?.label}
                  item={item}
                  onChange={e => handleRadioButton(e)}
                />
              </View>
            </TouchableOpacity>
          ))}

          {selectedItem && (
            <View style={styles.ButtonView}>
              <GradientButton
                title={`Continue`}
                onPress={() => {
                  navigation.navigate('CreateUnplannedStops', {
                    item:
                      selectedItem?.label === 'OTHER'
                        ? ''
                        : selectedItem?.label,
                    time: null,
                  });
                }}
              />
            </View>
          )}

          <View>
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
                  editable={false}
                  value={address}
                  placeholderTextColor={
                    ThemeMode === 'dark' ? ThemeColors?.WHITE : ThemeColors.GRAY
                  }
                  onChangeText={value => setAddress(value)}
                  style={[
                    styles.ItemViewTextBox2,
                    {
                      color:
                        ThemeMode === 'dark'
                          ? ThemeColors.WHITE
                          : ThemeColors?.BLACK,
                    },
                  ]}
                  placeholder="INSTANTLY ADD UNPLANNED STOP"
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
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      style={styles.LocationIconView}
                      onPress={async () => {
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
                          name: address,
                          place: address,
                          time: new Date(),
                          latitude: coords && coords?.latitude ? coords?.latitude : 0,
                          longitude: coords && coords?.longitude ? coords?.longitude : 0,
                        };
                        var response = await ReminderService.AddUnplannedStop(payload);
                        if (response.success) {
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
                      }}>
                      <FontAwesome
                        name="check-circle"
                        style={{ color: ThemeColors?.WHITE }}
                        size={20}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.LocationIconView2}
                      onPress={() => {
                        setAddress('');
                        setCoords(null);
                      }}>
                      <EntypoIcon
                        name="circle-with-cross"
                        style={{ color: ThemeColors?.WHITE }}
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default UnplannedStopsScreen;

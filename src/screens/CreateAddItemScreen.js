import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Alert,
  Platform,
  ActionSheetIOS,
  Dimensions,
  FlatList,
} from 'react-native';
import styles from '../styles/CreateAddItemStyle';
import SecondHeader from '../components/SecondHeader';
import { GradientColors, ThemeColors } from '../utils/Theme';
import GradientButton from '../components/GradientButton';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { showMessage } from 'react-native-flash-message';
import { getFormatedTime } from '../utils/Helper';
import ReminderService from '../services/ReminderServices/ReminderService';
import { useDispatch, useSelector } from 'react-redux';
import * as reminderAction from '../actions/Reminder/ReminderAction';
import moment from 'moment';
import 'moment-timezone';
import { useModal } from '../modals/ModalProvider';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
const { width, height } = Dimensions.get('window');

const CreateAddItemScreen = ({ navigation, route }) => {

  const dispatch = useDispatch();
  const { openPlansModal } = useModal();

  const ThemeMode = useSelector(state => state.CommonReducer.themeMode);
  const reminders = useSelector(state => state.ReminderReducer.reminders);
  const user = useSelector(state => state.CommonReducer.user);

  const { item = '', time } = route?.params;
  const options = ['Take a photo', 'Pick from gallery', 'Cancel'];

  const [itemName, setItemName] = useState(item);
  const [isFocusedName, setIsFocusedName] = useState(false);

  const [place, setPlace] = useState('');
  const [isFocusedPlace, setIsFocusedPlace] = useState(false);

  const [reminderTime, setReminderTime] = useState(time);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setReminderTime(time);
  }, [time]);

  const onPressPickAnImage = async () => {
    const permission = Platform.select({
      ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
      android: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
    });

    const result = await check(permission);
    if (result === RESULTS.GRANTED) {

    } else if (result === RESULTS.DENIED || result === RESULTS.BLOCKED) {
      const requestResult = await request(permission);
      if (requestResult === RESULTS.GRANTED) {

      } else {
        showMessage({
          message: 'Gallery permission is needed to select photos.',
          type: 'warning',
        });
        return;
      }
    }

    launchImageLibrary(
      { mediaType: 'photo', includeBase64: true, quality: 0.5 },
      response => {
        if (!response.didCancel) {
          setSelectedImage({
            uri: response?.assets[0]?.uri,
            base64: response?.assets[0]?.base64,
          });
        }
      },
    );
  };

  const onPressTakeAnImage = async () => {
    const permission = Platform.select({
      ios: PERMISSIONS.IOS.CAMERA,
      android: PERMISSIONS.ANDROID.CAMERA,
    });

    const result = await check(permission);
    if (result === RESULTS.GRANTED) {

    }
    else if (result === RESULTS.DENIED || result === RESULTS.BLOCKED) {
      const requestResult = await request(permission);
      if (requestResult === RESULTS.GRANTED) {

      } else {
        showMessage({
          message: 'Camera permission is needed to take pictures.',
          type: 'warning',
        });
        return;
      }
    }

    launchCamera(
      { mediaType: 'photo', includeBase64: true, quality: 0.5 },
      response => {
        if (!response.didCancel) {
          setSelectedImage({
            uri: response?.assets[0]?.uri,
            base64: response?.assets[0]?.base64,
          });
        }
      },
    );
  };

  const handlePressIOS = index => {
    switch (index) {
      case 0:
        onPressTakeAnImage()
        break;
      case 1:
        onPressPickAnImage()
        break;
      default:
        break;
    }
  };

  const showActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: options,
        cancelButtonIndex: 2,
        destructiveButtonIndex: -1,
        title: 'Select an option',
      },
      handlePressIOS,
    );
  };

  const onPressImagePicker = () => {
    if (Platform?.OS === 'android') {
      Alert.alert('Take a Photo', 'Please Select Any Option', [
        {
          text: 'Cancel',
          onPress: () => { }
        },
        {
          text: 'Pick Image From Gallery',
          onPress: () => onPressPickAnImage(),
        },
        {
          text: 'Take An Image',
          onPress: () => onPressTakeAnImage()
        },
      ]);
    } else {
      showActionSheet();
    }
  };

  const handleOnPressContinue = async () => {
    if (!selectedImage) {
      showMessage({
        message: 'Please Select Image',
        type: 'danger',
      });
      return;
    } else if (!itemName) {
      showMessage({
        message: 'Please Enter Item',
        type: 'danger',
      });
      return;
    } else if (!place) {
      showMessage({
        message: 'Please Place',
        type: 'danger',
      });
      return;
    }

    // Check freemium limit: 1 item for non-subscribed users
    if (user?.isSubscribed != true && reminders && reminders.length >= 1) {
      showMessage({
        message: 'Upgrade now to Premium',
        type: 'warning',
      });
      setTimeout(() => {
        openPlansModal();
      }, 700);
      return;
    }
    // else if (!reminderTime) {
    //   showMessage({
    //     message: 'Please Select Time For Reminder',
    //     type: 'danger',
    //   });
    //   return;
    // }

    var payload = {
      imageBase64: selectedImage?.base64,
      name: itemName,
      place: place,
      time: !reminderTime ? null : new Date(new Date(reminderTime)),
    };
    var response = await ReminderService.AddDailyItem(payload);
    if (response.success === true) {
      setSelectedImage(null);
      setItemName('');
      setPlace('');
      setReminderTime(null);
      showMessage({
        message: response?.message,
        type: 'success',
      });
      dispatch(reminderAction.fetchAllReminders());
      dispatch(reminderAction.fetchAllUnplannedStopsReminders());
      dispatch(reminderAction.fetchAllFeeds());
    }
    else if (response.success === false && response?.isLimitReached === true) {
      showMessage({
        message: response?.message,
        type: 'warning',
      });
      setTimeout(() => {
        openPlansModal()
      }, 700)
    } else {
      showMessage({
        message: response?.message,
        type: 'danger',
      });
    }
  };

  return (
    <React.Fragment>
      <SecondHeader
        navigation={navigation}
        title="ADD ITEMS"
        subTitle="OF YOUR DAILY ROUTINE HERE"
        backButtonGradient={GradientColors.BLUE}
        backButtonColor={'#3fc8b0'}
      />
      <ScrollView
        keyboardShouldPersistTaps='handled'
        nestedScrollEnabled
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
            style={styles.AddItemContainer}
            onPress={() => {
              onPressImagePicker();
            }}>
            <View
              style={[
                styles.AddItemContainerView,
                {
                  paddingVertical: selectedImage == null ? 28 : 10,
                  paddingHorizontal: selectedImage == null ? 0 : 10,
                  backgroundColor:
                    ThemeMode === 'dark'
                      ? ThemeColors.DARK_THEME_COLOR
                      : ThemeColors?.WHITE,
                },
              ]}>
              {selectedImage == null ? (
                <>
                  <Image
                    style={{ width: 100, height: 100 }}
                    source={require('../../assets/images/take-a-photo.png')}
                    resizeMode="contain"
                  />
                  <View
                    style={[
                      styles.TextView,
                      {
                        backgroundColor:
                          ThemeMode === 'dark'
                            ? ThemeColors.DARK_THEME_COLOR
                            : ThemeColors?.WHITE,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.MainTitleText,
                        {
                          color:
                            ThemeMode === 'dark'
                              ? ThemeColors.WHITE
                              : ThemeColors?.BLACK,
                        },
                      ]}>
                      TAKE A PHOTO
                    </Text>
                    <Text
                      style={[
                        styles.SubTitleText,
                        {
                          color:
                            ThemeMode === 'dark'
                              ? ThemeColors.WHITE
                              : ThemeColors?.BLACK,
                        },
                      ]}>
                      OR BROWSE THE GALLERY
                    </Text>
                  </View>
                </>
              ) : (
                <Image
                  style={{ width: width - 60, height: 240, borderRadius: 20 }}
                  source={selectedImage}
                  resizeMode="cover"
                />
              )}
              {selectedImage != null && (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedImage(null);
                  }}
                  style={styles.CrossIconView}>
                  <EntypoIcon
                    name="circle-with-cross"
                    style={{ color: ThemeColors.BLACK }}
                    size={25}
                  />
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
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
              onFocus={() => {
                setIsFocusedName(true)
                setIsFocusedPlace(false)
              }}
              onBlur={() => { setTimeout(() => { setIsFocusedName(false) }, 1000) }}
              onChangeText={value => setItemName(value)}
              placeholderTextColor={
                ThemeMode === 'dark' ? ThemeColors?.WHITE : ThemeColors.GRAY
              }
              style={[
                styles.ItemViewTextBox,
                {
                  backgroundColor:
                    ThemeMode === 'dark'
                      ? ThemeColors.DARK_THEME_COLOR
                      : ThemeColors?.WHITE,
                  color:
                    ThemeMode === 'dark'
                      ? ThemeColors.WHITE
                      : ThemeColors?.BLACK,
                },
              ]}
              placeholder="ENTER ITEM"
            />
          </TouchableOpacity>
          {isFocusedName && reminders.map(x => x.name).filter(item => item.toLowerCase().startsWith(itemName.toLowerCase())).length > 0 && (
            <FlatList
              keyboardShouldPersistTaps='handled'
              nestedScrollEnabled
              data={reminders.map(x => x.name).filter(item => item.toLowerCase().startsWith(itemName.toLowerCase()))}
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
              value={place}
              onFocus={() => {
                setIsFocusedName(false)
                setIsFocusedPlace(true)
              }}
              onBlur={() => { setTimeout(() => { setIsFocusedPlace(false) }, 1000) }}
              onChangeText={value => setPlace(value)}
              placeholderTextColor={
                ThemeMode === 'dark' ? ThemeColors?.WHITE : ThemeColors.GRAY
              }
              style={[
                styles.ItemViewTextBox,
                {
                  backgroundColor:
                    ThemeMode === 'dark'
                      ? ThemeColors.DARK_THEME_COLOR
                      : ThemeColors?.WHITE,
                  color:
                    ThemeMode === 'dark'
                      ? ThemeColors.WHITE
                      : ThemeColors?.BLACK,
                },
              ]}
              placeholder="ENTER PLACE"
            />
          </TouchableOpacity>
          {isFocusedPlace && reminders.map(x => x.place).filter(item => item.toLowerCase().startsWith(place.toLowerCase())).length > 0 && (
            <FlatList
              keyboardShouldPersistTaps='handled'
              nestedScrollEnabled
              data={reminders.map(x => x.place).filter(item => item.toLowerCase().startsWith(place.toLowerCase()))}
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
              navigation.navigate('SetTimerForAddItem', { value: reminderTime });
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

export default CreateAddItemScreen;

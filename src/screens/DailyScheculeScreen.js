import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import styles from '../styles/DailyScheduleStyle';
import SecondHeader from '../components/SecondHeader';
import { GradientColors, ThemeColors } from '../utils/Theme';
import GradientButton from '../components/GradientButton';
import Calender from '../components/Calender';
import { getFormatedTime } from '../utils/Helper';
import { showMessage } from 'react-native-flash-message';
import ReminderService from '../services/ReminderServices/ReminderService';
import { useDispatch, useSelector } from 'react-redux';
import * as reminderAction from '../actions/Reminder/ReminderAction';
import { useModal } from '../modals/ModalProvider';

const DailyScheculeScreen = ({ navigation, route }) => {

  const { openPlansModal } = useModal();
  const dispatch = useDispatch();

  const { time, endtime, type } = route?.params;
  const ThemeMode = useSelector(state => state.CommonReducer.themeMode);
  const currentMonthData = useSelector(state => state.ReminderReducer.currentMonthDailySchedules);
  const dailySchedules = useSelector(state => state.ReminderReducer.dailySchedules);
  const user = useSelector(state => state.CommonReducer.user);
  console.log(dailySchedules);


  const [itemName, setItemName] = useState('');
  const [isFocusedName, setIsFocusedName] = useState(false);

  const [place, setPlace] = useState('');
  const [isFocusedPlace, setIsFocusedPlace] = useState(false);

  const [reminderDate, setReminderDate] = useState(null);
  const [reminderTime, setReminderTime] = useState(time);
  const [endReminderTime, setEndReminderTime] = useState(endtime);

  useEffect(() => {
    if (type == 'starttime') {
      setReminderTime(time);
    }
  }, [time]);

  useEffect(() => {
    if (type == 'endtime') {
      setEndReminderTime(endtime);
    }
  }, [endtime]);

  const handleOnPressContinue = async () => {
    if (!reminderDate) {
      showMessage({
        message: 'Please Select Date For Reminder',
        type: 'danger',
      });
      return;
    } else if (!itemName) {
      showMessage({
        message: 'Please Enter Event or Appointments',
        type: 'danger',
      });
      return;
    } else if (!place) {
      showMessage({
        message: 'Please Enter Place',
        type: 'danger',
      });
      return;
    } else if (!reminderTime) {
      showMessage({
        message: 'Please Select Start time',
        type: 'danger',
      });
      return;
    } else if (!endReminderTime) {
      showMessage({
        message: 'Please Select End time',
        type: 'danger',
      });
      return;
    } else if (endReminderTime < reminderTime) {
      showMessage({
        message: 'End time must be greater than start time.',
        type: 'danger',
      });
      return;
    }

    var date = new Date(reminderDate);
    var time = new Date(reminderTime);

    var time2 = new Date(endReminderTime);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = time.getHours().toString().padStart(2, '0');
    const minuts = time.getMinutes().toString().padStart(2, '0');

    const hours2 = time2.getHours().toString().padStart(2, '0');
    const minuts2 = time2.getMinutes().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}T${hours}:${minuts}:00`;

    const formattedDate2 = `${year}-${month}-${day}T${hours2}:${minuts2}:00`;

    var itemDate = new Date(formattedDate).getTime();
    var currentDate = new Date().getTime();

    var endtime1 = new Date(formattedDate2).getTime();

    // if (itemDate < currentDate) {
    //   showMessage({
    //     message: 'Reminder Time Must Be Greater Than Now!',
    //     type: 'warning',
    //   });
    //   return;
    // }

    // Check freemium limit: 2 schedules for non-subscribed users
    if (user?.isSubscribed != true && dailySchedules && dailySchedules.length >= 2) {
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
      time: itemDate,
      endtime: endtime1,
    };

    var response = await ReminderService.AddDailySchedule(payload);
    if (response.success) {
      setItemName('');
      setPlace('');
      setReminderDate(null);
      setReminderTime(null);
      setEndReminderTime(null);
      showMessage({
        message: response?.message,
        type: 'success',
      });
      dispatch(reminderAction.fetchAllReminders());
      dispatch(reminderAction.fetchAllUnplannedStopsReminders());
      dispatch(reminderAction.fetchAllCurrentMonthDailySchedule());
      dispatch(reminderAction.fetchAllDailySchedule());
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

  return (
    <React.Fragment>
      <SecondHeader
        navigation={navigation}
        title="DAILY SCHEDULE"
        subTitle="OF YOUR DAILY ROUTINE HERE"
        backButtonGradient={GradientColors.ORANGE}
        backButtonColor={'#af9d39'}
      />
      <ScrollView
        keyboardShouldPersistTaps='handled'
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
          <Calender
            currentMonthData={currentMonthData}
            value={reminderDate}
            onChange={value => {
              setReminderDate(value);
            }}
            onPressViewEvent={data => { }}
          />
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
              placeholder="ENTER EVENT OR APPOINTMENTS"
            />
          </TouchableOpacity>
          {isFocusedName && dailySchedules.map(x => x.name).filter(item => item.toLowerCase().startsWith(itemName.toLowerCase())).length > 0 && (
            <FlatList
              keyboardShouldPersistTaps='handled'
              nestedScrollEnabled
              data={dailySchedules.map(x => x.name).filter(item => item.toLowerCase().startsWith(itemName.toLowerCase()))}
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
              onChangeText={value => setPlace(value)}
              onFocus={() => {
                setIsFocusedName(false)
                setIsFocusedPlace(true)
              }}
              onBlur={() => { setTimeout(() => { setIsFocusedPlace(false) }, 1000) }}
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
          {isFocusedPlace && dailySchedules.map(x => x.place).filter(item => item.toLowerCase().startsWith(place.toLowerCase())).length > 0 && (
            <FlatList
              keyboardShouldPersistTaps='handled'
              nestedScrollEnabled
              data={dailySchedules.map(x => x.place).filter(item => item.toLowerCase().startsWith(place.toLowerCase()))}
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
              navigation.navigate('SetTimerForSchedule', {
                value: reminderTime,
                type: 'starttime',
              });
            }}>
            <View
              style={[
                styles.ListTextView,
                {
                  backgroundColor:
                    ThemeMode === 'dark'
                      ? ThemeColors.DARK_THEME_COLOR
                      : ThemeColors?.WHITE,
                },
              ]}>
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
                START TIME
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
              navigation.navigate('SetTimerForSchedule', {
                value: endReminderTime,
                type: 'endtime',
              });
            }}>
            <View
              style={[
                styles.ListTextView,
                {
                  backgroundColor:
                    ThemeMode === 'dark'
                      ? ThemeColors.DARK_THEME_COLOR
                      : ThemeColors?.WHITE,
                },
              ]}>
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
                END TIME
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
              {endReminderTime && getFormatedTime(endReminderTime)}
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

export default DailyScheculeScreen;

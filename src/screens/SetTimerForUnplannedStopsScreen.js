import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  TextInput,
  Vibration,
  useColorScheme,
} from 'react-native';
import styles from '../styles/SetTimerStyle';
import SecondHeader from '../components/SecondHeader';
import {GradientColors, ThemeColors} from '../utils/Theme';
import GradientButton from '../components/GradientButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import DigitalTimeClock from '../components/DigitalTimeClock';
import {showMessage} from 'react-native-flash-message';
import {useSelector} from 'react-redux';

const SetTimerForUnplannedStopsScreen = ({navigation, route}) => {
  const ThemeMode = useSelector(state => state.CommonReducer.themeMode);
  const {value = null} = route.params;

  const [time, setTime] = useState(value);
  const [date, SetDate] = useState(value);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleOnPressContinue = () => {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}T${time?.hours}:${time?.minuts}:00`;

    var itemDate = new Date(formattedDate).getTime();
    var currentDate = new Date().getTime();

    //if (itemDate > currentDate) {
    navigation.navigate('CreateUnplannedStops', {time: formattedDate});
    // } else {
    //   showMessage({
    //     message: 'Reminder Time Must Be Greater Than Now!',
    //     type: 'warning',
    //   });
    // }
  };

  return (
    <React.Fragment>
      <SecondHeader
        navigation={navigation}
        title="SET TIMER"
        subTitle="OF YOUR DAILY ROUTINE HERE"
        backButtonGradient={GradientColors.RED}
        backButtonColor={'#d05f4a'}
      />
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
              styles.SetTimerContainer,
              {
                backgroundColor:
                  ThemeMode === 'dark'
                    ? ThemeColors.DARK_THEME_COLOR
                    : ThemeColors?.WHITE,
                borderColor: ThemeColors?.WHITE,
                borderWidth: ThemeMode === 'dark' ? 1 : 0,
              },
            ]}>
            <DigitalTimeClock
              controlButtonColor={'#812f20'}
              value={time}
              onChange={value => {
                setTime(value);
              }}
            />
          </View>
          {showDatePicker && (
            <DateTimePicker
              mode={'date'}
              display={Platform.OS == 'ios' ? 'spinner' : 'default'}
              value={new Date(date) || new Date()}
              minimumDate={new Date()}
              themeVariant="light"
              textColor="#000"
              onChange={(event, value) => {
                if (Platform.OS !== 'ios') {
                  setShowDatePicker(false);
                }
                SetDate(value);
              }}
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
                borderColor:
                  ThemeMode === 'dark'
                    ? ThemeColors?.WHITE
                    : ThemeColors?.BLACK,
                borderWidth: ThemeMode === 'dark' ? 1 : 0,
              },
            ]}
            onPress={() => {
              setShowDatePicker(!showDatePicker);
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
                {date ? new Date(date).toLocaleDateString() : 'ENTER DATE'}
              </Text>
            </View>
          </TouchableOpacity>
          {date && (
            <View style={styles.ButtonView}>
              <GradientButton
                title={`Continue`}
                onPress={handleOnPressContinue}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default SetTimerForUnplannedStopsScreen;

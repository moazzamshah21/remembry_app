import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
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

const SetTimerForScheduleScreen = ({navigation, route}) => {
  const ThemeMode = useSelector(state => state.CommonReducer.themeMode);
  const {value = null, type} = route.params;

  const [time, setTime] = useState(value);
  const [date, SetDate] = useState(null);

  const handleOnPressContinue = () => {
    const dateObject = new Date();
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}T${time?.hours}:${time?.minuts}:00`;
    if (type == 'starttime') {
      navigation.navigate('DailySchecule', {time: formattedDate, type: type});
    } else if (type == 'endtime') {
      navigation.navigate('DailySchecule', {
        endtime: formattedDate,
        type: type,
      });
    }
  };

  return (
    <React.Fragment>
      <SecondHeader
        navigation={navigation}
        title="SET TIMER"
        subTitle="OF YOUR DAILY ROUTINE HERE"
        backButtonGradient={GradientColors.ORANGE}
        backButtonColor={'#af9d39'}
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
              controlButtonColor={'#3D1C03'}
              value={time}
              onChange={value => {
                setTime(value);
              }}
            />
          </View>
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

export default SetTimerForScheduleScreen;

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
  Platform,
} from 'react-native';
import styles from '../styles/SetTimerStyle';
import SecondHeader from '../components/SecondHeader';
import {GradientColors, ThemeColors} from '../utils/Theme';
import GradientButton from '../components/GradientButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import DigitalTimeClock from '../components/DigitalTimeClock';
import {showMessage} from 'react-native-flash-message';
import {useSelector} from 'react-redux';

const SetTimerForRemembranceItemScreen = ({navigation, route}) => {
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
    navigation.navigate('CreateRemembranceItem', {time: formattedDate});
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
        title="OFFLINE NOTEBOOK"
        subTitle="OF YOUR DAILY ROUTINE HERE"
        backButtonGradient={GradientColors.GREEN}
        backButtonColor={'#A19495'}
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
              controlButtonColor={'#A19495'}
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
                borderColor: ThemeColors?.WHITE,
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

export default SetTimerForRemembranceItemScreen;

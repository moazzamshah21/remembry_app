import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { ThemeColors, ThemeFonts } from '../utils/Theme';
import { ArrowDownIcon, ArrowUpIcon } from '../../assets/svg/SvgIcons';
const { width, height } = Dimensions.get('window');

const DigitalTimeClock = ({ ...props }) => {

  const { onChange, value = null, controlButtonColor = "#000" } = props;


  var currentDate = value == null ? new Date() : new Date(value);
  const [hours, setHours] = useState(currentDate.getHours() >= 12 ? (currentDate.getHours() - 12) : currentDate.getHours());
  const [minuts, setMinuts] = useState(currentDate.getMinutes());
  const [prepand, setPrepand] = useState(currentDate.getHours() >= 12 ? "PM" : "AM");
  const [interval, setinterval] = useState(null);

  useEffect(() => {
    if (onChange) {
      onChange({
        hours: prepand == "PM" ? (hours + 12).toString().padStart(2, '0') : hours.toString().padStart(2, '0'),
        minuts: minuts.toString().padStart(2, '0')
      })
    }
  }, [hours, minuts, prepand])

  const handleOnPressUpHours = () => {
    Vibration.vibrate(300);
    if (hours < 12) {
      setHours(value => value < 12 ? ++value : value);
    } else {
      setHours(1);
    }
  };

  const handleOnPressDownHours = () => {
    Vibration.vibrate(300);
    if (hours > 1) {
      setHours(value => value > 1 ? --value : value);
    } else {
      setHours(12);
    }
  };

  const handleOnPressUpMinuts = () => {
    Vibration.vibrate(300);
    if (minuts < 59) {
      setMinuts(value => value < 59 ? ++value : value);
    } else {
      setMinuts(0);
    }
  };

  const handleOnPressDownMinuts = () => {
    Vibration.vibrate(300);
    if (minuts > 0) {
      setMinuts(value => value > 0 ? --value : value);
    } else {
      setMinuts(59);
    }
  };

  const handleOnPressUpPrepand = () => {
    Vibration.vibrate(300);
    if (prepand == "AM") {
      setPrepand('PM');
    }
  };

  const handleOnPressDownPrepand = () => {
    Vibration.vibrate(300);
    if (prepand == "PM") {
      setPrepand('AM');
    }
  };

  return (
    <View>
      <View style={styles.TimeControllerView}>
        <View style={styles.TimeControlItemView1}>
          <TouchableOpacity
            style={[styles.TimeControlItem, { backgroundColor: controlButtonColor }]}
            onPress={handleOnPressUpHours}
            onPressOut={() => {
              clearInterval(interval);
            }}
            onPressIn={() => {
              setinterval(setInterval(handleOnPressUpHours, 200));
            }}>
            <ArrowUpIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.TimeControlItemView2}>
          <TouchableOpacity
            style={[styles.TimeControlItem, { backgroundColor: controlButtonColor }]}
            onPress={handleOnPressUpMinuts}
            onPressOut={() => {
              clearInterval(interval);
            }}
            onPressIn={() => {
              setinterval(setInterval(handleOnPressUpMinuts, 200));
            }}>
            <ArrowUpIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.TimeControlItemView3}>
          <TouchableOpacity
            style={[styles.TimeControlItem, { backgroundColor: controlButtonColor }]}
            onPress={handleOnPressUpPrepand}>
            <ArrowUpIcon />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.SetTimerGrayBox}>
        <View style={styles.SetTimerBlackBox}>
          <Text style={styles.AnalogTimeText}>
            {hours < 10 && '0'}{hours}:
            {minuts < 10 && '0'}{minuts}
            {` ${prepand}`}
          </Text>
        </View>
      </View>
      <View style={styles.TimeControllerView}>
        <View style={styles.TimeControlItemView1}>
          <TouchableOpacity
            style={[styles.TimeControlItem, { backgroundColor: controlButtonColor }]}
            onPress={handleOnPressDownHours}
            onPressOut={() => {
              clearInterval(interval);
            }}
            onPressIn={() => {
              setinterval(setInterval(handleOnPressDownHours, 200));
            }}>
            <ArrowDownIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.TimeControlItemView2}>
          <TouchableOpacity
            style={[styles.TimeControlItem, { backgroundColor: controlButtonColor }]}
            onPress={handleOnPressDownMinuts}
            onPressOut={() => {
              clearInterval(interval);
            }}
            onPressIn={() => {
              setinterval(setInterval(handleOnPressDownMinuts, 200));
            }}>
            <ArrowDownIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.TimeControlItemView3}>
          <TouchableOpacity
            style={[styles.TimeControlItem, { backgroundColor: controlButtonColor }]}
            onPress={handleOnPressDownPrepand}>
            <ArrowDownIcon />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DigitalTimeClock;

const styles = StyleSheet.create({
  TimeControllerView: {
    width: 230,
    height: 30,
    flexDirection: 'row',
  },
  TimeControlItemView1: {
    width: 230 / 3,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  TimeControlItemView2: {
    width: 230 / 3,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TimeControlItemView3: {
    width: 230 / 3,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
  },
  TimeControlItem: {
    backgroundColor: '#00628C',
    width: 48,
    height: 28,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ItemViewContainer: {
    height: 60,
    width: width - 40,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 7,
    elevation: 10,
    backgroundColor: ThemeColors.WHITE,
  },
  ListTextView: {
    flexGrow: 1,
    paddingHorizontal: 25,
  },
  ListTitleText: {
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.MEDIUM,
    fontSize: 15,
    paddingRight: 25,
  },
  ButtonView: {
    width: width - 40,
    borderRadius: 20,
    marginVertical: 7,
  },
  SetTimerGrayBox: {
    width: 230,
    height: 80,
    backgroundColor: '#a7a6a5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SetTimerBlackBox: {
    width: 220,
    height: 70,
    backgroundColor: '#000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  AnalogTimeText: {
    color: '#ff1111',
    textAlign: 'center',
    fontSize: 34,
    fontFamily: ThemeFonts.IONC_MEDIUM,
  },
});

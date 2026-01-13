import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  useColorScheme,
  TextInput,
  BackHandler,
} from 'react-native';
import {CommonActions, NavigationContainer} from '@react-navigation/native';
import styles from '../styles/TimerStyles';
import SecondHeader from '../components/SecondHeader';
import {GradientColors, ThemeColors} from '../utils/Theme';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

const TimerScreen = ({navigation, route}) => {
  const ThemeMode = useSelector(state => state.CommonReducer.themeMode);
  const [timer, setTimer] = useState('23:30:00');
  const onPressCont = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'SignIn'}],
      }),
    );
  };
  return (
    <React.Fragment>
      <ScrollView
        style={{
          backgroundColor:
            ThemeMode === 'dark'
              ? ThemeColors.DARK_THEME_COLOR
              : ThemeColors?.WHITE,
        }}
        contentContainerStyle={styles.ScrollViewContentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <View style={styles.MainContainer}>
          <Text style={styles.requestText}>
            Your request{'\n'}is being processed
          </Text>
          <Text style={styles.requestText2}>{timer}</Text>
        </View>
        <View style={{marginBottom: 20}}>
          <Text
            onPress={() => {
              BackHandler.exitApp();
            }}
            style={styles.requestText45}>
            Close the app
          </Text>
          <LinearGradient
            colors={GradientColors.GREEN}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={[
              styles.LinearGradientContainer,
              // {opacity: timer == '00:00:00' ? 1 : 0.5},
            ]}>
            <TouchableOpacity onPress={onPressCont}>
              <Text style={styles.requestText4533}>CONTINUE</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default TimerScreen;

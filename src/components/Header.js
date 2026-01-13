import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  useColorScheme,
} from 'react-native';
import React from 'react';
import {ThemeColors, ThemeFonts} from '../utils/Theme';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useSelector} from 'react-redux';
import useNetworkStatus from '../hooks/useNetworkStatus';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
const {width, height} = Dimensions.get('window');

const Header = ({navigation}) => {
  const ThemeMode = useSelector(state => state.CommonReducer.themeMode);
  const isConnected = useNetworkStatus();

  const handleOnPressMenu = () => {
    navigation.toggleDrawer();
  };

  return (
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
          styles.LogoContainer,
          {
            backgroundColor:
              ThemeMode === 'dark'
                ? ThemeColors.DARK_THEME_COLOR
                : ThemeColors?.WHITE,
          },
        ]}>
        <TouchableOpacity
          style={{width: 50, height: 50}}
          disabled={!isConnected}
          onPress={() => {
            //openPlansModal();
            navigation.navigate('FeedsScreen');
          }}>
          <Image
            source={require('../../assets/images/icon.png')}
            style={{width: 50, height: 50}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity onPress={handleOnPressMenu}>
          <SimpleLineIcons
            name="menu"
            style={{
              color:
                ThemeMode === 'dark' ? ThemeColors?.WHITE : ThemeColors.BLACK,
            }}
            size={30}
          />
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity onPress={() => {
        navigation.navigate('FeedsScreen');
      }} style={styles.SocialLinkUI}>
        <Text style={[styles.SocialLinkUIText, {
          color:
            ThemeMode === 'dark'
              ? ThemeColors.DARK_THEME_COLOR
              : ThemeColors?.WHITE,
        }]}>Social Feeds</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  MainContainer: {
    height: 100,
    backgroundColor: ThemeColors?.WHITE,
    flexDirection: 'row',
    paddingHorizontal: 20,
    position: 'relative',
  },
  LogoContainer: {
    height: 100,
    backgroundColor: ThemeColors?.WHITE,
    flexGrow: 1,
    justifyContent: 'center',
  },
  ProfileText: {
    fontSize: 15,
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.MEDIUM,
  },
  SocialLinkUI: {
    height: 40,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ThemeColors.PRIMARY_COLOR,
    position: 'absolute',
    left: (width - 150) / 2,
    top: 0,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    elevation: 10,
  },
  SocialLinkUIText: {
    fontSize: 15,
    fontFamily: ThemeFonts.MEDIUM,
  },
});

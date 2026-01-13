import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import {ThemeColors, ThemeFonts} from '../utils/Theme';
const {width, height} = Dimensions.get('window');
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  ScrollViewContentContainerStyle: {
    flex: 1,
  },
  MainContainer: {
    flex: 1,
    paddingTop: 20,
  },
  HomeItemContainer: {
    height: 100,
    width: wp(90),
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 7.5,
    shadowOffset: {width: 0, height: 0},
    shadowColor: ThemeColors.GRAY,
    shadowOpacity: 1,
    elevation: 10,
    shadowRadius: 5,
    backgroundColor: ThemeColors.WHITE,
  },
  LinearGradientContainer: {
    height: 100,
    width: width - 40,
    borderRadius: 20,
    flexDirection: 'row',
  },
  TextView: {
    height: 100,
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: wp(71),
  },
  MainTitleText: {
    color: ThemeColors.WHITE,
    fontFamily: ThemeFonts.SEMI_BOLD,
    fontSize: 16,
  },
  SubTitleText: {
    color: ThemeColors.WHITE,
    fontFamily: ThemeFonts.MEDIUM,
    fontSize: 10,
    opacity: 0.6,
  },
  IconView: {
    height: 100,
    width: wp(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  IconRing: {
    width: 53,
    height: 53,
    borderRadius: 53 / 2,
    borderWidth: 1,
    borderColor: ThemeColors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  IconCircleLinearGradient: {
    width: 53,
    height: 53,
    margin: 0,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  IconCircle: {
    width: 42,
    height: 42,
    borderRadius: 42 / 2,
    backgroundColor: '#59a03d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  LinkText: {
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.MEDIUM,
    fontSize: 18,
    paddingHorizontal: 20,
  },
});

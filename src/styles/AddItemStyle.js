import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import {ThemeColors, ThemeFonts} from '../utils/Theme';
const {width, height} = Dimensions.get('window');
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

export default StyleSheet.create({
  ScrollViewContentContainerStyle: {
    minHeight: height - statusBarHeight - 40,
  },
  MainContainer: {
    flex: 1,
    backgroundColor: ThemeColors.WHITE,
    alignItems: 'center',
    paddingTop: 30,
  },
  AddItemContainer: {
    width: width - 40,
    shadowOffset: {width: 0, height: 0},
    shadowColor: ThemeColors.GRAY,
    shadowOpacity: 1,
    elevation: 10,
    shadowRadius: 5,
    backgroundColor: ThemeColors.WHITE,
    borderRadius: 20,
    marginBottom: 7,
  },
  LinearGradientContainer: {
    height: 200,
    width: width - 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextView: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  MainTitleText: {
    color: ThemeColors.WHITE,
    fontFamily: ThemeFonts.SEMI_BOLD,
    fontSize: 20,
  },
  SubTitleText: {
    color: ThemeColors.WHITE,
    fontFamily: ThemeFonts.MEDIUM,
    fontSize: 10,
    opacity: 0.6,
  },
  IconCircle: {
    width: 58,
    height: 58,
    borderRadius: 58 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: ThemeColors.WHITE,
  },
  ListViewContainer: {
    height: 60,
    width: width - 40,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 7,
    shadowOffset: {width: 0, height: 0},
    shadowColor: ThemeColors.GRAY,
    shadowOpacity: 1,
    elevation: 10,
    shadowRadius: 5,
    backgroundColor: ThemeColors.WHITE,
  },
  ListTextView: {
    flexGrow: 1,
    height: 60,
    paddingHorizontal: 25,
    justifyContent: 'center',
  },
  ListTitleText: {
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.MEDIUM,
    fontSize: 13,
  },
  RadioButtonView: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonView: {
    width: width - 40,
    borderRadius: 20,
    marginVertical: 7,
  },
});

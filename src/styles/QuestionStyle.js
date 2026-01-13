import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import {ThemeColors, ThemeFonts} from '../utils/Theme';
const {width, height} = Dimensions.get('window');
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

export default StyleSheet.create({
  ScrollViewContentContainerStyle: {
    //flex: 1
  },
  MainContainer: {
   // flex: 1,
    backgroundColor: ThemeColors.WHITE,
    paddingTop: 30,
    paddingHorizontal: 15,
  },
  PageTitle: {
    width: width,
    fontFamily: ThemeFonts.SEMI_BOLD,
    fontSize: 15,
    color: ThemeColors.BLACK,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  PageSubTitle: {
    width: width,
    fontFamily: ThemeFonts.MEDIUM,
    fontSize: 10,
    color: ThemeColors.BLACK,
    lineHeight: 26,
    paddingHorizontal: 15,
  },
  PageSubTitle2: {
    width: width,
    fontFamily: ThemeFonts.SEMI_BOLD,
    fontSize: 15,
    color: ThemeColors.BLACK,
    paddingHorizontal: 15,
  },
  PageTitleSub: {
    width: width,
    fontFamily: ThemeFonts.SEMI_BOLD,
    fontSize: 12,
    color: ThemeColors.BLACK,
    paddingHorizontal: 15,
  },
  QuestionAMinText: {
    fontFamily: ThemeFonts.SEMI_BOLD,
    fontSize: 15,
    color: ThemeColors.BLACK,
  },
  QuestionMainContainer: {
    borderRadius: 30,
    backgroundColor: ThemeColors?.WHITE,
    shadowOffset: {width: 0, height: 0},
    shadowColor: ThemeColors.GRAY,
    shadowOpacity: 1,
    elevation: 10,
    shadowRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  NewBoxTextInput: {
    fontFamily: ThemeFonts.SEMI_BOLD,
    fontSize: 15,
    color: ThemeColors.BLACK,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    //marginBottom: 10,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#5da441',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#5da441',
  },
  radioButtonLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
});

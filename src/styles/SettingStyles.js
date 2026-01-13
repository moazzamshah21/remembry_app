import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import {ThemeColors, ThemeFonts} from '../utils/Theme';
const {width, height} = Dimensions.get('window');
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

export default StyleSheet.create({
  ScrollViewContentContainerStyle: {
    flex: 1,
  },
  MainContainer: {
    flex: 1,
    backgroundColor: ThemeColors.WHITE,
    paddingTop: 30,
  },
  AppLogoImage: {
    width: 35,
    height: 35,
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 10,
  },
  ContentContainer: {
    backgroundColor: ThemeColors.WHITE,
    flexGrow: 1,
    paddingHorizontal: 20,
    marginTop: 15,
  },
  nameText: {
    fontSize: 16,
    color: ThemeColors.DARK_GRAY,
    fontFamily: ThemeFonts.MEDIUM,
  },
  NameSubText: {
    fontSize: 20,
    color: '#285408',
    fontFamily: ThemeFonts.MEDIUM,
    marginTop: -1,
  },
  saveAndContinueBtnView: {
    backgroundColor: '#D9D9D9',
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: '#5A5957',
    borderWidth: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: width - 50,
  },
  saveAndContinueBtnText: {
    fontSize: 20,
    color: '#FFF',
    fontFamily: ThemeFonts.MEDIUM,
  },
  saveAndContinueBtnMainView: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: ThemeColors?.WHITE,
    marginBottom: 30,
  },
});

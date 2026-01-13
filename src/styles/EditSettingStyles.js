import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import { ThemeColors, ThemeFonts } from '../utils/Theme';
const { width, height } = Dimensions.get('window');
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

export default StyleSheet.create({
  ScrollViewContentContainerStyle: {
    flex: 1
  },
  MainContainer: {
    flex: 1,
    backgroundColor: ThemeColors.WHITE,
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
    marginTop: 15, //Remove it When header Comes
  },
  saveAndContinueBtnView: {
    backgroundColor: '#D9D9D9',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: '#5A5957',
    borderWidth: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  saveAndContinueBtnText: {
    fontSize: 20,
    color: ThemeColors?.WHITE,
    fontFamily: ThemeFonts.MEDIUM,
  },
  nameText: {
    fontSize: 10,
    color: ThemeColors.DARK_GRAY,
    fontFamily: ThemeFonts.MEDIUM,
    marginBottom: -10
  },
  TextInputStyle: {
    borderWidth: 1,
    borderColor: '#707070',
    borderRadius: 10,
    fontSize: 16,
    fontFamily: ThemeFonts?.MEDIUM,
    color: '#707070',
    paddingHorizontal: 20,
    marginVertical: 10,
    height: 55,
  },
  saveAndContinueBtnMainView: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: ThemeColors?.WHITE,
  },
  AbsoluteView: {
    position: 'absolute',
    top: 10,
    right: 12,
  },
});

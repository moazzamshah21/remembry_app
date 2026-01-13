import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import { ThemeColors, ThemeFonts } from '../utils/Theme';
const { width, height } = Dimensions.get('window');
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

export default StyleSheet.create({
  ScrollViewContentContainerStyle: {
    minHeight: height - statusBarHeight - 100,
  },
  MainContainer: {
    flex: 1,
    backgroundColor: ThemeColors.WHITE,
    alignItems: 'center',
    paddingTop: 30,
    width: width,
    backgroundColor: ThemeColors.WHITE
  },
  PageTitle: {
    width: width,
    fontFamily: ThemeFonts.SEMI_BOLD,
    fontSize: 15,
    color: ThemeColors.BLACK,
    paddingVertical: 20,
    paddingHorizontal: 15
  },
  PageSubTitle: {
    width: width,
    fontFamily: ThemeFonts.MEDIUM,
    fontSize: 10,
    color: ThemeColors.BLACK,
    lineHeight: 26,
    paddingHorizontal: 15
  },
  PageSubTitle2:{
    width: width,
    fontFamily: ThemeFonts.SEMI_BOLD,
    fontSize: 15,
    color: ThemeColors.BLACK,
    paddingHorizontal: 15
  }
});

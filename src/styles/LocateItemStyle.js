import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import {ThemeColors, ThemeFonts, GradientColors} from '../utils/Theme';
const {width, height} = Dimensions.get('window');
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

export default StyleSheet.create({
  ScrollViewContentContainerStyle: {
    minHeight: height  - 100,
  },
  MainContainer: {
    flex: 1,
    // backgroundColor: ThemeColors.WHITE,
    alignItems: 'center',
    paddingTop: 30,
  },
  TextView: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  TitleView: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  TitleText: {
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.SEMI_BOLD,
    fontSize: 25,
    paddingBottom: 8,
  },
  SearchView: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  SearchButtonView: {
    width: width - 40,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  ButtonViewStyle: {
    height: 55,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonStyles: {
    fontFamily: ThemeFonts.SEMI_BOLD,
    color: ThemeColors.WHITE,
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 35,
  },
  ListViewContainer: {
    height: 64,
    width: width - 40,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
    paddingHorizontal: 15,
    paddingTop: 18,
    paddingBottom: 23,
    shadowOffset: {width: 0, height: 0},
    shadowColor: ThemeColors.GRAY,
    shadowOpacity: 1,
    elevation: 10,
    shadowRadius: 5,
    backgroundColor: ThemeColors.WHITE,
  },

  ListTextView: {
    flexGrow: 1,
  },
  ListTitleText: {
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.MEDIUM,
    fontSize: 13,
  },

  RadioButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: ThemeColors.BLACK,
    paddingEnd: 5,
  },

  ButtonView: {
    width: width - 40,
    borderRadius: 20,
    marginVertical: 5,
  },
  ImageViewContainer: {
    width: width - 40,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 25,
    paddingHorizontal: 5,
    backgroundColor: ThemeColors.WHITE,
    elevation: 10,
  },
  ImageView: {
    width: width - 70,
    height: width - 70
  },
  ImageViewContainer: {
    width: width - 40,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: ThemeColors.WHITE,
    marginTop: 25,
  },
  ImageBoxView: {
    width: width - 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
    backgroundColor: ThemeColors.WHITE,
  },
  ImageTextView: {
    flexGrow: 1,
  },
  ImageTitleText: {
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.MEDIUM,
    fontSize: 16,
  },
  ImageSubTitleText: {
    color: '#3BA20F',
    fontFamily: ThemeFonts.MEDIUM,
    fontSize: 15,
  },
});

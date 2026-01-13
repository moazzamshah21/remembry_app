import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import {ThemeColors, ThemeFonts, GradientColors} from '../utils/Theme';
const {width, height} = Dimensions.get('window');
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

export default StyleSheet.create({
  ScrollViewContentContainerStyle: {
    minHeight: height - 100,
  },
  MainContainer: {
    flex: 1,
    // backgroundColor: ThemeColors.WHITE,
    alignItems: 'center',
    paddingTop: 20,
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
    elevation: 5,
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
  ImageView: {
    width: width - 70,
    height: width - 70,
    borderRadius: 15,
  },
  ImageViewContainer: {
    width: width - 40,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    padding: 15,
    elevation: 5,
  },
  ImageBoxView: {
    width: width - 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  ImageTextView: {
    flexGrow: 1,
    maxWidth: '80%'
  },
  LableText: {
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.LIGHT,
    fontSize: 12,
    marginBottom: -5,
  },
  ImageTitleText: {
    fontFamily: ThemeFonts.MEDIUM,
    fontSize: 16,
  },
  ImageTitleText2: {
    fontFamily: ThemeFonts.LIGHT,
    fontSize: 12,
    maxWidth: '80%',
  },
  TitleText2: {
    color: '#3BA20F',
    fontFamily: ThemeFonts.BOLD,
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  ImageSubTitleText: {
    color: '#3BA20F',
    fontFamily: ThemeFonts.MEDIUM,
    fontSize: 15,
  },
  DeleteBox: {
    height: 46,
    width: 46,
    borderRadius: 46 / 2,
    backgroundColor: '#3BA20F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: width - 75,
    height: 300,
    borderRadius: 20,
    overflow: 'hidden'
  },
  map: {
    width: width - 75,
    height: 300,
  },
});

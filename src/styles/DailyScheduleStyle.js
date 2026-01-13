import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import { ThemeColors, ThemeFonts } from '../utils/Theme';
const { width, height } = Dimensions.get('window');
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
  ItemViewContainer: {
    height: 60,
    width: width - 40,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 7,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: ThemeColors.GRAY,
    shadowOpacity: 1,
    elevation: 10,
    shadowRadius: 5,
    backgroundColor: ThemeColors.WHITE,
  },
  ItemViewTextBox: {
    borderRadius: 20,
    height: 60,
    flexGrow: 1,
    paddingHorizontal: 25,
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.MEDIUM,
    fontSize: 15,
    marginTop: 5,
  },
  ListTextView: {
    flexGrow: 1,
    paddingHorizontal: 25,
  },
  ListTitleText: {
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.MEDIUM,
    fontSize: 15,
    paddingRight: 25,
  },
  ButtonView: {
    width: width - 40,
    borderRadius: 20,
    marginVertical: 5,
  },
  suggestionsList: {
    maxHeight: 200,
    width: width - 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowColor: ThemeColors.GRAY,
    shadowOpacity: 1,
    elevation: 10,
    shadowRadius: 5,
  },
  suggestionItem: {
    padding: 10,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  suggestionText: {
    fontSize: 14,
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.LIGHT,
  },
});

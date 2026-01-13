import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import { ThemeColors, ThemeFonts, GradientColors } from '../utils/Theme';
const { width, height } = Dimensions.get('window');
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

export default StyleSheet.create({
  ScrollViewContentContainerStyle: {
    minHeight: height - 100,
  },
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
  },
  PlanContainer: {
    borderRadius: 15,
    borderWidth: 0,
    width: '90%',
    padding: 0,
    marginBottom: 20,
    backgroundColor: ThemeColors.WHITE,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: ThemeColors.GRAY,
    shadowOpacity: 1,
    elevation: 5,
    shadowRadius: 0,
  },
  PlanInnerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    overflow: 'hidden'
  },
  PlanTitleText: {
    textAlign: 'left',
    color: ThemeColors.PRIMARY_COLOR,
    fontFamily: ThemeFonts.SEMI_BOLD,
    fontSize: 20,
  },
  PlanPriceText: {
    textAlign: 'left',
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.SEMI_BOLD,
    fontSize: 26,
  },
  PlanDescriptionText: {
    width: width,
    fontFamily: ThemeFonts.MEDIUM,
    fontSize: 12,
    color: ThemeColors.BLACK,
  },
  ActivatedView: {
    backgroundColor: ThemeColors.PRIMARY_COLOR,
    width: 150,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: -40,
    top: 20,
    transform: [{ rotate: '45deg' }]
  },
  ActivatedText: {
    textAlign: 'left',
    color: ThemeColors.WHITE,
    fontFamily: ThemeFonts.SEMI_BOLD_ITALIC,
    fontSize: 14,
  }
});

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
    paddingTop: 0,
  },
  container: {
    flex: 1,
    padding: 0,
    width: width,
    backgroundColor: '#FFF',
  },
  noteContainer: {
    backgroundColor: '#fffacd',
    padding: 10,
    paddingTop: 5,
    width: width - 40,
    marginBottom: 20,
    borderRadius: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    alignSelf: 'center'
  },
  noteTitle: {
    fontSize: 16,
    fontFamily: ThemeFonts.BOLD,
    color: '#000',
    minHeight: 30,
    paddingTop: 10,
    paddingVertical: 0,
  },
  noteText: {
    fontSize: 14,
    color: '#333',
    minHeight: 80,
  },
  deleteButton: {
    position: 'absolute',
    alignSelf: 'flex-end',
    padding: 5,
    borderRadius: 5,
    zIndex: 9
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
    borderColor: '#6DA75B',
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  addButtonText: {
    color: '#6DA75B',
    fontFamily: ThemeFonts.REGULAR,
    fontSize: 16,
  },
});

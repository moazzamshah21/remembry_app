import React, { useState, useRef } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Modal,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
  ActionSheetIOS,
  TextInput,
} from 'react-native';
import { GradientColors, ThemeColors, ThemeFonts } from '../../utils/Theme';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { showMessage } from 'react-native-flash-message';
import ReminderService from '../../services/ReminderServices/ReminderService';
import * as reminderAction from '../../actions/Reminder/ReminderAction';
import GradientButton from '../GradientButton';
import GradientButtonBlue from '../GradientButtonBlue';
import LinearGradient from 'react-native-linear-gradient';
import { useModal } from '../../modals/ModalProvider';
const { width, height } = Dimensions.get('window');
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const SocialFeedModal = ({ isVisible, onRequestClose }) => {

  const { openPlansModal } = useModal();
  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] = useState(null);
  const [itemName, setItemName] = useState('');
  const [place, setPlace] = useState('');
  const ThemeMode = useSelector(state => state.CommonReducer.themeMode);
  const user = useSelector(state => state.CommonReducer.user);
  const feeds = useSelector(state => state.ReminderReducer.feeds);

  const onPressImagePicker = () => {
    if (Platform?.OS === 'android') {
      Alert.alert('Take a Photo', 'Please Select Any Option', [
        { text: 'Cancel', onPress: () => { } },
        {
          text: 'Pick Image From Gallery',
          onPress: () => {
            onPressPickAnImage();
          },
        },
        { text: 'Take An Image', onPress: () => onPressTakeAnImage() },
      ]);
    } else {
      showActionSheet();
    }
  };

  const handlePressIOS = index => {
    switch (index) {
      case 0:
        onPressTakeAnImage();
        break;
      case 1:
        onPressPickAnImage();
      default:
        break;
    }
  };

  const options = ['Take a photo', 'Pick from gallery', 'Cancel'];
  const showActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: options,
        cancelButtonIndex: 2,
        destructiveButtonIndex: -1,
        title: 'Select an option',
      },
      handlePressIOS,
    );
  };

  const onPressPickAnImage = async () => {

    const permission = Platform.select({
      ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
      android: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
    });
    const result = await check(permission);
    if (result === RESULTS.GRANTED) {

    } else if (result === RESULTS.DENIED || result === RESULTS.BLOCKED) {
      const requestResult = await request(permission);
      if (requestResult === RESULTS.GRANTED) {

      } else {
        showMessage({
          message: 'Gallery permission is needed to select photos.',
          type: 'warning',
        });
        return;
      }
    }


    launchImageLibrary(
      { mediaType: 'photo', includeBase64: true, quality: 0.5 },
      response => {
        if (!response.didCancel) {
          setSelectedImage({
            uri: response?.assets[0]?.uri,
            base64: response?.assets[0]?.base64,
          });
        }
      },
    );
  };

  const onPressTakeAnImage = async () => {

    const permission = Platform.select({
      ios: PERMISSIONS.IOS.CAMERA,
      android: PERMISSIONS.ANDROID.CAMERA,
    });

    const result = await check(permission);
    if (result === RESULTS.GRANTED) {

    }
    else if (result === RESULTS.DENIED || result === RESULTS.BLOCKED) {
      const requestResult = await request(permission);
      if (requestResult === RESULTS.GRANTED) {

      } else {
        showMessage({
          message: 'Camera permission is needed to take pictures.',
          type: 'warning',
        });
        return;
      }
    }

    launchCamera(
      { mediaType: 'photo', includeBase64: true, quality: 0.5 },
      response => {
        if (!response.didCancel) {
          setSelectedImage({
            uri: response?.assets[0]?.uri,
            base64: response?.assets[0]?.base64,
          });
        }
      },
    );
  };

  const handleOnPressContinue = async () => {
    if (!selectedImage) {
      showMessage({
        message: 'Please Select Image',
        type: 'danger',
      });
      return;
    } else if (!itemName) {
      showMessage({
        message: 'Please Enter Item',
        type: 'danger',
      });
      return;
    } else if (!place) {
      showMessage({
        message: 'Please Place',
        type: 'danger',
      });
      return;
    }

    // Check freemium limit: 1 social post for non-subscribed users
    // Only count posts created by the current user
    if (user?.isSubscribed != true && feeds && Array.isArray(feeds) && user) {
      // Filter posts created by current user - match by _id (primary) or email (fallback)
      const userPosts = feeds.filter(feed => {
        if (!feed?.userId || !user) return false;
        
        // Match by _id (most reliable - string comparison)
        if (feed.userId._id && user._id) {
          return String(feed.userId._id) === String(user._id);
        }
        // Match by email (fallback)
        if (feed.userId.email && user.email) {
          return String(feed.userId.email).toLowerCase() === String(user.email).toLowerCase();
        }
        // Match by id (another fallback)
        if (feed.userId.id && user.id) {
          return String(feed.userId.id) === String(user.id);
        }
        return false;
      });
      
      // Only block if user has already posted 1 or more posts
      if (userPosts.length >= 1) {
        showMessage({
          message: 'Upgrade now to Premium',
          type: 'warning',
        });
        setTimeout(() => {
          openPlansModal();
        }, 700);
        onRequestClose();
        return;
      }
    }

    var payload = {
      imageBase64: selectedImage?.base64,
      name: itemName,
      place: place,
    };
    var response = await ReminderService.AddSocialFeed(payload);
    if (response.success === true) {
      dispatch(reminderAction.fetchAllFeeds());
      setSelectedImage(null);
      setItemName('');
      setPlace('');
      onRequestClose();
      showMessage({
        message: response?.message,
        type: 'success',
      });
    }
    else if (response.success === false && response?.isLimitReached === true) {
      setSelectedImage(null);
      setItemName('');
      setPlace('');
      onRequestClose();
      showMessage({
        message: response?.message,
        type: 'warning',
      });
      setTimeout(() => {
        openPlansModal()
      }, 700)
    }
    else {
      showMessage({
        message: response?.message,
        type: 'danger',
      });
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        setSelectedImage(null);
        setItemName('');
        setPlace('');
        onRequestClose();
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={() => {
              setSelectedImage(null);
              setItemName('');
              setPlace('');
              onRequestClose();
            }}
            activeOpacity={0.8}
            style={styles.closeBtn}>
            <LinearGradient
              colors={GradientColors.BLUE} // Replace with your desired colors
              start={{ x: 0, y: 0 }} // Optional: Set the starting point of the gradient
              end={{ x: 0, y: 1 }} // Optional: Set the ending point of the gradient
              style={styles.closeBtnGradient}>
              <EntypoIcon
                name="circle-with-cross"
                style={{ color: ThemeColors.WHITE }}
                size={30}
              />
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.AddItemContainer}
            onPress={() => {
              onPressImagePicker();
            }}>
            <View
              style={[
                styles.AddItemContainerView,
                {
                  paddingVertical: selectedImage == null ? 28 : 0,
                  paddingHorizontal: selectedImage == null ? 0 : 10,
                  backgroundColor:
                    ThemeMode === 'dark'
                      ? ThemeColors.DARK_THEME_COLOR
                      : ThemeColors?.WHITE,
                },
              ]}>
              {selectedImage == null ? (
                <>
                  <Image
                    style={{ width: 100, height: 100 }}
                    source={require('../../../assets/images/take-a-photo-blue.png')}
                    resizeMode="contain"
                  />
                  <View
                    style={[
                      styles.TextView,
                      {
                        backgroundColor:
                          ThemeMode === 'dark'
                            ? ThemeColors.DARK_THEME_COLOR
                            : ThemeColors?.WHITE,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.MainTitleText,
                        {
                          color:
                            ThemeMode === 'dark'
                              ? ThemeColors.WHITE
                              : ThemeColors?.BLACK,
                        },
                      ]}>
                      UPLOAD A PHOTO
                    </Text>
                    <Text
                      style={[
                        styles.SubTitleText,
                        {
                          color:
                            ThemeMode === 'dark'
                              ? ThemeColors.WHITE
                              : ThemeColors?.BLACK,
                        },
                      ]}>
                      OR BROWSE THE GALLERY
                    </Text>
                  </View>
                </>
              ) : (
                <Image
                  style={{ width: width - 80, height: 235, borderRadius: 20 }}
                  source={selectedImage}
                  resizeMode="cover"
                />
              )}
              {selectedImage != null && (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedImage(null);
                  }}
                  style={styles.CrossIconView}>
                  <EntypoIcon
                    name="circle-with-cross"
                    style={{ color: ThemeColors.BLACK }}
                    size={25}
                  />
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.ItemViewContainer,
              {
                backgroundColor:
                  ThemeMode === 'dark'
                    ? ThemeColors.DARK_THEME_COLOR
                    : ThemeColors?.WHITE,
              },
            ]}>
            <TextInput
              value={itemName}
              onChangeText={value => setItemName(value)}
              placeholderTextColor={
                ThemeMode === 'dark' ? ThemeColors?.WHITE : ThemeColors.GRAY
              }
              style={[
                styles.ItemViewTextBox,
                {
                  backgroundColor:
                    ThemeMode === 'dark'
                      ? ThemeColors.DARK_THEME_COLOR
                      : ThemeColors?.WHITE,
                  color:
                    ThemeMode === 'dark'
                      ? ThemeColors.WHITE
                      : ThemeColors?.BLACK,
                },
              ]}
              placeholder="ADD COMMENT"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.ItemViewContainer2,
              {
                backgroundColor:
                  ThemeMode === 'dark'
                    ? ThemeColors.DARK_THEME_COLOR
                    : ThemeColors?.WHITE,
              },
            ]}>
            <TextInput
              value={place}
              onChangeText={value => setPlace(value)}
              placeholderTextColor={
                ThemeMode === 'dark' ? ThemeColors?.WHITE : ThemeColors.GRAY
              }
              multiline
              style={[
                styles.ItemViewTextBox2,
                {
                  backgroundColor:
                    ThemeMode === 'dark'
                      ? ThemeColors.DARK_THEME_COLOR
                      : ThemeColors?.WHITE,
                  color:
                    ThemeMode === 'dark'
                      ? ThemeColors.WHITE
                      : ThemeColors?.BLACK,
                },
              ]}
              placeholder="ADD DESCRIPTION"
            />
          </TouchableOpacity>
          <View style={styles.ButtonView}>
            <GradientButtonBlue
              title={`Continue`}
              onPress={handleOnPressContinue}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SocialFeedModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000063',
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: GradientColors.BLUE[0],
    position: 'absolute',
    top: -15,
    right: -15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtnGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: GradientColors.BLUE[0],
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: 350,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 25,
    backgroundColor: ThemeColors.WHITE,
  },
  AddItemContainer: {
    width: width - 80,
    shadowOffset: { width: 10, height: -10 },
    shadowColor: ThemeColors.BLACK,
    shadowOpacity: 1,
    elevation: 10,
    shadowRadius: 100,
    backgroundColor: ThemeColors.WHITE,
    borderRadius: 20,
    marginBottom: 7,
    alignSelf: 'center',
  },
  AddItemContainerView: {
    borderRadius: 20,
    paddingVertical: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ThemeColors.WHITE,
  },
  TextView: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ThemeColors.WHITE,
  },
  MainTitleText: {
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.SEMI_BOLD,
    fontSize: 20,
  },
  SubTitleText: {
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.MEDIUM,
    fontSize: 10,
    opacity: 0.6,
    marginTop: -5,
  },
  CrossIconView: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  getLocationText: {
    color: 'blue',
    fontFamily: ThemeFonts.MEDIUM,
    fontSize: 12,
  },
  NewView: {
    borderRadius: 20,
    height: 60,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: 21,
    paddingRight: 10,
  },
  LocationIconView: {
    backgroundColor: ThemeColors?.PRIMARY_COLOR,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -3,
  },
  ItemViewContainer: {
    height: 60,
    width: width - 80,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 7,
    elevation: 10,
    backgroundColor: ThemeColors.WHITE,
    alignSelf: 'center',
  },
  ItemViewContainer2: {
    height: 120,
    width: width - 80,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 7,
    elevation: 10,
    backgroundColor: ThemeColors.WHITE,
    alignSelf: 'center',
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
  ItemViewTextBox2: {
    borderRadius: 20,
    minHeight: 120,
    flexGrow: 1,
    paddingHorizontal: 25,
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.MEDIUM,
    fontSize: 15,
    marginTop: 5,
    textAlignVertical: 'top',
  },
  ButtonView: {
    width: width - 80,
    borderRadius: 20,
    marginVertical: 5,
    alignSelf: 'center',
  },
});

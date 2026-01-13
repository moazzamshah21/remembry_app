import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  FlatList,
  TextInput,
  useColorScheme,
} from 'react-native';
import styles from '../styles/EditSettingStyles';
import { GradientColors, ThemeColors, ThemeFonts } from '../utils/Theme';
import SecondHeader from '../components/SecondHeader';
import LinearGradient from 'react-native-linear-gradient';
import { showMessage } from 'react-native-flash-message';
import PhoneTextBox from '../components/PhoneTextBox';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { launchImageLibrary } from 'react-native-image-picker';
import UserService from '../services/UserServices/UserService';
import { useDispatch, useSelector } from 'react-redux';
import * as commonAction from '../actions/Common/CommonAction';

const EditSettingScreen = ({ navigation }) => {

  const colorScheme = useColorScheme();

  const info = useSelector(state => state.CommonReducer.user);
  const [fullName, setFullName] = useState(info?.fullName);
  const [email, setEmail] = useState(info?.email);
  const [phoneAddress, setPhoneAddress] = useState(info?.phoneNumber);
  const [selectedImage, setSelectedImage] = useState(info?.profileImage);
  const [selectedImageBase64, setSelectedImageBase64] = useState(null);
  const dispatch = useDispatch();

  const handleOnPressSaveAndCont = async () => {
    if (!fullName) {
      showMessage({
        message: 'Full Name must be required',
        type: 'danger',
      });
      return;
    } else if (!phoneAddress) {
      showMessage({
        message: 'Phone Address must be required',
        type: 'danger',
      });
    } else {
      var payload = {
        fullName: fullName,
        phoneNumber: phoneAddress,
        imageBase64: selectedImageBase64,
      };
      var response = await UserService.EditUserInfo(payload);
      
      if (response?.success) {
        showMessage({
          message: response?.message,
          type: 'success',
        });
        dispatch(commonAction.fetchUserDetail());

      } else {
        showMessage({
          message: response?.message,
          type: 'danger',
        });
      }
    }
  };

  const ChooseImageFromLibrary = () => {
    launchImageLibrary({ mediaType: 'photo', includeBase64: true }, response => {
      if (response.didCancel) {
        //console.log('User cancelled image picker');
      } else if (response.error) {
        //console.log('ImagePicker Error: ', response.error);
      } else {
        const source = response?.assets[0]?.uri;
        setSelectedImageBase64(response?.assets[0]?.base64);
        setSelectedImage(source);
      }
    });
  };

  return (
    <React.Fragment>
      <SecondHeader title={'Setting'} subTitle='Update Account Setting' navigation={navigation} />
      <ScrollView
        contentContainerStyle={styles.ScrollViewContentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.MainContainer,
            {
              backgroundColor:
                useColorScheme() === 'dark'
                  ? ThemeColors?.BLACK
                  : ThemeColors?.WHITE,
            },
          ]}>
          <View
            style={[
              styles.ContentContainer,
              {
                backgroundColor:
                  useColorScheme() === 'dark'
                    ? ThemeColors?.BLACK
                    : ThemeColors?.WHITE,
              },
            ]}>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '35%',
                alignSelf: 'center',
                marginBottom: 10,
              }}
              onPress={ChooseImageFromLibrary}>
              <Image
                defaultSource={require('../../assets/images/avatar.png')}
                source={
                  selectedImage == null
                    ? require('../../assets/images/avatar.png')
                    : { uri: selectedImage }
                }
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                }}
                resizeMode="cover"
              />
              <TouchableOpacity style={styles.AbsoluteView}>
                <EntypoIcon
                  name="edit"
                  style={{
                    color: ThemeColors.WHITE,
                    backgroundColor: ThemeColors?.BLACK,
                    borderRadius: 20,
                    padding: 3,
                  }}
                  size={12}
                />
              </TouchableOpacity>
            </TouchableOpacity>
            <Text
              style={[
                styles?.nameText,
                {
                  color:
                    colorScheme === 'dark'
                      ? ThemeColors?.WHITE
                      : ThemeColors.DARK_GRAY,
                },
              ]}>
              Name
            </Text>
            <TextInput
              value={fullName}
              onChangeText={w => setFullName(w)}
              placeholder="Full Name"
              placeholderTextColor={
                useColorScheme() === 'dark' ? ThemeColors?.WHITE : '#707070'
              }
              style={[
                styles.TextInputStyle,
                {
                  color:
                    useColorScheme() === 'dark' ? ThemeColors?.WHITE : '#707070',
                },
              ]}
            />

            <Text
              style={[
                styles?.nameText,
                {
                  color:
                    colorScheme === 'dark'
                      ? ThemeColors?.WHITE
                      : ThemeColors.DARK_GRAY,
                },
              ]}>
              Email (Not changeable)
            </Text>
            <TextInput
              editable={false}
              value={email}
              onChangeText={w => setEmail(w)}
              placeholder="Email"
              placeholderTextColor={
                useColorScheme() === 'dark' ? ThemeColors?.WHITE : '#707070'
              }
              style={[
                styles.TextInputStyle,
                {
                  color:
                    useColorScheme() === 'dark' ? ThemeColors?.WHITE : '#707070',
                },
              ]}
            />

            <Text
              style={[
                styles?.nameText,
                {
                  color:
                    colorScheme === 'dark'
                      ? ThemeColors?.WHITE
                      : ThemeColors.DARK_GRAY,
                },
              ]}>
              Phone Number
            </Text>
            <TextInput
              value={phoneAddress}
              onChangeText={w => setPhoneAddress(w)}
              placeholder="Phone Number"
              placeholderTextColor={
                useColorScheme() === 'dark' ? ThemeColors?.WHITE : '#707070'
              }
              style={[
                styles.TextInputStyle,
                {
                  color:
                    useColorScheme() === 'dark' ? ThemeColors?.WHITE : '#707070',
                },
              ]}
            />
          </View>
          <View
            style={[
              styles.saveAndContinueBtnMainView,
              {
                backgroundColor:
                  useColorScheme() === 'dark'
                    ? ThemeColors?.BLACK
                    : ThemeColors?.WHITE,
              },
            ]}>
            <TouchableOpacity onPress={handleOnPressSaveAndCont}>
              <LinearGradient
                colors={GradientColors.GREEN}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.saveAndContinueBtnView}>
                <Text style={styles.saveAndContinueBtnText}>Save & Continue</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default EditSettingScreen;
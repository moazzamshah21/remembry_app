// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   TextInput,
//   Alert,
//   Platform,
//   ActionSheetIOS,
//   Dimensions,
//   FlatList,
// } from 'react-native';
// import styles from '../styles/CreateAddItemStyle';
// import SecondHeader from '../components/SecondHeader';
// import { GradientColors, ThemeColors } from '../utils/Theme';
// import GradientButton from '../components/GradientButton';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import EntypoIcon from 'react-native-vector-icons/Entypo';
// import { showMessage } from 'react-native-flash-message';
// import { getFormatedTime } from '../utils/Helper';
// import ReminderService from '../services/ReminderServices/ReminderService';
// import { useDispatch, useSelector } from 'react-redux';
// import * as reminderAction from '../actions/Reminder/ReminderAction';
// import moment from 'moment';
// import 'moment-timezone';
// const { width, height } = Dimensions.get('window');
// import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

// const CreateRemembranceItemScreen = ({ navigation, route }) => {

//   const dispatch = useDispatch();
//   const ThemeMode = useSelector(state => state.CommonReducer.themeMode);
//   const remembrances = useSelector(state => state.ReminderReducer.remembrances);

//   const {
//     id = '',
//     item = '',
//     tplace = '',
//     tdescription = '',
//     image = null,
//     time,
//   } = route?.params;
//   const options = ['Take a photo', 'Pick from gallery', 'Cancel'];

//   const [itemId, setItemId] = useState(id);

//   const [itemName, setItemName] = useState(item);
//   const [isFocusedName, setIsFocusedName] = useState(false);

//   const [description, setDescription] = useState(tdescription);

//   const [place, setPlace] = useState(tplace);
//   const [isFocusedPlace, setIsFocusedPlace] = useState(false);

//   const [reminderTime, setReminderTime] = useState(time);
//   const [selectedImage, setSelectedImage] = useState(image);

//   useEffect(() => {
//     setReminderTime(time);
//   }, [time]);

//   const onPressPickAnImage = async () => {

//     const permission = Platform.select({
//       ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
//       android: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
//     });
//     const result = await check(permission);
//     if (result === RESULTS.GRANTED) {

//     } else if (result === RESULTS.DENIED || result === RESULTS.BLOCKED) {
//       const requestResult = await request(permission);
//       if (requestResult === RESULTS.GRANTED) {

//       } else {
//         showMessage({
//           message: 'Gallery permission is needed to select photos.',
//           type: 'warning',
//         });
//         return;
//       }
//     }

//     launchImageLibrary(
//       { mediaType: 'photo', includeBase64: true, quality: 0.5 },
//       response => {
//         if (!response.didCancel) {
//           setSelectedImage({
//             uri: response?.assets[0]?.uri,
//             base64: response?.assets[0]?.base64,
//           });
//         }
//       },
//     );
//   };

//   const onPressTakeAnImage = async () => {

//     const permission = Platform.select({
//       ios: PERMISSIONS.IOS.CAMERA,
//       android: PERMISSIONS.ANDROID.CAMERA,
//     });

//     const result = await check(permission);
//     if (result === RESULTS.GRANTED) {

//     }
//     else if (result === RESULTS.DENIED || result === RESULTS.BLOCKED) {
//       const requestResult = await request(permission);
//       if (requestResult === RESULTS.GRANTED) {

//       } else {
//         showMessage({
//           message: 'Camera permission is needed to take pictures.',
//           type: 'warning',
//         });
//         return;
//       }
//     }

//     launchCamera(
//       { mediaType: 'photo', includeBase64: true, quality: 0.5 },
//       response => {
//         if (!response.didCancel) {
//           setSelectedImage({
//             uri: response?.assets[0]?.uri,
//             base64: response?.assets[0]?.base64,
//           });
//         }
//       },
//     );
//   };

//   const handlePressIOS = index => {
//     switch (index) {
//       case 0:
//         onPressTakeAnImage();
//         break;
//       case 1:
//         onPressPickAnImage();
//         break;
//       default:
//         break;
//     }
//   };

//   const showActionSheet = () => {
//     ActionSheetIOS.showActionSheetWithOptions(
//       {
//         options: options,
//         cancelButtonIndex: 2,
//         destructiveButtonIndex: -1,
//         title: 'Select an option',
//       },
//       handlePressIOS,
//     );
//   };

//   const onPressImagePicker = () => {
//     if (Platform?.OS === 'android') {
//       Alert.alert('Take a Photo', 'Please Select Any Option', [
//         { text: 'Cancel', onPress: () => { } },
//         {
//           text: 'Pick Image From Gallery',
//           onPress: () => {
//             onPressPickAnImage();
//           },
//         },
//         { text: 'Take An Image', onPress: () => onPressTakeAnImage() },
//       ]);
//     } else {
//       showActionSheet();
//     }
//   };

//   const handleOnPressContinue = async () => {
//     if (!selectedImage) {
//       showMessage({
//         message: 'Please Select Image',
//         type: 'danger',
//       });
//       return;
//     } else if (!itemName) {
//       showMessage({
//         message: 'Please Enter Item Name',
//         type: 'danger',
//       });
//       return;
//     } else if (!place) {
//       showMessage({
//         message: 'Please Enter Last Place',
//         type: 'danger',
//       });
//       return;
//     } else if (!reminderTime) {
//       showMessage({
//         message: 'Please Select Time',
//         type: 'danger',
//       });
//       return;
//     } else if (!description) {
//       showMessage({
//         message: 'Please Select Time',
//         type: 'danger',
//       });
//       return;
//     }

//     var payload = {
//       imageBase64: selectedImage?.base64,
//       name: itemName,
//       place: place,
//       time: new Date(reminderTime).getTime(),
//       description: description,
//     };

//     var response = await ReminderService.AddRemembranceItem(payload);
//     if (response.success === true) {
//       setSelectedImage(null);
//       setItemName('');
//       setPlace('');
//       setDescription('');
//       setReminderTime(null);
//       showMessage({
//         message: response?.message,
//         type: 'success',
//       });
//       dispatch(reminderAction.fetchAllRemembranceItems());
//       navigation.pop();
//     } else {
//       showMessage({
//         message: response?.message,
//         type: 'danger',
//       });
//     }
//   };

//   const handleOnPressUpdate = async () => {
//     if (!selectedImage) {
//       showMessage({
//         message: 'Please Select Image',
//         type: 'danger',
//       });
//       return;
//     } else if (!itemName) {
//       showMessage({
//         message: 'Please Enter Item Name',
//         type: 'danger',
//       });
//       return;
//     } else if (!place) {
//       showMessage({
//         message: 'Please Enter Last Place',
//         type: 'danger',
//       });
//       return;
//     } else if (!reminderTime) {
//       showMessage({
//         message: 'Please Select Time',
//         type: 'danger',
//       });
//       return;
//     } else if (!description) {
//       showMessage({
//         message: 'Please Select Time',
//         type: 'danger',
//       });
//       return;
//     }

//     var payload = {
//       id: itemId,
//       imageBase64: selectedImage?.base64 ? selectedImage?.base64 : '',
//       name: itemName,
//       place: place,
//       time: new Date(reminderTime).getTime(),
//       description: description,
//     };

//     var response = await ReminderService.UpdateRemembranceItem(payload);
//     if (response.success === true) {
//       setSelectedImage(null);
//       setItemName('');
//       setPlace('');
//       setDescription('');
//       setReminderTime(null);
//       showMessage({
//         message: response?.message,
//         type: 'success',
//       });
//       dispatch(reminderAction.fetchAllRemembranceItems());
//       navigation.pop();
//     } else {
//       showMessage({
//         message: response?.message,
//         type: 'danger',
//       });
//     }
//   };

//   return (
//     <React.Fragment>
//       <SecondHeader
//         navigation={navigation}
//         title="OFFLINE NOTEBOOK"
//         subTitle="OF YOUR DAILY ROUTINE HERE"
//         backButtonGradient={GradientColors.GREEN}
//         backButtonColor={'#A19495'}
//       />
//       <ScrollView
//         keyboardShouldPersistTaps='handled'
//         style={{
//           backgroundColor:
//             ThemeMode === 'dark'
//               ? ThemeColors.DARK_THEME_COLOR
//               : ThemeColors?.WHITE,
//         }}
//         contentContainerStyle={[
//           styles.ScrollViewContentContainerStyle,
//           {
//             backgroundColor:
//               ThemeMode === 'dark'
//                 ? ThemeColors.DARK_THEME_COLOR
//                 : ThemeColors?.WHITE,
//           },
//         ]}
//         showsVerticalScrollIndicator={false}>
//         <View
//           style={[
//             styles.MainContainer,
//             {
//               backgroundColor:
//                 ThemeMode === 'dark'
//                   ? ThemeColors.DARK_THEME_COLOR
//                   : ThemeColors?.WHITE,
//             },
//           ]}>
//           <TouchableOpacity
//             activeOpacity={0.7}
//             style={styles.AddItemContainer}
//             onPress={() => {
//               onPressImagePicker();
//             }}>
//             <View
//               style={[
//                 styles.AddItemContainerView,
//                 {
//                   paddingVertical: selectedImage == null ? 28 : 10,
//                   paddingHorizontal: selectedImage == null ? 0 : 10,
//                   backgroundColor:
//                     ThemeMode === 'dark'
//                       ? ThemeColors.DARK_THEME_COLOR
//                       : ThemeColors?.WHITE,
//                 },
//               ]}>
//               {selectedImage == null ? (
//                 <>
//                   <Image
//                     style={{ width: 100, height: 100 }}
//                     source={require('../../assets/images/take-a-photo.png')}
//                     resizeMode="contain"
//                   />
//                   <View
//                     style={[
//                       styles.TextView,
//                       {
//                         backgroundColor:
//                           ThemeMode === 'dark'
//                             ? ThemeColors.DARK_THEME_COLOR
//                             : ThemeColors?.WHITE,
//                       },
//                     ]}>
//                     <Text
//                       style={[
//                         styles.MainTitleText,
//                         {
//                           color:
//                             ThemeMode === 'dark'
//                               ? ThemeColors.WHITE
//                               : ThemeColors?.BLACK,
//                         },
//                       ]}>
//                       TAKE A PHOTO
//                     </Text>
//                     <Text
//                       style={[
//                         styles.SubTitleText,
//                         {
//                           color:
//                             ThemeMode === 'dark'
//                               ? ThemeColors.WHITE
//                               : ThemeColors?.BLACK,
//                         },
//                       ]}>
//                       OR BROWSE THE GALLERY
//                     </Text>
//                   </View>
//                 </>
//               ) : (
//                 <Image
//                   style={{ width: width - 60, height: 240, borderRadius: 20 }}
//                   source={selectedImage}
//                   resizeMode="cover"
//                 />
//               )}
//               {selectedImage != null && (
//                 <TouchableOpacity
//                   onPress={() => {
//                     setSelectedImage(null);
//                   }}
//                   style={styles.CrossIconView}>
//                   <EntypoIcon
//                     name="circle-with-cross"
//                     style={{ color: ThemeColors.BLACK }}
//                     size={25}
//                   />
//                 </TouchableOpacity>
//               )}
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[
//               styles.ItemViewContainer,
//               {
//                 backgroundColor:
//                   ThemeMode === 'dark'
//                     ? ThemeColors.DARK_THEME_COLOR
//                     : ThemeColors?.WHITE,
//               },
//             ]}>
//             <TextInput
//               value={itemName}
//               onFocus={() => {
//                 setIsFocusedName(true)
//                 setIsFocusedPlace(false)
//               }}
//               onBlur={() => { setTimeout(() => { setIsFocusedName(false) }, 1000) }}
//               onChangeText={value => setItemName(value)}
//               placeholderTextColor={
//                 ThemeMode === 'dark' ? ThemeColors?.WHITE : ThemeColors.GRAY
//               }
//               style={[
//                 styles.ItemViewTextBox,
//                 {
//                   backgroundColor:
//                     ThemeMode === 'dark'
//                       ? ThemeColors.DARK_THEME_COLOR
//                       : ThemeColors?.WHITE,
//                   color:
//                     ThemeMode === 'dark'
//                       ? ThemeColors.WHITE
//                       : ThemeColors?.BLACK,
//                 },
//               ]}
//               placeholder="ITEM NAME"
//             />
//           </TouchableOpacity>
//           {isFocusedName && remembrances.map(x => x.name).filter(item => item.toLowerCase().startsWith(itemName.toLowerCase())).length > 0 && (
//             <FlatList
//               keyboardShouldPersistTaps='handled'
//               nestedScrollEnabled
//               data={remembrances.map(x => x.name).filter(item => item.toLowerCase().startsWith(itemName.toLowerCase()))}
//               keyExtractor={(item, index) => index.toString()}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   onPress={() => {
//                     setItemName(item);
//                     setIsFocusedName(false);
//                     setIsFocusedPlace(false);
//                   }}
//                   style={styles.suggestionItem}
//                 >
//                   <Text style={styles.suggestionText}>{item}</Text>
//                 </TouchableOpacity>
//               )}
//               style={styles.suggestionsList}
//             />
//           )}
//           <TouchableOpacity
//             style={[
//               styles.ItemViewContainer,
//               {
//                 backgroundColor:
//                   ThemeMode === 'dark'
//                     ? ThemeColors.DARK_THEME_COLOR
//                     : ThemeColors?.WHITE,
//               },
//             ]}>
//             <TextInput
//               value={place}
//               onFocus={() => {
//                 setIsFocusedName(false)
//                 setIsFocusedPlace(true)
//               }}
//               onBlur={() => { setTimeout(() => { setIsFocusedPlace(false) }, 1000) }}
//               onChangeText={value => setPlace(value)}
//               placeholderTextColor={
//                 ThemeMode === 'dark' ? ThemeColors?.WHITE : ThemeColors.GRAY
//               }
//               style={[
//                 styles.ItemViewTextBox,
//                 {
//                   backgroundColor:
//                     ThemeMode === 'dark'
//                       ? ThemeColors.DARK_THEME_COLOR
//                       : ThemeColors?.WHITE,
//                   color:
//                     ThemeMode === 'dark'
//                       ? ThemeColors.WHITE
//                       : ThemeColors?.BLACK,
//                 },
//               ]}
//               placeholder="LAST PLACE"
//             />
//           </TouchableOpacity>
//           {isFocusedPlace && remembrances.map(x => x.place).filter(item => item.toLowerCase().startsWith(place.toLowerCase())).length > 0 && (
//             <FlatList
//               keyboardShouldPersistTaps='handled'
//               nestedScrollEnabled
//               data={remembrances.map(x => x.place).filter(item => item.toLowerCase().startsWith(place.toLowerCase()))}
//               keyExtractor={(item, index) => index.toString()}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   onPress={() => {
//                     setPlace(item);
//                     setIsFocusedName(false);
//                     setIsFocusedPlace(false);
//                   }}
//                   style={styles.suggestionItem}
//                 >
//                   <Text style={styles.suggestionText}>{item}</Text>
//                 </TouchableOpacity>
//               )}
//               style={styles.suggestionsList}
//             />
//           )}
//           <TouchableOpacity
//             style={[
//               styles.ItemViewContainer,
//               {
//                 backgroundColor:
//                   ThemeMode === 'dark'
//                     ? ThemeColors.DARK_THEME_COLOR
//                     : ThemeColors?.WHITE,
//               },
//             ]}
//             onPress={() => {
//               navigation.navigate('SetTimerForRemembranceItem', {
//                 value: reminderTime,
//               });
//             }}>
//             <View style={styles.ListTextView}>
//               <Text
//                 style={[
//                   styles.ListTitleText,
//                   {
//                     color:
//                       ThemeMode === 'dark'
//                         ? ThemeColors.WHITE
//                         : ThemeColors?.GRAY,
//                   },
//                 ]}>
//                 TIME
//               </Text>
//             </View>
//             <Text
//               style={[
//                 styles.ListTitleText,
//                 {
//                   color:
//                     ThemeMode === 'dark'
//                       ? ThemeColors.WHITE
//                       : ThemeColors?.BLACK,
//                 },
//               ]}>
//               {reminderTime && getFormatedTime(reminderTime)}
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[
//               styles.ItemViewContainer,
//               {
//                 backgroundColor:
//                   ThemeMode === 'dark'
//                     ? ThemeColors.DARK_THEME_COLOR
//                     : ThemeColors?.WHITE,
//                 height: 150,
//               },
//             ]}>
//             <TextInput
//               value={description}
//               onChangeText={value => setDescription(value)}
//               placeholderTextColor={
//                 ThemeMode === 'dark' ? ThemeColors?.WHITE : ThemeColors.GRAY
//               }
//               multiline={true}
//               style={[
//                 styles.ItemViewTextBox,
//                 {
//                   backgroundColor:
//                     ThemeMode === 'dark'
//                       ? ThemeColors.DARK_THEME_COLOR
//                       : ThemeColors?.WHITE,
//                   color:
//                     ThemeMode === 'dark'
//                       ? ThemeColors.WHITE
//                       : ThemeColors?.BLACK,
//                   height: 150,
//                   verticalAlign: 'top',
//                 },
//               ]}
//               placeholder="DESCRIPTION"
//             />
//           </TouchableOpacity>
//           <View style={styles.ButtonView}>
//             {itemId === '' ? (
//               <GradientButton
//                 title={`Continue`}
//                 onPress={handleOnPressContinue}
//               />
//             ) : (
//               <GradientButton title={`Update`} onPress={handleOnPressUpdate} />
//             )}
//           </View>
//         </View>
//       </ScrollView>
//     </React.Fragment>
//   );
// };

// export default CreateRemembranceItemScreen;




// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   TextInput,
//   Alert,
//   Platform,
//   ActionSheetIOS,
//   Dimensions,
//   FlatList,
// } from 'react-native';
// import styles from '../styles/CreateAddItemStyle';
// import SecondHeader from '../components/SecondHeader';
// import { GradientColors, ThemeColors } from '../utils/Theme';
// import GradientButton from '../components/GradientButton';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import EntypoIcon from 'react-native-vector-icons/Entypo';
// import { showMessage } from 'react-native-flash-message';
// import { getFormatedTime } from '../utils/Helper';
// import { useDispatch, useSelector } from 'react-redux';
// import * as reminderAction from '../actions/Reminder/ReminderAction';
// import moment from 'moment';
// import 'moment-timezone';
// const { width, height } = Dimensions.get('window');
// import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const CreateRemembranceItemScreen = ({ navigation, route }) => {
//   const dispatch = useDispatch();
//   const ThemeMode = useSelector(state => state.CommonReducer.themeMode);
//   const remembrances = useSelector(state => state.ReminderReducer.remembrances);

//   const {
//     id = '',
//     item = '',
//     tplace = '',
//     tdescription = '',
//     image = null,
//     time,
//   } = route?.params;
//   const options = ['Take a photo', 'Pick from gallery', 'Cancel'];

//   const [itemId, setItemId] = useState(id);
//   const [itemName, setItemName] = useState(item);
//   const [isFocusedName, setIsFocusedName] = useState(false);
//   const [description, setDescription] = useState(tdescription);
//   const [place, setPlace] = useState(tplace);
//   const [isFocusedPlace, setIsFocusedPlace] = useState(false);
//   const [reminderTime, setReminderTime] = useState(time);
//   const [selectedImage, setSelectedImage] = useState(image);

//   // Storage key for local data - use the same key that your main list expects
//   const STORAGE_KEY = 'remembrance_items';

//   useEffect(() => {
//     setReminderTime(time);
//   }, [time]);

//   // Helper function to generate unique ID
//   const generateId = () => {
//     return Date.now().toString() + Math.random().toString(36).substr(2, 9);
//   };

//   // Save remembrance items to local storage
//   const saveRemembranceItems = async (items) => {
//     try {
//       await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
//       return true;
//     } catch (error) {
//       console.error('Error saving remembrance items:', error);
//       return false;
//     }
//   };

//   // Load remembrance items from local storage
//   const loadRemembranceItems = async () => {
//     try {
//       const items = await AsyncStorage.getItem(STORAGE_KEY);
//       return items ? JSON.parse(items) : [];
//     } catch (error) {
//       console.error('Error loading remembrance items:', error);
//       return [];
//     }
//   };

//   // Convert our local data format to match your API response format
//   const convertToApiFormat = (localItems) => {
//     return localItems.map(item => ({
//       id: item.id,
//       name: item.name,
//       place: item.place,
//       description: item.description,
//       imageBase64: item.imageBase64,
//       time: item.time,
//       // Add any additional fields that your main list expects
//       likes: item.likes || 0,
//       prayers: item.prayers || 0,
//       createdAt: item.createdAt,
//       // Add other fields that your API response typically has
//     }));
//   };

//   const onPressPickAnImage = async () => {
//     const permission = Platform.select({
//       ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
//       android: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
//     });
//     const result = await check(permission);
//     if (result === RESULTS.GRANTED) {
//       // Permission already granted
//     } else if (result === RESULTS.DENIED || result === RESULTS.BLOCKED) {
//       const requestResult = await request(permission);
//       if (requestResult === RESULTS.GRANTED) {
//         // Permission granted
//       } else {
//         showMessage({
//           message: 'Gallery permission is needed to select photos.',
//           type: 'warning',
//         });
//         return;
//       }
//     }

//     launchImageLibrary(
//       { mediaType: 'photo', includeBase64: true, quality: 0.5 },
//       response => {
//         if (!response.didCancel) {
//           setSelectedImage({
//             uri: response?.assets[0]?.uri,
//             base64: response?.assets[0]?.base64,
//           });
//         }
//       },
//     );
//   };

//   const onPressTakeAnImage = async () => {
//     const permission = Platform.select({
//       ios: PERMISSIONS.IOS.CAMERA,
//       android: PERMISSIONS.ANDROID.CAMERA,
//     });

//     const result = await check(permission);
//     if (result === RESULTS.GRANTED) {
//       // Permission already granted
//     }
//     else if (result === RESULTS.DENIED || result === RESULTS.BLOCKED) {
//       const requestResult = await request(permission);
//       if (requestResult === RESULTS.GRANTED) {
//         // Permission granted
//       } else {
//         showMessage({
//           message: 'Camera permission is needed to take pictures.',
//           type: 'warning',
//         });
//         return;
//       }
//     }

//     launchCamera(
//       { mediaType: 'photo', includeBase64: true, quality: 0.5 },
//       response => {
//         if (!response.didCancel) {
//           setSelectedImage({
//             uri: response?.assets[0]?.uri,
//             base64: response?.assets[0]?.base64,
//           });
//         }
//       },
//     );
//   };

//   const handlePressIOS = index => {
//     switch (index) {
//       case 0:
//         onPressTakeAnImage();
//         break;
//       case 1:
//         onPressPickAnImage();
//         break;
//       default:
//         break;
//     }
//   };

//   const showActionSheet = () => {
//     ActionSheetIOS.showActionSheetWithOptions(
//       {
//         options: options,
//         cancelButtonIndex: 2,
//         destructiveButtonIndex: -1,
//         title: 'Select an option',
//       },
//       handlePressIOS,
//     );
//   };

//   const onPressImagePicker = () => {
//     if (Platform?.OS === 'android') {
//       Alert.alert('Take a Photo', 'Please Select Any Option', [
//         { text: 'Cancel', onPress: () => { } },
//         {
//           text: 'Pick Image From Gallery',
//           onPress: () => {
//             onPressPickAnImage();
//           },
//         },
//         { text: 'Take An Image', onPress: () => onPressTakeAnImage() },
//       ]);
//     } else {
//       showActionSheet();
//     }
//   };

//   const handleOnPressContinue = async () => {
//     if (!selectedImage) {
//       showMessage({
//         message: 'Please Select Image',
//         type: 'danger',
//       });
//       return;
//     } else if (!itemName) {
//       showMessage({
//         message: 'Please Enter Item Name',
//         type: 'danger',
//       });
//       return;
//     } else if (!place) {
//       showMessage({
//         message: 'Please Enter Last Place',
//         type: 'danger',
//       });
//       return;
//     } else if (!reminderTime) {
//       showMessage({
//         message: 'Please Select Time',
//         type: 'danger',
//       });
//       return;
//     } else if (!description) {
//       showMessage({
//         message: 'Please Enter Description',
//         type: 'danger',
//       });
//       return;
//     }

//     try {
//       // Load existing items
//       const existingItems = await loadRemembranceItems();
      
//       // Create new item with format that matches your API
//       const newItem = {
//         id: generateId(),
//         imageBase64: selectedImage?.base64,
//         name: itemName,
//         place: place,
//         time: new Date(reminderTime).getTime(),
//         description: description,
//         createdAt: new Date().toISOString(),
//         // Add fields that your main list expects to see
//         likes: 0,
//         prayers: 0,
//         isLiked: false,
//         isPrayed: false,
//         // Add any other fields that your API response typically has
//       };

//       // Add new item to the list
//       const updatedItems = [...existingItems, newItem];
      
//       // Save to local storage
//       const saveResult = await saveRemembranceItems(updatedItems);
      
//       if (saveResult) {
//         // Convert to API format and update Redux store
//         const apiFormattedItems = convertToApiFormat(updatedItems);
        
//         // Update Redux store - use your existing action
//         // If you have a setRemembranceItems action, use it
//         // Otherwise, we'll trigger a refresh of the main list
//         if (reminderAction.setRemembranceItems) {
//           dispatch(reminderAction.setRemembranceItems(apiFormattedItems));
//         } else if (reminderAction.fetchAllRemembranceItems) {
//           // This will trigger your main list to reload from local storage
//           dispatch(reminderAction.fetchAllRemembranceItems());
//         }
        
//         // Reset form
//         setSelectedImage(null);
//         setItemName('');
//         setPlace('');
//         setDescription('');
//         setReminderTime(null);
        
//         showMessage({
//           message: 'Remembrance item added successfully!',
//           type: 'success',
//         });
        
//         // Navigate back to main list
//         navigation.pop();
//       } else {
//         showMessage({
//           message: 'Failed to save remembrance item.',
//           type: 'danger',
//         });
//       }
//     } catch (error) {
//       console.error('Error adding remembrance item:', error);
//       showMessage({
//         message: 'An error occurred while saving the item.',
//         type: 'danger',
//       });
//     }
//   };

//   const handleOnPressUpdate = async () => {
//     if (!selectedImage) {
//       showMessage({
//         message: 'Please Select Image',
//         type: 'danger',
//       });
//       return;
//     } else if (!itemName) {
//       showMessage({
//         message: 'Please Enter Item Name',
//         type: 'danger',
//       });
//       return;
//     } else if (!place) {
//       showMessage({
//         message: 'Please Enter Last Place',
//         type: 'danger',
//       });
//       return;
//     } else if (!reminderTime) {
//       showMessage({
//         message: 'Please Select Time',
//         type: 'danger',
//       });
//       return;
//     } else if (!description) {
//       showMessage({
//         message: 'Please Enter Description',
//         type: 'danger',
//       });
//       return;
//     }

//     try {
//       // Load existing items
//       const existingItems = await loadRemembranceItems();
      
//       // Find item index
//       const itemIndex = existingItems.findIndex(item => item.id === itemId);
      
//       if (itemIndex === -1) {
//         showMessage({
//           message: 'Item not found for update.',
//           type: 'danger',
//         });
//         return;
//       }

//       // Update item
//       const updatedItem = {
//         ...existingItems[itemIndex],
//         imageBase64: selectedImage?.base64 ? selectedImage?.base64 : existingItems[itemIndex].imageBase64,
//         name: itemName,
//         place: place,
//         time: new Date(reminderTime).getTime(),
//         description: description,
//         updatedAt: new Date().toISOString(),
//       };

//       // Create updated items array
//       const updatedItems = [
//         ...existingItems.slice(0, itemIndex),
//         updatedItem,
//         ...existingItems.slice(itemIndex + 1)
//       ];
      
//       // Save to local storage
//       const saveResult = await saveRemembranceItems(updatedItems);
      
//       if (saveResult) {
//         // Convert to API format and update Redux store
//         const apiFormattedItems = convertToApiFormat(updatedItems);
        
//         // Update Redux store
//         if (reminderAction.setRemembranceItems) {
//           dispatch(reminderAction.setRemembranceItems(apiFormattedItems));
//         } else if (reminderAction.fetchAllRemembranceItems) {
//           dispatch(reminderAction.fetchAllRemembranceItems());
//         }
        
//         // Reset form
//         setSelectedImage(null);
//         setItemName('');
//         setPlace('');
//         setDescription('');
//         setReminderTime(null);
//         setItemId('');
        
//         showMessage({
//           message: 'Remembrance item updated successfully!',
//           type: 'success',
//         });
        
//         navigation.pop();
//       } else {
//         showMessage({
//           message: 'Failed to update remembrance item.',
//           type: 'danger',
//         });
//       }
//     } catch (error) {
//       console.error('Error updating remembrance item:', error);
//       showMessage({
//         message: 'An error occurred while updating the item.',
//         type: 'danger',
//       });
//     }
//   };

//   return (
//     <React.Fragment>
//       <SecondHeader
//         navigation={navigation}
//         title="OFFLINE NOTEBOOK"
//         subTitle="OF YOUR DAILY ROUTINE HERE"
//         backButtonGradient={GradientColors.GREEN}
//         backButtonColor={'#A19495'}
//       />
//       <ScrollView
//         keyboardShouldPersistTaps='handled'
//         style={{
//           backgroundColor:
//             ThemeMode === 'dark'
//               ? ThemeColors.DARK_THEME_COLOR
//               : ThemeColors?.WHITE,
//         }}
//         contentContainerStyle={[
//           styles.ScrollViewContentContainerStyle,
//           {
//             backgroundColor:
//               ThemeMode === 'dark'
//                 ? ThemeColors.DARK_THEME_COLOR
//                 : ThemeColors?.WHITE,
//           },
//         ]}
//         showsVerticalScrollIndicator={false}>
//         <View
//           style={[
//             styles.MainContainer,
//             {
//               backgroundColor:
//                 ThemeMode === 'dark'
//                   ? ThemeColors.DARK_THEME_COLOR
//                   : ThemeColors?.WHITE,
//             },
//           ]}>
//           <TouchableOpacity
//             activeOpacity={0.7}
//             style={styles.AddItemContainer}
//             onPress={() => {
//               onPressImagePicker();
//             }}>
//             <View
//               style={[
//                 styles.AddItemContainerView,
//                 {
//                   paddingVertical: selectedImage == null ? 28 : 10,
//                   paddingHorizontal: selectedImage == null ? 0 : 10,
//                   backgroundColor:
//                     ThemeMode === 'dark'
//                       ? ThemeColors.DARK_THEME_COLOR
//                       : ThemeColors?.WHITE,
//                 },
//               ]}>
//               {selectedImage == null ? (
//                 <>
//                   <Image
//                     style={{ width: 100, height: 100 }}
//                     source={require('../../assets/images/take-a-photo.png')}
//                     resizeMode="contain"
//                   />
//                   <View
//                     style={[
//                       styles.TextView,
//                       {
//                         backgroundColor:
//                           ThemeMode === 'dark'
//                             ? ThemeColors.DARK_THEME_COLOR
//                             : ThemeColors?.WHITE,
//                       },
//                     ]}>
//                     <Text
//                       style={[
//                         styles.MainTitleText,
//                         {
//                           color:
//                             ThemeMode === 'dark'
//                               ? ThemeColors.WHITE
//                               : ThemeColors?.BLACK,
//                         },
//                       ]}>
//                       TAKE A PHOTO
//                     </Text>
//                     <Text
//                       style={[
//                         styles.SubTitleText,
//                         {
//                           color:
//                             ThemeMode === 'dark'
//                               ? ThemeColors.WHITE
//                               : ThemeColors?.BLACK,
//                         },
//                       ]}>
//                       OR BROWSE THE GALLERY
//                     </Text>
//                   </View>
//                 </>
//               ) : (
//                 <Image
//                   style={{ width: width - 60, height: 240, borderRadius: 20 }}
//                   source={selectedImage}
//                   resizeMode="cover"
//                 />
//               )}
//               {selectedImage != null && (
//                 <TouchableOpacity
//                   onPress={() => {
//                     setSelectedImage(null);
//                   }}
//                   style={styles.CrossIconView}>
//                   <EntypoIcon
//                     name="circle-with-cross"
//                     style={{ color: ThemeColors.BLACK }}
//                     size={25}
//                   />
//                 </TouchableOpacity>
//               )}
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[
//               styles.ItemViewContainer,
//               {
//                 backgroundColor:
//                   ThemeMode === 'dark'
//                     ? ThemeColors.DARK_THEME_COLOR
//                     : ThemeColors?.WHITE,
//               },
//             ]}>
//             <TextInput
//               value={itemName}
//               onFocus={() => {
//                 setIsFocusedName(true)
//                 setIsFocusedPlace(false)
//               }}
//               onBlur={() => { setTimeout(() => { setIsFocusedName(false) }, 1000) }}
//               onChangeText={value => setItemName(value)}
//               placeholderTextColor={
//                 ThemeMode === 'dark' ? ThemeColors?.WHITE : ThemeColors.GRAY
//               }
//               style={[
//                 styles.ItemViewTextBox,
//                 {
//                   backgroundColor:
//                     ThemeMode === 'dark'
//                       ? ThemeColors.DARK_THEME_COLOR
//                       : ThemeColors?.WHITE,
//                   color:
//                     ThemeMode === 'dark'
//                       ? ThemeColors.WHITE
//                       : ThemeColors?.BLACK,
//                 },
//               ]}
//               placeholder="ITEM NAME"
//             />
//           </TouchableOpacity>
//           {isFocusedName && remembrances.map(x => x.name).filter(item => item.toLowerCase().startsWith(itemName.toLowerCase())).length > 0 && (
//             <FlatList
//               keyboardShouldPersistTaps='handled'
//               nestedScrollEnabled
//               data={remembrances.map(x => x.name).filter(item => item.toLowerCase().startsWith(itemName.toLowerCase()))}
//               keyExtractor={(item, index) => index.toString()}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   onPress={() => {
//                     setItemName(item);
//                     setIsFocusedName(false);
//                     setIsFocusedPlace(false);
//                   }}
//                   style={styles.suggestionItem}
//                 >
//                   <Text style={styles.suggestionText}>{item}</Text>
//                 </TouchableOpacity>
//               )}
//               style={styles.suggestionsList}
//             />
//           )}
//           <TouchableOpacity
//             style={[
//               styles.ItemViewContainer,
//               {
//                 backgroundColor:
//                   ThemeMode === 'dark'
//                     ? ThemeColors.DARK_THEME_COLOR
//                     : ThemeColors?.WHITE,
//               },
//             ]}>
//             <TextInput
//               value={place}
//               onFocus={() => {
//                 setIsFocusedName(false)
//                 setIsFocusedPlace(true)
//               }}
//               onBlur={() => { setTimeout(() => { setIsFocusedPlace(false) }, 1000) }}
//               onChangeText={value => setPlace(value)}
//               placeholderTextColor={
//                 ThemeMode === 'dark' ? ThemeColors?.WHITE : ThemeColors.GRAY
//               }
//               style={[
//                 styles.ItemViewTextBox,
//                 {
//                   backgroundColor:
//                     ThemeMode === 'dark'
//                       ? ThemeColors.DARK_THEME_COLOR
//                       : ThemeColors?.WHITE,
//                   color:
//                     ThemeMode === 'dark'
//                       ? ThemeColors.WHITE
//                       : ThemeColors?.BLACK,
//                 },
//               ]}
//               placeholder="LAST PLACE"
//             />
//           </TouchableOpacity>
//           {isFocusedPlace && remembrances.map(x => x.place).filter(item => item.toLowerCase().startsWith(place.toLowerCase())).length > 0 && (
//             <FlatList
//               keyboardShouldPersistTaps='handled'
//               nestedScrollEnabled
//               data={remembrances.map(x => x.place).filter(item => item.toLowerCase().startsWith(place.toLowerCase()))}
//               keyExtractor={(item, index) => index.toString()}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   onPress={() => {
//                     setPlace(item);
//                     setIsFocusedName(false);
//                     setIsFocusedPlace(false);
//                   }}
//                   style={styles.suggestionItem}
//                 >
//                   <Text style={styles.suggestionText}>{item}</Text>
//                 </TouchableOpacity>
//               )}
//               style={styles.suggestionsList}
//             />
//           )}
//           <TouchableOpacity
//             style={[
//               styles.ItemViewContainer,
//               {
//                 backgroundColor:
//                   ThemeMode === 'dark'
//                     ? ThemeColors.DARK_THEME_COLOR
//                     : ThemeColors?.WHITE,
//               },
//             ]}
//             onPress={() => {
//               navigation.navigate('SetTimerForRemembranceItem', {
//                 value: reminderTime,
//               });
//             }}>
//             <View style={styles.ListTextView}>
//               <Text
//                 style={[
//                   styles.ListTitleText,
//                   {
//                     color:
//                       ThemeMode === 'dark'
//                         ? ThemeColors.WHITE
//                         : ThemeColors?.GRAY,
//                   },
//                 ]}>
//                 TIME
//               </Text>
//             </View>
//             <Text
//               style={[
//                 styles.ListTitleText,
//                 {
//                   color:
//                     ThemeMode === 'dark'
//                       ? ThemeColors.WHITE
//                       : ThemeColors?.BLACK,
//                 },
//               ]}>
//               {reminderTime && getFormatedTime(reminderTime)}
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[
//               styles.ItemViewContainer,
//               {
//                 backgroundColor:
//                   ThemeMode === 'dark'
//                     ? ThemeColors.DARK_THEME_COLOR
//                     : ThemeColors?.WHITE,
//                 height: 150,
//               },
//             ]}>
//             <TextInput
//               value={description}
//               onChangeText={value => setDescription(value)}
//               placeholderTextColor={
//                 ThemeMode === 'dark' ? ThemeColors?.WHITE : ThemeColors.GRAY
//               }
//               multiline={true}
//               style={[
//                 styles.ItemViewTextBox,
//                 {
//                   backgroundColor:
//                     ThemeMode === 'dark'
//                       ? ThemeColors.DARK_THEME_COLOR
//                       : ThemeColors?.WHITE,
//                   color:
//                     ThemeMode === 'dark'
//                       ? ThemeColors.WHITE
//                       : ThemeColors?.BLACK,
//                   height: 150,
//                   verticalAlign: 'top',
//                 },
//               ]}
//               placeholder="DESCRIPTION"
//             />
//           </TouchableOpacity>
//           <View style={styles.ButtonView}>
//             {itemId === '' ? (
//               <GradientButton
//                 title={`Continue`}
//                 onPress={handleOnPressContinue}
//               />
//             ) : (
//               <GradientButton title={`Update`} onPress={handleOnPressUpdate} />
//             )}
//           </View>
//         </View>
//       </ScrollView>
//     </React.Fragment>
//   );
// };

// export default CreateRemembranceItemScreen;



// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   TextInput,
//   Alert,
//   Platform,
//   ActionSheetIOS,
//   Dimensions,
//   FlatList,
// } from 'react-native';
// import styles from '../styles/CreateAddItemStyle';
// import SecondHeader from '../components/SecondHeader';
// import { GradientColors, ThemeColors } from '../utils/Theme';
// import GradientButton from '../components/GradientButton';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import EntypoIcon from 'react-native-vector-icons/Entypo';
// import { showMessage } from 'react-native-flash-message';
// import { getFormatedTime } from '../utils/Helper';
// import { useDispatch, useSelector } from 'react-redux';
// import * as reminderAction from '../actions/Reminder/ReminderAction';
// import moment from 'moment';
// import 'moment-timezone';
// const { width, height } = Dimensions.get('window');
// import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const CreateRemembranceItemScreen = ({ navigation, route }) => {
//   const dispatch = useDispatch();
//   const ThemeMode = useSelector(state => state.CommonReducer.themeMode);
//   const remembrances = useSelector(state => state.ReminderReducer.remembrances);

//   const {
//     id = '',
//     item = '',
//     tplace = '',
//     tdescription = '',
//     image = null,
//     time,
//   } = route?.params;
//   const options = ['Take a photo', 'Pick from gallery', 'Cancel'];

//   const [itemId, setItemId] = useState(id);
//   const [itemName, setItemName] = useState(item);
//   const [isFocusedName, setIsFocusedName] = useState(false);
//   const [description, setDescription] = useState(tdescription);
//   const [place, setPlace] = useState(tplace);
//   const [isFocusedPlace, setIsFocusedPlace] = useState(false);
//   const [reminderTime, setReminderTime] = useState(time);
//   const [selectedImage, setSelectedImage] = useState(image);

//   // Storage key for local data
//   const STORAGE_KEY = 'remembrance_items';

//   useEffect(() => {
//     setReminderTime(time);
//   }, [time]);

//   // Helper function to generate unique ID
//   const generateId = () => {
//     return Date.now().toString() + Math.random().toString(36).substr(2, 9);
//   };

//   // Save remembrance items to local storage
//   const saveRemembranceItems = async (items) => {
//     try {
//       await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
//       return true;
//     } catch (error) {
//       console.error('Error saving remembrance items:', error);
//       return false;
//     }
//   };

//   // Load remembrance items from local storage
//   const loadRemembranceItems = async () => {
//     try {
//       const items = await AsyncStorage.getItem(STORAGE_KEY);
//       return items ? JSON.parse(items) : [];
//     } catch (error) {
//       console.error('Error loading remembrance items:', error);
//       return [];
//     }
//   };

//   const onPressPickAnImage = async () => {
//     const permission = Platform.select({
//       ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
//       android: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
//     });
//     const result = await check(permission);
//     if (result === RESULTS.GRANTED) {
//       // Permission already granted
//     } else if (result === RESULTS.DENIED || result === RESULTS.BLOCKED) {
//       const requestResult = await request(permission);
//       if (requestResult === RESULTS.GRANTED) {
//         // Permission granted
//       } else {
//         showMessage({
//           message: 'Gallery permission is needed to select photos.',
//           type: 'warning',
//         });
//         return;
//       }
//     }

//     launchImageLibrary(
//       { mediaType: 'photo', includeBase64: true, quality: 0.5 },
//       response => {
//         if (!response.didCancel) {
//           setSelectedImage({
//             uri: response?.assets[0]?.uri,
//             base64: response?.assets[0]?.base64,
//           });
//         }
//       },
//     );
//   };

//   const onPressTakeAnImage = async () => {
//     const permission = Platform.select({
//       ios: PERMISSIONS.IOS.CAMERA,
//       android: PERMISSIONS.ANDROID.CAMERA,
//     });

//     const result = await check(permission);
//     if (result === RESULTS.GRANTED) {
//       // Permission already granted
//     }
//     else if (result === RESULTS.DENIED || result === RESULTS.BLOCKED) {
//       const requestResult = await request(permission);
//       if (requestResult === RESULTS.GRANTED) {
//         // Permission granted
//       } else {
//         showMessage({
//           message: 'Camera permission is needed to take pictures.',
//           type: 'warning',
//         });
//         return;
//       }
//     }

//     launchCamera(
//       { mediaType: 'photo', includeBase64: true, quality: 0.5 },
//       response => {
//         if (!response.didCancel) {
//           setSelectedImage({
//             uri: response?.assets[0]?.uri,
//             base64: response?.assets[0]?.base64,
//           });
//         }
//       },
//     );
//   };

//   const handlePressIOS = index => {
//     switch (index) {
//       case 0:
//         onPressTakeAnImage();
//         break;
//       case 1:
//         onPressPickAnImage();
//         break;
//       default:
//         break;
//     }
//   };

//   const showActionSheet = () => {
//     ActionSheetIOS.showActionSheetWithOptions(
//       {
//         options: options,
//         cancelButtonIndex: 2,
//         destructiveButtonIndex: -1,
//         title: 'Select an option',
//       },
//       handlePressIOS,
//     );
//   };

//   const onPressImagePicker = () => {
//     if (Platform?.OS === 'android') {
//       Alert.alert('Take a Photo', 'Please Select Any Option', [
//         { text: 'Cancel', onPress: () => { } },
//         {
//           text: 'Pick Image From Gallery',
//           onPress: () => {
//             onPressPickAnImage();
//           },
//         },
//         { text: 'Take An Image', onPress: () => onPressTakeAnImage() },
//       ]);
//     } else {
//       showActionSheet();
//     }
//   };

//   const handleOnPressContinue = async () => {
//     if (!selectedImage) {
//       showMessage({
//         message: 'Please Select Image',
//         type: 'danger',
//       });
//       return;
//     } else if (!itemName) {
//       showMessage({
//         message: 'Please Enter Item Name',
//         type: 'danger',
//       });
//       return;
//     } else if (!place) {
//       showMessage({
//         message: 'Please Enter Last Place',
//         type: 'danger',
//       });
//       return;
//     } else if (!reminderTime) {
//       showMessage({
//         message: 'Please Select Time',
//         type: 'danger',
//       });
//       return;
//     } else if (!description) {
//       showMessage({
//         message: 'Please Enter Description',
//         type: 'danger',
//       });
//       return;
//     }

//     try {
//       // Load existing items
//       const existingItems = await loadRemembranceItems();
      
//       // Create new item
//       const newItem = {
//         id: generateId(),
//         imageBase64: selectedImage?.base64,
//         name: itemName,
//         place: place,
//         time: new Date(reminderTime).getTime(),
//         description: description,
//         createdAt: new Date().toISOString(),
//       };

//       // Add new item to the list
//       const updatedItems = [...existingItems, newItem];
      
//       // Save to local storage
//       const saveResult = await saveRemembranceItems(updatedItems);
      
//       if (saveResult) {
//         // Reset form
//         setSelectedImage(null);
//         setItemName('');
//         setPlace('');
//         setDescription('');
//         setReminderTime(null);
        
//         showMessage({
//           message: 'Remembrance item added successfully!',
//           type: 'success',
//         });
        
//         // Navigate back to RemembranceScreen with refresh flag
//         navigation.navigate('RemembranceScreen', { 
//           refresh: true 
//         });
//       } else {
//         showMessage({
//           message: 'Failed to save remembrance item.',
//           type: 'danger',
//         });
//       }
//     } catch (error) {
//       console.error('Error adding remembrance item:', error);
//       showMessage({
//         message: 'An error occurred while saving the item.',
//         type: 'danger',
//       });
//     }
//   };

//   const handleOnPressUpdate = async () => {
//     if (!selectedImage) {
//       showMessage({
//         message: 'Please Select Image',
//         type: 'danger',
//       });
//       return;
//     } else if (!itemName) {
//       showMessage({
//         message: 'Please Enter Item Name',
//         type: 'danger',
//       });
//       return;
//     } else if (!place) {
//       showMessage({
//         message: 'Please Enter Last Place',
//         type: 'danger',
//       });
//       return;
//     } else if (!reminderTime) {
//       showMessage({
//         message: 'Please Select Time',
//         type: 'danger',
//       });
//       return;
//     } else if (!description) {
//       showMessage({
//         message: 'Please Enter Description',
//         type: 'danger',
//       });
//       return;
//     }

//     try {
//       // Load existing items
//       const existingItems = await loadRemembranceItems();
      
//       // Find item index
//       const itemIndex = existingItems.findIndex(item => item.id === itemId);
      
//       if (itemIndex === -1) {
//         showMessage({
//           message: 'Item not found for update.',
//           type: 'danger',
//         });
//         return;
//       }

//       // Update item
//       const updatedItem = {
//         ...existingItems[itemIndex],
//         imageBase64: selectedImage?.base64 ? selectedImage?.base64 : existingItems[itemIndex].imageBase64,
//         name: itemName,
//         place: place,
//         time: new Date(reminderTime).getTime(),
//         description: description,
//         updatedAt: new Date().toISOString(),
//       };

//       // Create updated items array
//       const updatedItems = [
//         ...existingItems.slice(0, itemIndex),
//         updatedItem,
//         ...existingItems.slice(itemIndex + 1)
//       ];
      
//       // Save to local storage
//       const saveResult = await saveRemembranceItems(updatedItems);
      
//       if (saveResult) {
//         // Reset form
//         setSelectedImage(null);
//         setItemName('');
//         setPlace('');
//         setDescription('');
//         setReminderTime(null);
//         setItemId('');
        
//         showMessage({
//           message: 'Remembrance item updated successfully!',
//           type: 'success',
//         });
        
//         // Navigate back to RemembranceScreen with refresh flag
//         navigation.navigate('RemembranceScreen', { 
//           refresh: true 
//         });
//       } else {
//         showMessage({
//           message: 'Failed to update remembrance item.',
//           type: 'danger',
//         });
//       }
//     } catch (error) {
//       console.error('Error updating remembrance item:', error);
//       showMessage({
//         message: 'An error occurred while updating the item.',
//         type: 'danger',
//       });
//     }
//   };

//   return (
//     <React.Fragment>
//       <SecondHeader
//         navigation={navigation}
//         title="OFFLINE NOTEBOOK"
//         subTitle="OF YOUR DAILY ROUTINE HERE"
//         backButtonGradient={GradientColors.GREEN}
//         backButtonColor={'#A19495'}
//       />
//       <ScrollView
//         keyboardShouldPersistTaps='handled'
//         style={{
//           backgroundColor:
//             ThemeMode === 'dark'
//               ? ThemeColors.DARK_THEME_COLOR
//               : ThemeColors?.WHITE,
//         }}
//         contentContainerStyle={[
//           styles.ScrollViewContentContainerStyle,
//           {
//             backgroundColor:
//               ThemeMode === 'dark'
//                 ? ThemeColors.DARK_THEME_COLOR
//                 : ThemeColors?.WHITE,
//           },
//         ]}
//         showsVerticalScrollIndicator={false}>
//         <View
//           style={[
//             styles.MainContainer,
//             {
//               backgroundColor:
//                 ThemeMode === 'dark'
//                   ? ThemeColors.DARK_THEME_COLOR
//                   : ThemeColors?.WHITE,
//             },
//           ]}>
//           <TouchableOpacity
//             activeOpacity={0.7}
//             style={styles.AddItemContainer}
//             onPress={() => {
//               onPressImagePicker();
//             }}>
//             <View
//               style={[
//                 styles.AddItemContainerView,
//                 {
//                   paddingVertical: selectedImage == null ? 28 : 10,
//                   paddingHorizontal: selectedImage == null ? 0 : 10,
//                   backgroundColor:
//                     ThemeMode === 'dark'
//                       ? ThemeColors.DARK_THEME_COLOR
//                       : ThemeColors?.WHITE,
//                 },
//               ]}>
//               {selectedImage == null ? (
//                 <>
//                   <Image
//                     style={{ width: 100, height: 100 }}
//                     source={require('../../assets/images/take-a-photo.png')}
//                     resizeMode="contain"
//                   />
//                   <View
//                     style={[
//                       styles.TextView,
//                       {
//                         backgroundColor:
//                           ThemeMode === 'dark'
//                             ? ThemeColors.DARK_THEME_COLOR
//                             : ThemeColors?.WHITE,
//                       },
//                     ]}>
//                     <Text
//                       style={[
//                         styles.MainTitleText,
//                         {
//                           color:
//                             ThemeMode === 'dark'
//                               ? ThemeColors.WHITE
//                               : ThemeColors?.BLACK,
//                         },
//                       ]}>
//                       TAKE A PHOTO
//                     </Text>
//                     <Text
//                       style={[
//                         styles.SubTitleText,
//                         {
//                           color:
//                             ThemeMode === 'dark'
//                               ? ThemeColors.WHITE
//                               : ThemeColors?.BLACK,
//                         },
//                       ]}>
//                       OR BROWSE THE GALLERY
//                     </Text>
//                   </View>
//                 </>
//               ) : (
//                 <Image
//                   style={{ width: width - 60, height: 240, borderRadius: 20 }}
//                   source={selectedImage}
//                   resizeMode="cover"
//                 />
//               )}
//               {selectedImage != null && (
//                 <TouchableOpacity
//                   onPress={() => {
//                     setSelectedImage(null);
//                   }}
//                   style={styles.CrossIconView}>
//                   <EntypoIcon
//                     name="circle-with-cross"
//                     style={{ color: ThemeColors.BLACK }}
//                     size={25}
//                   />
//                 </TouchableOpacity>
//               )}
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[
//               styles.ItemViewContainer,
//               {
//                 backgroundColor:
//                   ThemeMode === 'dark'
//                     ? ThemeColors.DARK_THEME_COLOR
//                     : ThemeColors?.WHITE,
//               },
//             ]}>
//             <TextInput
//               value={itemName}
//               onFocus={() => {
//                 setIsFocusedName(true)
//                 setIsFocusedPlace(false)
//               }}
//               onBlur={() => { setTimeout(() => { setIsFocusedName(false) }, 1000) }}
//               onChangeText={value => setItemName(value)}
//               placeholderTextColor={
//                 ThemeMode === 'dark' ? ThemeColors?.WHITE : ThemeColors.GRAY
//               }
//               style={[
//                 styles.ItemViewTextBox,
//                 {
//                   backgroundColor:
//                     ThemeMode === 'dark'
//                       ? ThemeColors.DARK_THEME_COLOR
//                       : ThemeColors?.WHITE,
//                   color:
//                     ThemeMode === 'dark'
//                       ? ThemeColors.WHITE
//                       : ThemeColors?.BLACK,
//                 },
//               ]}
//               placeholder="ITEM NAME"
//             />
//           </TouchableOpacity>
//           {isFocusedName && remembrances.map(x => x.name).filter(item => item.toLowerCase().startsWith(itemName.toLowerCase())).length > 0 && (
//             <FlatList
//               keyboardShouldPersistTaps='handled'
//               nestedScrollEnabled
//               data={remembrances.map(x => x.name).filter(item => item.toLowerCase().startsWith(itemName.toLowerCase()))}
//               keyExtractor={(item, index) => index.toString()}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   onPress={() => {
//                     setItemName(item);
//                     setIsFocusedName(false);
//                     setIsFocusedPlace(false);
//                   }}
//                   style={styles.suggestionItem}
//                 >
//                   <Text style={styles.suggestionText}>{item}</Text>
//                 </TouchableOpacity>
//               )}
//               style={styles.suggestionsList}
//             />
//           )}
//           <TouchableOpacity
//             style={[
//               styles.ItemViewContainer,
//               {
//                 backgroundColor:
//                   ThemeMode === 'dark'
//                     ? ThemeColors.DARK_THEME_COLOR
//                     : ThemeColors?.WHITE,
//               },
//             ]}>
//             <TextInput
//               value={place}
//               onFocus={() => {
//                 setIsFocusedName(false)
//                 setIsFocusedPlace(true)
//               }}
//               onBlur={() => { setTimeout(() => { setIsFocusedPlace(false) }, 1000) }}
//               onChangeText={value => setPlace(value)}
//               placeholderTextColor={
//                 ThemeMode === 'dark' ? ThemeColors?.WHITE : ThemeColors.GRAY
//               }
//               style={[
//                 styles.ItemViewTextBox,
//                 {
//                   backgroundColor:
//                     ThemeMode === 'dark'
//                       ? ThemeColors.DARK_THEME_COLOR
//                       : ThemeColors?.WHITE,
//                   color:
//                     ThemeMode === 'dark'
//                       ? ThemeColors.WHITE
//                       : ThemeColors?.BLACK,
//                 },
//               ]}
//               placeholder="LAST PLACE"
//             />
//           </TouchableOpacity>
//           {isFocusedPlace && remembrances.map(x => x.place).filter(item => item.toLowerCase().startsWith(place.toLowerCase())).length > 0 && (
//             <FlatList
//               keyboardShouldPersistTaps='handled'
//               nestedScrollEnabled
//               data={remembrances.map(x => x.place).filter(item => item.toLowerCase().startsWith(place.toLowerCase()))}
//               keyExtractor={(item, index) => index.toString()}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   onPress={() => {
//                     setPlace(item);
//                     setIsFocusedName(false);
//                     setIsFocusedPlace(false);
//                   }}
//                   style={styles.suggestionItem}
//                 >
//                   <Text style={styles.suggestionText}>{item}</Text>
//                 </TouchableOpacity>
//               )}
//               style={styles.suggestionsList}
//             />
//           )}
//           <TouchableOpacity
//             style={[
//               styles.ItemViewContainer,
//               {
//                 backgroundColor:
//                   ThemeMode === 'dark'
//                     ? ThemeColors.DARK_THEME_COLOR
//                     : ThemeColors?.WHITE,
//               },
//             ]}
//             onPress={() => {
//               navigation.navigate('SetTimerForRemembranceItem', {
//                 value: reminderTime,
//               });
//             }}>
//             <View style={styles.ListTextView}>
//               <Text
//                 style={[
//                   styles.ListTitleText,
//                   {
//                     color:
//                       ThemeMode === 'dark'
//                         ? ThemeColors.WHITE
//                         : ThemeColors?.GRAY,
//                   },
//                 ]}>
//                 TIME
//               </Text>
//             </View>
//             <Text
//               style={[
//                 styles.ListTitleText,
//                 {
//                   color:
//                     ThemeMode === 'dark'
//                       ? ThemeColors.WHITE
//                       : ThemeColors?.BLACK,
//                 },
//               ]}>
//               {reminderTime && getFormatedTime(reminderTime)}
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[
//               styles.ItemViewContainer,
//               {
//                 backgroundColor:
//                   ThemeMode === 'dark'
//                     ? ThemeColors.DARK_THEME_COLOR
//                     : ThemeColors?.WHITE,
//                 height: 150,
//               },
//             ]}>
//             <TextInput
//               value={description}
//               onChangeText={value => setDescription(value)}
//               placeholderTextColor={
//                 ThemeMode === 'dark' ? ThemeColors?.WHITE : ThemeColors.GRAY
//               }
//               multiline={true}
//               style={[
//                 styles.ItemViewTextBox,
//                 {
//                   backgroundColor:
//                     ThemeMode === 'dark'
//                       ? ThemeColors.DARK_THEME_COLOR
//                       : ThemeColors?.WHITE,
//                   color:
//                     ThemeMode === 'dark'
//                       ? ThemeColors.WHITE
//                       : ThemeColors?.BLACK,
//                   height: 150,
//                   verticalAlign: 'top',
//                 },
//               ]}
//               placeholder="DESCRIPTION"
//             />
//           </TouchableOpacity>
//           <View style={styles.ButtonView}>
//             {itemId === '' ? (
//               <GradientButton
//                 title={`Continue`}
//                 onPress={handleOnPressContinue}
//               />
//             ) : (
//               <GradientButton title={`Update`} onPress={handleOnPressUpdate} />
//             )}
//           </View>
//         </View>
//       </ScrollView>
//     </React.Fragment>
//   );
// };

// export default CreateRemembranceItemScreen;


// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   TextInput,
//   Alert,
//   Platform,
//   ActionSheetIOS,
//   Dimensions,
//   FlatList,
// } from 'react-native';
// import styles from '../styles/CreateAddItemStyle';
// import SecondHeader from '../components/SecondHeader';
// import { GradientColors, ThemeColors } from '../utils/Theme';
// import GradientButton from '../components/GradientButton';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import EntypoIcon from 'react-native-vector-icons/Entypo';
// import { showMessage } from 'react-native-flash-message';
// import { getFormatedTime } from '../utils/Helper';
// import { useDispatch, useSelector } from 'react-redux';
// import * as reminderAction from '../actions/Reminder/ReminderAction';
// import moment from 'moment';
// import 'moment-timezone';
// const { width, height } = Dimensions.get('window');
// import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import PushNotification from 'react-native-push-notification';

// // Configure Push Notification
// PushNotification.configure({
//   onNotification: function (notification) {
//     console.log('NOTIFICATION:', notification);
//   },
//   popInitialNotification: true,
//   requestPermissions: Platform.OS === 'ios',
// });

// const CreateRemembranceItemScreen = ({ navigation, route }) => {
//   const dispatch = useDispatch();
//   const ThemeMode = useSelector(state => state.CommonReducer.themeMode);
//   const remembrances = useSelector(state => state.ReminderReducer.remembrances);

//   const {
//     id = '',
//     item = '',
//     tplace = '',
//     tdescription = '',
//     image = null,
//     time,
//   } = route?.params;
//   const options = ['Take a photo', 'Pick from gallery', 'Cancel'];

//   const [itemId, setItemId] = useState(id);
//   const [itemName, setItemName] = useState(item);
//   const [isFocusedName, setIsFocusedName] = useState(false);
//   const [description, setDescription] = useState(tdescription);
//   const [place, setPlace] = useState(tplace);
//   const [isFocusedPlace, setIsFocusedPlace] = useState(false);
//   const [reminderTime, setReminderTime] = useState(time);
//   const [selectedImage, setSelectedImage] = useState(image);

//   // Storage key for local data
//   const STORAGE_KEY = 'remembrance_items';

//   useEffect(() => {
//     setReminderTime(time);
//     // Create notification channel for Android
//     createNotificationChannel();
//   }, [time]);

//   // Create notification channel (Android only)
//   const createNotificationChannel = () => {
//     if (Platform.OS === 'android') {
//       PushNotification.createChannel(
//         {
//           channelId: 'remembrance-channel',
//           channelName: 'Remembrance Reminders',
//           channelDescription: 'Notifications for remembrance items',
//           playSound: true,
//           soundName: 'default',
//           importance: 4,
//           vibrate: true,
//         },
//         (created) => console.log(`Channel created: ${created}`)
//       );
//     }
//   };

//   // Schedule local notification
//   const scheduleNotification = (item) => {
//     const notificationId = parseInt(item.id.substring(0, 8), 36);
    
//     const reminderDate = new Date(item.time);
//     const now = new Date();
    
//     // If the reminder time is in the past, don't schedule
//     if (reminderDate <= now) {
//       console.log('Reminder time is in the past, skipping notification');
//       return;
//     }

//     PushNotification.localNotificationSchedule({
//       channelId: 'remembrance-channel',
//       id: notificationId,
//       title: 'Remembrance Reminder',
//       message: `Don't forget about: ${item.name}`,
//       date: reminderDate,
//       allowWhileIdle: true,
//       vibrate: true,
//       vibration: 300,
//       priority: 'high',
//       importance: 'high',
//       playSound: true,
//       soundName: 'default',
//     });

//     console.log(`Notification scheduled for: ${reminderDate}`);
//   };

//   // Cancel notification
//   const cancelNotification = (itemId) => {
//     const notificationId = parseInt(itemId.substring(0, 8), 36);
//     PushNotification.cancelLocalNotification(notificationId);
//   };

//   // Helper function to generate unique ID
//   const generateId = () => {
//     return Date.now().toString() + Math.random().toString(36).substr(2, 9);
//   };

//   // Save remembrance items to local storage
//   const saveRemembranceItems = async (items) => {
//     try {
//       await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
//       return true;
//     } catch (error) {
//       console.error('Error saving remembrance items:', error);
//       return false;
//     }
//   };

//   // Load remembrance items from local storage
//   const loadRemembranceItems = async () => {
//     try {
//       const items = await AsyncStorage.getItem(STORAGE_KEY);
//       return items ? JSON.parse(items) : [];
//     } catch (error) {
//       console.error('Error loading remembrance items:', error);
//       return [];
//     }
//   };

//   const onPressPickAnImage = async () => {
//     const permission = Platform.select({
//       ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
//       android: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
//     });
//     const result = await check(permission);
//     if (result === RESULTS.GRANTED) {
//       // Permission already granted
//     } else if (result === RESULTS.DENIED || result === RESULTS.BLOCKED) {
//       const requestResult = await request(permission);
//       if (requestResult === RESULTS.GRANTED) {
//         // Permission granted
//       } else {
//         showMessage({
//           message: 'Gallery permission is needed to select photos.',
//           type: 'warning',
//         });
//         return;
//       }
//     }

//     launchImageLibrary(
//       { mediaType: 'photo', includeBase64: true, quality: 0.5 },
//       response => {
//         if (!response.didCancel) {
//           setSelectedImage({
//             uri: response?.assets[0]?.uri,
//             base64: response?.assets[0]?.base64,
//           });
//         }
//       },
//     );
//   };

//   const onPressTakeAnImage = async () => {
//     const permission = Platform.select({
//       ios: PERMISSIONS.IOS.CAMERA,
//       android: PERMISSIONS.ANDROID.CAMERA,
//     });

//     const result = await check(permission);
//     if (result === RESULTS.GRANTED) {
//       // Permission already granted
//     }
//     else if (result === RESULTS.DENIED || result === RESULTS.BLOCKED) {
//       const requestResult = await request(permission);
//       if (requestResult === RESULTS.GRANTED) {
//         // Permission granted
//       } else {
//         showMessage({
//           message: 'Camera permission is needed to take pictures.',
//           type: 'warning',
//         });
//         return;
//       }
//     }

//     launchCamera(
//       { mediaType: 'photo', includeBase64: true, quality: 0.5 },
//       response => {
//         if (!response.didCancel) {
//           setSelectedImage({
//             uri: response?.assets[0]?.uri,
//             base64: response?.assets[0]?.base64,
//           });
//         }
//       },
//     );
//   };

//   const handlePressIOS = index => {
//     switch (index) {
//       case 0:
//         onPressTakeAnImage();
//         break;
//       case 1:
//         onPressPickAnImage();
//         break;
//       default:
//         break;
//     }
//   };

//   const showActionSheet = () => {
//     ActionSheetIOS.showActionSheetWithOptions(
//       {
//         options: options,
//         cancelButtonIndex: 2,
//         destructiveButtonIndex: -1,
//         title: 'Select an option',
//       },
//       handlePressIOS,
//     );
//   };

//   const onPressImagePicker = () => {
//     if (Platform?.OS === 'android') {
//       Alert.alert('Take a Photo', 'Please Select Any Option', [
//         { text: 'Cancel', onPress: () => { } },
//         {
//           text: 'Pick Image From Gallery',
//           onPress: () => {
//             onPressPickAnImage();
//           },
//         },
//         { text: 'Take An Image', onPress: () => onPressTakeAnImage() },
//       ]);
//     } else {
//       showActionSheet();
//     }
//   };

//   const handleOnPressContinue = async () => {
//     if (!selectedImage) {
//       showMessage({
//         message: 'Please Select Image',
//         type: 'danger',
//       });
//       return;
//     } else if (!itemName) {
//       showMessage({
//         message: 'Please Enter Item Name',
//         type: 'danger',
//       });
//       return;
//     } else if (!place) {
//       showMessage({
//         message: 'Please Enter Last Place',
//         type: 'danger',
//       });
//       return;
//     } else if (!reminderTime) {
//       showMessage({
//         message: 'Please Select Time',
//         type: 'danger',
//       });
//       return;
//     } else if (!description) {
//       showMessage({
//         message: 'Please Enter Description',
//         type: 'danger',
//       });
//       return;
//     }

//     try {
//       // Load existing items
//       const existingItems = await loadRemembranceItems();
      
//       // Create new item
//       const newItem = {
//         id: generateId(),
//         imageBase64: selectedImage?.base64,
//         name: itemName,
//         place: place,
//         time: new Date(reminderTime).getTime(),
//         description: description,
//         createdAt: new Date().toISOString(),
//       };

//       // Add new item to the list
//       const updatedItems = [...existingItems, newItem];
      
//       // Save to local storage
//       const saveResult = await saveRemembranceItems(updatedItems);
      
//       if (saveResult) {
//         // Schedule notification
//         scheduleNotification(newItem);
        
//         // Reset form
//         setSelectedImage(null);
//         setItemName('');
//         setPlace('');
//         setDescription('');
//         setReminderTime(null);
        
//         showMessage({
//           message: 'Remembrance item added successfully!',
//           type: 'success',
//         });
        
//         // Navigate back to RemembranceScreen with refresh flag
//         navigation.navigate('RemembranceScreen', { 
//           refresh: true 
//         });
//       } else {
//         showMessage({
//           message: 'Failed to save remembrance item.',
//           type: 'danger',
//         });
//       }
//     } catch (error) {
//       console.error('Error adding remembrance item:', error);
//       showMessage({
//         message: 'An error occurred while saving the item.',
//         type: 'danger',
//       });
//     }
//   };

//   const handleOnPressUpdate = async () => {
//     if (!selectedImage) {
//       showMessage({
//         message: 'Please Select Image',
//         type: 'danger',
//       });
//       return;
//     } else if (!itemName) {
//       showMessage({
//         message: 'Please Enter Item Name',
//         type: 'danger',
//       });
//       return;
//     } else if (!place) {
//       showMessage({
//         message: 'Please Enter Last Place',
//         type: 'danger',
//       });
//       return;
//     } else if (!reminderTime) {
//       showMessage({
//         message: 'Please Select Time',
//         type: 'danger',
//       });
//       return;
//     } else if (!description) {
//       showMessage({
//         message: 'Please Enter Description',
//         type: 'danger',
//       });
//       return;
//     }

//     try {
//       // Load existing items
//       const existingItems = await loadRemembranceItems();
      
//       // Find item index
//       const itemIndex = existingItems.findIndex(item => item.id === itemId);
      
//       if (itemIndex === -1) {
//         showMessage({
//           message: 'Item not found for update.',
//           type: 'danger',
//         });
//         return;
//       }

//       // Cancel existing notification
//       cancelNotification(itemId);

//       // Update item
//       const updatedItem = {
//         ...existingItems[itemIndex],
//         imageBase64: selectedImage?.base64 ? selectedImage?.base64 : existingItems[itemIndex].imageBase64,
//         name: itemName,
//         place: place,
//         time: new Date(reminderTime).getTime(),
//         description: description,
//         updatedAt: new Date().toISOString(),
//       };

//       // Create updated items array
//       const updatedItems = [
//         ...existingItems.slice(0, itemIndex),
//         updatedItem,
//         ...existingItems.slice(itemIndex + 1)
//       ];
      
//       // Save to local storage
//       const saveResult = await saveRemembranceItems(updatedItems);
      
//       if (saveResult) {
//         // Schedule updated notification
//         scheduleNotification(updatedItem);
        
//         // Reset form
//         setSelectedImage(null);
//         setItemName('');
//         setPlace('');
//         setDescription('');
//         setReminderTime(null);
//         setItemId('');
        
//         showMessage({
//           message: 'Remembrance item updated successfully!',
//           type: 'success',
//         });
        
//         // Navigate back to RemembranceScreen with refresh flag
//         navigation.navigate('RemembranceScreen', { 
//           refresh: true 
//         });
//       } else {
//         showMessage({
//           message: 'Failed to update remembrance item.',
//           type: 'danger',
//         });
//       }
//     } catch (error) {
//       console.error('Error updating remembrance item:', error);
//       showMessage({
//         message: 'An error occurred while updating the item.',
//         type: 'danger',
//       });
//     }
//   };

//   return (
//     <React.Fragment>
//       <SecondHeader
//         navigation={navigation}
//         title="OFFLINE NOTEBOOK"
//         subTitle="OF YOUR DAILY ROUTINE HERE"
//         backButtonGradient={GradientColors.GREEN}
//         backButtonColor={'#A19495'}
//       />
//       <ScrollView
//         keyboardShouldPersistTaps='handled'
//         style={{
//           backgroundColor:
//             ThemeMode === 'dark'
//               ? ThemeColors.DARK_THEME_COLOR
//               : ThemeColors?.WHITE,
//         }}
//         contentContainerStyle={[
//           styles.ScrollViewContentContainerStyle,
//           {
//             backgroundColor:
//               ThemeMode === 'dark'
//                 ? ThemeColors.DARK_THEME_COLOR
//                 : ThemeColors?.WHITE,
//           },
//         ]}
//         showsVerticalScrollIndicator={false}>
//         <View
//           style={[
//             styles.MainContainer,
//             {
//               backgroundColor:
//                 ThemeMode === 'dark'
//                   ? ThemeColors.DARK_THEME_COLOR
//                   : ThemeColors?.WHITE,
//             },
//           ]}>
//           <TouchableOpacity
//             activeOpacity={0.7}
//             style={styles.AddItemContainer}
//             onPress={() => {
//               onPressImagePicker();
//             }}>
//             <View
//               style={[
//                 styles.AddItemContainerView,
//                 {
//                   paddingVertical: selectedImage == null ? 28 : 10,
//                   paddingHorizontal: selectedImage == null ? 0 : 10,
//                   backgroundColor:
//                     ThemeMode === 'dark'
//                       ? ThemeColors.DARK_THEME_COLOR
//                       : ThemeColors?.WHITE,
//                 },
//               ]}>
//               {selectedImage == null ? (
//                 <>
//                   <Image
//                     style={{ width: 100, height: 100 }}
//                     source={require('../../assets/images/take-a-photo.png')}
//                     resizeMode="contain"
//                   />
//                   <View
//                     style={[
//                       styles.TextView,
//                       {
//                         backgroundColor:
//                           ThemeMode === 'dark'
//                             ? ThemeColors.DARK_THEME_COLOR
//                             : ThemeColors?.WHITE,
//                       },
//                     ]}>
//                     <Text
//                       style={[
//                         styles.MainTitleText,
//                         {
//                           color:
//                             ThemeMode === 'dark'
//                               ? ThemeColors.WHITE
//                               : ThemeColors?.BLACK,
//                         },
//                       ]}>
//                       TAKE A PHOTO
//                     </Text>
//                     <Text
//                       style={[
//                         styles.SubTitleText,
//                         {
//                           color:
//                             ThemeMode === 'dark'
//                               ? ThemeColors.WHITE
//                               : ThemeColors?.BLACK,
//                         },
//                       ]}>
//                       OR BROWSE THE GALLERY
//                     </Text>
//                   </View>
//                 </>
//               ) : (
//                 <Image
//                   style={{ width: width - 60, height: 240, borderRadius: 20 }}
//                   source={selectedImage}
//                   resizeMode="cover"
//                 />
//               )}
//               {selectedImage != null && (
//                 <TouchableOpacity
//                   onPress={() => {
//                     setSelectedImage(null);
//                   }}
//                   style={styles.CrossIconView}>
//                   <EntypoIcon
//                     name="circle-with-cross"
//                     style={{ color: ThemeColors.BLACK }}
//                     size={25}
//                   />
//                 </TouchableOpacity>
//               )}
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[
//               styles.ItemViewContainer,
//               {
//                 backgroundColor:
//                   ThemeMode === 'dark'
//                     ? ThemeColors.DARK_THEME_COLOR
//                     : ThemeColors?.WHITE,
//               },
//             ]}>
//             <TextInput
//               value={itemName}
//               onFocus={() => {
//                 setIsFocusedName(true)
//                 setIsFocusedPlace(false)
//               }}
//               onBlur={() => { setTimeout(() => { setIsFocusedName(false) }, 1000) }}
//               onChangeText={value => setItemName(value)}
//               placeholderTextColor={
//                 ThemeMode === 'dark' ? ThemeColors?.WHITE : ThemeColors.GRAY
//               }
//               style={[
//                 styles.ItemViewTextBox,
//                 {
//                   backgroundColor:
//                     ThemeMode === 'dark'
//                       ? ThemeColors.DARK_THEME_COLOR
//                       : ThemeColors?.WHITE,
//                   color:
//                     ThemeMode === 'dark'
//                       ? ThemeColors.WHITE
//                       : ThemeColors?.BLACK,
//                 },
//               ]}
//               placeholder="ITEM NAME"
//             />
//           </TouchableOpacity>
//           {isFocusedName && remembrances.map(x => x.name).filter(item => item.toLowerCase().startsWith(itemName.toLowerCase())).length > 0 && (
//             <FlatList
//               keyboardShouldPersistTaps='handled'
//               nestedScrollEnabled
//               data={remembrances.map(x => x.name).filter(item => item.toLowerCase().startsWith(itemName.toLowerCase()))}
//               keyExtractor={(item, index) => index.toString()}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   onPress={() => {
//                     setItemName(item);
//                     setIsFocusedName(false);
//                     setIsFocusedPlace(false);
//                   }}
//                   style={styles.suggestionItem}
//                 >
//                   <Text style={styles.suggestionText}>{item}</Text>
//                 </TouchableOpacity>
//               )}
//               style={styles.suggestionsList}
//             />
//           )}
//           <TouchableOpacity
//             style={[
//               styles.ItemViewContainer,
//               {
//                 backgroundColor:
//                   ThemeMode === 'dark'
//                     ? ThemeColors.DARK_THEME_COLOR
//                     : ThemeColors?.WHITE,
//               },
//             ]}>
//             <TextInput
//               value={place}
//               onFocus={() => {
//                 setIsFocusedName(false)
//                 setIsFocusedPlace(true)
//               }}
//               onBlur={() => { setTimeout(() => { setIsFocusedPlace(false) }, 1000) }}
//               onChangeText={value => setPlace(value)}
//               placeholderTextColor={
//                 ThemeMode === 'dark' ? ThemeColors?.WHITE : ThemeColors.GRAY
//               }
//               style={[
//                 styles.ItemViewTextBox,
//                 {
//                   backgroundColor:
//                     ThemeMode === 'dark'
//                       ? ThemeColors.DARK_THEME_COLOR
//                       : ThemeColors?.WHITE,
//                   color:
//                     ThemeMode === 'dark'
//                       ? ThemeColors.WHITE
//                       : ThemeColors?.BLACK,
//                 },
//               ]}
//               placeholder="LAST PLACE"
//             />
//           </TouchableOpacity>
//           {isFocusedPlace && remembrances.map(x => x.place).filter(item => item.toLowerCase().startsWith(place.toLowerCase())).length > 0 && (
//             <FlatList
//               keyboardShouldPersistTaps='handled'
//               nestedScrollEnabled
//               data={remembrances.map(x => x.place).filter(item => item.toLowerCase().startsWith(place.toLowerCase()))}
//               keyExtractor={(item, index) => index.toString()}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   onPress={() => {
//                     setPlace(item);
//                     setIsFocusedName(false);
//                     setIsFocusedPlace(false);
//                   }}
//                   style={styles.suggestionItem}
//                 >
//                   <Text style={styles.suggestionText}>{item}</Text>
//                 </TouchableOpacity>
//               )}
//               style={styles.suggestionsList}
//             />
//           )}
//           <TouchableOpacity
//             style={[
//               styles.ItemViewContainer,
//               {
//                 backgroundColor:
//                   ThemeMode === 'dark'
//                     ? ThemeColors.DARK_THEME_COLOR
//                     : ThemeColors?.WHITE,
//               },
//             ]}
//             onPress={() => {
//               navigation.navigate('SetTimerForRemembranceItem', {
//                 value: reminderTime,
//               });
//             }}>
//             <View style={styles.ListTextView}>
//               <Text
//                 style={[
//                   styles.ListTitleText,
//                   {
//                     color:
//                       ThemeMode === 'dark'
//                         ? ThemeColors.WHITE
//                         : ThemeColors?.GRAY,
//                   },
//                 ]}>
//                 TIME
//               </Text>
//             </View>
//             <Text
//               style={[
//                 styles.ListTitleText,
//                 {
//                   color:
//                     ThemeMode === 'dark'
//                       ? ThemeColors.WHITE
//                       : ThemeColors?.BLACK,
//                 },
//               ]}>
//               {reminderTime && getFormatedTime(reminderTime)}
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[
//               styles.ItemViewContainer,
//               {
//                 backgroundColor:
//                   ThemeMode === 'dark'
//                     ? ThemeColors.DARK_THEME_COLOR
//                     : ThemeColors?.WHITE,
//                 height: 150,
//               },
//             ]}>
//             <TextInput
//               value={description}
//               onChangeText={value => setDescription(value)}
//               placeholderTextColor={
//                 ThemeMode === 'dark' ? ThemeColors?.WHITE : ThemeColors.GRAY
//               }
//               multiline={true}
//               style={[
//                 styles.ItemViewTextBox,
//                 {
//                   backgroundColor:
//                     ThemeMode === 'dark'
//                       ? ThemeColors.DARK_THEME_COLOR
//                       : ThemeColors?.WHITE,
//                   color:
//                     ThemeMode === 'dark'
//                       ? ThemeColors.WHITE
//                       : ThemeColors?.BLACK,
//                   height: 150,
//                   verticalAlign: 'top',
//                 },
//               ]}
//               placeholder="DESCRIPTION"
//             />
//           </TouchableOpacity>
//           <View style={styles.ButtonView}>
//             {itemId === '' ? (
//               <GradientButton
//                 title={`Continue`}
//                 onPress={handleOnPressContinue}
//               />
//             ) : (
//               <GradientButton title={`Update`} onPress={handleOnPressUpdate} />
//             )}
//           </View>
//         </View>
//       </ScrollView>
//     </React.Fragment>
//   );
// };

// export default CreateRemembranceItemScreen;



import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Alert,
  Platform,
  ActionSheetIOS,
  Dimensions,
  FlatList,
  Linking,
} from 'react-native';
import styles from '../styles/CreateAddItemStyle';
import SecondHeader from '../components/SecondHeader';
import { GradientColors, ThemeColors } from '../utils/Theme';
import GradientButton from '../components/GradientButton';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { showMessage } from 'react-native-flash-message';
import { getFormatedTime } from '../utils/Helper';
import { useDispatch, useSelector } from 'react-redux';
import * as reminderAction from '../actions/Reminder/ReminderAction';
import moment from 'moment';
import 'moment-timezone';
const { width, height } = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';

// Configure Push Notification
PushNotification.configure({
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});

const CreateRemembranceItemScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const ThemeMode = useSelector(state => state.CommonReducer.themeMode);
  const remembrances = useSelector(state => state.ReminderReducer.remembrances);

  const {
    id = '',
    item = '',
    tplace = '',
    tdescription = '',
    image = null,
    time,
  } = route?.params;
  const options = ['Take a photo', 'Pick from gallery', 'Cancel'];

  const [itemId, setItemId] = useState(id);
  const [itemName, setItemName] = useState(item);
  const [isFocusedName, setIsFocusedName] = useState(false);
  const [description, setDescription] = useState(tdescription);
  const [place, setPlace] = useState(tplace);
  const [isFocusedPlace, setIsFocusedPlace] = useState(false);
  const [reminderTime, setReminderTime] = useState(time);
  const [selectedImage, setSelectedImage] = useState(image);

  // Storage key for local data
  const STORAGE_KEY = 'remembrance_items';

  useEffect(() => {
    setReminderTime(time);
    // Create notification channel for Android
    createNotificationChannel();
  }, [time]);

  // Create notification channel (Android only)
  const createNotificationChannel = () => {
    if (Platform.OS === 'android') {
      PushNotification.createChannel(
        {
          channelId: 'remembrance-channel',
          channelName: 'Remembrance Reminders',
          channelDescription: 'Notifications for remembrance items',
          playSound: true,
          soundName: 'default',
          importance: 4,
          vibrate: true,
        },
        (created) => console.log(`Channel created: ${created}`)
      );
    }
  };

  // Schedule local notification
  const scheduleNotification = (item) => {
    const notificationId = parseInt(item.id.substring(0, 8), 36);
    
    const reminderDate = new Date(item.time);
    const now = new Date();
    
    // If the reminder time is in the past, don't schedule
    if (reminderDate <= now) {
      console.log('Reminder time is in the past, skipping notification');
      return;
    }

    PushNotification.localNotificationSchedule({
      channelId: 'remembrance-channel',
      id: notificationId,
      title: 'Remembrance Reminder',
      message: `Don't forget about: ${item.name}`,
      date: reminderDate,
      allowWhileIdle: true,
      vibrate: true,
      vibration: 300,
      priority: 'high',
      importance: 'high',
      playSound: true,
      soundName: 'default',
    });

    console.log(`Notification scheduled for: ${reminderDate}`);
  };

  // Cancel notification
  const cancelNotification = (itemId) => {
    const notificationId = parseInt(itemId.substring(0, 8), 36);
    PushNotification.cancelLocalNotification(notificationId);
  };

  // Helper function to generate unique ID
  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  // Save remembrance items to local storage
  const saveRemembranceItems = async (items) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      return true;
    } catch (error) {
      console.error('Error saving remembrance items:', error);
      return false;
    }
  };

  // Load remembrance items from local storage
  const loadRemembranceItems = async () => {
    try {
      const items = await AsyncStorage.getItem(STORAGE_KEY);
      return items ? JSON.parse(items) : [];
    } catch (error) {
      console.error('Error loading remembrance items:', error);
      return [];
    }
  };

  // Handle permission errors
  const showPermissionAlert = (permissionType) => {
    Alert.alert(
      `Permission Required`,
      `Remembery needs ${permissionType} access to function properly. Please enable it in Settings.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Open Settings', 
          onPress: () => {
            if (Platform.OS === 'ios') {
              Linking.openURL('app-settings:');
            } else {
              Linking.openSettings();
            }
          }
        },
      ]
    );
  };

  const onPressPickAnImage = () => {
    launchImageLibrary(
      { 
        mediaType: 'photo', 
        includeBase64: true, 
        quality: 0.5,
        maxWidth: 1024,
        maxHeight: 1024,
      },
      response => {
        console.log('Image Picker Response:', response);
        
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
          
          // Handle permission errors
          if (response.errorCode === 'permission') {
            showPermissionAlert('photo library');
          } else {
            showMessage({
              message: `Error selecting image: ${response.errorMessage}`,
              type: 'danger',
            });
          }
        } else if (response.assets && response.assets.length > 0) {
          setSelectedImage({
            uri: response.assets[0].uri,
            base64: response.assets[0].base64,
          });
        }
      },
    );
  };

  const onPressTakeAnImage = () => {
    launchCamera(
      { 
        mediaType: 'photo', 
        includeBase64: true, 
        quality: 0.5,
        maxWidth: 1024,
        maxHeight: 1024,
        saveToPhotos: false,
      },
      response => {
        console.log('Camera Response:', response);
        
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorCode) {
          console.log('Camera Error: ', response.errorMessage);
          
          if (response.errorCode === 'permission') {
            showPermissionAlert('camera');
          } else {
            showMessage({
              message: `Error taking photo: ${response.errorMessage}`,
              type: 'danger',
            });
          }
        } else if (response.assets && response.assets.length > 0) {
          setSelectedImage({
            uri: response.assets[0].uri,
            base64: response.assets[0].base64,
          });
        }
      },
    );
  };

  const handlePressIOS = index => {
    switch (index) {
      case 0:
        onPressTakeAnImage();
        break;
      case 1:
        onPressPickAnImage();
        break;
      default:
        break;
    }
  };

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

  const handleOnPressContinue = async () => {
    if (!selectedImage) {
      showMessage({
        message: 'Please Select Image',
        type: 'danger',
      });
      return;
    } else if (!itemName) {
      showMessage({
        message: 'Please Enter Item Name',
        type: 'danger',
      });
      return;
    } else if (!place) {
      showMessage({
        message: 'Please Enter Last Place',
        type: 'danger',
      });
      return;
    } else if (!reminderTime) {
      showMessage({
        message: 'Please Select Time',
        type: 'danger',
      });
      return;
    } else if (!description) {
      showMessage({
        message: 'Please Enter Description',
        type: 'danger',
      });
      return;
    }

    try {
      // Load existing items
      const existingItems = await loadRemembranceItems();
      
      // Create new item
      const newItem = {
        id: generateId(),
        imageBase64: selectedImage?.base64,
        name: itemName,
        place: place,
        time: new Date(reminderTime).getTime(),
        description: description,
        createdAt: new Date().toISOString(),
      };

      // Add new item to the list
      const updatedItems = [...existingItems, newItem];
      
      // Save to local storage
      const saveResult = await saveRemembranceItems(updatedItems);
      
      if (saveResult) {
        // Schedule notification
        scheduleNotification(newItem);
        
        // Reset form
        setSelectedImage(null);
        setItemName('');
        setPlace('');
        setDescription('');
        setReminderTime(null);
        
        showMessage({
          message: 'Remembrance item added successfully!',
          type: 'success',
        });
        
        // Navigate back to RemembranceScreen with refresh flag
        navigation.navigate('RemembranceScreen', { 
          refresh: true 
        });
      } else {
        showMessage({
          message: 'Failed to save remembrance item.',
          type: 'danger',
        });
      }
    } catch (error) {
      console.error('Error adding remembrance item:', error);
      showMessage({
        message: 'An error occurred while saving the item.',
        type: 'danger',
      });
    }
  };

  const handleOnPressUpdate = async () => {
    if (!selectedImage) {
      showMessage({
        message: 'Please Select Image',
        type: 'danger',
      });
      return;
    } else if (!itemName) {
      showMessage({
        message: 'Please Enter Item Name',
        type: 'danger',
      });
      return;
    } else if (!place) {
      showMessage({
        message: 'Please Enter Last Place',
        type: 'danger',
      });
      return;
    } else if (!reminderTime) {
      showMessage({
        message: 'Please Select Time',
        type: 'danger',
      });
      return;
    } else if (!description) {
      showMessage({
        message: 'Please Enter Description',
        type: 'danger',
      });
      return;
    }

    try {
      // Load existing items
      const existingItems = await loadRemembranceItems();
      
      // Find item index
      const itemIndex = existingItems.findIndex(item => item.id === itemId);
      
      if (itemIndex === -1) {
        showMessage({
          message: 'Item not found for update.',
          type: 'danger',
        });
        return;
      }

      // Cancel existing notification
      cancelNotification(itemId);

      // Update item
      const updatedItem = {
        ...existingItems[itemIndex],
        imageBase64: selectedImage?.base64 ? selectedImage?.base64 : existingItems[itemIndex].imageBase64,
        name: itemName,
        place: place,
        time: new Date(reminderTime).getTime(),
        description: description,
        updatedAt: new Date().toISOString(),
      };

      // Create updated items array
      const updatedItems = [
        ...existingItems.slice(0, itemIndex),
        updatedItem,
        ...existingItems.slice(itemIndex + 1)
      ];
      
      // Save to local storage
      const saveResult = await saveRemembranceItems(updatedItems);
      
      if (saveResult) {
        // Schedule updated notification
        scheduleNotification(updatedItem);
        
        // Reset form
        setSelectedImage(null);
        setItemName('');
        setPlace('');
        setDescription('');
        setReminderTime(null);
        setItemId('');
        
        showMessage({
          message: 'Remembrance item updated successfully!',
          type: 'success',
        });
        
        // Navigate back to RemembranceScreen with refresh flag
        navigation.navigate('RemembranceScreen', { 
          refresh: true 
        });
      } else {
        showMessage({
          message: 'Failed to update remembrance item.',
          type: 'danger',
        });
      }
    } catch (error) {
      console.error('Error updating remembrance item:', error);
      showMessage({
        message: 'An error occurred while updating the item.',
        type: 'danger',
      });
    }
  };

  return (
    <React.Fragment>
      <SecondHeader
        navigation={navigation}
        title="OFFLINE NOTEBOOK"
        subTitle="OF YOUR DAILY ROUTINE HERE"
        backButtonGradient={GradientColors.GREEN}
        backButtonColor={'#A19495'}
      />
      <ScrollView
        keyboardShouldPersistTaps='handled'
        style={{
          backgroundColor:
            ThemeMode === 'dark'
              ? ThemeColors.DARK_THEME_COLOR
              : ThemeColors?.WHITE,
        }}
        contentContainerStyle={[
          styles.ScrollViewContentContainerStyle,
          {
            backgroundColor:
              ThemeMode === 'dark'
                ? ThemeColors.DARK_THEME_COLOR
                : ThemeColors?.WHITE,
          },
        ]}
        showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.MainContainer,
            {
              backgroundColor:
                ThemeMode === 'dark'
                  ? ThemeColors.DARK_THEME_COLOR
                  : ThemeColors?.WHITE,
            },
          ]}>
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
                  paddingVertical: selectedImage == null ? 28 : 10,
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
                    source={require('../../assets/images/take-a-photo.png')}
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
                      TAKE A PHOTO
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
                  style={{ width: width - 60, height: 240, borderRadius: 20 }}
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
              onFocus={() => {
                setIsFocusedName(true)
                setIsFocusedPlace(false)
              }}
              onBlur={() => { setTimeout(() => { setIsFocusedName(false) }, 1000) }}
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
              placeholder="ITEM NAME"
            />
          </TouchableOpacity>
          {isFocusedName && remembrances.map(x => x.name).filter(item => item.toLowerCase().startsWith(itemName.toLowerCase())).length > 0 && (
            <FlatList
              keyboardShouldPersistTaps='handled'
              nestedScrollEnabled
              data={remembrances.map(x => x.name).filter(item => item.toLowerCase().startsWith(itemName.toLowerCase()))}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setItemName(item);
                    setIsFocusedName(false);
                    setIsFocusedPlace(false);
                  }}
                  style={styles.suggestionItem}
                >
                  <Text style={styles.suggestionText}>{item}</Text>
                </TouchableOpacity>
              )}
              style={styles.suggestionsList}
            />
          )}
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
              value={place}
              onFocus={() => {
                setIsFocusedName(false)
                setIsFocusedPlace(true)
              }}
              onBlur={() => { setTimeout(() => { setIsFocusedPlace(false) }, 1000) }}
              onChangeText={value => setPlace(value)}
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
              placeholder="LAST PLACE"
            />
          </TouchableOpacity>
          {isFocusedPlace && remembrances.map(x => x.place).filter(item => item.toLowerCase().startsWith(place.toLowerCase())).length > 0 && (
            <FlatList
              keyboardShouldPersistTaps='handled'
              nestedScrollEnabled
              data={remembrances.map(x => x.place).filter(item => item.toLowerCase().startsWith(place.toLowerCase()))}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setPlace(item);
                    setIsFocusedName(false);
                    setIsFocusedPlace(false);
                  }}
                  style={styles.suggestionItem}
                >
                  <Text style={styles.suggestionText}>{item}</Text>
                </TouchableOpacity>
              )}
              style={styles.suggestionsList}
            />
          )}
          <TouchableOpacity
            style={[
              styles.ItemViewContainer,
              {
                backgroundColor:
                  ThemeMode === 'dark'
                    ? ThemeColors.DARK_THEME_COLOR
                    : ThemeColors?.WHITE,
              },
            ]}
            onPress={() => {
              navigation.navigate('SetTimerForRemembranceItem', {
                value: reminderTime,
              });
            }}>
            <View style={styles.ListTextView}>
              <Text
                style={[
                  styles.ListTitleText,
                  {
                    color:
                      ThemeMode === 'dark'
                        ? ThemeColors.WHITE
                        : ThemeColors?.GRAY,
                  },
                ]}>
                TIME
              </Text>
            </View>
            <Text
              style={[
                styles.ListTitleText,
                {
                  color:
                    ThemeMode === 'dark'
                      ? ThemeColors.WHITE
                      : ThemeColors?.BLACK,
                },
              ]}>
              {reminderTime && getFormatedTime(reminderTime)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.ItemViewContainer,
              {
                backgroundColor:
                  ThemeMode === 'dark'
                    ? ThemeColors.DARK_THEME_COLOR
                    : ThemeColors?.WHITE,
                height: 150,
              },
            ]}>
            <TextInput
              value={description}
              onChangeText={value => setDescription(value)}
              placeholderTextColor={
                ThemeMode === 'dark' ? ThemeColors?.WHITE : ThemeColors.GRAY
              }
              multiline={true}
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
                  height: 150,
                  verticalAlign: 'top',
                },
              ]}
              placeholder="DESCRIPTION"
            />
          </TouchableOpacity>
          <View style={styles.ButtonView}>
            {itemId === '' ? (
              <GradientButton
                title={`Continue`}
                onPress={handleOnPressContinue}
              />
            ) : (
              <GradientButton title={`Update`} onPress={handleOnPressUpdate} />
            )}
          </View>
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default CreateRemembranceItemScreen;
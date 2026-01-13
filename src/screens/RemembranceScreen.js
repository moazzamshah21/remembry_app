// import React, {useState} from 'react';
// import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
// import styles from '../styles/RemebranceItemStyle';
// import SecondHeader from '../components/SecondHeader';
// import {GradientColors, ThemeColors} from '../utils/Theme';
// import LinearGradient from 'react-native-linear-gradient';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Feather from 'react-native-vector-icons/Feather';
// import {AddCircleIcon} from '../../assets/svg/SvgIcons';
// import {useDispatch, useSelector} from 'react-redux';
// import {showMessage} from 'react-native-flash-message';
// import ReminderService from '../services/ReminderServices/ReminderService';
// import * as reminderAction from '../actions/Reminder/ReminderAction';
// import moment from 'moment';
// import 'moment-timezone';

// const RemembranceScreen = ({navigation, route}) => {
//   const remembrances = useSelector(state => state.ReminderReducer.remembrances);
//   const ThemeMode = useSelector(state => state.CommonReducer.themeMode);

//   const dispatch = useDispatch();

//   const formatDate = dateString => {
//     const date = new Date(dateString);

//     const day = date.getUTCDate();
//     const month = date.toLocaleString('default', {month: 'short'});
//     const hours = date.getUTCHours();
//     const minutes = date.getUTCMinutes().toString().padStart(2, '0');

//     const suffix =
//       day === 1 || day === 21 || day === 31
//         ? 'st'
//         : day === 2 || day === 22
//         ? 'nd'
//         : day === 3 || day === 23
//         ? 'rd'
//         : 'th';

//     const formattedTime = new Intl.DateTimeFormat('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true,
//       timeZone: 'UTC',
//     }).format(date);

//     return `${day}${suffix} ${month} at ${formattedTime}`;
//   };

//   const handleOnPressDelete = async item => {
//     var response = await ReminderService.DeleteItem(item?._id);
//     if (response && response.success === true) {
//       dispatch(reminderAction.fetchAllRemembranceItems());
//       showMessage({
//         message: response?.message,
//         type: 'success',
//       });
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
//               navigation.navigate('CreateRemembranceItem', {
//                 item: '',
//                 time: null,
//               });
//             }}>
//             <LinearGradient
//               colors={GradientColors.GREEN}
//               start={{x: 0, y: 0}}
//               end={{x: 0, y: 1}}
//               style={styles.LinearGradientContainer}>
//               <AddCircleIcon />
//               <View style={styles.TextView}>
//                 <Text style={styles.MainTitleText}>
//                   ADD OFFLINE NOTEBOOK ITEMS
//                 </Text>
//                 <Text style={styles.SubTitleText}>
//                   OF YOUR DAILY ROUTINE HERE
//                 </Text>
//               </View>
//             </LinearGradient>
//           </TouchableOpacity>
//           {remembrances.map((item, index) => (
//             <View
//               style={[
//                 styles.ImageViewContainer,
//                 {
//                   borderWidth: 1,
//                   borderColor:
//                     ThemeMode === 'dark' ? '#707070' : ThemeColors?.WHITE,
//                   backgroundColor:
//                     ThemeMode === 'dark'
//                       ? ThemeColors.DARK_THEME_COLOR
//                       : ThemeColors?.WHITE,
//                 },
//               ]}>
//               <Image
//                 resizeMode="cover"
//                 style={styles.ImageView}
//                 source={{uri: item.image}}
//               />
//               <View style={styles.ImageBoxView}>
//                 <View style={styles.ImageTextView}>
//                   <Text
//                     style={[
//                       {
//                         color:
//                           ThemeMode === 'dark'
//                             ? ThemeColors.WHITE
//                             : ThemeColors?.BLACK,
//                       },
//                       styles.ImageTitleText,
//                     ]}>
//                     {item?.name}
//                   </Text>
//                   <Text style={styles.ImageSubTitleText}>
//                     Last Record{' '}
//                     {moment(
//                       new Date(item.reminderTime),
//                       'DD-MMM-YYYY, hh:mm A',
//                     ).format('DD-MMM-YYYY, hh:mm A')}
//                   </Text>
//                 </View>
//                 <View style={{flexDirection: 'row'}}>
//                   <TouchableOpacity
//                     style={styles.EditBox}
//                     onPress={() => {
//                       navigation.navigate('CreateRemembranceItem', {
//                         id: item._id,
//                         item: item.name,
//                         tplace: item.place,
//                         tdescription: item.description,
//                         time: item.reminderTime,
//                         image: {uri: item.image},
//                       });
//                     }}>
//                     <Feather
//                       name="edit"
//                       style={{
//                         color:
//                           ThemeMode === 'dark'
//                             ? ThemeColors?.WHITE
//                             : ThemeColors.DARK_THEME_COLOR,
//                       }}
//                       size={24}
//                     />
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     style={styles.DeleteBox}
//                     onPress={() => {
//                       handleOnPressDelete(item);
//                     }}>
//                     <AntDesign
//                       name="delete"
//                       style={{
//                         color: ThemeColors.WHITE,
//                       }}
//                       size={20}
//                     />
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           ))}
//         </View>
//       </ScrollView>
//     </React.Fragment>
//   );
// };

// export default RemembranceScreen;


import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image, Alert} from 'react-native';
import styles from '../styles/RemebranceItemStyle';
import SecondHeader from '../components/SecondHeader';
import {GradientColors, ThemeColors} from '../utils/Theme';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {AddCircleIcon} from '../../assets/svg/SvgIcons';
import {useDispatch, useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import * as reminderAction from '../actions/Reminder/ReminderAction';
import moment from 'moment';
import 'moment-timezone';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';


const RemembranceScreen = ({navigation, route}) => {
  const remembrances = useSelector(state => state.ReminderReducer.remembrances);
  const ThemeMode = useSelector(state => state.CommonReducer.themeMode);

  const dispatch = useDispatch();
  const [localRemembrances, setLocalRemembrances] = useState([]);

  // Storage key for local data
  const STORAGE_KEY = 'remembrance_items';

  // Load remembrance items from local storage
  const loadRemembranceItems = async () => {
    try {
      const items = await AsyncStorage.getItem(STORAGE_KEY);
      const parsedItems = items ? JSON.parse(items) : [];
      setLocalRemembrances(parsedItems);
      return parsedItems;
    } catch (error) {
      console.error('Error loading remembrance items:', error);
      return [];
    }
  };

  // // Delete remembrance item from local storage
  // const handleOnPressDelete = async (item) => {
  //   Alert.alert(
  //     'Delete Item',
  //     'Are you sure you want to delete this item?',
  //     [
  //       { text: 'Cancel', style: 'cancel' },
  //       {
  //         text: 'Delete',
  //         style: 'destructive',
  //         onPress: async () => {
  //           try {
  //             const existingItems = await loadRemembranceItems();
  //             const updatedItems = existingItems.filter(i => i.id !== item.id);
              
  //             await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
  //             setLocalRemembrances(updatedItems);
              
  //             showMessage({
  //               message: 'Item deleted successfully',
  //               type: 'success',
  //             });
  //           } catch (error) {
  //             console.error('Error deleting item:', error);
  //             showMessage({
  //               message: 'Error deleting item',
  //               type: 'danger',
  //             });
  //           }
  //         },
  //       },
  //     ]
  //   );
  // };

  // Delete remembrance item from local storage
const handleOnPressDelete = async (item) => {
  Alert.alert(
    'Delete Item',
    'Are you sure you want to delete this item?',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            // Cancel the notification first
            const cancelNotification = (itemId) => {
              const notificationId = parseInt(itemId.substring(0, 8), 36);
              PushNotification.cancelLocalNotification(notificationId);
              console.log(`Notification cancelled for item: ${itemId}`);
            };
            
            cancelNotification(item.id);
            
            const existingItems = await loadRemembranceItems();
            const updatedItems = existingItems.filter(i => i.id !== item.id);
            
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
            setLocalRemembrances(updatedItems);
            
            showMessage({
              message: 'Item deleted successfully',
              type: 'success',
            });
          } catch (error) {
            console.error('Error deleting item:', error);
            showMessage({
              message: 'Error deleting item',
              type: 'danger',
            });
          }
        },
      },
    ]
  );
};

  // Format date for display - use the same format as your API items
  const formatDate = (timestamp) => {
    return moment(timestamp).format('DD-MMM-YYYY, hh:mm A');
  };

  // Get the last record date for footer
  const getLastRecord = () => {
    if (localRemembrances.length === 0) return null;
    const sortedItems = [...localRemembrances].sort((a, b) => new Date(b.time) - new Date(a.time));
    return sortedItems[0].time;
  };

  // Refresh data when screen comes into focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadRemembranceItems();
    });

    loadRemembranceItems();

    return unsubscribe;
  }, [navigation]);

  // Also refresh when route params indicate refresh
  useEffect(() => {
    if (route.params?.refresh) {
      loadRemembranceItems();
      // Clear the refresh param
      navigation.setParams({ refresh: false });
    }
  }, [route.params?.refresh]);

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
              navigation.navigate('CreateRemembranceItem', {
                item: '',
                time: null,
              });
            }}>
            <LinearGradient
              colors={GradientColors.GREEN}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              style={styles.LinearGradientContainer}>
              <AddCircleIcon />
              <View style={styles.TextView}>
                <Text style={styles.MainTitleText}>
                  ADD OFFLINE NOTEBOOK ITEMS
                </Text>
                <Text style={styles.SubTitleText}>
                  OF YOUR DAILY ROUTINE HERE
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Show local items with "Last Record" format */}
          {localRemembrances.map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.ImageViewContainer,
                {
                  borderWidth: 1,
                  borderColor:
                    ThemeMode === 'dark' ? '#707070' : ThemeColors?.WHITE,
                  backgroundColor:
                    ThemeMode === 'dark'
                      ? ThemeColors.DARK_THEME_COLOR
                      : ThemeColors?.WHITE,
                },
              ]}>
              {item.imageBase64 ? (
                <Image
                  resizeMode="cover"
                  style={styles.ImageView}
                  source={{uri: `data:image/jpeg;base64,${item.imageBase64}`}}
                />
              ) : (
                <View style={[styles.ImageView, {backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center'}]}>
                  <Text style={{color: ThemeColors.GRAY}}>No Image</Text>
                </View>
              )}
              <View style={styles.ImageBoxView}>
                <View style={styles.ImageTextView}>
                  <Text
                    style={[
                      {
                        color:
                          ThemeMode === 'dark'
                            ? ThemeColors.WHITE
                            : ThemeColors?.BLACK,
                      },
                      styles.ImageTitleText,
                    ]}>
                    {item?.name}
                  </Text>
                  {/* Changed to "Last Record" format like your API items */}
                  <Text style={styles.ImageSubTitleText}>
                    Last Record {formatDate(item.time)}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={styles.EditBox}
                    onPress={() => {
                      navigation.navigate('CreateRemembranceItem', {
                        id: item.id,
                        item: item.name,
                        tplace: item.place,
                        tdescription: item.description,
                        time: item.time,
                        image: item.imageBase64 ? {uri: `data:image/jpeg;base64,${item.imageBase64}`} : null,
                      });
                    }}>
                    <Feather
                      name="edit"
                      style={{
                        color:
                          ThemeMode === 'dark'
                            ? ThemeColors?.WHITE
                            : ThemeColors.DARK_THEME_COLOR,
                      }}
                      size={24}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.DeleteBox}
                    onPress={() => {
                      handleOnPressDelete(item);
                    }}>
                    <AntDesign
                      name="delete"
                      style={{
                        color: ThemeColors.WHITE,
                      }}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}

          {/* Show API items (keeping your original API items) */}
          {remembrances.map((item, index) => (
            <View
              key={item._id}
              style={[
                styles.ImageViewContainer,
                {
                  borderWidth: 1,
                  borderColor:
                    ThemeMode === 'dark' ? '#707070' : ThemeColors?.WHITE,
                  backgroundColor:
                    ThemeMode === 'dark'
                      ? ThemeColors.DARK_THEME_COLOR
                      : ThemeColors?.WHITE,
                },
              ]}>
              <Image
                resizeMode="cover"
                style={styles.ImageView}
                source={{uri: item.image}}
              />
              <View style={styles.ImageBoxView}>
                <View style={styles.ImageTextView}>
                  <Text
                    style={[
                      {
                        color:
                          ThemeMode === 'dark'
                            ? ThemeColors.WHITE
                            : ThemeColors?.BLACK,
                      },
                      styles.ImageTitleText,
                    ]}>
                    {item?.name}
                  </Text>
                  <Text style={styles.ImageSubTitleText}>
                    Last Record{' '}
                    {moment(
                      new Date(item.reminderTime),
                      'DD-MMM-YYYY, hh:mm A',
                    ).format('DD-MMM-YYYY, hh:mm A')}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={styles.EditBox}
                    onPress={() => {
                      navigation.navigate('CreateRemembranceItem', {
                        id: item._id,
                        item: item.name,
                        tplace: item.place,
                        tdescription: item.description,
                        time: item.reminderTime,
                        image: {uri: item.image},
                      });
                    }}>
                    <Feather
                      name="edit"
                      style={{
                        color:
                          ThemeMode === 'dark'
                            ? ThemeColors?.WHITE
                            : ThemeColors.DARK_THEME_COLOR,
                      }}
                      size={24}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.DeleteBox}
                    onPress={() => {
                      // You can keep or remove the original delete for API items
                      // handleOnPressDelete(item);
                    }}>
                    <AntDesign
                      name="delete"
                      style={{
                        color: ThemeColors.WHITE,
                      }}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}

          {/* Last Record Footer - Only show if there are items */}
          {(localRemembrances.length > 0 || remembrances.length > 0) && (
            <View style={styles.footer}>
              <Text style={[
                styles.footerText,
                { 
                  color: ThemeMode === 'dark' ? ThemeColors.WHITE : ThemeColors.GRAY 
                }
              ]}>
                Last Record {formatDate(getLastRecord())}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default RemembranceScreen;
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import styles from '../styles/LocateItemDetailStyle';
import SecondHeader from '../components/SecondHeader';
import { GradientColors, ThemeColors } from '../utils/Theme';
import RadioButton from '../components/RadioButton';
import { useDispatch, useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ReminderService from '../services/ReminderServices/ReminderService';
import { showMessage } from 'react-native-flash-message';
import * as reminderAction from '../actions/Reminder/ReminderAction';
import MapView, { Marker } from 'react-native-maps';
const { width, height } = Dimensions.get('window');

const LocateItemDetailScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const ThemeMode = useSelector(state => state.CommonReducer.themeMode);
  const { item } = route.params;

  const handleOnPressDelete = async () => {
    var response = await ReminderService.DeleteItem(item?._id);
    if (response && response.success === true) {
      dispatch(reminderAction.fetchAllFeeds());
      dispatch(reminderAction.fetchAllReminders());
      dispatch(reminderAction.fetchAllUnplannedStopsReminders());
      showMessage({
        message: response?.message,
        type: 'success',
      });
      navigation.goBack();
    } else {
      showMessage({
        message: response?.message,
        type: 'danger',
      });
    }
  };

  const ASPECT_RATIO = width / height;
  const LATITUDE = 37.78825;
  const LONGITUDE = -122.4324;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  return (
    <React.Fragment>
      <SecondHeader
        navigation={navigation}
        title="LOCATE ITEMS"
        subTitle="OF YOUR DAILY ROUTINE HERE"
        backButtonGradient={GradientColors.GREEN}
        backButtonColor={'#5da441'}
      />
      <ScrollView
      style={{backgroundColor: ThemeMode === 'dark'
        ? ThemeColors.DARK_THEME_COLOR
        : ThemeColors?.WHITE}}
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
                ThemeMode === 'dark' ? ThemeColors.DARK_THEME_COLOR : '#F5F5F5',
            },
          ]}>
          <View style={styles.TitleView}>
            <Text
              style={[
                styles.TitleText,
                {
                  color:
                    ThemeMode === 'dark'
                      ? ThemeColors.WHITE
                      : ThemeColors?.BLACK,
                },
              ]}>
              LOCATE ITEMS
            </Text>
          </View>

          <View
            style={[
              {
                borderWidth: 1,
                borderColor:
                  ThemeMode === 'dark' ? '#707070' : ThemeColors?.WHITE,
                backgroundColor:
                  ThemeMode === 'dark'
                    ? ThemeColors.DARK_THEME_COLOR
                    : ThemeColors?.WHITE,
              },
              styles.ImageViewContainer,
            ]}>
            {item?.longitude != 0 &&
              item?.latitude != 0 &&
              item?.reminderType == 30 ? (
              <View style={styles.container}>
                <MapView
                  zoomControlEnabled={false}
                  scrollEnabled={false}
                  loadingEnabled={true}
                  loadingIndicatorColor={ThemeColors?.PRIMARY_COLOR}
                  loadingBackgroundColor="#eeeeee"
                  style={styles.map}
                  region={{
                    latitude: item?.latitude,
                    longitude: item?.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  initialRegion={{
                    latitude: item?.latitude,
                    longitude: item?.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}>
                  <Marker
                    coordinate={{
                      latitude: item?.latitude,
                      longitude: item?.longitude,
                    }}
                    title={'Marker Title'}
                    description={'Marker Description'}
                  />
                </MapView>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("TrackItem", { item })
                  }}
                  activeOpacity={0.7}
                  style={{
                    height: 40,
                    borderRadius: 10,
                    width: 100,
                    backgroundColor: ThemeColors.PRIMARY_COLOR,
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    right: 10,
                    bottom: 10
                  }}>
                  <Text style={[styles.ImageTitleText, { color: ThemeColors.WHITE }]}>Track</Text>
                </TouchableOpacity>
              </View>
            ) : null}

            {item.reminderType == 10 && (
              <Image
                style={[
                  styles.ImageView,
                  {
                    marginTop: item.reminderType == 30 ? 10 : 0,
                  },
                ]}
                source={{ uri: item.image }}
              />
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
                <Text
                  style={[
                    {
                      color:
                        ThemeMode === 'dark'
                          ? ThemeColors.WHITE
                          : ThemeColors?.BLACK,
                    },
                    styles.ImageTitleText2,
                  ]}>
                  {item?.place}
                </Text>
                <Text style={styles.ImageSubTitleText}>
                  ({new Date(item?.reminderTime).toLocaleString()})
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.DeleteBox}
                  onPress={handleOnPressDelete}>
                  <AntDesign
                    name="delete"
                    style={{
                      color: ThemeColors.WHITE,
                    }}
                    size={30}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default LocateItemDetailScreen;

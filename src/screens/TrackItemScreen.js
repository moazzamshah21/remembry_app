import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Dimensions,
  Platform
} from 'react-native';
import styles from '../styles/TrackItemStyle';
import SecondHeader from '../components/SecondHeader';
import { GradientColors, ThemeColors } from '../utils/Theme';
import { useDispatch, useSelector } from 'react-redux';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { showLoader, hideLoader } from '../actions/Common/CommonAction'
import { GOOGLE_API_KEY } from '../utils/Config';
const { width, height } = Dimensions.get('window');
import axios from 'axios';

const TrackItemScreen = ({ navigation, route }) => {

  const dispatch = useDispatch();

  const [userLocation, setUserLocation] = useState(null);
  const [coords, setCoords] = useState([]);

  const fetchRoute = async (origin, destination) => {
    try {
      
      const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${GOOGLE_API_KEY}`);
      const points = decodePolyline(response.data.routes[0].overview_polyline.points);
      setCoords(points);
    } catch (error) {
      console.error(error);
    }
  };

  const decodePolyline = (encoded) => {
    let points = [];
    let index = 0, len = encoded.length;
    let lat = 0, lng = 0;

    while (index < len) {
      let b, shift = 0, result = 0;
      do {
        b = encoded.charAt(index++).charCodeAt(0) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charAt(index++).charCodeAt(0) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lng += dlng;

      points.push({
        latitude: (lat / 1e5),
        longitude: (lng / 1e5)
      });
    }

    return points;
  };

  useEffect(() => {
    dispatch(showLoader());
    if (Platform.OS == 'ios') {
      Geolocation.requestAuthorization('whenInUse').then(status => {
        if (status === 'granted') {
          Geolocation.getCurrentPosition(
            position => {
              const { latitude, longitude } = position.coords;
              setUserLocation({ latitude, longitude });
              fetchRoute(
                {
                  latitude,
                  longitude
                },
                {
                  latitude: item?.latitude,
                  longitude: item?.longitude,
                });
              dispatch(hideLoader());
            },
            error => {
              dispatch(hideLoader());
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
          );
        }
      });
    } else {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          fetchRoute(
            {
              latitude,
              longitude
            },
            {
              latitude: item?.latitude,
              longitude: item?.longitude,
            });
          dispatch(hideLoader());
        },
        error => {
          dispatch(hideLoader());
          showMessage({
            message: 'error getting location',
            type: 'danger',
          });
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    }
  }, [])

  const ThemeMode = useSelector(state => state.CommonReducer.themeMode);
  const { item } = route.params;

  return (
    <React.Fragment>
      <SecondHeader
        navigation={navigation}
        title="LOCATE ITEMS"
        subTitle="TRACK YOUR ITEM HERE"
        backButtonGradient={GradientColors.GREEN}
        backButtonColor={'#5da441'}
      />
      <View style={styles.container}>
        <MapView
          zoomControlEnabled={true}
          scrollEnabled={true}
          loadingEnabled={true}
          showsCompass
          followsUserLocation
          showsUserLocation
          loadingIndicatorColor={ThemeColors?.PRIMARY_COLOR}
          loadingBackgroundColor="#eeeeee"
          style={styles.map}
          region={{
            latitude: item?.latitude,
            longitude: item?.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {userLocation &&
            <Marker coordinate={userLocation} title="Your Location" />
          }
          <Marker
            coordinate={{
              latitude: item?.latitude,
              longitude: item?.longitude,
            }}
            title={'Stop Location'}
          />
          <Polyline
            coordinates={coords}
            strokeColor={ThemeColors.PRIMARY_COLOR} // fallback for when `strokeColors` is not supported by the map-provider
            strokeColors={GradientColors.GREEN}
            strokeWidth={3}
          />
        </MapView>
      </View>
    </React.Fragment>
  );
};

export default TrackItemScreen;

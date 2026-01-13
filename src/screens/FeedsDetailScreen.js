import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
  useColorScheme,
} from 'react-native';
import styles from '../styles/FeedsDetailStyle';
import SecondHeader from '../components/SecondHeader';
import FeedsItem from '../components/FeedsItem';
import ReminderService from '../services/ReminderServices/ReminderService';
import {showMessage} from 'react-native-flash-message';
import {ThemeColors} from '../utils/Theme';
import {useSelector} from 'react-redux';
const {width, height} = Dimensions.get('window');

const FeedsDetailScreen = ({navigation, route}) => {
  const {data, focus = false} = route.params;

  const [comments, setComments] = useState([]);
  const ThemeMode = useSelector(state => state.CommonReducer.themeMode);

  const onLoad = async () => {
    var response = await ReminderService.GetAllFeedComment({
      reminderId: data._id,
    });

    if (response.success) {
      setComments(response.feedComment);
    }
  };

  useEffect(() => {
    onLoad();
  }, [data._id]);

  const handleOnSubmitEditing = async (id, text) => {
    var response = await ReminderService.AddFeedComment({
      reminderId: id,
      text: text,
    });
    if (response.success) {
      onLoad();
      showMessage({
        message: response?.message,
        type: 'success',
      });
    } else {
      showMessage({
        message: response?.message,
        type: 'danger',
      });
    }
  };

  return (
    <React.Fragment>
      <SecondHeader title={'Feeds'} navigation={navigation} />
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
          <FeedsItem
            hideComments={true}
            item={data}
            index={0}
            navigation={navigation}
            comments={comments}
            onSubmitEditing={handleOnSubmitEditing}
            onCommentDelete={() => {
              onLoad();
            }}
            focus={focus}
          />
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default FeedsDetailScreen;

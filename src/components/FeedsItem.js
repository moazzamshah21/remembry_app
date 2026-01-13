import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ThemeColors, ThemeFonts } from '../utils/Theme';
import KeyboardStickyView from 'rn-keyboard-sticky-view';
import { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from 'react-redux';
import ReminderService from '../services/ReminderServices/ReminderService';
import * as reminderAction from '../actions/Reminder/ReminderAction';

const { width, height } = Dimensions.get('window');

const FeedsItem = ({
  item,
  navigation,
  index,
  hideComments,
  onSubmitEditing,
  onCommentDelete,
  comments = [],
  focus = false,
}) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(item);
  const [commentCount, setCommentCount] = useState(data?.commentCount);
  const [commentsData, setCommentsData] = useState(comments);
  const ThemeMode = useSelector(state => state.CommonReducer.themeMode);

  const timeAgo = postedDate => {
    const now = new Date();
    const posted = new Date(postedDate);
    const seconds = Math.floor((now - posted) / 1000);
    if (seconds < 60) {
      return `Posted ${seconds} seconds ago`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `Posted ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `Posted ${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (seconds < 604800) {
      const days = Math.floor(seconds / 86400);
      return `Posted ${days} day${days > 1 ? 's' : ''} ago`;
    } else if (seconds < 2419200) {
      const weeks = Math.floor(seconds / 604800);
      return `Posted ${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (seconds < 31536000) {
      const months = Math.floor(seconds / 2419200);
      return `Posted ${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(seconds / 31536000);
      return `Posted ${years} year${years > 1 ? 's' : ''} ago`;
    }
  };

  const user = useSelector(state => state.CommonReducer.user);

  useEffect(() => {
    if (JSON.stringify(comments) != JSON.stringify(commentsData)) {
      setCommentsData(comments);
    }
  }, [comments]);

  useEffect(() => {
    if (JSON.stringify(item) != JSON.stringify(item)) {
      setData(item);
    }
  }, [item]);

  const initials =
    data?.userId?.fullName?.split(' ').length > 1
      ? data?.userId?.fullName
        ?.split(' ')
        ?.map(word => word[0])
        ?.join('')
        ?.substring(0, 2)
      : data?.userId?.fullName
        ?.split('')
        ?.map(word => word[0])
        ?.join('')
        ?.substring(0, 2);

  const nameGetFirstTwoLetter = value => {
    return value?.split(' ').length > 1
      ? value
        ?.split(' ')
        ?.map(word => word[0])
        ?.join('')
        ?.substring(0, 2)
        .toUpperCase()
      : value
        ?.split('')
        ?.map(word => word[0])
        ?.join('')
        ?.substring(0, 2)
        .toUpperCase();
  };

  const [value, setValue] = React.useState('');

  const onPressDelete = async id => {
    var response = await ReminderService.DeleteComment(id);
    if (response && response.success === true) {
      showMessage({
        message: response?.message,
        type: 'success',
      });
      if (onCommentDelete) {
        setCommentCount(commentCount - 1);
        dispatch(reminderAction.fetchAllFeeds());
        onCommentDelete();
      }
    } else {
      showMessage({
        message: response?.message,
        type: 'danger',
      });
    }
  };

  const handleOnPressDeleteFeed = async (item) => {
    var response = await ReminderService.DeleteItem(item?._id);
    if (response && response.success === true) {
      dispatch(reminderAction.fetchAllFeeds());
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

  }

  return (
    <View style={{ marginVertical: 20 }}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          flexGrow: 1,
          paddingHorizontal: 25,
        }}>
        <View style={{ flexDirection: 'row', flexGrow: 1, }}>
          <View style={styles.RoundImageView}>
            <Text style={styles.ShortNameTExt}>{initials?.toUpperCase()}</Text>
          </View>
          <View style={{ justifyContent: 'center', marginLeft: 10 }}>
            <Text
              style={[
                styles.NameTExt,
                {
                  color:
                    ThemeMode === 'dark'
                      ? ThemeColors?.WHITE
                      : ThemeColors?.BLACK,
                },
              ]}>
              {data?.userId?.fullName}
            </Text>
            <Text
              style={[
                styles.TimeText,
                {
                  color:
                    ThemeMode === 'dark'
                      ? ThemeColors?.WHITE
                      : ThemeColors?.BLACK,
                },
              ]}>
              {timeAgo(item?.createdAt)}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.RoundSecondItem,
            {
              backgroundColor: ThemeMode === 'dark' ? '#3EFF00' : '#D6D2D2',
              marginRight: (user?._id == data?.userId?._id || user?.roles?.includes("Admin")) ? 10 : 0,
            },
          ]}
          onPress={() => {
            Linking.openURL(`tel:${data?.userId?.phoneNumber}`);
          }}>
          <FontAwesome6
            name="phone"
            style={{
              color:
                ThemeMode === 'dark' ? ThemeColors?.WHITE : ThemeColors.BLACK,
            }}
            size={20}
          />
        </TouchableOpacity>
        {
          (user?._id == data?.userId?._id || user?.roles?.includes("Admin")) &&
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.RoundSecondItem,
              {
                backgroundColor: ThemeMode === 'dark' ? '#3EFF00' : '#D6D2D2',
              },
            ]}
            onPress={() => { handleOnPressDeleteFeed(data) }}>
            <AntDesign
              name="delete"
              style={{
                color:
                  ThemeMode === 'dark' ? ThemeColors?.WHITE : ThemeColors.BLACK,
              }}
              size={20}
            />
          </TouchableOpacity>
        }

      </View>
      <View style={{ paddingHorizontal: 25, marginTop: 20 }}>
        <Text
          style={[
            styles.LostWalletText,
            {
              color:
                ThemeMode === 'dark' ? ThemeColors?.WHITE : ThemeColors?.BLACK,
            },
          ]}>
          {data?.name}
        </Text>
        <View style={{ marginTop: 10 }}>
          <Text
            style={[
              styles.DescriptionText,
              {
                color:
                  ThemeMode === 'dark'
                    ? ThemeColors?.WHITE
                    : ThemeColors?.BLACK,
              },
            ]}>
            Phone:
            <Text
              style={{
                color: ThemeColors?.DARK_GRAY,
                color:
                  ThemeMode === 'dark'
                    ? ThemeColors?.WHITE
                    : ThemeColors?.BLACK,
              }}>
              {' '}
              {data?.userId?.phoneNumber}
            </Text>
          </Text>
          <Text
            style={[
              styles.DescriptionText,
              {
                color:
                  ThemeMode === 'dark'
                    ? ThemeColors?.WHITE
                    : ThemeColors?.DARK_GRAY,
              },
            ]}>
            Email:
            <Text
              style={{
                color:
                  ThemeMode === 'dark'
                    ? ThemeColors?.WHITE
                    : ThemeColors?.DARK_GRAY,
              }}>
              {' '}
              {data?.userId?.email}
            </Text>
          </Text>
        </View>
        <View>
          <Image
            source={{ uri: data?.image }}
            style={{
              width: width,
              height: width - 70,
              alignSelf: 'center',
            }}
            resizeMode="cover"
          />
          <Text
            style={[
              styles.viewedText,
              {
                color:
                  ThemeMode === 'dark'
                    ? ThemeColors?.WHITE
                    : ThemeColors?.BLACK,
              },
            ]}>
            {commentCount} people commmented
          </Text>
          {hideComments && (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text
                style={[
                  styles.commentsText,
                  {
                    color:
                      ThemeMode === 'dark'
                        ? ThemeColors?.WHITE
                        : ThemeColors?.BLACK,
                  },
                ]}>
                hide comments
              </Text>
              <View style={{ marginLeft: 20 }}>
                <AntDesign name="up" size={10} color={ThemeColors?.DARK_GRAY} />
              </View>
            </TouchableOpacity>
          )}
          {!hideComments && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('FeedsDetailScreen', { data: data });
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text
                style={[
                  styles.commentsText,
                  {
                    color:
                      ThemeMode === 'dark' ? '#3EFF00' : ThemeColors?.BLACK,
                  },
                ]}>
                Show comments
              </Text>
              <View style={{ marginLeft: 20 }}>
                <AntDesign
                  name="down"
                  size={10}
                  color={ThemeColors?.DARK_GRAY}
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
        {hideComments && (
          <View style={{ marginTop: 20, marginBottom: 20 }}>
            {commentsData.map((e, i) => {
              return (
                <View
                  style={styles.CommentSectionView}
                  key={`comment-item-${i}`}>
                  <View style={{ position: 'absolute', bottom: -10 }}>
                    <Image
                      source={require('../../assets/images/triangle.png')}
                      style={{ width: 28, height: 34 }}
                      resizeMode="contain"
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: 10,
                      marginBottom: 10,
                    }}>
                    <View style={styles.RoundImageViewTwo}>
                      <Text style={styles.ShortNameTExt2}>
                        {nameGetFirstTwoLetter(e.userId.fullName)}
                      </Text>
                    </View>
                    <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                      <Text style={styles.NameTExtTwo}>
                        {e.userId.fullName}
                      </Text>
                      <Text style={styles.TimeText}>
                        {timeAgo(e?.createdAt)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.WhiteDividerView} />
                  <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
                    <Text style={styles.CommentMainText}>{e.text}</Text>
                  </View>
                  {user?._id == e?.userId?._id && (
                    <View style={{ position: 'absolute', top: 10, right: 10 }}>
                      <TouchableOpacity
                        onPress={() => {
                          onPressDelete(e?._id);
                        }}>
                        <AntDesign name="delete" size={18} color={'red'} />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        )}
        {hideComments && (
          <View>
            <TouchableOpacity
              style={[
                styles.AddACommentView,
                {
                  backgroundColor:
                    ThemeMode === 'dark'
                      ? ThemeColors?.DARK_THEME_COLOR
                      : ThemeColors?.WHITE,
                },
              ]}>
              <KeyboardStickyView
                style={[
                  styles.keyboardView,
                  {
                    backgroundColor:
                      ThemeMode === 'dark'
                        ? ThemeColors?.DARK_THEME_COLOR
                        : ThemeColors?.WHITE,
                    borderColor: ThemeColors?.WHITE,
                    borderWidth: ThemeMode === 'dark' ? 1 : 0,
                    borderRadius: 30,
                  },
                ]}>
                <TextInput
                  autoFocus={focus}
                  value={value}
                  onChangeText={setValue}
                  placeholder="Add a comment"
                  placeholderTextColor={
                    ThemeMode == 'dark' ? ThemeColors?.WHITE : ThemeColors?.GRAY
                  }
                  style={[
                    styles.input,
                    {
                      backgroundColor:
                        ThemeMode === 'dark'
                          ? ThemeColors?.DARK_THEME_COLOR
                          : ThemeColors?.WHITE,
                      color:
                        ThemeMode === 'dark'
                          ? ThemeColors?.WHITE
                          : ThemeColors?.DARK_THEME_COLOR,
                    },
                  ]}
                  onSubmitEditing={() => {
                    if (!value) {
                      showMessage({
                        message: 'Please Enter Comment',
                        type: 'danger',
                      });
                      return;
                    }
                    if (onSubmitEditing) {
                      setCommentCount(commentCount + 1);
                      onSubmitEditing(item._id, value);
                      setValue('');
                    }
                  }}
                />
              </KeyboardStickyView>
            </TouchableOpacity>
          </View>
        )}
        {!hideComments && (
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('FeedsDetailScreen', {
                  data: data,
                  focus: true,
                });
              }}
              style={[
                styles.AddACommentView,
                {
                  backgroundColor:
                    ThemeMode === 'dark'
                      ? ThemeColors?.DARK_THEME_COLOR
                      : ThemeColors?.WHITE,
                  borderColor: ThemeColors?.WHITE,
                  borderWidth: ThemeMode === 'dark' ? 1 : 0,
                },
              ]}>
              <Text
                style={{
                  color:
                    ThemeMode === 'dark'
                      ? ThemeColors?.WHITE
                      : ThemeColors?.DARK_THEME_COLOR,
                }}>
                Add a comment
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default FeedsItem;

const styles = StyleSheet.create({
  CreateAddView: {
    width: width - 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: '#6DA75B',
    borderWidth: 1,
    borderStyle: 'dashed',
    paddingVertical: 15,
    marginTop: 25,
  },
  CreateAddText: {
    color: '#6DA75B',
    fontFamily: ThemeFonts.REGULAR,
    fontSize: 15,
    marginLeft: 20,
  },
  RoundImageView: {
    width: 53,
    height: 53,
    borderRadius: 25,
    backgroundColor: ThemeColors?.WHITE,
    borderColor: ThemeColors?.BLACK,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  NameTExt: {
    color: ThemeColors?.BLACK,
    fontFamily: ThemeFonts.MEDIUM,
    fontSize: 13,
  },
  ShortNameTExt: {
    color: ThemeColors?.BLACK,
    fontFamily: ThemeFonts.SEMI_BOLD,
    fontSize: 22,
  },
  ShortNameTExt2: {
    color: ThemeColors?.BLACK,
    fontFamily: ThemeFonts.SEMI_BOLD,
    fontSize: 14,
  },
  TimeText: {
    color: ThemeColors?.DARK_GRAY,
    fontFamily: ThemeFonts.REGULAR,
    fontSize: 8,
    marginTop: -5,
  },
  RoundSecondItem: {
    width: 53,
    height: 53,
    borderRadius: 25,
    backgroundColor: '#D6D2D2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  LostWalletText: {
    color: ThemeColors?.BLACK,
    fontFamily: ThemeFonts.MEDIUM,
    fontSize: 13,
  },
  DescriptionText: {
    color: '#748D6C',
    fontFamily: ThemeFonts.MEDIUM,
    fontSize: 10,
  },
  viewedText: {
    color: ThemeColors?.DARK_GRAY,
    fontFamily: ThemeFonts.REGULAR,
    fontSize: 8,
    marginTop: 5,
  },
  commentsText: {
    color: ThemeColors?.BLACK,
    fontFamily: ThemeFonts.REGULAR,
    fontSize: 10,
    textDecorationLine: 'underline',
  },
  AddACommentView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width - 50,
    alignSelf: 'center',
    height: 50,
    borderRadius: 30,
    backgroundColor: ThemeColors?.WHITE,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: ThemeColors.GRAY,
    shadowOpacity: 1,
    elevation: 5,
    shadowRadius: 5,
    marginTop: 10,
  },
  AddACommentText: {
    color: ThemeColors?.BLACK,
    fontFamily: ThemeFonts.REGULAR,
    fontSize: 10,
  },
  CommentSectionView: {
    backgroundColor: '#D6D2D2',
    width: width - 120,
    borderRadius: 15,
    paddingVertical: 15,
    marginBottom: 30,
  },
  RoundImageViewTwo: {
    width: 32,
    height: 32,
    borderRadius: 25,
    backgroundColor: ThemeColors?.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  NameTExtTwo: {
    color: ThemeColors?.BLACK,
    fontFamily: ThemeFonts.MEDIUM,
    fontSize: 9,
  },
  TimeTextTwo: {
    color: ThemeColors?.DARK_GRAY,
    fontFamily: ThemeFonts.REGULAR,
    fontSize: 5,
    marginTop: -5,
  },
  WhiteDividerView: {
    height: 1,
    width: width - 140,
    backgroundColor: ThemeColors?.WHITE,
    alignSelf: 'center',
  },
  CommentMainText: {
    color: ThemeColors?.BLACK,
    fontFamily: ThemeFonts.REGULAR,
    fontSize: 10,
  },
  input: {
    height: 40,
    borderRadius: 25,
    backgroundColor: 'red',
    color: ThemeColors?.BLACK,
    fontFamily: ThemeFonts.REGULAR,
    fontSize: 10,
    width: '90%',
    textAlign: 'center',
  },
});

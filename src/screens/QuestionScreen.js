import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import styles from '../styles/QuestionStyle';
import { ThemeColors, ThemeFonts } from '../utils/Theme';
import { useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import GradientButton from '../components/GradientButton';
import UserService from '../services/UserServices/UserService';
import { CommonActions } from '@react-navigation/native';

const QuestionScreen = ({ navigation, route }) => {
  const ThemeMode = useSelector(state => state.CommonReducer.themeMode);
  const [Answer1, setAnswer1] = useState('');
  const [Answer2, setAnswer2] = useState('');
  const [Answer3, setAnswer3] = useState('');
  const [Answer4, setAnswer4] = useState('');
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  const RadioButton = ({ selected, onPress, label }) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.radioButtonContainer}>
        <View style={styles.radioButton}>
          {selected && <View style={styles.radioButtonSelected} />}
        </View>
        <Text style={styles.radioButtonLabel}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <React.Fragment>
      <ScrollView
        style={{
          backgroundColor:
            ThemeMode === 'dark'
              ? ThemeColors.DARK_THEME_COLOR
              : ThemeColors?.WHITE,
        }}
        contentContainerStyle={styles.ScrollViewContentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <View style={styles.MainContainer}>
          <View
            style={{
              paddingVertical: 20,
            }}>
            <Text
              style={{
                fontFamily: ThemeFonts.SEMI_BOLD,
                fontSize: 22,
                textAlign: 'center',
                color: ThemeColors.BLACK,
              }}>
              ANSWER THE FOLLOWING
            </Text>
          </View>
          <View>
            <View style={styles.QuestionMainContainer}>
              <Text style={styles.QuestionAMinText}>
                Q1. What is the sole purpose you look forward to use the application for?
              </Text>
            </View>
            <View
              style={[
                styles.QuestionMainContainer,
                {
                  marginTop: 10,
                  paddingVertical: 0,
                  paddingHorizontal: 0,
                  height: 150,
                },
              ]}>
              <TextInput
                value={Answer1}
                onChangeText={value => setAnswer1(value)}
                placeholderTextColor={
                  ThemeMode === 'dark'
                    ? ThemeColors?.WHITE
                    : ThemeColors.DARK_GRAY
                }
                multiline
                style={[
                  styles.NewBoxTextInput,
                  {
                    height: 150,
                    backgroundColor:
                      ThemeMode === 'dark'
                        ? ThemeColors.DARK_THEME_COLOR
                        : ThemeColors?.WHITE,
                    color:
                      ThemeMode === 'dark'
                        ? ThemeColors.WHITE
                        : ThemeColors?.BLACK,
                    borderRadius: 30,
                    paddingHorizontal: 10,
                    verticalAlign: 'top',
                  },
                ]}
                placeholder="WRITE AN ANSWER"
              />
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <View style={styles.QuestionMainContainer}>
              <Text style={styles.QuestionAMinText}>
                Q2. What is your biggest pain point when it comes to managing your daily tasks?
              </Text>
            </View>
            <View
              style={[
                styles.QuestionMainContainer,
                {
                  marginTop: 10,
                  paddingVertical: 0,
                  paddingHorizontal: 0,
                  height: 150,
                },
              ]}>
              <TextInput
                value={Answer2}
                onChangeText={value => setAnswer2(value)}
                placeholderTextColor={
                  ThemeMode === 'dark'
                    ? ThemeColors?.WHITE
                    : ThemeColors.DARK_GRAY
                }
                multiline
                style={[
                  styles.NewBoxTextInput,
                  {
                    height: 150,
                    backgroundColor:
                      ThemeMode === 'dark'
                        ? ThemeColors.DARK_THEME_COLOR
                        : ThemeColors?.WHITE,
                    color:
                      ThemeMode === 'dark'
                        ? ThemeColors.WHITE
                        : ThemeColors?.BLACK,
                    borderRadius: 30,
                    paddingHorizontal: 10,
                    verticalAlign: 'top',
                  },
                ]}
                placeholder="WRITE AN ANSWER"
              />
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <View style={styles.QuestionMainContainer}>
              <Text style={styles.QuestionAMinText}>
                Q3. What are the daily life usage items you forgot most frequently?
              </Text>
            </View>
            <View
              style={[
                styles.QuestionMainContainer,
                {
                  marginTop: 10,
                  paddingVertical: 0,
                  paddingHorizontal: 0,
                  height: 150,
                },
              ]}>
              <TextInput
                value={Answer3}
                onChangeText={value => setAnswer3(value)}
                placeholderTextColor={
                  ThemeMode === 'dark'
                    ? ThemeColors?.WHITE
                    : ThemeColors.DARK_GRAY
                }
                multiline
                style={[
                  styles.NewBoxTextInput,
                  {
                    height: 150,
                    backgroundColor:
                      ThemeMode === 'dark'
                        ? ThemeColors.DARK_THEME_COLOR
                        : ThemeColors?.WHITE,
                    color:
                      ThemeMode === 'dark'
                        ? ThemeColors.WHITE
                        : ThemeColors?.BLACK,
                    borderRadius: 30,
                    paddingHorizontal: 10,
                    verticalAlign: 'top',
                  },
                ]}
                placeholder="WRITE AN ANSWER"
              />
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <View style={styles.QuestionMainContainer}>
              <Text style={styles.QuestionAMinText}>
                Q4. How often do you anticipate using the app on a daily basis?
              </Text>
            </View>
            <View
              style={[
                styles.QuestionMainContainer,
                {
                  marginTop: 10,
                  paddingVertical: 0,
                  paddingHorizontal: 0,
                  height: 150,
                },
              ]}>
              <TextInput
                value={Answer4}
                onChangeText={value => setAnswer4(value)}
                placeholderTextColor={
                  ThemeMode === 'dark'
                    ? ThemeColors?.WHITE
                    : ThemeColors.DARK_GRAY
                }
                multiline
                style={[
                  styles.NewBoxTextInput,
                  {
                    height: 150,
                    backgroundColor:
                      ThemeMode === 'dark'
                        ? ThemeColors.DARK_THEME_COLOR
                        : ThemeColors?.WHITE,
                    color:
                      ThemeMode === 'dark'
                        ? ThemeColors.WHITE
                        : ThemeColors?.BLACK,
                    borderRadius: 30,
                    paddingHorizontal: 10,
                    verticalAlign: 'top',
                  },
                ]}
                placeholder="WRITE AN ANSWER"
              />
            </View>
          </View>
          <View
            style={{
              marginVertical: 10,
            }}>
            <GradientButton
              disabled={
                (Answer1 == '' || Answer2 == '' || Answer3 == '' || Answer4 == '') ? true : false
              }
              title={'CONTINUE'}
              onPress={async () => {
                var payload = {
                  answer1: Answer1,
                  answer2: Answer2,
                  answer3: Answer3,
                  answer4: Answer4,
                };
                var response = await UserService.UserSubmitAnswer(payload);
                if (response.success) {
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [
                        { name: 'SignIn' },
                        {
                          name: 'TimerScreen',
                        },
                      ],
                    }),
                  );
                } else {
                  showMessage({
                    message: response?.message,
                    type: 'danger',
                  });
                }
              }}
            />
          </View>
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default QuestionScreen;

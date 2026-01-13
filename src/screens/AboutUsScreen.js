import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  useColorScheme,
} from 'react-native';
import styles from '../styles/AboutUsStyle';
import SecondHeader from '../components/SecondHeader';
import {GradientColors, ThemeColors} from '../utils/Theme';
import {useSelector} from 'react-redux';

const AboutUsScreen = ({navigation, route}) => {
  const ThemeMode = useSelector(state => state.CommonReducer.themeMode);
  return (
    <React.Fragment>
      <SecondHeader
        navigation={navigation}
        title="ABOUT"
        subTitle=""
        backButtonGradient={GradientColors.GREEN}
        backButtonColor={'#5da441'}
      />
      <ScrollView
      style={{backgroundColor: ThemeMode === 'dark'
        ? ThemeColors.DARK_THEME_COLOR
        : ThemeColors?.WHITE}}
        contentContainerStyle={styles.ScrollViewContentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.MainContainer,
            {
              backgroundColor:
                ThemeMode === 'dark'
                  ? ThemeColors?.DARK_THEME_COLOR
                  : ThemeColors?.WHITE,
            },
          ]}>
          <Text
            style={[
              styles.PageTitle,
              {
                color:
                  ThemeMode === 'dark'
                    ? ThemeColors?.WHITE
                    : ThemeColors?.BLACK,
              },
            ]}>
            MISSION & VISION STATEMENT
          </Text>
          <Text
            style={[
              styles.PageSubTitle,
              {
                color:
                  ThemeMode === 'dark'
                    ? ThemeColors?.WHITE
                    : ThemeColors?.BLACK,
              },
            ]}>
            Our mission at REMEMBERY is simply to make your life easier by
            helping you remember important things. Whether it’s your keys,
            appointments, or daily tasks, we’re here to support you every step
            of the way. With our easy-to-use app, we aim to take the stress out
            of remembering so you can focus on what truly matters. Join us on
            our mission to simplify your life and never lose track of important
            items or events again with REMEMBERY!
          </Text>
          <Text
            style={[
              styles.PageTitle,
              {
                color:
                  ThemeMode === 'dark'
                    ? ThemeColors?.WHITE
                    : ThemeColors?.BLACK,
              },
            ]}>
            ABOUT THE APP
          </Text>
          <Text
            style={[
              styles.PageSubTitle,
              {
                color:
                  ThemeMode === 'dark'
                    ? ThemeColors?.WHITE
                    : ThemeColors?.BLACK,
              },
            ]}>
            REMEMBERY was founded in November of 2023 by Louis Bonito, a
            visionary engineer with over two decades of experience in the
            technology industry. Drawing from his deep understanding of user
            needs and technology, Louis set out to create a solution that would
            revolutionize the way we manage our memories. We are committed to
            delivering high-quality, reliable apps that make a meaningful
            difference in the lives of our users. With REMEMBERY, you can trust
            that your memory is in good hands. We understand the frustration of
            forgetting important things. That’s why we’re committed to providing
            innovative solutions to help you find what you need when you need
            it. Our mission is simple to provide a user-friendly app that
            empowers you to regain control of your daily routine. Join us and
            discover how REMEMBERY can make a difference for you!
          </Text>
          {/* <Text
            style={[
              styles.PageTitle,
              {
                color:
                  ThemeMode === 'dark'
                    ? ThemeColors?.WHITE
                    : ThemeColors?.BLACK,
              },
            ]}>
            APP VERSION
          </Text>
          <Text
            style={[
              styles.PageSubTitle2,
              {
                color:
                  ThemeMode === 'dark'
                    ? ThemeColors?.WHITE
                    : ThemeColors?.BLACK,
              },
            ]}>
            Designed by digitalsoftwarelabs.com
          </Text> */}
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default AboutUsScreen;

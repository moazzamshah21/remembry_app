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
import styles from '../styles/UserManualStyle';
import SecondHeader from '../components/SecondHeader';
import {GradientColors, ThemeColors} from '../utils/Theme';
import {useSelector} from 'react-redux';

const UserManualScreen = ({navigation, route}) => {
  const ThemeMode = useSelector(state => state.CommonReducer.themeMode);

  const PageTitle = [
    styles.PageTitle,
    {
      color: ThemeMode === 'dark' ? ThemeColors?.WHITE : ThemeColors?.BLACK,
    },
  ];
  const PageTitleSub = [
    styles.PageTitleSub,
    {
      color: ThemeMode === 'dark' ? ThemeColors?.WHITE : ThemeColors?.BLACK,
    },
  ];
  const PageSubTitle = [
    styles.PageSubTitle,
    {
      color: ThemeMode === 'dark' ? ThemeColors?.WHITE : ThemeColors?.BLACK,
    },
  ];

  return (
    <React.Fragment>
      <SecondHeader
        navigation={navigation}
        title="USER MANUAL"
        subTitle=""
        backButtonGradient={GradientColors.GREEN}
        backButtonColor={'#5da441'}
      />
      <ScrollView
        style={{
          backgroundColor:
            ThemeMode === 'dark'
              ? ThemeColors.DARK_THEME_COLOR
              : ThemeColors?.WHITE,
        }}
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
          <Text style={PageTitle}>WELCOME TO REMEMBERY!</Text>
          <Text style={PageSubTitle}>
            Thank you for choosing Remembery, the reminder app designed to help
            you keep track of daily items and appointments. This quick guide
            will help you get started and make the most of Remembery.
          </Text>
          <Text style={PageTitle}>GETTING STARTED</Text>
          <Text style={PageTitleSub}>1. Download and Install</Text>
          <Text style={PageSubTitle}>
            ● iOS: Visit the App Store and search for "Remembery."
          </Text>
          <Text style={PageSubTitle}>
            ● Android: Visit the Google Play Store, search for "Remembery," and
            tap "Install."
          </Text>
          <Text style={PageSubTitle}>
            ● Allow necessary permissions (location, notifications)
          </Text>

          {/* ================================================================================= */}

          <Text style={PageTitleSub}>2. Create an Account</Text>
          <Text style={PageSubTitle}>● Open the app and tap 'Sign Up' or you can continue through your Google or Apple account</Text>
          <Text style={PageSubTitle}>
            ● Enter your email address, create a password, and fill in any other
            required information.
          </Text>
          <Text style={PageSubTitle}>
            ● Verify your email address via the link sent to your inbox.
          </Text>
          <Text style={PageSubTitle}>
            ● Enable “Finger Print” (Android) or “Face ID” (iOS)
          </Text>
          <Text style={PageSubTitle}>
            ● Verify your email address via the link sent to your inbox.
          </Text>

          {/* ================================================================================= */}

          <Text style={PageTitleSub}>3. Set up Your Profile</Text>
          <Text style={PageSubTitle}>
            ● Tap on your profile icon in the top right corner.
          </Text>
          <Text style={PageSubTitle}>
            ● Add a profile picture and update your personal information as
            needed.
          </Text>

          {/* ================================================================================= */}

          <Text style={PageTitleSub} />
          <Text style={PageTitleSub}>Main Features</Text>
          <Text style={PageTitleSub} />

          <Text style={PageTitleSub}>4. Add Items</Text>
          <Text style={PageSubTitle}>
            ● Tap on the "+" tab to add an item in case it is not in a default
            item list.
          </Text>
          <Text style={PageSubTitle}>● Select from the default list.</Text>
          <Text style={PageSubTitle}>
            ● Snap items picture and enter the necessary details (Place, Time
            for Reminder).
          </Text>
          <Text style={PageSubTitle}>
            ● Follow the same to add as much items as you can (depending upon
            your subscription)
          </Text>

          {/* ================================================================================= */}

          <Text style={PageTitleSub}>5. Daily Schedule</Text>
          <Text style={PageSubTitle}>● Tap on the "Daily Schedules" tab</Text>
          <Text style={PageSubTitle}>
            ● Tap on the available dates on the calendar to add a “Schedule".
          </Text>
          <Text style={PageSubTitle}>
            ● Enter details (Schedule name, schedule place, time).
          </Text>
          <Text style={PageSubTitle}>● Save the appointment.</Text>

          {/* ================================================================================= */}

          <Text style={PageTitleSub}>6. Unplanned Stops</Text>
          <Text style={PageSubTitle}>● Tap on the "Unplanned Stops" tab</Text>
          <Text style={PageSubTitle}>
            ● Select from the list of default locations.
          </Text>
          <Text style={PageSubTitle}>
            ● In case of tap "Others" to set other location
          </Text>
          <Text style={PageSubTitle}>
            ● Enter the necessary details (Item, Stop/Fetch location from map,
            Time)
          </Text>
          <Text style={PageSubTitle}>
            ● Tap "Continue" to save "Unplanned Stop"
          </Text>

          {/* ================================================================================= */}

          <Text style={PageTitleSub}>7. Locate items</Text>
          <Text style={PageSubTitle}>● Tap on the "Locate items" tab.</Text>
          <Text style={PageSubTitle}>
            ● Select from the list of default items.
          </Text>
          <Text style={PageSubTitle}>
            ● Tap on the item you need to look for.
          </Text>
          <Text style={PageSubTitle}>
            ● Follow the date, time (and location) shown on the screen to look
            for the lost item.
          </Text>
          <Text style={PageSubTitle}>
            ● Replace the location of the items once found.
          </Text>

          {/* ================================================================================= */}

          <Text style={PageTitleSub}>8. Notebook (offline mode)</Text>
          <Text style={PageSubTitle}>● Tap on the "Notebook" tab.</Text>
          <Text style={PageSubTitle}>
            ● Add your videos, images, schedules, stops, items, locations etc
            when you're offline.
          </Text>
          <Text style={PageSubTitle}>
            ● Once the application is back online, your notes will be added to
            their specific features automatically
          </Text>

          {/* ================================================================================= */}

          <Text style={PageTitleSub} />
          <Text style={PageTitleSub}>9. Hamburger Menu</Text>
          <Text style={PageTitleSub} />

          <Text style={PageTitleSub}>About</Text>
          <Text style={PageSubTitle}>
            The menu contains the basic information about the application,
            related the founders, the aims and objective and the reason for the
            app to come online.
          </Text>

          {/* ================================================================================= */}

          <Text style={PageTitleSub}>Notifications</Text>
          <Text style={PageSubTitle}>
            Turn on the notification bar to get notifications from Remembery app
            on your mobile phone and tablets.
          </Text>

          {/* ================================================================================= */}

          <Text style={PageTitleSub}>Dark Mode</Text>
          <Text style={PageSubTitle}>
            {/* Turn on the dark mode feature on the Remembery app to use the app on
            a dark mode. */}
            Enable dark mode in the Remembery app to switch to a darker theme.
          </Text>

          {/* ================================================================================= */}

          <Text style={PageTitleSub}>Social Feed</Text>
          <Text style={PageSubTitle}>
          The Social Feed feature on the Remembery app will allow you to contact other subscribed users to help you locate other missing items that you may have lost in the airport or on public transport</Text>

          {/* ================================================================================= */}

          <Text style={PageTitleSub} />
          <Text style={PageTitleSub}>10. Settings and Customization</Text>
          <Text style={PageTitleSub} />

          {/* <Text style={PageTitleSub}>General Settings</Text>
          <Text style={PageSubTitle}>● Tap the "Settings" icon.</Text>
          <Text style={PageSubTitle}>
            ● Adjust preferences (language, theme).
          </Text>

          <Text style={PageTitleSub}>Notification Settings</Text>
          <Text style={PageSubTitle}>● Go to "Settings”: "Notifications."</Text>
          <Text style={PageSubTitle}>● Customize reminder alerts.</Text> */}

          <Text style={PageTitleSub}>Account Settings</Text>
          <Text style={PageSubTitle}>● Go to "Settings”: "Account."</Text>
          <Text style={PageSubTitle}>
            ● Update your email, password, and other details.
          </Text>

          {/* ================================================================================= */}

          <Text style={PageTitleSub} />
          <Text style={PageTitleSub}>11. Troubleshooting and Support</Text>
          <Text style={PageTitleSub} />

          <Text style={PageTitleSub}>Common Issues</Text>
          <Text style={PageSubTitle}>
            ● Item Tracker not working: Ensure Bluetooth is enabled and the
            tracker is within range.
          </Text>
          <Text style={PageSubTitle}>
            ● Notifications not appearing: Check notification settings on your
            device and within the app.
          </Text>

          {/* ================================================================================= */}

          <Text style={PageTitleSub}>Contact Support</Text>
          <Text style={PageSubTitle}>● Email: support@Remembery.com</Text>
          <Text style={PageSubTitle}>● Phone: 1-800-REMEMBERY</Text>
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default UserManualScreen;

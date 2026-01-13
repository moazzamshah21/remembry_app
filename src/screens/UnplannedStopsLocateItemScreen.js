import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  useColorScheme,
} from 'react-native';
import styles from '../styles/UnplannedStopLocateItemStyle';
import SecondHeader from '../components/SecondHeader';
import { GradientColors, ThemeColors } from '../utils/Theme';
import GradientButton from '../components/GradientButton';
import RadioButton from '../components/RadioButton';
import SearchTextBox from '../components/SearchTextBox';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';

const UnplannedStopsLocateItemScreen = ({ navigation, route }) => {
  const reminders = useSelector(state => state.ReminderReducer.unplannedStopsreminders);
  const colorScheme = useColorScheme();
  const ThemeMode = useSelector(state => state.CommonReducer.themeMode);

  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [list, setList] = useState(true);

  useEffect(() => {
    if (reminders) {
      setData(reminders)
    }
  }, [reminders])

  const handleRadioButton = e => {
    setSelectedItem(e);
  };

  const handleSearch = () => {
    setIsFocused(true);
    setList(false);
  };

  const handleSearchButton = () => {
    setIsFocused(false);
  };

  return (
    <React.Fragment>
      <SecondHeader
        navigation={navigation}
        title="UNPLANNED STOPS"
        subTitle="OF YOUR DAILY ROUTINE HERE"
        backButtonGradient={GradientColors.RED}
        backButtonColor={'#d05f4a'}
      />
      <ScrollView
        style={{
          backgroundColor: ThemeMode === 'dark'
            ? ThemeColors.DARK_THEME_COLOR
            : ThemeColors?.WHITE
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
          <View style={styles.SearchView}>
            <SearchTextBox
              onChangeText={e => {
                setSearchTerm(e);
              }}
              placeholder="Search"
              Icon={<AntDesign name="search1" color={ThemeMode === 'dark' ? ThemeColors.WHITE : ThemeColors.BLACK} size={25} />}
              onFocus={handleSearch}
              visiableIcon={isFocused}
            />
          </View>
          {data?.filter(x => x.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())).length == 0 &&
            <TouchableOpacity onPress={() => {
              navigation.navigate('UnplannedStops')
            }}>
              <Image
                style={{
                  width: 200
                }}
                resizeMode='contain'
                source={require('../../assets/images/add-item-image.png')}
              />
            </TouchableOpacity>
          }
          {data?.filter(x => x.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())).map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.ListViewContainer,
                {
                  backgroundColor:
                    ThemeMode === 'dark'
                      ? ThemeColors.DARK_THEME_COLOR
                      : ThemeColors?.WHITE,
                  borderColor: ThemeColors?.WHITE,
                  borderWidth: ThemeMode === 'dark' ? 1 : 0,
                },
              ]}
              onPress={() => {
                handleRadioButton(item);
              }}>
              <View style={styles.ListTextView}>
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
                  {item.name}
                </Text>
              </View>
              <View style={styles.RadioButton}>
                <RadioButton
                  checked={item?._id === selectedItem?._id}
                  data={item}
                  onChange={e => handleRadioButton(item)}
                />
              </View>
            </TouchableOpacity>
          ))}
          {(selectedItem && data?.filter(x => x.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())).length > 0) && (
            <View style={styles.ButtonView}>
              <GradientButton title={`Continue`} onPress={() => {
                navigation.navigate('LocateItemDetail', { item: selectedItem })
              }} />
            </View>
          )}
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default UnplannedStopsLocateItemScreen;

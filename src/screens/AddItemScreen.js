import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import styles from '../styles/AddItemStyle';
import SecondHeader from '../components/SecondHeader';
import {GradientColors, ThemeColors} from '../utils/Theme';
import LinearGradient from 'react-native-linear-gradient';
import RadioButton from '../components/RadioButton';
import GradientButton from '../components/GradientButton';
import {AddCircleIcon} from '../../assets/svg/SvgIcons';
import {useSelector} from 'react-redux';

const AddItemScreen = ({navigation, route}) => {
  const [selectedItem, setselectedItem] = useState(null);
  const ThemeMode = useSelector(state => state.CommonReducer.themeMode);

  const handleRadioButton = item => {
    setselectedItem(item);
  };

  const items = [
    {label: 'Wallet'},
    {label: 'Keys'},
    {label: 'Phone'},
    {label: 'Watch'},
  ];

  return (
    <React.Fragment>
      <SecondHeader
        navigation={navigation}
        title="ADD ITEMS"
        subTitle="OF YOUR DAILY ROUTINE HERE"
        backButtonGradient={GradientColors.BLUE}
        backButtonColor={'#3fc8b0'}
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
                ThemeMode === 'dark'
                  ? ThemeColors.DARK_THEME_COLOR
                  : ThemeColors?.WHITE,
            },
          ]}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.AddItemContainer}
            onPress={() => {
              navigation.navigate('CreateAddItem', {item: '', time: null});
            }}>
            <LinearGradient
              colors={GradientColors.GREEN}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              style={styles.LinearGradientContainer}>
              <AddCircleIcon />
              <View style={styles.TextView}>
                <Text style={styles.MainTitleText}>ADD ITEMS</Text>
                <Text style={styles.SubTitleText}>
                  OF YOUR DAILY ROUTINE HERE
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.ListViewContainer,
                {
                  backgroundColor:
                    ThemeMode === 'dark'
                      ? ThemeColors.DARK_THEME_COLOR
                      : ThemeColors?.WHITE,
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
                  {item.label}
                </Text>
              </View>
              <View style={styles.RadioButtonView}>
                <RadioButton
                  checked={item.label === selectedItem?.label}
                  item={item}
                  onChange={e => handleRadioButton(e)}
                />
              </View>
            </TouchableOpacity>
          ))}

          {selectedItem && (
            <View style={styles.ButtonView}>
              <GradientButton
                title={`Continue`}
                onPress={() => {
                  navigation.navigate('CreateAddItem', {
                    item: selectedItem?.label,
                    time: null,
                  });
                }}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default AddItemScreen;

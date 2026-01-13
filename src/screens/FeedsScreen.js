import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/FeedsStyle';
import SecondHeader from '../components/SecondHeader';
import FeedsItem from '../components/FeedsItem';
import { ThemeColors } from '../utils/Theme';
import SocialFeedModal from '../components/modal/SocialFeedModal';

const FeedsScreen = ({ navigation }) => {

  const feeds = useSelector(state => state.ReminderReducer.feeds);

  const [data, setData] = useState(feeds);

  useEffect(() => {
    if (feeds) {
      setData(feeds);
    }
  }, [feeds]);

  const [socialFeedModal, setSocialFeedModal] = useState(false);

  const renderFeedsitem = ({ item, index }) => (
    <FeedsItem
      item={item}
      index={index}
      navigation={navigation}
      hideComments={false}
    />
  );

  const ThemeMode = useSelector(state => state.CommonReducer.themeMode);

  return (
    <View>
      <SecondHeader title={'Social Feed'} navigation={navigation} />
      <View style={{ marginTop: 0, zIndex: -1 }}>
        <View
          style={[
            styles.MainContainer,
            {
              backgroundColor:
                ThemeMode === 'dark'
                  ? ThemeColors.DARK_THEME_COLOR
                  : ThemeColors.WHITE,
            },
          ]}
        >
          <FlatList
            contentContainerStyle={{ paddingBottom: 250 }}
            ListHeaderComponent={() => (
              <View style={{}}>
                <Text style={styles.InformationText}>Information: This feed is solely for the purpose of posting for lost and found items with in the remembery family and not to use for generic posting.</Text>
                <TouchableOpacity
                  onPress={() => setSocialFeedModal(true)}
                  style={styles.CreateAddView}
                >
                  <Text style={styles.CreateAddText}>
                    Create/Add Post{'            '}+
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            data={data}
            extraData={data}
            renderItem={renderFeedsitem}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>

      <SocialFeedModal
        isVisible={socialFeedModal}
        onRequestClose={() => setSocialFeedModal(false)}
      />
    </View>
  );
};

export default FeedsScreen;

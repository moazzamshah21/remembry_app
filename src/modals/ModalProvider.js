import React, { createContext, useContext, useState } from 'react';
import { Modal, View, Text, Button, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { GradientColors, ThemeColors, ThemeFonts } from '../utils/Theme';
import { navigate, navigationRef } from '../navigations/NavigationRef';
import LinearGradient from 'react-native-linear-gradient';
import EntypoIcon from 'react-native-vector-icons/Entypo';
const { width, height } = Dimensions.get('window');
import { useDispatch, useSelector } from 'react-redux';
import GradientButton from '../components/GradientButton';

// Create Context
const ModalContext = createContext();

// Modal Provider component
export const ModalProvider = ({ children, navigation }) => {

  const ThemeMode = useSelector(state => state.CommonReducer.themeMode);

  const [plansModalVisible, setPlansModalVisible] = useState(false);

  const openPlansModal = (content) => {
    setPlansModalVisible(true);
  };

  const closePlansModal = () => {
    setPlansModalVisible(false);
  };

  return (
    <ModalContext.Provider value={{ openPlansModal, closePlansModal }}>
      {children}
      <Modal transparent={true} visible={plansModalVisible} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={[styles.modalContainer, {
            backgroundColor:
              ThemeMode === 'dark'
                ? ThemeColors.DARK_THEME_COLOR
                : ThemeColors.WHITE,
          },]}>
            <TouchableOpacity
              onPress={closePlansModal}
              activeOpacity={0.8}
              style={styles.closeBtn}>
              <LinearGradient
                colors={GradientColors.GREEN} // Replace with your desired colors
                start={{ x: 0, y: 0 }} // Optional: Set the starting point of the gradient
                end={{ x: 0, y: 1 }} // Optional: Set the ending point of the gradient
                style={styles.closeBtnGradient}>
                <EntypoIcon
                  name="circle-with-cross"
                  style={{ color: ThemeColors.WHITE }}
                  size={30}
                />
              </LinearGradient>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Unlock Unlimited Features with Our Premium Plan!</Text>
            <Text style={[styles.modalText, {
              color:
                ThemeMode === 'dark'
                  ? ThemeColors.WHITE
                  : ThemeColors.DARK_GRAY,
            },]}>Upgrade to our Premium Plan today and enjoy unlimited access to exclusive features. Experience the full potential of the app with no limits</Text>
            <Text style={[styles.modalText2, {
              color:
                ThemeMode === 'dark'
                  ? ThemeColors.WHITE
                  : ThemeColors.DARK_GRAY,
            },]}>Start your premium journey now!</Text>
            <View style={styles.ButtonView}>
              <GradientButton
                title={`Go To Plans`}
                onPress={() => {
                  closePlansModal();
                  navigationRef.current?.navigate('PlansScreen')
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ModalContext.Provider>
  );
};

// Hook for easier access to the context
export const useModal = () => useContext(ModalContext);

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000063',
  },
  modalContainer: {
    width: 300,
    minHeight: 150,
    justifyContent: 'center',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: ThemeColors.WHITE,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: GradientColors.BLUE[0],
    position: 'absolute',
    top: -15,
    right: -15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtnGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: GradientColors.GREEN[0],
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontFamily: ThemeFonts.SEMI_BOLD,
    color: ThemeColors.PRIMARY_COLOR,
    fontSize: 16,
    textAlign: 'center',
  },
  modalText: {
    fontFamily: ThemeFonts.MEDIUM,
    color: ThemeColors.DARK_GRAY,
    fontSize: 13,
    textAlign: 'center',
  },
  modalText2: {
    fontFamily: ThemeFonts.SEMI_BOLD,
    color: ThemeColors.DARK_GRAY,
    fontSize: 13,
    textAlign: 'center',
  },
  ButtonView: {
    width: 300 - 40,
    borderRadius: 20,
    marginVertical: 5,
    alignSelf: 'center',
  },
});

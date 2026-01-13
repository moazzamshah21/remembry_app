import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Linking, ActivityIndicator, Platform, Alert } from 'react-native';
import styles from '../styles/PlansStyle';
import SecondHeader from '../components/SecondHeader';
import { GradientColors, ThemeColors, ThemeFonts } from '../utils/Theme';
import { useDispatch, useSelector } from 'react-redux';
import { useStripe } from '@stripe/stripe-react-native';
import PaymentService from '../services/Payment/PaymentService';
import InAppPurchaseService from '../services/Payment/InAppPurchaseService';
import { showMessage } from 'react-native-flash-message';
import * as commonAction from '../actions/Common/CommonAction';
import GradientButton from '../components/GradientButton';

const PlansScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [iapProducts, setIapProducts] = useState([]);
  const [iapInitialized, setIapInitialized] = useState(false);

  const ThemeMode = useSelector(state => state.CommonReducer.themeMode);
  const user = useSelector(state => state.CommonReducer.user);
  const packageAmount = useSelector(state => state.CommonReducer.packageAmount);

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  // Check if we're coming from sign-in screen
  const fromSignIn = route?.params?.fromSignIn === true;

  useEffect(() => {
    initializePayments();
    
    // Set up callback for successful purchases
    if (Platform.OS === 'ios') {
      InAppPurchaseService.setOnPurchaseSuccess((purchase) => {
        console.log('Purchase success callback triggered:', purchase.productId);
        
        // Refresh user data from backend
        dispatch(commonAction.fetchUserDetail());
        
        // Show success message
        showMessage({
          message: 'Purchase successful! Thank you for subscribing.',
          type: 'success',
        });
        
        // Navigate to dashboard after a short delay
        setTimeout(() => {
          if (fromSignIn) {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Dashboard' }],
            });
          } else {
            navigation.navigate('Dashboard');
          }
        }, 1500);
      });
    }
    
    return () => {
      // Clean up IAP listeners on unmount
      if (Platform.OS === 'ios') {
        InAppPurchaseService.cleanup();
        InAppPurchaseService.setOnPurchaseSuccess(null);
      }
    };
  }, []);

  const initializePayments = async () => {
    try {
      console.log('Initializing payments... Platform:', Platform.OS);
      
      // Initialize In-App Purchase for iOS
      if (Platform.OS === 'ios') {
        console.log('Initializing IAP for iOS...');
        
        try {
          const initialized = await InAppPurchaseService.initIAP();
          console.log('IAP Initialized:', initialized);
          setIapInitialized(initialized);
          
          if (initialized) {
            console.log('Getting IAP products...');
            const products = InAppPurchaseService.products;
            console.log('IAP Products available:', products);
            setIapProducts(products);
            
            // Show warning if no products were loaded
            if (!products || products.length === 0) {
              console.warn('No products loaded from App Store');
              console.warn('Last error:', InAppPurchaseService.lastError);
              
              // Show alert to user with debugging info
              Alert.alert(
                'Products Not Available',
                'Unable to load products from the App Store. This could be due to:\n\n' +
                '1. Product IDs not matching App Store Connect\n' +
                '2. Products still being processed\n' +
                '3. Network connectivity issues\n\n' +
                'The Buy buttons will still work - tap to retry.',
                [{ text: 'OK' }]
              );
            }
          } else {
            console.log('IAP initialization returned false');
            console.log('Last error:', InAppPurchaseService.lastError);
          }
        } catch (iapError) {
          console.error('IAP initialization error:', iapError);
          // Don't fail completely - allow UI to show with fallback prices
          setIapInitialized(false);
        }
      } else {
        console.log('Skipping IAP initialization for Android (using Stripe)');
        setIapInitialized(false);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error initializing payments:', error);
      setIsLoading(false);
    }
  };

  // Handle Apple In-App Purchase
  const handleApplePurchase = async (productId) => {
    if (isPurchasing) return;
    
    try {
      setIsPurchasing(true);
      
      // Check if IAP is available
      if (!InAppPurchaseService.isAvailable) {
        Alert.alert(
          'Not Available',
          'In-App Purchases are not available on this device. Please try again later.',
          [{ text: 'OK' }]
        );
        setIsPurchasing(false);
        return;
      }

      // Try to initialize if not already
      if (!iapInitialized) {
        console.log('Attempting to re-initialize IAP...');
        const reInitialized = await InAppPurchaseService.initIAP();
        if (!reInitialized) {
          Alert.alert(
            'Connection Error',
            'Unable to connect to the App Store. Please check your internet connection and try again.',
            [{ text: 'OK' }]
          );
          setIsPurchasing(false);
          return;
        }
        setIapInitialized(true);
      }

      console.log('Requesting purchase for product:', productId);
      const purchaseResult = await InAppPurchaseService.requestPurchase(productId);
      
      if (purchaseResult.cancelled) {
        // User cancelled - no need to show error
        console.log('Purchase cancelled by user');
      } else if (!purchaseResult.success) {
        showMessage({
          message: purchaseResult.error || 'Purchase failed. Please try again.',
          type: 'danger',
        });
      } else {
        // Purchase initiated successfully
        // The actual result will come through the purchase listener callback
        showMessage({
          message: 'Processing your purchase...',
          type: 'info',
        });
        // Note: User data refresh and navigation will happen in the onPurchaseSuccess callback
      }
    } catch (error) {
      console.error('Apple purchase error:', error);
      showMessage({
        message: 'An error occurred. Please try again.',
        type: 'danger',
      });
    } finally {
      setIsPurchasing(false);
    }
  };

  // Handle Restore Purchases
  const handleRestorePurchases = async () => {
    if (isRestoring || isPurchasing) return;
    
    try {
      setIsRestoring(true);
      
      // Check if IAP is available
      if (!InAppPurchaseService.isAvailable) {
        Alert.alert(
          'Not Available',
          'In-App Purchases are not available on this device. Please try again later.',
          [{ text: 'OK' }]
        );
        setIsRestoring(false);
        return;
      }

      // Try to initialize if not already
      if (!iapInitialized) {
        console.log('Attempting to re-initialize IAP for restore...');
        const reInitialized = await InAppPurchaseService.initIAP();
        if (!reInitialized) {
          Alert.alert(
            'Connection Error',
            'Unable to connect to the App Store. Please check your internet connection and try again.',
            [{ text: 'OK' }]
          );
          setIsRestoring(false);
          return;
        }
        setIapInitialized(true);
      }

      showMessage({
        message: 'Restoring purchases...',
        type: 'info',
      });

      // Restore purchases from App Store
      const purchases = await InAppPurchaseService.restorePurchases();
      
      if (!purchases || purchases.length === 0) {
        Alert.alert(
          'No Purchases Found',
          'No previous purchases were found to restore.',
          [{ text: 'OK' }]
        );
        setIsRestoring(false);
        return;
      }

      // Process restored purchases (verify with backend)
      const result = await InAppPurchaseService.processRestoredPurchases(purchases);
      
      if (result.success && result.count > 0) {
        // Refresh user data from backend
        dispatch(commonAction.fetchUserDetail());
        
        Alert.alert(
          'Purchases Restored',
          `Successfully restored ${result.count} purchase${result.count > 1 ? 's' : ''}. Your subscription has been restored.`,
          [{ 
            text: 'OK',
            onPress: () => {
              // Navigate to dashboard if coming from sign-in
              if (fromSignIn) {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Dashboard' }],
                });
              }
            }
          }]
        );
        
        showMessage({
          message: `Successfully restored ${result.count} purchase${result.count > 1 ? 's' : ''}`,
          type: 'success',
        });
      } else {
        Alert.alert(
          'Restore Failed',
          result.message || 'No purchases could be restored. Please contact support if you believe this is an error.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Restore purchases error:', error);
      Alert.alert(
        'Restore Error',
        error.message || 'An error occurred while restoring purchases. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsRestoring(false);
    }
  };

  // Handle Stripe payment (for Android)
  const handleStripePayment = async (amount) => {
    if (isPurchasing) return;
    
    try {
      setIsPurchasing(true);
      
      var payload = { amount: amount, email: user?.email };
      const response = await PaymentService.GetPaymentIntent(payload);
      
      if (response.success) {
        const initResponse = await initPaymentSheet({
          returnURL: 'remembery://payment-complete',
          merchantDisplayName: 'Remembery',
          paymentIntentClientSecret: response.paymentIntent,
        });
        
        if (initResponse.error) {
          showMessage({
            message: initResponse.error.localizedMessage,
            type: 'danger',
          });
          return;
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const paymentResponse = await presentPaymentSheet();
        
        if (paymentResponse.error) {
          showMessage({
            message: paymentResponse.error.localizedMessage,
            type: 'warning',
          });
          return;
        }
        
        const addPaymentResponse = await PaymentService.AddPayment({
          paymentId: response.paymentId,
          amount: amount
        });
        
        if (addPaymentResponse) {
          showMessage({
            message: 'Plan purchased successfully',
            type: 'success',
          });
          
          dispatch(commonAction.fetchUserDetail());
          
          // If coming from sign-in, navigate to home after successful purchase
          if (fromSignIn) {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Dashboard' }],
            });
          }
        } else {
          showMessage({
            message: 'Something went wrong!',
            type: 'danger',
          });
        }
      } else {
        showMessage({
          message: 'Something went wrong!',
          type: 'danger',
        });
      }
    } catch (error) {
      console.error('Payment error:', error);
      showMessage({
        message: 'An error occurred during payment',
        type: 'danger',
      });
    } finally {
      setIsPurchasing(false);
    }
  };

  // Unified purchase handler
  const handlePurchase = async (productId, amount) => {
    // Prevent purchase if user already has an active subscription
    if (isUserSubscribed) {
      Alert.alert(
        'Active Plan Detected',
        'You already have an active plan. Please wait until your current plan expires before purchasing a new one.',
        [{ text: 'OK', style: 'default' }]
      );
      return;
    }
    
    if (Platform.OS === 'ios') {
      // Use Apple In-App Purchase
      await handleApplePurchase(productId);
    } else {
      // Use Stripe for Android
      await handleStripePayment(amount);
    }
  };

  // Get product price for display
  const getProductPrice = (productId, fallbackPrice) => {
    if (Platform.OS === 'ios' && iapProducts.length > 0) {
      const product = iapProducts.find(p => p.productId === productId);
      if (product?.localizedPrice) {
        return product.localizedPrice;
      }
    }
    
    // Fallback prices
    return fallbackPrice;
  };

  // Check if user is subscribed
  const isUserSubscribed = user?.isSubscribed === true;
  
  // Determine which plan is currently active
  // Normalize packageAmount for comparison - handle string, number, null, undefined
  const normalizeAmount = (amount) => {
    if (amount === null || amount === undefined || amount === '') return 0;
    const num = parseFloat(String(amount).trim().replace(',', '.'));
    return isNaN(num) ? 0 : num;
  };
  
  const activePlanAmountFloat = normalizeAmount(packageAmount);
  
  // Determine active plan based on normalized amount
  // Check both packageAmount and user object for plan type
  // Freemium is only active if user is NOT subscribed
  const isFreemiumActive = !isUserSubscribed;
  
  // Check for Bi-Yearly plan (0.99) - handle various formats
  const isBiYearlyActive = isUserSubscribed && (
    Math.abs(activePlanAmountFloat - 0.99) < 0.01 || 
    String(packageAmount).trim() === "0.99" || 
    packageAmount === 0.99 ||
    String(packageAmount).trim() === "0,99" // European format
  );
  
  // Check for One-Time plan (6.99) - handle various formats
  const isOneTimeActive = isUserSubscribed && (
    Math.abs(activePlanAmountFloat - 6.99) < 0.01 || 
    String(packageAmount).trim() === "6.99" || 
    packageAmount === 6.99 ||
    String(packageAmount).trim() === "6,99" // European format
  );
  
  // Fallback: If user is subscribed but we can't determine which premium plan, 
  // show ribbon on Bi-Yearly as default (most common)
  const hasActivePremiumPlan = isBiYearlyActive || isOneTimeActive;
  const showDefaultPremiumRibbon = isUserSubscribed && !hasActivePremiumPlan && activePlanAmountFloat > 0;
  
  // Debug logging
  console.log('=== PlansScreen Debug ===');
  console.log('User object:', JSON.stringify(user, null, 2));
  console.log('isSubscribed:', user?.isSubscribed, 'type:', typeof user?.isSubscribed);
  console.log('isUserSubscribed:', isUserSubscribed);
  console.log('packageAmount:', packageAmount, 'type:', typeof packageAmount);
  console.log('activePlanAmountFloat:', activePlanAmountFloat);
  console.log('isFreemiumActive:', isFreemiumActive);
  console.log('isBiYearlyActive:', isBiYearlyActive);
  console.log('isOneTimeActive:', isOneTimeActive);
  console.log('hasActivePremiumPlan:', hasActivePremiumPlan);
  console.log('showDefaultPremiumRibbon:', showDefaultPremiumRibbon);
  console.log('========================');

  // Handle URL events for payment completion
  useEffect(() => {
    const handleUrl = url => {
      console.log('Received URL:', url);
    };

    const urlListener = Linking.addEventListener('url', ({ url }) => handleUrl(url));

    return () => {
      urlListener.remove();
    };
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', 
        backgroundColor: ThemeMode === 'dark' ? ThemeColors.DARK_THEME_COLOR : ThemeColors.WHITE }}>
        <ActivityIndicator size="large" color={GradientColors.GREEN[0]} />
        <Text style={{ marginTop: 10, color: ThemeMode === 'dark' ? ThemeColors.WHITE : ThemeColors.BLACK }}>
          Loading plans...
        </Text>
      </View>
    );
  }

  return (
    <React.Fragment>
      <SecondHeader
        navigation={navigation}
        title="PLANS"
        subTitle="CHOOSE A PLAN"
        backButtonGradient={GradientColors.GREEN}
        backButtonColor={'#5da441'}
        hideBackButton={fromSignIn}
        showLogoutButton={fromSignIn}
      />
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
          
          {/* Restore Purchases Button - iOS only */}
          {Platform.OS === 'ios' && (
            <View style={{ width: '90%', marginBottom: 20, alignItems: 'center' }}>
              <GradientButton
                title={isRestoring ? 'Restoring...' : 'Restore Plan'}
                disabled={isRestoring || isPurchasing}
                onPress={handleRestorePurchases}
                ButtonViewStyle={{
                  height: 60,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  paddingHorizontal: 10,
                  paddingVertical: 0,
                }}
              />
            </View>
          )}

          {/* Freemium Plan */}
          <View
            style={[
              styles.PlanContainer,
              {
                backgroundColor:
                  ThemeMode === 'dark'
                    ? ThemeColors.DARK_THEME_COLOR
                    : ThemeColors?.WHITE,
                borderColor: ThemeColors?.WHITE,
                borderWidth: ThemeMode === 'dark' ? 1 : 0,
                opacity: isUserSubscribed && !isFreemiumActive ? 1 : 1,
              },
            ]}>
            <View style={styles.PlanInnerContainer}>
              {isFreemiumActive && (
                <View style={styles.ActivatedView}>
                  <Text style={styles.ActivatedText}>Activated</Text>
                </View>
              )}
              <Text style={styles.PlanTitleText}>Freemium</Text>
              <Text
                style={[
                  styles.PlanPriceText,
                  {
                    color:
                      ThemeMode === 'dark'
                        ? ThemeColors.WHITE
                        : ThemeColors?.BLACK,
                  },
                ]}>
                $0
              </Text>
              <Text
                style={[
                  styles.PlanDescriptionText,
                  {
                    color:
                      ThemeMode === 'dark'
                        ? ThemeColors.WHITE
                        : ThemeColors?.BLACK,
                  },
                ]}>
                ● Add Up To 1 Items / Appointments{'\n'}● Add Up To 2 Schedules
                {'\n'}● Access to Social Media Feed{'\n'}● Up to1 Social Media
                Posts{'\n'}● Locate 1 Items{'\n'}● Limited Access To Daily
                Schedules{'\n'}● Limited Access To Unplanned Stops{'\n'}
              </Text>
              <GradientButton 
                title="Continue Free"
                disabled={isUserSubscribed}
                onPress={() => {
                  if (isUserSubscribed) {
                    Alert.alert(
                      'Active Plan Detected',
                      'You already have an active plan. Please wait until your current plan expires.',
                      [{ text: 'OK', style: 'default' }]
                    );
                    return;
                  }
                  if (fromSignIn) {
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'Dashboard' }],
                    });
                  } else {
                    navigation.navigate('Dashboard');
                  }
                }} 
              />
            </View>
          </View>

          {/* Premium Bi-Yearly Plan */}
          <View
            style={[
              styles.PlanContainer,
              {
                backgroundColor:
                  ThemeMode === 'dark'
                    ? ThemeColors.DARK_THEME_COLOR
                    : ThemeColors?.WHITE,
                borderColor: ThemeColors?.WHITE,
                borderWidth: ThemeMode === 'dark' ? 1 : 0,
                opacity: isUserSubscribed && !isBiYearlyActive && !showDefaultPremiumRibbon ? 1 : 1,
              },
            ]}>
            <View style={styles.PlanInnerContainer}>
              {(isBiYearlyActive || (showDefaultPremiumRibbon && activePlanAmountFloat < 5)) && (
                <View style={styles.ActivatedView}>
                  <Text style={styles.ActivatedText}>Activated</Text>
                </View>
              )}
              <Text style={styles.PlanTitleText}>Premium</Text>
              <Text
                style={[
                  styles.PlanPriceText,
                  {
                    color:
                      ThemeMode === 'dark'
                        ? ThemeColors.WHITE
                        : ThemeColors?.BLACK,
                  },
                ]}>
                {getProductPrice('bi_yearly_premium', '$0.99')}{' '}
                <Text style={{ fontSize: 10 }}>(Bi-Yearly)</Text>
              </Text>
              <Text
                style={[
                  styles.PlanDescriptionText,
                  {
                    color:
                      ThemeMode === 'dark'
                        ? ThemeColors.WHITE
                        : ThemeColors?.BLACK,
                  },
                ]}>
                ● Addition of Unlimited Items{'\n'}● Make Unlimited Appointments
                {'\n'}● Access To Social Media Feed{'\n'}● Unlimited Social
                Media Posting{'\n'}● Access To Dark Mode{'\n'}● Access To
                Offline Notebook Feature{'\n'}● Access To Unlimited Daily
                Schedules{'\n'}● Access To Unlimited Unplanned Stops{'\n'}
              </Text>
              {/* Always show Buy button */}
              <GradientButton 
                title={
                  Platform.OS === 'ios' && isUserSubscribed
                    ? 'Already Purchased'
                    : isPurchasing
                      ? 'Processing...'
                      : 'Buy'
                }
                disabled={isPurchasing || (Platform.OS === 'ios' && isUserSubscribed)}
                onPress={() => {
                  handlePurchase('bi_yearly_premium', 0.99);
                }} 
              />
            </View>
          </View>

          {/* Premium One-Time Plan */}
          <View
            style={[
              styles.PlanContainer,
              {
                backgroundColor:
                  ThemeMode === 'dark'
                    ? ThemeColors.DARK_THEME_COLOR
                    : ThemeColors?.WHITE,
                borderColor: ThemeColors?.WHITE,
                borderWidth: ThemeMode === 'dark' ? 1 : 0,
                opacity: isUserSubscribed && !isOneTimeActive && !showDefaultPremiumRibbon ? 1 : 1,
              },
            ]}>
            <View style={styles.PlanInnerContainer}>
              {(isOneTimeActive || (showDefaultPremiumRibbon && activePlanAmountFloat >= 5)) && (
                <View style={styles.ActivatedView}>
                  <Text style={styles.ActivatedText}>Activated</Text>
                </View>
              )}
              <Text style={styles.PlanTitleText}>Premium</Text>
              <Text
                style={[
                  styles.PlanPriceText,
                  {
                    color:
                      ThemeMode === 'dark'
                        ? ThemeColors.WHITE
                        : ThemeColors?.BLACK,
                  },
                ]}>
                {getProductPrice('one_time_premium', '$6.99')}{' '}
                <Text style={{ fontSize: 10 }}>(One Time)</Text>
              </Text>
              <Text
                style={[
                  styles.PlanDescriptionText,
                  {
                    color:
                      ThemeMode === 'dark'
                        ? ThemeColors.WHITE
                        : ThemeColors?.BLACK,
                  },
                ]}>
                ● Addition of Unlimited Items{'\n'}● Make Unlimited Appointments
                {'\n'}● Access To Social Media Feed{'\n'}● Unlimited Social
                Media Posting{'\n'}● Access To Dark Mode{'\n'}● Access To
                Offline Notebook Feature{'\n'}● Access To Unlimited Daily
                Schedules{'\n'}● Access To Unlimited Unplanned Stops{'\n'}
              </Text>
              {/* Always show Buy button */}
              <GradientButton 
                title={
                  Platform.OS === 'ios' && isUserSubscribed
                    ? 'Already Purchased'
                    : isPurchasing
                      ? 'Processing...'
                      : 'Buy'
                }
                disabled={isPurchasing || (Platform.OS === 'ios' && isUserSubscribed)}
                onPress={() => {
                  handlePurchase('one_time_premium', 6.99);
                }} 
              />
            </View>
          </View>

        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default PlansScreen;

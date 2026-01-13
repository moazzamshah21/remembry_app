import 'react-native-gesture-handler';
import React, {useEffect, Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import store from './src/store/Store';
import LoadingScreen from './src/screens/LoadingScreen';
import {StripeProvider} from '@stripe/stripe-react-native';
import {STRIPE_PUBLISHABLE_KEY} from './src/utils/Config';

// Error Boundary Component
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false, error: null, errorInfo: null};
  }

  static getDerivedStateFromError(error) {
    console.error('🔴 ErrorBoundary: getDerivedStateFromError');
    console.error('🔴 Error:', error);
    console.error('🔴 Message:', error?.message);
    return {hasError: true, error};
  }

  componentDidCatch(error, errorInfo) {
    console.error('🔴 ErrorBoundary: componentDidCatch');
    console.error('🔴 Error:', error);
    console.error('🔴 Message:', error?.message);
    console.error('🔴 Stack:', error?.stack);
    console.error('🔴 Component stack:', errorInfo?.componentStack);
    this.setState({error, errorInfo});
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>App Error</Text>
          <Text style={styles.errorText}>
            {this.state.error?.message || 'Unknown error occurred'}
          </Text>
          {this.state.error?.stack && (
            <Text style={styles.errorStack} numberOfLines={15}>
              {String(this.state.error.stack).substring(0, 800)}
            </Text>
          )}
          <Text
            style={styles.retryButton}
            onPress={() => {
              this.setState({hasError: false, error: null, errorInfo: null});
            }}>
            Tap to retry
          </Text>
        </View>
      );
    }
    return this.props.children;
  }
}

const App = () => {
  useEffect(() => {
    console.log('🟢 App: useEffect started');
    
    // Set up global error handler
    if (typeof ErrorUtils !== 'undefined' && ErrorUtils) {
      try {
        const originalHandler = ErrorUtils.getGlobalHandler();
        ErrorUtils.setGlobalHandler((error, isFatal) => {
          console.error('❌ Global error handler triggered');
          console.error('❌ Error:', error);
          console.error('❌ Message:', error?.message);
          console.error('❌ Stack:', error?.stack);
          console.error('❌ isFatal:', isFatal);
          if (originalHandler) {
            originalHandler(error, isFatal);
          }
        });
        console.log('✅ Error handler registered');
      } catch (e) {
        console.error('❌ Failed to set error handler:', e);
      }
    }

    // Hide splash screen
    setTimeout(() => {
      try {
        SplashScreen.hide();
        console.log('✅ Splash screen hidden');
      } catch (e) {
        console.error('❌ Failed to hide splash screen:', e);
      }
    }, 500);
  }, []);

  console.log('🟢 App: Rendering...');

  try {
    return (
      <ErrorBoundary>
        <Provider store={store}>
          {STRIPE_PUBLISHABLE_KEY ? (
            <StripeProvider
              urlScheme="remembery://payment-complete"
              publishableKey={STRIPE_PUBLISHABLE_KEY}>
              <LoadingScreen />
            </StripeProvider>
          ) : (
            <LoadingScreen />
          )}
        </Provider>
      </ErrorBoundary>
    );
  } catch (e) {
    console.error('❌ App: Render error:', e);
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Render Error</Text>
        <Text style={styles.errorText}>{String(e?.message || e)}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  errorStack: {
    fontSize: 11,
    color: '#999',
    textAlign: 'left',
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    maxWidth: '95%',
    fontFamily: 'monospace',
  },
  retryButton: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
    marginTop: 10,
  },
});

export default App;

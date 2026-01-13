import { Platform } from 'react-native';

class InAppPurchaseService {
  constructor() {
    // Product IDs - must match EXACTLY what's in App Store Connect
    // Based on App Store Connect:
    // - bi_yearly_premium: Consumable
    // - one_time_premium: Non-Consumable
    // BOTH are products (not subscriptions), so we use getProducts() for both
    this.consumableProductIds = ['bi_yearly_premium']; // Consumable
    this.nonConsumableProductIds = ['one_time_premium']; // Non-consumable
    this.allProductIds = [...this.consumableProductIds, ...this.nonConsumableProductIds];
    
    this.products = [];
    this.purchaseUpdateSubscription = null;
    this.purchaseErrorSubscription = null;
    this.isAvailable = Platform.OS === 'ios';
    this.isInitialized = false;
    this.lastError = null;
    this.onPurchaseSuccess = null; // Callback for successful purchase
  }

  // Set callback for when purchase is successful
  setOnPurchaseSuccess = (callback) => {
    this.onPurchaseSuccess = callback;
  }

  initIAP = async () => {
    if (!this.isAvailable) {
      console.warn('IAP not available on this platform');
      return false;
    }

    try {
      const { 
        initConnection, 
        setup,
        clearTransactionIOS,
        getAvailablePurchases
      } = require('react-native-iap');

      console.log('=== IAP INITIALIZATION START ===');
      console.log('Product IDs to fetch:', this.allProductIds);

      // Setup with StoreKit 1 mode for better compatibility
      // StoreKit 2 can cause issues with some setups
      try {
        setup({ storekitMode: 'STOREKIT1_MODE' });
        console.log('StoreKit mode set to STOREKIT1_MODE');
      } catch (setupError) {
        console.log('Setup call failed (may be ok):', setupError.message);
      }

      // Initialize connection
      const result = await initConnection();
      console.log('IAP connection result:', result);
      
      if (!result) {
        console.warn('IAP initConnection returned false - App Store may not be available');
        this.lastError = 'App Store connection failed';
        return false;
      }

      // Clear any pending transactions that might interfere
      try {
        await clearTransactionIOS();
        console.log('Cleared pending iOS transactions');
      } catch (clearError) {
        console.log('Clear transactions failed (may be ok):', clearError.message);
      }

      this.isInitialized = true;
      
      // Get available products and subscriptions
      await this.loadAllProducts();
      
      // Set up listeners
      this.setupPurchaseListeners();

      console.log('=== IAP INITIALIZATION COMPLETE ===');
      console.log('Products loaded:', this.products.length);
      
      return true;
    } catch (error) {
      console.error('=== IAP INITIALIZATION FAILED ===');
      console.error('Error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      this.lastError = error.message;
      this.isAvailable = false;
      this.isInitialized = false;
      return false;
    }
  }

  loadAllProducts = async () => {
    try {
      // Load all products using getProducts()
      // Both bi_yearly (Consumable) and one_time (Non-Consumable) are products, NOT subscriptions
      const products = await this.getProductsOnly();
      
      this.products = products;
      console.log('All products loaded:', this.products.length);
      this.products.forEach(p => console.log('  -', p.productId, p.localizedPrice));
      
      return this.products;
    } catch (error) {
      console.error('Error loading all products:', error);
      return [];
    }
  }

  // Get all products (consumable and non-consumable)
  getProductsOnly = async () => {
    if (!this.isAvailable) return [];

    try {
      const { getProducts } = require('react-native-iap');
      
      if (this.allProductIds.length === 0) {
        return [];
      }

      console.log('=== FETCHING PRODUCTS ===');
      console.log('SKUs to fetch:', this.allProductIds);
      
      const products = await getProducts({
        skus: this.allProductIds
      });
      
      console.log('=== PRODUCTS RESPONSE ===');
      console.log('Products count:', products?.length || 0);
      if (products && products.length > 0) {
        products.forEach(p => {
          console.log('Product:', p.productId, '-', p.localizedPrice, '- Type:', p.type);
        });
      } else {
        console.log('No products returned for SKUs:', this.allProductIds);
        console.log('This usually means:');
        console.log('1. Product IDs do not match App Store Connect exactly');
        console.log('2. Products are not in Ready to Submit or Approved status');
        console.log('3. Paid Apps agreement not signed');
        console.log('4. Bundle ID mismatch');
      }
      
      return products || [];
    } catch (error) {
      console.error('=== GET PRODUCTS ERROR ===');
      console.error('Error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      this.lastError = error.message;
      return [];
    }
  }

  // Get all products (alias for compatibility)
  getProducts = async () => {
    if (this.products.length > 0) {
      return this.products;
    }
    return await this.loadAllProducts();
  }

  // Get all products (combined)
  getProducts = async () => {
    if (!this.isAvailable) return [];

    // If products are already loaded, return them
    if (this.products.length > 0) {
      return this.products;
    }

    // Otherwise load them
    return await this.loadAllProducts();
  }

  setupPurchaseListeners = () => {
    if (!this.isAvailable) return;

    try {
      const { 
        purchaseUpdatedListener, 
        purchaseErrorListener 
      } = require('react-native-iap');
      
      // Remove existing listeners first
      this.cleanup();
      
      // Purchase updates
      this.purchaseUpdateSubscription = purchaseUpdatedListener(async (purchase) => {
        console.log('Purchase updated:', purchase);
        try {
          await this.handleSuccessfulPurchase(purchase);
        } catch (error) {
          console.error('Error in purchase listener:', error);
        }
      });

      // Purchase errors
      this.purchaseErrorSubscription = purchaseErrorListener((error) => {
        console.error('Purchase error:', error);
      });
      
      console.log('Purchase listeners set up successfully');
    } catch (error) {
      console.error('Error setting up listeners:', error);
    }
  }

  // Check if product is consumable
  isConsumable = (productId) => {
    return this.consumableProductIds.includes(productId);
  }

  requestPurchase = async (productId) => {
    if (!this.isAvailable) {
      throw new Error('In-App Purchases not available');
    }

    if (!this.isInitialized) {
      // Try to reinitialize
      console.log('IAP not initialized, attempting to reinitialize...');
      const initialized = await this.initIAP();
      if (!initialized) {
        throw new Error('Failed to initialize In-App Purchases');
      }
    }

    try {
      const { requestPurchase } = require('react-native-iap');
      
      console.log('=== PURCHASE REQUEST START ===');
      console.log('Product ID:', productId);
      console.log('Is Consumable:', this.isConsumable(productId));
      console.log('Available products:', this.products.map(p => p.productId));
      
      // Check if product was loaded
      const productFound = this.products.find(p => p.productId === productId);
      if (!productFound) {
        console.error('Product not found in loaded products!');
        console.error('This is likely causing the Invalid Product ID error');
        console.error('Make sure the product ID matches EXACTLY what is in App Store Connect');
        
        // Try to reload products before giving up
        console.log('Attempting to reload products...');
        await this.loadAllProducts();
        
        const productRetry = this.products.find(p => p.productId === productId);
        if (!productRetry) {
          return { 
            success: false, 
            error: `Product "${productId}" not found. Check App Store Connect configuration.`
          };
        }
      }
      
      // Use requestPurchase for both consumable and non-consumable products
      console.log('Using requestPurchase for:', productId);
      await requestPurchase({ 
        sku: productId,
        andDangerouslyFinishTransactionAutomaticallyIOS: false
      });
      
      console.log('Purchase request sent successfully');
      return { success: true };
    } catch (error) {
      console.error('=== PURCHASE REQUEST ERROR ===');
      console.error('Error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      // Handle specific error codes
      if (error.code === 'E_USER_CANCELLED') {
        return { success: false, error: 'Purchase cancelled', cancelled: true };
      }
      
      if (error.code === 'E_UNKNOWN' || error.message?.includes('Invalid product')) {
        return { 
          success: false, 
          error: 'Invalid Product ID. Please verify the product is configured correctly in App Store Connect.'
        };
      }
      
      return { success: false, error: error.message || 'Purchase failed' };
    }
  }

  handleSuccessfulPurchase = async (purchase) => {
    try {
      const { finishTransaction } = require('react-native-iap');
      
      console.log('=== HANDLING SUCCESSFUL PURCHASE ===');
      console.log('Product ID:', purchase.productId);
      console.log('Transaction ID:', purchase.transactionId);
      
      // Determine if it's consumable based on product ID
      // bi_yearly is Consumable, one_time is Non-Consumable
      const isConsumable = this.isConsumable(purchase.productId);
      console.log('Is Consumable:', isConsumable);
      
      // Finish the transaction
      await finishTransaction({ 
        purchase, 
        isConsumable
      });
      
      console.log('Transaction finished successfully');
      
      // Verify with your backend
      const verificationResult = await this.verifyPurchaseWithBackend(purchase);
      
      if (verificationResult.success) {
        console.log('Purchase completed and verified successfully');
        
        // Call the success callback to refresh user data
        if (this.onPurchaseSuccess) {
          console.log('Calling onPurchaseSuccess callback');
          this.onPurchaseSuccess(purchase);
        }
        
        return { success: true, purchase };
      } else {
        console.warn('Purchase verification failed');
        return { success: false, error: 'Purchase verification failed' };
      }
    } catch (error) {
      console.error('Error handling purchase:', error);
      return { success: false, error: error.message };
    }
  }

  verifyPurchaseWithBackend = async (purchase) => {
    try {
      const PaymentService = require('./PaymentService').default;
      
      console.log('=== VERIFYING PURCHASE WITH BACKEND ===');
      console.log('Product ID:', purchase.productId);
      console.log('Transaction ID:', purchase.transactionId);
      
      // Map product IDs to amounts
      const productAmounts = {
        'bi_yearly_premium': 0.99,
        'one_time_premium': 6.99
      };
      
      const amount = productAmounts[purchase.productId] || 0;
      
      // Call backend to record the purchase and update subscription status
      const response = await PaymentService.AddPayment({
        paymentId: purchase.transactionId,
        amount: amount,
        productId: purchase.productId,
        platform: 'ios',
        transactionReceipt: purchase.transactionReceipt
      });
      
      console.log('Backend response:', response);
      
      if (response?.success || response) {
        console.log('Purchase verified and recorded successfully');
        return { success: true };
      } else {
        console.warn('Backend verification failed:', response);
        return { success: false, error: response?.message || 'Verification failed' };
      }
    } catch (error) {
      console.error('Verification error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get product by ID
  getProductById = (productId) => {
    return this.products.find(p => p.productId === productId);
  }

  // Get localized price for a product
  getProductPrice = (productId) => {
    const product = this.getProductById(productId);
    return product?.localizedPrice || null;
  }

  // Restore previous purchases
  restorePurchases = async () => {
    if (!this.isAvailable) {
      throw new Error('In-App Purchases not available');
    }

    if (!this.isInitialized) {
      // Try to reinitialize
      console.log('IAP not initialized, attempting to reinitialize...');
      const initialized = await this.initIAP();
      if (!initialized) {
        throw new Error('Failed to initialize In-App Purchases');
      }
    }

    try {
      const { getAvailablePurchases } = require('react-native-iap');
      
      const purchases = await getAvailablePurchases();
      console.log('Restored purchases:', purchases);
      
      return purchases;
    } catch (error) {
      console.error('Error restoring purchases:', error);
      throw error;
    }
  }

  // Process restored purchases - verify with backend
  processRestoredPurchases = async (purchases) => {
    if (!purchases || purchases.length === 0) {
      return { success: true, count: 0, message: 'No purchases to restore' };
    }

    console.log('=== PROCESSING RESTORED PURCHASES ===');
    console.log('Number of purchases to process:', purchases.length);

    let successCount = 0;
    let failureCount = 0;
    const errors = [];

    for (const purchase of purchases) {
      try {
        console.log('Processing restored purchase:', purchase.productId);
        
        // Verify with backend (similar to new purchases, but don't finish transaction)
        const verificationResult = await this.verifyPurchaseWithBackend(purchase);
        
        if (verificationResult.success) {
          successCount++;
          console.log('Successfully restored purchase:', purchase.productId);
        } else {
          failureCount++;
          errors.push(`${purchase.productId}: ${verificationResult.error || 'Verification failed'}`);
          console.warn('Failed to restore purchase:', purchase.productId, verificationResult.error);
        }
      } catch (error) {
        failureCount++;
        errors.push(`${purchase.productId}: ${error.message}`);
        console.error('Error processing restored purchase:', purchase.productId, error);
      }
    }

    console.log('=== RESTORE PROCESSING COMPLETE ===');
    console.log('Success:', successCount, 'Failed:', failureCount);

    return {
      success: successCount > 0,
      count: successCount,
      total: purchases.length,
      failures: failureCount,
      errors: errors.length > 0 ? errors : undefined
    };
  }

  cleanup = () => {
    if (this.purchaseUpdateSubscription) {
      this.purchaseUpdateSubscription.remove();
      this.purchaseUpdateSubscription = null;
    }
    if (this.purchaseErrorSubscription) {
      this.purchaseErrorSubscription.remove();
      this.purchaseErrorSubscription = null;
    }
  }

  // End connection when app is closed
  endConnection = async () => {
    try {
      this.cleanup();
      
      if (this.isInitialized) {
        const { endConnection } = require('react-native-iap');
        await endConnection();
        this.isInitialized = false;
      }
    } catch (error) {
      console.error('Error ending connection:', error);
    }
  }
}

export default new InAppPurchaseService();

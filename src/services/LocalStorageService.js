// import AsyncStorage from '@react-native-async-storage/async-storage';

// const REMEMBRANCE_ITEMS_KEY = 'remembrance_items';

// export const LocalStorageService = {
//   // Save remembrance items
//   saveRemembranceItems: async (items) => {
//     try {
//       const jsonValue = JSON.stringify(items);
//       await AsyncStorage.setItem(REMEMBRANCE_ITEMS_KEY, jsonValue);
//       return true;
//     } catch (error) {
//       console.error('Error saving remembrance items:', error);
//       return false;
//     }
//   },

//   // Get remembrance items
//   getRemembranceItems: async () => {
//     try {
//       const jsonValue = await AsyncStorage.getItem(REMEMBRANCE_ITEMS_KEY);
//       return jsonValue != null ? JSON.parse(jsonValue) : [];
//     } catch (error) {
//       console.error('Error getting remembrance items:', error);
//       return [];
//     }
//   },

//   // Add single remembrance item
//   addRemembranceItem: async (item) => {
//     try {
//       const existingItems = await LocalStorageService.getRemembranceItems();
//       const newItem = {
//         ...item,
//         id: item.id || Date.now().toString(), // Generate ID if not provided
//         createdAt: new Date().toISOString(),
//       };
      
//       const updatedItems = [...existingItems, newItem];
//       await LocalStorageService.saveRemembranceItems(updatedItems);
//       return { success: true, data: newItem };
//     } catch (error) {
//       console.error('Error adding remembrance item:', error);
//       return { success: false, error: error.message };
//     }
//   },

//   // Update remembrance item
//   updateRemembranceItem: async (item) => {
//     try {
//       const existingItems = await LocalStorageService.getRemembranceItems();
//       const itemIndex = existingItems.findIndex(i => i.id === item.id);
      
//       if (itemIndex === -1) {
//         return { success: false, error: 'Item not found' };
//       }
      
//       const updatedItems = [...existingItems];
//       updatedItems[itemIndex] = {
//         ...updatedItems[itemIndex],
//         ...item,
//         updatedAt: new Date().toISOString(),
//       };
      
//       await LocalStorageService.saveRemembranceItems(updatedItems);
//       return { success: true, data: updatedItems[itemIndex] };
//     } catch (error) {
//       console.error('Error updating remembrance item:', error);
//       return { success: false, error: error.message };
//     }
//   },

//   // Delete remembrance item
//   deleteRemembranceItem: async (id) => {
//     try {
//       const existingItems = await LocalStorageService.getRemembranceItems();
//       const filteredItems = existingItems.filter(item => item.id !== id);
//       await LocalStorageService.saveRemembranceItems(filteredItems);
//       return { success: true };
//     } catch (error) {
//       console.error('Error deleting remembrance item:', error);
//       return { success: false, error: error.message };
//     }
//   },
// };



import AsyncStorage from '@react-native-async-storage/async-storage';

const REMEMBRANCE_ITEMS_KEY = 'remembrance_items';

export const LocalStorageService = {
  // Save remembrance items
  saveRemembranceItems: async (items) => {
    try {
      const jsonValue = JSON.stringify(items);
      await AsyncStorage.setItem(REMEMBRANCE_ITEMS_KEY, jsonValue);
      return true;
    } catch (error) {
      console.error('Error saving remembrance items:', error);
      return false;
    }
  },

  // Get remembrance items
  getRemembranceItems: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(REMEMBRANCE_ITEMS_KEY);
      const items = jsonValue != null ? JSON.parse(jsonValue) : [];
      
      // Validate and clean up items
      return items.filter(item => 
        item && 
        item.id && 
        item.name && 
        typeof item.name === 'string' &&
        item.name.trim() !== ''
      );
    } catch (error) {
      console.error('Error getting remembrance items:', error);
      return [];
    }
  },

  // Add single remembrance item
  addRemembranceItem: async (item) => {
    try {
      const existingItems = await LocalStorageService.getRemembranceItems();
      
      // Validate required fields
      if (!item.name || !item.place || !item.description || !item.imageBase64) {
        return { 
          success: false, 
          error: 'All fields including image are required' 
        };
      }

      const newItem = {
        ...item,
        id: item.id || `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        // Ensure image data is properly formatted
        imageUri: item.imageUri || null,
        imageBase64: item.imageBase64 || null,
      };
      
      const updatedItems = [...existingItems, newItem];
      await LocalStorageService.saveRemembranceItems(updatedItems);
      return { success: true, data: newItem };
    } catch (error) {
      console.error('Error adding remembrance item:', error);
      return { success: false, error: error.message };
    }
  },

//   // Update remembrance item
//   updateRemembranceItem: async (item) => {
//     try {
//       const existingItems = await LocalStorageService.getRemembranceItems();
//       const itemIndex = existingItems.findIndex(i => i.id === item.id);
      
//       if (itemIndex === -1) {
//         return { success: false, error: 'Item not found' };
//       }
      
//       const updatedItems = [...existingItems];
//       updatedItems[itemIndex] = {
//         ...updatedItems[itemIndex],
//         ...item,
//         updatedAt: new Date().toISOString(),
//         // Preserve existing image if new one not provided
//         imageBase64: item.imageBase64 || updatedItems[itemIndex].imageBase64,
//         imageUri: item.imageUri || updatedItems[itemIndex].imageUri,
//       };
      
//       await LocalStorageService.saveRemembranceItems(updatedItems);
//       return { success: true, data: updatedItems[itemIndex] };
//     } catch (error) {
//       console.error('Error updating remembrance item:', error);
//       return { success: false, error: error.message };
//     }
//   },

//   // Delete remembrance item
//   deleteRemembranceItem: async (id) => {
//     try {
//       const existingItems = await LocalStorageService.getRemembranceItems();
//       const filteredItems = existingItems.filter(item => item.id !== id);
//       await LocalStorageService.saveRemembranceItems(filteredItems);
//       return { success: true };
//     } catch (error) {
//       console.error('Error deleting remembrance item:', error);
//       return { success: false, error: error.message };
//     }
//   },

//   // Validate item data
//   validateItem: (item) => {
//     if (!item) return false;
//     if (!item.id || !item.name || !item.place || !item.description) return false;
//     if (typeof item.name !== 'string' || item.name.trim() === '') return false;
//     if (typeof item.place !== 'string' || item.place.trim() === '') return false;
//     if (typeof item.description !== 'string' || item.description.trim() === '') return false;
    
//     return true;
//   }
};
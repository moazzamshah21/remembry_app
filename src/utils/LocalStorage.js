import AsyncStorage from '@react-native-async-storage/async-storage';

const GetData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch (error) {
        console.error('LocalStorage.GetData error:', error);
        return null;
    }
};

const SetData = async (key, data) => {
    try {
        await AsyncStorage.setItem(key, data);
        return true;
    } catch (error) {
        console.error('LocalStorage.SetData error:', error);
        return false;
    }
};

const RemoveData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('LocalStorage.RemoveData error:', error);
        return false;
    }
}

export default { GetData, SetData, RemoveData };
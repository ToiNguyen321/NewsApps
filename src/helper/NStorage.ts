import AsyncStorage from '@react-native-async-storage/async-storage';

export const BOOKMARK_NEW = '@BOOKMARK_NEW';

const NStorage = {
    getItem: async function (key: string): Promise<any> {
        try {
            let value: string | null = await AsyncStorage.getItem(key);
            //You'd want to error check for failed JSON parsing...
            return value != null ? JSON.parse(value) : null;
        } catch (error) {
            return null;
        }
    },
    setItem: async function (key: string, value: any) {
        try {
            return await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
        }
    },
    removeItem: async function (key: string) {
        try {
            return await AsyncStorage.removeItem(key);
        } catch (error) {
        }
    }
};

export default NStorage;
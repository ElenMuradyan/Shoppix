import { account, client } from "@/lib/appwrite";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function logout () {
  try {
    await account.deleteSession('current');
    await AsyncStorage.removeItem('appwrite_jwt');
    client.setJWT(""); 
    console.log("User logged out successfully.");
  } catch (error) {
    console.error("Logout error:", error);
  }
}
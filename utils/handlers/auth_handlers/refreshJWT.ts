import { account, client } from "@/lib/appwrite";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function initClientJWT() {
  try {
    const jwt = await AsyncStorage.getItem("appwrite_jwt");
    if (jwt) {
      client.setJWT(jwt);
    }
  } catch (error) {
    console.error("Failed to initialize JWT:", error);
  }
}
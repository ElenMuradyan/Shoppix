import { account, client } from "@/lib/appwrite";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function restoreSession() {
  const jwt = await AsyncStorage.getItem('appwrite_jwt');
  if (jwt) {
    client.setJWT(jwt);
    const user = await account.get();
    return user.$id;
  }
  return null;
}
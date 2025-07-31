import { account, client } from "@/lib/appwrite";
import { ROUTE_CONSTANTS } from "@/utils/routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export async function handleSignIn(
  email: string,
  password: string,
): Promise<void> {
  try {   
    try {
      const currentSession = await account.getSession('current');
      if (currentSession) {
        await account.deleteSession("current");
      }
    } catch {
    }
    await account.createEmailPasswordSession(email, password);

    const jwt = await account.createJWT();
    await AsyncStorage.setItem('appwrite_jwt', jwt.jwt);
    client.setJWT(jwt.jwt);

    const session = await account.getSession('current');
    console.log("Logged in session:", session);

    router.replace(ROUTE_CONSTANTS.HOME);
  } catch (err: any) {
    console.error(err);
    return err;
  }
}
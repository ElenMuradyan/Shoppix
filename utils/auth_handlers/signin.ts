import { account, client } from "@/lib/appwrite";
import { ROUTE_CONSTANTS } from "@/utils/routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export async function handleSignIn(
  email: string,
  password: string,
  setError: (err: string | null) => void
): Promise<void> {
  try {
    setError(null);
    await account.createEmailPasswordSession(email, password);

    const jwt = await account.createJWT();
    await AsyncStorage.setItem('appwrite_jwt', jwt.jwt);
    client.setJWT(jwt.jwt);

    router.replace(ROUTE_CONSTANTS.HOME);
  } catch (err: any) {
    console.error(err);
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("An error occurred during sign in");
    }
  }
}

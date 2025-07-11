import { account, client, db } from "@/lib/appwrite";
import { ID, Permission, Role } from "react-native-appwrite";
import { userDataType } from "@/types/slices/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function handleSignUp(data: userDataType): Promise<string | null> {
  const {password, ...rest} = data;

  try {
    const id = ID.unique();
    const accountResponse = await account.create(id, data.email, password!);
    const appwriteUserId = accountResponse.$id;
console.log(id);

    console.log(appwriteUserId);

    const jwt = await account.createJWT();
    await AsyncStorage.setItem('appwrite_jwt', jwt.jwt);
    client.setJWT(jwt.jwt);


    await db.createDocument(
      process.env.EXPO_PUBLIC_DB_ID!,
      process.env.EXPO_PUBLIC_DB_USERS_COL_ID!,
      appwriteUserId,
      {
        ...rest,
        postIndex: data.postIndex.toString(),
        role: "user",
        ID: appwriteUserId,
      }
    );
    return null;
  } catch (err: any) {
    console.log(err);
    return err instanceof Error ? err.message : "An error occurred during signup";
  }
}
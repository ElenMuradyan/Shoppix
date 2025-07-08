import { account, db } from "@/lib/appwrite";
import { ID, Permission, Role } from "react-native-appwrite";
import { userDataType } from "@/types/slices/userSlice";

export async function handleSignUp(data: userDataType): Promise<string | null> {
  try {
    const userId = ID.unique();
    await account.create(userId, data.email, data.password!);
    await account.createEmailPasswordSession(data.email, data.password!);
    await db.createDocument(
      process.env.EXPO_PUBLIC_DB_ID!,
      process.env.EXPO_PUBLIC_DB_USERS_COL_ID!,
      userId,
      {
        ...data,
        postIndex: data.postIndex.toString(),
        role: "user",
        ID: userId,
      },
      [
        Permission.read(Role.user(userId)),
        Permission.write(Role.user(userId)),
      ]
    );
    return null;
  } catch (err: any) {
    console.log(err);
    return err instanceof Error ? err.message : "An error occurred during signup";
  }
}
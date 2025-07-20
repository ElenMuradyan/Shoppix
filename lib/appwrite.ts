import { ENV } from "@/constants/env";
import { Account, Client, Databases, Storage } from "react-native-appwrite";

export const client = new Client()
    .setEndpoint(ENV.APPWRITE_ENDPOINT)
    .setProject(ENV.APPWRITE_PROJECT_ID)
    .setPlatform(ENV.APPWRITE_PLATFORM);

export const account = new Account(client);
export const db = new Databases(client);
export const storage = new Storage(client);
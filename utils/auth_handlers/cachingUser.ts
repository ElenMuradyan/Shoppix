import { account, client } from "@/lib/appwrite";
import { useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useJwtRefresh() {
    useEffect(() => {
        async function updateJWT() {
            try{
                const jwt = await account.createJWT();
                await AsyncStorage.setItem('appwrite_jwt', jwt.jwt);
                client.setJWT(jwt.jwt);
            }catch (error) {
                console.error('Failed to refresh JWT', error);
            }
        }

        updateJWT();

        const id = setInterval(updateJWT, 10 * 60 * 1000);

        return () => clearInterval(id);
    }, [])
}
import { account } from "@/lib/appwrite";
import { logout } from "@/utils/handlers/auth_handlers/logout";
import { ROUTE_CONSTANTS } from "@/utils/routes";
import { Link } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function HomeScreen() {
    useEffect(() => {
      async function getCurrent() {
        try {
          const session = await account.getSession('current');
          console.log('Current session:', session);
        } catch (error: any) {
          console.warn('No current session:', error.message);
        }
      }
      getCurrent();
    }, []);
        
  return (
    <View
      style={styles.view}
    >
      <Text className="text-yellow-700 dark:text-yellow-400">Home Page</Text>
      <Link href={ROUTE_CONSTANTS.AUTH_PROTECTED.LOGIN}>
            <Text className="text-blue-800 dark:text-amber-500">Go to Login</Text>
      </Link>
      <Button onPress={logout}>Logout</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
  text: {
    color: "white",
    fontSize: 30,
  }
})
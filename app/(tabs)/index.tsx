import { ROUTE_CONSTANTS } from "@/utils/routes";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View
      style={styles.view}
    >
      <Text className="text-yellow-700 dark:text-yellow-400">Home Page</Text>
      <Link href={ROUTE_CONSTANTS.AUTH_PROTECTED.LOGIN}>
            <Text className="text-blue-800 dark:text-amber-500">Go to Login</Text>
      </Link>
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
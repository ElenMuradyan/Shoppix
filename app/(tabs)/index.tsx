import { ROUTE_CONSTANTS } from "@/utils/routes";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View
      style={styles.view}
    >
      <Text>Home Page</Text>
      <Link href={ROUTE_CONSTANTS.AUTH_PROTECTED.LOGIN}>
            <Text style={{ color: "blue", marginTop: 10 }}>Go to Login</Text>
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
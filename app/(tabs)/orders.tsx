import React from "react";
import { useSelector } from "react-redux";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { RootState } from "@/store/store";
import OrderComponent from "@/components/CustomerOrderItem";

const Orders = () => {
  const { userOrders } = useSelector((state: RootState) => state.userOrders);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text>ԻՄ ՊԱՏՎԵՐՆԵՐԸ</Text>
      </View>

      {userOrders && userOrders.length > 0 ? (
        userOrders.map((order, index) => (
          <OrderComponent order={order} key={index} />
        ))
      ) : (
        <Text style={styles.noOrdersText}>ՊԱՏՎԵՐՆԵՐ ՉԵՆ ԳՏՆՎԵԼ.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  titleContainer: {
    marginBottom: 24,
  },
  noOrdersText: {
    textAlign: "center",
    color: "#4B5563",
    marginTop: 24,
    fontSize: 16,
  },
});

export default Orders;

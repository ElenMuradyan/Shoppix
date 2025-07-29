import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import { RootState } from "@/store/store";

const CardTotal = () => {
  const { cartItems } = useSelector((state: RootState) => state.cartItems);
  const [subtotal, setSubtotal] = useState<number>(0);

  useEffect(() => {
    const sum = cartItems
      .filter(item => item.ordering)
      .reduce((acc, item) => acc + Number(item.stock) * Number(item.price), 0);
    setSubtotal(sum);
  }, [cartItems]);

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text>ՎՃԱՐՄԱՆ ԴԵՏԱԼՆԵՐԸ</Text>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Ապրանքի գին</Text>
          <Text style={styles.value}>{subtotal} Դ</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.row}>
          <Text style={styles.label}>Առաքման վճար</Text>
          <Text style={styles.value}>500 Դ</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.row}>
          <Text style={[styles.label, styles.totalLabel]}>Ընդհանուր</Text>
          <Text style={[styles.value, styles.totalValue]}>{subtotal + 500} Դ</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  titleWrapper: {
    marginBottom: 8,
  },
  detailsContainer: {
    marginTop: 8,
    gap: 8, 
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: "#000",
  },
  value: {
    fontSize: 14,
    color: "#000",
  },
  separator: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginVertical: 4,
  },
  totalLabel: {
    fontWeight: "700",
  },
  totalValue: {
    fontWeight: "700",
  },
});

export default CardTotal;

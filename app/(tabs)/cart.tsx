import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
// import { handleOrder } from "../../utilis/helpers/handleOrder";
// import CardTotal from "../../components/sheard/CardTotal";
import CartProductList from "@/components/CartProductList";
import { AppDispatch, RootState } from "@/store/store";
import { fetchCartItems } from "@/store/slices/cartItemsSlice";

const Cart = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { authUserInfo: {userData}} = useSelector((state: RootState) => state.userData);
  const { products } = useSelector((state: RootState) => state.products);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (userData && products) {
      dispatch(fetchCartItems({ids: userData.cartItems, products}));
    }
  }, [userData, products]);

  return (
      <ScrollView style={styles.container}>
          <Text style={styles.titleContainer}>ՁԵՐ ԶԱՄԲՅՈՒՂԸ</Text>
        <CartProductList />
        <View style={styles.bottomContainer}>
          <View style={styles.cardTotalContainer}>
            {/* <CardTotal /> */}
            <TouchableOpacity
            //   disabled={loading}
              onPress={() =>{}
                // handleOrder({ cart, navigate: navigation, setErrorMessage })
              }
              style={[
                styles.orderButton,
                // loading && { opacity: 0.5 },
              ]}
            >
              <Text style={styles.orderButtonText}>GO TO ORDER PAGE</Text>
            </TouchableOpacity>
            {!!errorMessage && (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            )}
          </View>
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 56,
    paddingHorizontal: 16,
    flex: 1,
  },
  titleContainer: {
    marginBottom: 12,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginVertical: 32,
  },
  cardTotalContainer: {
    width: "100%",
    maxWidth: 450,
    alignSelf: "center",
  },
  orderButton: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 16,
    alignItems: "center",
  },
  orderButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  errorMessage: {
    color: "red",
    marginTop: 8,
    textAlign: "center",
  },
});

export default Cart;
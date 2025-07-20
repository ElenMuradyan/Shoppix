import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CartProductList from "@/components/CartProductList";
import { AppDispatch, RootState } from "@/store/store";
import { fetchCartItems } from "@/store/slices/cartItemsSlice";
import { handleOrder } from "@/utils/cart/handleOrder";
import CardTotal from "@/components/CardTotal";
import { useRouter } from "expo-router";
import { ROUTE_CONSTANTS } from "@/utils/routes";

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { authUserInfo: {userData}} = useSelector((state: RootState) => state.userData);
  const { products } = useSelector((state: RootState) => state.products);
  const { cartItems } = useSelector((state: RootState) => state.cartItems);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (userData && products) {
      dispatch(fetchCartItems({ids: userData.cartItems, products}));
    }
  }, [userData, products]);

    const handleGoToOrder = async () => {
      try{
          setLoading(true);
          handleOrder({ cart: cartItems, setErrorMessage });
          router.replace(`..${ROUTE_CONSTANTS.PLACEORDER}`);
      }catch(err: any) {
        console.log(err.message);
      }finally{
        setLoading(false);
      }
    }
  
  return (
      <ScrollView style={styles.container}>
          <Text style={styles.titleContainer}>ՁԵՐ ԶԱՄԲՅՈՒՂԸ</Text>
        <CartProductList />
        <View style={styles.bottomContainer}>
          <View style={styles.cardTotalContainer}>
            <CardTotal />
            <TouchableOpacity
              onPress={handleGoToOrder}
              style={[
                styles.orderButton,
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
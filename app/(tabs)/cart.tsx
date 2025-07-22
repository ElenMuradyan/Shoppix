import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import CartProductList from "@/components/CartProductList";
import { RootState } from "@/store/store";
import CardTotal from "@/components/CardTotal";
import { ROUTE_CONSTANTS } from "@/utils/routes";
import { handleOrder } from "@/utils/handlers/cart_handlers/handleOrder";
import { navigate } from "expo-router/build/global-state/routing";
import { State, Swipeable, TapGestureHandler } from "react-native-gesture-handler";

const Cart = () => {
  const { cartItems } = useSelector((state: RootState) => state.cartItems);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const openSwipeableRef = useRef<Swipeable | null>(null);

  const handleCloseSwipeable = () => {
    openSwipeableRef.current?.close();
    openSwipeableRef.current = null;
  };

  const handleOpenSwipeable = (ref: Swipeable) => {
    if (openSwipeableRef.current && openSwipeableRef.current !== ref) {
      openSwipeableRef.current.close();
    }
    openSwipeableRef.current = ref;
  };

    const handleGoToOrder = async () => {
      try{
          setLoading(true);
          handleOrder({ cart: cartItems, setErrorMessage });
          navigate(ROUTE_CONSTANTS.NOT_AUTH_PROTECTED.PLACEORDER);
      }catch(err: any) {
        console.log(err.message);
      }finally{
        setLoading(false);
      }
    }
  
  return (
    <ScrollView>
    <TapGestureHandler
    onHandlerStateChange={({ nativeEvent }) => {
      if (nativeEvent.state === State.END) {
        handleCloseSwipeable();
      }
    }}
  >
      <View style={styles.container}>
          <Text style={styles.titleContainer}>ՁԵՐ ԶԱՄԲՅՈՒՂԸ</Text>
        <CartProductList onSwipeOpen={handleOpenSwipeable}/>
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
      </View>
      </TapGestureHandler>
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
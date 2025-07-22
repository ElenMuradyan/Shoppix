import React from "react";
import { useSelector } from "react-redux";
import { FlatList, View, StyleSheet } from "react-native";
import { RootState } from "@/store/store";
import CartProductItem from "./CartProductItem";
import { Swipeable, TapGestureHandler } from "react-native-gesture-handler";

const CartProductList = ({onSwipeOpen}: {onSwipeOpen: (ref: Swipeable) => void}) => {
  const { cartItems } = useSelector((state: RootState) => state.cartItems);
  const reversedCart = [...cartItems].reverse();

  return (
    <TapGestureHandler>
    <View style={styles.container}>
      <FlatList
        data={reversedCart}
        keyExtractor={(item, index) => item.cartItemId || index.toString()}
        renderItem={({ item }) => (
            <CartProductItem 
            {...item} 
            index={cartItems.indexOf(item)} 
            onSwipeOpen={onSwipeOpen}
            />
        )}
        contentContainerStyle={{ gap: 24 }}/>
    </View>
    </TapGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export default CartProductList;
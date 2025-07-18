import React from "react";
import { useSelector } from "react-redux";
import { FlatList, View, StyleSheet } from "react-native";
import { RootState } from "@/store/store";
import CartProductItem from "./CartProductItem";

const CartProductList = () => {
  const { cartItems } = useSelector((state: RootState) => state.cartItems);
  const reversedCart = [...cartItems].reverse();

  return (
    <View style={styles.container}>
      <FlatList
        data={reversedCart}
        keyExtractor={(item, index) => item.cartItemId || index.toString()}
        renderItem={({ item, index }) => {
          const { productId, stock, image, price, name, options, maxStock, ordering, cartItemId } = item;

          return (
            <CartProductItem
              cartItemId={cartItemId}
              productId={productId}
              image={image}
              name={name}
              price={price}
              stock={stock}
              options={options}
              maxStock={maxStock}
              ordering={ordering}
              index={cartItems.indexOf(item)}
            />
          );
        }}
        contentContainerStyle={{ gap: 24 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export default CartProductList;

import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { useRouter } from "expo-router";
import { cartNames } from "@/constants/optionNamesOptions";
import { handleAddToOrder, handleDeleteCartItem, handleStockChange } from "@/utils/cart/handleChanges";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { handleChange } from "@/utils/stockValidator";
import { cartProduct } from "@/types/slices/cartItemsSlice";
import { ROUTE_CONSTANTS } from "@/utils/routes";

const CartProductItem: React.FC<cartProduct> = ({
  productId,
  image,
  name,
  price,
  stock,
  maxStock,
  options,
  ordering,
  cartItemId,
  index
}) => {
  const { userData } = useSelector((state: RootState) => state.userData.authUserInfo);
  const { cartItems } = useSelector((state: RootState) => state.cartItems);
  const dispatch = useDispatch<AppDispatch>();
  const [submitChange, setSubmitChange] = useState(false);
  const [inputValue, setInputValue] = useState<string>(`${stock}`);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [orderedStock, setOrderedStock] = useState<string>(stock);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => handleAddToOrder({ cartItemId, dispatch, userData, index, ordering })}
        >
          <Text>{ordering ? "✓" : " "}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace(`${ROUTE_CONSTANTS.PRODUCTDETAILS}/${productId}`)}>
          <Image source={{ uri: image }} style={styles.image} />
        </TouchableOpacity>

        <View style={styles.details}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.priceOptions}>
            <Text>{price} AMD</Text>
            {options &&
              Object.entries(options).map(([key, value], i) => (
                <Text key={i} style={styles.option}>
                {`${String(cartNames[key] ?? key)}: ${String(value)}`}
                </Text>
              ))}
          </View>
        </View>
      </View>

      <View style={styles.stockInputContainer}>
        {submitChange && (
          <TouchableOpacity onPress={() => handleStockChange({
            cartItemId,
            userData,
            setLoading,
            inputValue,
            setSubmitChange,
            dispatch
          })}>
            {loading ? (
              <ActivityIndicator />
            ) : (
                <AntDesign name="checkcircleo" size={24} color="black" />
            )}
          </TouchableOpacity>
        )}
        <TextInput
          keyboardType="number-pad"
          value={orderedStock.toString()}
          onChangeText={(text) => {handleChange(text, setOrderedStock, setErrorMessage, Number(maxStock)); setSubmitChange(true); setInputValue(text)}}
          style={styles.input}
          placeholder="Enter quantity"
        />
      </View>

      <TouchableOpacity onPress={() =>
        handleDeleteCartItem({
          cartItemId,
          userData,
          appDispatch: dispatch,
          dispatch,
          cart: cartItems
        })
      }
      style={{ padding: 8 }}
      >
        <MaterialIcons name="delete" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default CartProductItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB", // light gray
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    backgroundColor: "#FFFFFF",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    flex: 4,
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#6B7280", // gray-500
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
    resizeMode: "cover",
    backgroundColor: "#F3F4F6", // gray-100 fallback
  },
  details: {
    flexShrink: 1,
    gap: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827", // gray-900
  },
  priceOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 4,
  },
  option: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#E0F2FE", // blue-100
    borderColor: "#BAE6FD", // blue-200
    borderWidth: 1,
    borderRadius: 6,
    color: "#0369A1", // blue-700
  },
  stockInputContainer: {
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    gap: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB", // gray-300
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 8,
    width: 60,
    textAlign: "center",
    fontSize: 14,
    color: "#111827",
    backgroundColor: "#F9FAFB",
  },
  errorText: {
    color: "#DC2626", // red-600
    fontSize: 12,
    marginTop: 2,
  },
});

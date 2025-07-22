import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { cartNames } from "@/constants/optionNamesOptions";
import { orderStatuses, OrderKeys } from "@/constants/orderStatuses";
import { ROUTE_CONSTANTS } from "@/utils/routes";
// import { handleStatusChange } from "../../../state-management/redux/slices/shopInfoSlice";
// import { handleChangeStatus } from "../../../utilis/helpers/sellerOrderListFunctions";
// import { fetchUserData } from "../../../state-management/redux/slices/userDataSlice";
import { AppDispatch, RootState } from "@/store/store";
import { order } from "@/types/slices/ordersSlice";
import { navigate } from "expo-router/build/global-state/routing";
import OrderProductItem from "./OrderProduct";

const OrderComponent = ({ order }: { order: order }) => {
  const { userOrders } = useSelector((state: RootState) => state.userOrders);
  const dispatch = useDispatch<AppDispatch>();
  const { id, date, address, status, cartProducts, totalPrice, returnedItemsDetails } = order;

  const orderInfo = orderStatuses[status as string];
  const [modalOpen, setModalOpen] = useState(false);
  const orderStatusesArray = Object.keys(orderStatuses);
  const index = orderStatusesArray.indexOf(status);
  const returnAbleProducts = cartProducts.filter(item => item.returnable);
console.log(cartProducts);

  const handleModalOk = () => {
    // const prev: OrderKeys = orderStatusesArray[index] as OrderKeys;
    // const next: OrderKeys = orderStatusesArray[index + 1] as OrderKeys;

    // const newOrdersObject = {
    //   ...orders,
    //   [prev]: orders[prev].filter((item) => item !== order),
    //   [next]: [...orders[next], order],
    // };

    // dispatch(handleStatusChange(newOrdersObject));
    // dispatch(fetchUserData());
    // handleChangeStatus({ order, setModalOpen, prev, next });
  };

  const handleReturn = () => {
    // const returnDetails = { order, orderStatusesArray, index, returnAbleProducts };
    // navigation.navigate(ROUTE_NAMES.RETURN as never);
    // localStorage.setItem('returnDetails', JSON.stringify(returnDetails));
  };

  return (
    <View style={styles.container}>
      <Modal isVisible={modalOpen}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{orderInfo?.buyerModalMessage}</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.confirmBtn} onPress={handleModalOk}>
              <Text style={styles.buttonText}>CONFIRM</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalOpen(false)}>
              <Text style={styles.cancelText}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <Text style={styles.date}>{date.slice(0, 10)}</Text>
        <Text style={styles.price}>{totalPrice} Դ</Text>
      </View>

      <View style={[styles.statusBox, { backgroundColor: orderInfo?.color || "#fff" }]}>
        <View style={[styles.statusDot, { backgroundColor: orderInfo?.color }]} />
        <Text style={[styles.statusText, { color: orderInfo?.textColor || "#000" }]}>{orderInfo?.message}</Text>
      </View>

      <Text style={styles.address}>
        📍 {Object.values(address).join(", ")}
      </Text>

      <ScrollView 
      horizontal 
      style={styles.productsContainer}
      contentContainerStyle={{ flexDirection: 'row', gap: 12, width: '100%' }}
      >
        {
            cartProducts.map((item) => <OrderProductItem product={item}/>)
        }
      </ScrollView>

      {status === 'sentOrders' && (
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.confirmBtn} onPress={() => setModalOpen(true)}>
            <Text style={styles.buttonText}>Have you received the order?</Text>
          </TouchableOpacity>
          {returnAbleProducts.length > 0 && (
            <TouchableOpacity style={styles.confirmBtn} onPress={handleReturn}>
              <Text style={styles.buttonText}>Have you returned the products?</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {status === 'doneOrders' && returnedItemsDetails && (
        <View>
          <Text style={styles.sectionTitle}>Returned Products</Text>
          <Text style={styles.sectionTitle}>Return Amount: {returnedItemsDetails.returnPrice}</Text>
          {!returnedItemsDetails.confirmedReturn && (
            <Text style={styles.warningText}>The amount for returned products will be received once the return is confirmed by the seller.</Text>
          )}
          {returnedItemsDetails.products.map((product, index) => (
            <View key={index} style={styles.returnedProduct}>
              <Image source={{ uri: product.image }} style={styles.returnedImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text>{product.price} AMD</Text>
                <Text>Quantity: {product.stock}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", padding: 16, marginBottom: 16, borderRadius: 12, elevation: 2, display: 'flex', gap: 15 },
  modalContent: { backgroundColor: "#fff", padding: 20, borderRadius: 10, alignItems: "center" },
  modalText: { fontSize: 16, fontWeight: "600", marginBottom: 16 },
  modalButtons: { flexDirection: "row", gap: 10 },
  confirmBtn: { backgroundColor: "#2563eb", padding: 10, borderRadius: 8 },
  cancelBtn: { backgroundColor: "#d1d5db", padding: 10, borderRadius: 8 },
  buttonText: { color: "#fff", fontWeight: "600" },
  cancelText: { color: "#000" },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  date: { color: "#6b7280" },
  price: { fontWeight: "bold", fontSize: 16 },
  statusBox: { flexDirection: "row", alignItems: "center", padding: 8, borderRadius: 8, marginBottom: 12 },
  statusDot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
  statusText: { fontWeight: "500" },
  address: { marginBottom: 12, fontSize: 14 },
  productsContainer: { marginBottom: 16 },
  productBox: { flexDirection: "row", backgroundColor: "#f9fafb", padding: 12, borderRadius: 8, marginBottom: 12 },
  productImage: { width: 64, height: 64, borderRadius: 8 },
  productInfo: { marginLeft: 12, flex: 1 },
  productName: { fontWeight: "600", fontSize: 16, marginBottom: 4 },
  productDetails: { gap: 4 },
  productPrice: { fontWeight: "600" },
  optionTag: { backgroundColor: "#e5e7eb", padding: 4, borderRadius: 4, marginTop: 4 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", gap: 10, marginTop: 10 },
  sectionTitle: { fontWeight: "bold", marginBottom: 4 },
  warningText: { color: "#b91c1c", fontWeight: "bold", marginBottom: 8 },
  returnedProduct: { flexDirection: "row", gap: 12, padding: 12, backgroundColor: "#f3f4f6", borderRadius: 8, marginBottom: 8 },
  returnedImage: { width: 80, height: 80, borderRadius: 8 },
});

export default OrderComponent;


/*
        {cartProducts.map((product, index) => (
          <TouchableOpacity key={index} onPress={() => navigate(`/Product/product-details/${product.productId}`)}>
            <View style={styles.productBox}>
              <Image source={{ uri: product.image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <View style={styles.productDetails}>
                  <Text style={styles.productPrice}>{product.price} AMD</Text>
                  <Text>Quantity: {product.stock}</Text>
                  {product.options && Object.entries(product.options).map(([key, value], idx) => (
                    <Text key={idx} style={styles.optionTag}>{`${cartNames[key]}: ${value}`}</Text>
                  ))}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
*/
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { cartNames } from "@/constants/optionNamesOptions";
import { orderStatuses, OrderKeys } from "@/constants/orderStatuses";
import { ROUTE_CONSTANTS } from "@/utils/routes";
import { AppDispatch, RootState } from "@/store/store";
import { order } from "@/types/slices/ordersSlice";
import { navigate } from "expo-router/build/global-state/routing";
import OrderProductItem from "./OrderProduct";

const OrderComponent = ({ order }: { order: order }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { id, date, address, status, cartProducts, totalPrice, returnedProducts, returnedPrice } = order;
  const orderInfo = orderStatuses[status as string];
  const [modalOpen, setModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const orderStatusesArray = Object.keys(orderStatuses);
  const index = orderStatusesArray.indexOf(status);
  const returnAbleProducts = cartProducts.filter(item => item.returnable);

  const handleModalOk = () => {

  };
  const handleCancelModalOk = () => {

  }

  return (
    <View style={styles.container}>
      <Modal isVisible={modalOpen}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{orderInfo?.buyerModalMessage}</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.confirmBtn} onPress={handleModalOk}>
              <Text style={styles.buttonText}>ՀԱՍՏԱՏԵԼ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalOpen(false)}>
              <Text style={styles.cancelText}>ՉԵՂԱՐԿԵԼ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

        <Modal isVisible={cancelModalOpen}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{orderInfo?.cancelModalMessage}</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.confirmBtn} onPress={handleCancelModalOk}>
              <Text style={styles.buttonText}>ՀԱՍՏԱՏԵԼ ՉԵՂԱՐԿՈՒՄԸ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setCancelModalOpen(false)}>
              <Text style={styles.cancelText}>ՉԵՂԱՐԿԵԼ</Text>
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
        {cartProducts.map((item, index) => <OrderProductItem key={index} product={item} />)}
      </ScrollView>

      {
        returnedProducts.length > 0 && 
        <>
        <View style={styles.header}>
        <Text style={styles.productName}>Վերադարձված ապրանքներ</Text>
        <Text style={styles.price}>{returnedPrice} Դ</Text>
        </View>

        <ScrollView 
            horizontal 
            style={styles.productsContainer}
            contentContainerStyle={{ flexDirection: 'row', gap: 12, width: '100%' }}
        >
            {returnedProducts.map((product, index) => (
            <View key={index} style={styles.returnedProduct}>
              <Image source={{ uri: product.image }} style={styles.returnedImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text>{product.price} Դ</Text>
                <Text>Քանակ՝ {product.stock}</Text>
              </View>
            </View>)
            )}
        </ScrollView>
        </>
      }
      {status === 'newOrders' && (
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => setCancelModalOpen(true)}>
            <Text style={styles.buttonText}>ՉԵՂԱՐԿԵԼ ՊԱՏՎԵՐԸ</Text>
          </TouchableOpacity>
        </View>
      )}

      {status === 'sentOrders' && (
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.confirmBtn} onPress={() => setModalOpen(true)}>
            <Text style={styles.buttonText}>Ստացե՞լ եք պատվերը</Text>
          </TouchableOpacity>

          {
            returnAbleProducts.length > 0 &&
            <TouchableOpacity onPress={() => navigate(`../orderReturn/${id}`)} style={styles.confirmBtn}>
                <Text style={styles.buttonText}>Վերադարձի էջ</Text>
            </TouchableOpacity>
          }
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
  cancelButton:{ backgroundColor: "red", padding: 10, borderRadius: 8 },
  sectionTitle: { fontWeight: "bold", marginBottom: 4 },
  warningText: { color: "#b91c1c", fontWeight: "bold", marginBottom: 8 },
  returnedProduct: { flexDirection: "row", gap: 12, padding: 12, backgroundColor: "#f3f4f6", borderRadius: 8, marginBottom: 8 },
  returnedImage: { width: 80, height: 80, borderRadius: 8 },
});

export default OrderComponent;

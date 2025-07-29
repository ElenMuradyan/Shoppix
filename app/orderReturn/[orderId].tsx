import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { order, orderCartProduct } from "@/types/slices/ordersSlice";
import { useSearchParams } from "expo-router/build/hooks";
import { styles } from "@/styles/order";
import ReturnProduct from "@/components/ReturnProduct";
import { handleConfirmReturn } from "@/utils/handlers/cart_handlers/handleReturn";

const Order = () => {
  const { userOrders } = useSelector((state: RootState) => state.userOrders);
  const dispatch = useDispatch<AppDispatch>();
  const [order, setOrder] = useState<order | null>(null);
  const [returnAbleProducts, setReturnAbleProducts] = useState<orderCartProduct[]>([]);
  const orderId = useSearchParams().get("orderId");
  const [returnItems, setReturnItems] = useState<orderCartProduct[]>([]);
  const [boughtItems, setBoughtItems] = useState<orderCartProduct[]>([]);

  useEffect(() => {
    const order = userOrders.find((item) => item.id === orderId);
    
    if(order){
      setOrder(order);
      setBoughtItems(order.cartProducts);
      const returnAbleProducts = order.cartProducts.filter(item => item.returnable);      
      setReturnAbleProducts(returnAbleProducts);
    }else{
      setOrder(null);
      setReturnAbleProducts([]);
    }
  }, [orderId, userOrders])

  return (
  <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View>
      <Text style={styles.title}>Ընտրեք վերադարձման ենթակա ապրանքները</Text>
      <Text style={styles.subtitle}>
        Այստեղ ցուցադրված ապրանքները ենթակա են վերադարձի։ Ձեր պատվերի մնացած ապրանքները վերադարձման ենթակա չեն։
      </Text>

      {returnAbleProducts.map((product, index) => <ReturnProduct key={index} index={index} product={product} order={order!} returnItems={returnItems} setBoughtItems={setBoughtItems} setReturnItems={setReturnItems}/>)}

      <View style={styles.confirmSection}>
        <TouchableOpacity style={styles.confirmButton} onPress={() => handleConfirmReturn({orderId, order, dispatch, returnItems, boughtItems})}>
          <Text style={styles.confirmText}>Հաստատել վերադարձը</Text>
        </TouchableOpacity>
        <Text style={styles.warning}>
          Դուք կստանաք փոխհատուցումը, երբ վաճառողը ստանա ապրանքը և հաստատի վերադարձը։
        </Text>
      </View>

    </View>
  </ScrollView>
  );
};

export default Order;
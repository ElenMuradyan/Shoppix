import { cartNames } from "@/constants/optionNamesOptions";
import { orderCartProduct } from "@/types/slices/ordersSlice";
import { navigate } from "expo-router/build/global-state/routing";
import { Image, StyleSheet, Text } from "react-native";
import { TouchableOpacity, View } from "react-native";

export default function OrderPageProductComponent ({product}: {product: orderCartProduct}) {
    return(
        <TouchableOpacity onPress={() => navigate(`/Product/product-details/${product.productId}`)}>
            <View style={styles.productBox}>
              <Image source={{ uri: product.image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <View style={styles.productDetails}>
                  <Text style={styles.productPrice}>{product.price} Դ</Text>
                  <Text>Քանակ: {product.stock}</Text>
                  {product.options && Object.entries(product.options).map(([key, value], idx) => (
                    <Text key={idx} style={styles.optionTag}>{`${cartNames[key]}: ${value}`}</Text>
                  ))}
                </View>
              </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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
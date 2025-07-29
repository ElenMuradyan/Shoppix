import { cartNames } from "@/constants/optionNamesOptions";
import { styles } from "@/styles/order";
import { order, orderCartProduct } from "@/types/slices/ordersSlice";
import { Image, View, Text, TouchableOpacity } from "react-native";

export default function ReturnProduct ({index, product, order, returnItems, setBoughtItems, setReturnItems}: 
    {index: number, 
    product: orderCartProduct, 
    order: order, 
    returnItems: orderCartProduct[],
    setBoughtItems: React.Dispatch<React.SetStateAction<orderCartProduct[]>>;
    setReturnItems: React.Dispatch<React.SetStateAction<orderCartProduct[]>>;
     }) {
    const handleCheckReturnProduct = (product: orderCartProduct) => {
        if(order){
            const selected = !returnItems.includes(product);
            if (selected) {
                setReturnItems((prev) => [...prev, product]);
                setBoughtItems(prev => prev.filter(item => item.cartItemId !== product.cartItemId));
            } else {
                setReturnItems(prev => prev.filter(item => item.cartItemId !== product.cartItemId));
                setBoughtItems(prev => [... prev, product]);
            }
        }
    };
    
    return(
        <View key={index} style={styles.productBox}>
          <Image source={{ uri: product.image }} style={styles.image} />
          <View style={styles.productInfo}>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>{product.price} Դ</Text>
            <Text style={styles.quantity}>Քանակ: {product.stock}</Text>
            {product.options &&
              Object.entries(product.options).map(([key, value], i) => (
                <Text key={i} style={styles.option}>
                  {`${String(cartNames[key] ?? key)}: ${String(value)}`}
                </Text>
              ))}            
            </View>
          <TouchableOpacity
          style={styles.checkbox}
          onPress={() => handleCheckReturnProduct(product)}
          >
          <Text>{returnItems.includes(product) ? "✓" : " "}</Text>
          </TouchableOpacity>
        </View>
      )
}
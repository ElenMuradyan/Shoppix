import { cartNames } from '@/constants/optionNamesOptions';
import { ProductItemProps } from '@/types/Product/ProductItemProps';
import { orderCartProduct } from '@/types/slices/ordersSlice';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const OrderProductItem = ({product}: {product: orderCartProduct}) => {
    const { productId, price, stock, image, name, options} = product;
    const router = useRouter();

    const handlePress = () => {
        router.push(`/Product/product-details/${productId}`);
    };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      </View>

      <View style={styles.details}>
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.price}>{price} ֏</Text>
        </View>

        <Text numberOfLines={2} style={styles.stock}>{stock} հատ</Text>
        {options && Object.entries(options).map(([key, value], idx) => (
        <Text key={idx} style={styles.optionTag}>{`${cartNames[key]}: ${value}`}</Text>
        ))}
      </View>
    </TouchableOpacity>
  );
};

export default OrderProductItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    width: '49%',
  },
  imageWrapper: {
    overflow: 'hidden',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: 160,
    transform: [{ scale: 1 }],
  },
  details: {
    marginTop: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  price: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
  },
  optionTag: { 
    backgroundColor: "#e5e7eb", 
    padding: 4, 
    borderRadius: 4, 
    marginTop: 4 
},
  stock: {
    fontSize: 14,
    color: '#444',
    marginTop: 2,
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
});
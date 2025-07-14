import { ProductItemProps } from '@/types/Product/ProductItemProps';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ProductItem = ({ id, images, name, price, description, stock }: ProductItemProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => {}}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: images[0] }} style={styles.image} resizeMode="cover" />
      </View>

      <View style={styles.details}>
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.price}>{price} ֏</Text>
        </View>

        <Text style={styles.stock}>Quantity: {stock}</Text>
        <Text numberOfLines={2} style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;

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
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ProductItem from './ProductItem';
import { product } from '@/types/slices/productSlice';

const ProductList = ({ products }: { products: product[] }) => {
  return (
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <ProductItem
            {...item}
          />
        )}
      />
  );
};

export default ProductList;

const styles = StyleSheet.create({
  grid: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});
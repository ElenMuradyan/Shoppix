import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ProductItemProps } from '@/types/Product/ProductItemProps';
import ProductItem from './ProductItem';

const ProductList = ({ products }: { products: ProductItemProps[] }) => {
  return (
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
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
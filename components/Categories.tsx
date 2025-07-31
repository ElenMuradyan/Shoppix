import React from 'react'
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import CategoryComponent from './CategoryComponent';
import { categories } from '@/constants/categories';

const Categories = () => {
  return (
    <View style={styles.categories}>
        {
            Object.entries(categories).map(([key, item], index) => (<CategoryComponent name={key} category={item} key={index}/>))
        }
    </View>
  )
}

export default Categories;

const styles = StyleSheet.create({
  categories: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        flexWrap: 'wrap',
        width: '100%'
      },
})
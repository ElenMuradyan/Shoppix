import { categories } from '@/constants/categories';
import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Categories = () => {
  return (
        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        >
        {Object.entries(categories).map(([key, item], index) => (
            <TouchableOpacity key={index} style={styles.itemContainer}>
            <View style={styles.iconCircle}>
                {item.icon}
            </View>
            <Text style={styles.label}>{item.armenianName}</Text>
            </TouchableOpacity>
        ))}
        </ScrollView>
  )
}

export default Categories;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 10,
  },
  itemContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
  iconCircle: {
    width: 50,
    height: 50,
    color: 'white',
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
});

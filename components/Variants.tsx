import React from 'react'
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { ScrollView, Text, TouchableOpacity } from 'react-native'

const Variants = ({variants, handleSearch}: {variants: string[], handleSearch: (val: string) => void}) => {
  return (
        <View style={styles.dropdown}>
        {variants.map((variant) => (
            <TouchableOpacity
            key={variant}
            style={styles.dropdownItem}
            onPress={() => handleSearch(variant)}
            >
            <Text>{variant}</Text>
            </TouchableOpacity>
        ))}
        </View>
  )
}

export default Variants;

const styles = StyleSheet.create({
    dropdown: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 4,
        zIndex: 999,
  },
  dropdownItem: {
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
})
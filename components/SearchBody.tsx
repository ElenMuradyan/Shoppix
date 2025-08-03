// import React from 'react'
// import { ScrollView, StyleSheet } from 'react-native'
// import NoProducts from './NoProducts'
// import ProductList from './ProductItems/ProductList'
// import Subcategories from './Subcategories'
// import Categories from './Categories'
// import { Text } from 'react-native'
// import { TouchableOpacity } from 'react-native'
// import { product } from '@/types/Product/ProductItemProps'

// const SearchBody = ({variants, handleSearch, searchInput, productList, category}: {variants: string[], handleSearch: (val: string) => void, searchInput: string | null, productList: product[], category: null | string}) => {
//   return (
//         <ScrollView>
//             {
//                 variants.length > 0 ? (
//                         <ScrollView style={styles.dropdown} keyboardShouldPersistTaps="handled">
//                         {variants.map((variant) => (
//                             <TouchableOpacity
//                             key={variant}
//                             style={styles.dropdownItem}
//                             onPress={() => handleSearch(variant)}
//                             >
//                             <Text>{variant}</Text>
//                             </TouchableOpacity>
//                         ))}
//                         </ScrollView>
//                     )
//                 :
//                 searchInput ? productList.length ? <ProductList products={productList}/> : 
//                 <NoProducts />
//                 :
//                 category ? <Subcategories /> : <Categories />
//             }
//         </ScrollView>
//   )
// }

// export default SearchBody

// const styles = StyleSheet.create({
// });
import React, { useEffect, useState } from 'react'
import { View } from 'react-native';
import SubCategoriesIcons from './SubCategoriesIcons';
import ProductList from './ProductItems/ProductList';
import { useSearchParams } from 'expo-router/build/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { product } from '@/types/Product/ProductItemProps';

const Subcategories = () => {
    const params = useSearchParams();
    const category = params.get('category');
    const subcategory = params.get('subcategory');

    const { products } = useSelector((state: RootState) => state.products);
    const [productList, setProductList] = useState<product[]>([]);

    useEffect(() => {
        if(category){
            const newList = products.filter((item) => item.category === category);
            setProductList(newList);
        }
        if(category && subcategory){
            const newList = products.filter((item) => item.category === category && item.subCategory === subcategory);
            setProductList(newList); 
        }
    }, [category, subcategory])
    
  return (
    <View>
        <SubCategoriesIcons />

        <ProductList  products={productList}/>
    </View>
)
}

export default Subcategories;
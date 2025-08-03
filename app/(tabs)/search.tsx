import Categories from "@/components/Categories";
import NoProducts from "@/components/NoProducts";
import ProductList from "@/components/ProductItems/ProductList";
import SearchBar from "@/components/Search";
import Subcategories from "@/components/Subcategories";
import Variants from "@/components/Variants";
import { RootState } from "@/store/store";
import { product } from "@/types/Product/ProductItemProps";
import { useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { ScrollView } from "react-native";
import { useSelector } from "react-redux";

export default function SearchScreen() {
    const router = useRouter();
    const params = useSearchParams();
    const [category, setCategory] = useState<null | string>(null);
    const [searchInput, setSearchInput] = useState<null | string>(null);
    const [productList, setProductList] = useState<product[]>([]);
    const { products, productNames } = useSelector((state: RootState) => state.products);
    const [variants, setVariants] = useState<string[]>([]); 
    const [inputValue, setInputValue] = useState<null | string>(null);
    const [ignoreVariants, setIgnoreVariants] = useState(false);

    useEffect(() => {
        if (category === null && params.get("category") !== null && params.get("subcategory") !== null) {
            router.replace({
                pathname: "/search",
                params: {}, 
            });
        }
    }, [category, params, router]);
 
    useEffect(() => {
        const paramCategory = params.get("category");
        const paramInput = params.get("searchInput");
        setCategory(paramCategory);
        setSearchInput(paramInput);
    }, [params]);

    useEffect(() => {
        const input = searchInput?.trim().toLowerCase() || '';

        if (input) {
            const newList = products.filter((item) => {
            return (
                (item.name?.toLowerCase().includes(input)) ||
                (item.description?.toLowerCase().includes(input)) ||
                (item.subCategory?.toLowerCase().includes(input)) ||
                (item.category?.toLowerCase().includes(input))
            );
            });
            setProductList(newList);
        } else {
            setProductList(products);
        }
    }, [searchInput, products]);

    useEffect(() => {
        if (ignoreVariants) {
            setIgnoreVariants(false);
            return;
        }

        const input = (inputValue ? inputValue : '').trim().toLowerCase();
        if (input) {
            const newVars = productNames.filter((item) =>
            item.toLowerCase().includes(input)
        );
        setVariants(newVars);
        } else {
            setVariants([]);
            setSearchInput('');
            setProductList([]);
            if(inputValue !== null){
            router.replace({
                pathname: "/search",
                params: {}, 
            });
            }
        }
    }, [inputValue, productNames]);

    const handleSearch = (val: string) => {
        setIgnoreVariants(true); 
        setInputValue(val);
        setVariants([]);
        if(inputValue !== null){
        router.replace({
            pathname: "/search",
            params: {searchInput: val, category: null, subcategory: null}, 
        });
        }
    }

    return (
        <View style={styles.wrapper}>
            <SearchBar handleSearch={(val) => handleSearch(val)} inputValue={inputValue!} setInputValue={setInputValue}/>
                <ScrollView>
                    {
                        variants.length > 0 && !ignoreVariants ? (<Variants variants={variants} handleSearch={handleSearch}/>)
                        :
                        searchInput ? productList.length ? <ProductList products={productList}/> : 
                        <NoProducts />
                        :
                        category ? <Subcategories /> : <Categories />
                    }
                </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: 'auto'
    },
  container: {
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center',
    width: '100%',
  }
})
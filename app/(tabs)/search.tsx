import Categories from "@/components/Categories";
import SearchBar from "@/components/Search";
import Subcategories from "@/components/Subcategories";
import { useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";

export default function SearchScreen() {
    const router = useRouter();
    const params = useSearchParams();
    const [category, setCategory] = useState<null | string>(null);

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
        setCategory(paramCategory);
    }, [params]);

    return (
        <ScrollView>
        <SearchBar handleSearch={(val) => console.log(val)}/>
            {
                category ? <Subcategories /> : <Categories />
            }
        </ScrollView>
    )
}
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Text, View } from "react-native";
import ProductList from "./ProductList";
import { RootState } from "@/store/store";
import { ProductItemProps, related } from "@/types/Product/ProductItemProps";

const RelatedProducts = ({ category, subcategory }: related) => {
  const { products } = useSelector((store: RootState) => store.products);
  const [relatedProducts, setRelatedProducts] = useState<ProductItemProps[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      const filteredProducts = products.filter(
        (item) =>
          (category && item.category === category) ||
          (subcategory && item.subCategory === subcategory)
      );
      setRelatedProducts(filteredProducts);
    }
  }, [products, category, subcategory]);

  return (
    <View className="my-24">
      {
        relatedProducts.length > 0 ? 
        <>
            <View className="text-center text-3xl py-2">
            <Text>ԿԱՊՎԱԾ ԱՊՐԱՆՔՆԵՐ</Text>
            </View>
            <ProductList products={relatedProducts} />
        </>
        :             
        <Text>ԿԱՊՎԱԾ ԱՊՐԱՆՔՆԵՐ ՉԵՆ ՀԱՅՏՆԱԲԵՐՎԵԼ</Text>
      }
    </View>
  );
};

export default RelatedProducts;
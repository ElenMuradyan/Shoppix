import Categories from "@/components/Categories";
import Hero, { styles } from "@/components/Hero";
import ProductList from "@/components/ProductItems/ProductList";
import SearchBar from "@/components/Search";
import { account } from "@/lib/appwrite";
import { RootState } from "@/store/store";
import { ROUTE_CONSTANTS } from "@/utils/routes";
import { Link } from "expo-router";
import { useEffect } from "react";
import { ScrollView } from "react-native";
import { useSelector } from "react-redux";

export default function HomeScreen() {
  const { userData } = useSelector((state: RootState) => state.userData.authUserInfo);
  const { products } = useSelector((state: RootState) => state.products);
    useEffect(() => {
      async function getCurrent() {
        try {
          const session = await account.getSession('current');
          console.log('Current session:', session);          
        } catch (error: any) {
          console.warn('No current session:', error.message);
        }
      }
      getCurrent();
    }, []);
        console.log(userData);
        
  return (
    <ScrollView>
      <SearchBar handleSearch={(val) => console.log(val)}/>
      <Hero/>
      <Categories />
      {userData?.role === 'admin' && <Link style={styles.button} href={`..${ROUTE_CONSTANTS.NOT_AUTH_PROTECTED.ADDPRODUCT}`}>+ Ավելացնել ապրանք</Link>}
      <ProductList products={products}/>
    </ScrollView>
  )
}
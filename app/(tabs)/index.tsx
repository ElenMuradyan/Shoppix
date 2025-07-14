import Categories from "@/components/Categories";
import Hero from "@/components/Hero";
import ProductList from "@/components/ProductItems/ProductList";
import SearchBar from "@/components/Search";
import { testProducts } from "@/data/products";
import { account } from "@/lib/appwrite";
import { RootState } from "@/store/store";
import { styles } from "@/styles/signupStyles";
import { useEffect } from "react";
import { Button, ScrollView } from "react-native";
import { useSelector } from "react-redux";

export default function HomeScreen() {
  const { userData } = useSelector((state: RootState) => state.userData.authUserInfo);
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
        
  return (
    <ScrollView>
      <SearchBar handleSearch={(val) => console.log(val)}/>
      <Hero/>
      <Categories />
      {userData?.role === 'admin' && <Button title="+ Ավելացնել ապրանք"/>}
      <ProductList products={testProducts}/>
    </ScrollView>
  )
}
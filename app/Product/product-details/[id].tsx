import { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { fetchProductInfo } from "@/store/slices/productSlice";
import { names } from "@/constants/optionNamesOptions";
import { handleChange } from "@/utils/stockValidator";
import RelatedProducts from "@/components/ProductItems/RelatedProducts";
import { handleAddToCart } from "@/utils/handlers/product/handleAddToCart";
// import BackButton from "../../components/shared/BackButton";

export default function ProductDetails() {
  const { id: productId } = useLocalSearchParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { productInfo } = useSelector((state: RootState) => state.productInfo);
  const { userData } = useSelector((state: RootState) => state.userData.authUserInfo);
  const { cartItems } = useSelector((state: RootState) => state.cartItems);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [chosenOptions, setChosenOptions] = useState<Record<string, string>>({});
  const [orderedStock, setOrderedStock] = useState<string>('');
  const [buttonLoading, setButtonLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    if (productId) {
      dispatch(fetchProductInfo(productId));
    }
  }, [productId]);

  useEffect(() => {
    if (productInfo) {
      setImageUrl(productInfo.images[0]);
      setLoading(false);
      setChosenOptions({});
    } else {
      setLoading(true);
    }
  }, [productInfo]);

  useEffect(() => {
    setErrorMessage("");
  }, [chosenOptions, orderedStock]);

  const onOptionSelect = (optionName: string, value: string) => {
    setChosenOptions(prev => ({ ...prev, [optionName]: value }));
    setErrorMessage("");
  };

  const onAddToCartPress = async () => {
    if (!productInfo) return;
    try{
      setButtonLoading(true); 
      await handleAddToCart({
        productInfo,
        choosenOptions: chosenOptions,
        setErrorMessage,
        orderedProductInfo: { stock: orderedStock, options: chosenOptions },
        userData,
        productId,
        cartItems,
        dispatch
      });
      
      setOrderedStock('');
      setChosenOptions({});
      setErrorMessage('');

      Alert.alert("✅ Ավելացվեց զամբյուղին", "Ապրանքը հաջողությամբ ավելացվեց ձեր զամբյուղում։");
    }catch(err: any){
      console.error("Add to cart press error:", err);
      Alert.alert("❌ Սխալ", "Չհաջողվեց ավելացնել ապրանքը զամբյուղ։");
    }finally{
      setButtonLoading(false);
    }
  }

  if (loading || !productInfo) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.thumbnailScroll}>
          {productInfo.images.map((img, i) => (
            <TouchableOpacity key={i} onPress={() => setImageUrl(img)} style={[styles.thumbnail, imageUrl === img && styles.selectedThumbnail]}>
              <Image source={{ uri: img }} style={styles.thumbnailImage} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Image source={{ uri: imageUrl }} style={styles.mainImage} resizeMode="contain" />
      </View>

      {/* Product info */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{productInfo.name}</Text>
        <Text style={styles.price}>{productInfo.price} AMD</Text>
        <Text style={styles.description}>{productInfo.description}</Text>
        <Text style={styles.stock}>{productInfo.returnable ? 'ՎԵՐԱԴԱՐՁԻ ԵՆԹԱԿԱ Է' : 'ՎԵՐԱԴԱՐՁԻ ԵՆԹԱԿԱ ՉԷ'}</Text>

        {productInfo.options?.map((option) => (
          <View key={option.optionName} style={styles.optionContainer}>
            <Text style={styles.optionTitle}>Ընտրեք {names[option.optionName] ?? option.optionName}</Text>
            <View style={styles.optionButtons}>
              {option.optionValue.map((value) => (
                <TouchableOpacity
                  key={value}
                  style={[
                    styles.optionButton,
                    chosenOptions[option.optionName] === value && styles.optionButtonSelected,
                  ]}
                  onPress={() => onOptionSelect(option.optionName, value)}
                >
                  <Text>{value}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <Text style={styles.optionTitle}>Ընտրեք քանակը</Text>
        <TextInput
          keyboardType="number-pad"
          value={orderedStock.toString()}
          onChangeText={(text) => handleChange(text, setOrderedStock, setErrorMessage)}
          style={styles.input}
          placeholder="Enter quantity"
        />

        <TouchableOpacity
          disabled={buttonLoading}
          onPress={onAddToCartPress}
          style={[styles.addButton, buttonLoading && styles.disabledButton]}
        >
          {buttonLoading ? <Text>...LOADING</Text> : <Text style={styles.addButtonText}>ADD TO CART</Text>}
        </TouchableOpacity>

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        {/* Info */}
        <View style={styles.infoTextContainer}>
          <Text>Cash on delivery is available on this product.</Text>
          <Text>Return for this product is available only at the time of delivery.</Text>
        </View>

        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.sectionHeader}>DESCRIPTION</Text>
          <Text style={styles.descriptionText}>
            An e-commerce site is an online platform where businesses and individuals can buy and sell products or services. These websites allow customers to browse, compare, and purchase items from the comfort of their homes.
          </Text>
          <Text style={styles.descriptionText}>
            E-commerce has revolutionized the way people shop, offering convenience, variety, and accessibility like never before. Businesses can reach a global audience, operate 24/7, and reduce overhead costs compared to physical stores. With the rise of mobile shopping and digital payments, e-commerce continues to grow rapidly, shaping the future of retail and consumer behavior.
          </Text>
        </View>

        <RelatedProducts category={productInfo.category} subcategory={productInfo.subCategory} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  imagesContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  thumbnailScroll: {
    maxWidth: 80,
  },
  thumbnail: {
    marginRight: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectedThumbnail: {
    borderColor: "black",
  },
  thumbnailImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
  },
  mainImage: {
    flex: 1,
    height: 300,
    borderRadius: 10,
  },

  infoContainer: {
    flex: 1,
  },

  name: {
    fontSize: 22,
    fontWeight: "600",
  },
  price: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    color: "#555",
  },
  stock: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
  },

  optionContainer: {
    marginTop: 20,
  },
  optionTitle: {
    marginBottom: 8,
    fontWeight: "600",
  },
  optionButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  optionButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: "#eee",
    borderRadius: 6,
    marginRight: 10,
    marginBottom: 10,
  },
  optionButtonSelected: {
    backgroundColor: "#ccc",
  },

  input: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#999",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    width: 100,
  },

  addButton: {
    marginTop: 20,
    backgroundColor: "black",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.6,
  },
  addButtonText: {
    color: "white",
    fontWeight: "600",
  },

  errorText: {
    marginTop: 8,
    color: "red",
  },

  infoTextContainer: {
    marginTop: 20,
  },

  descriptionContainer: {
    marginTop: 30,
  },
  sectionHeader: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 12,
  },
  descriptionText: {
    color: "#666",
    marginBottom: 12,
    fontSize: 14,
  },
})

import { category } from "@/constants/categories";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CategoryComponent = ({ category, name }: { category: category, name: string }) => {
    const router = useRouter();

    const handleChooseCategory = () => {
        router.push({ pathname: '/search', params: { category: name } });
    }

    return (
    <TouchableOpacity 
    onPress={handleChooseCategory}
    style={styles.container}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={category.imagePath}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.text}>
        {category.armenianName}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryComponent;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 10,
    width: 110,  
  },
  imageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#eee",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    textAlign: "center", 
    maxWidth: 110,
},
});

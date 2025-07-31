import React from 'react'
import { ScrollView } from 'react-native';
import { View } from 'react-native';
import { styles } from './CategoriesIcons';
import { categories } from '@/constants/categories';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { useRouter, useSearchParams } from 'expo-router/build/hooks';

const SubCategoriesIcons = () => {
  const params = useSearchParams();
  const router = useRouter();
  const category = params.get('category')!;

  const handleChooseSubcategory = (name: string) => {
        router.push({ pathname: '/search', params: { category: category, subcategory: name } });
   }
  
  return (
    <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.scrollContainer}
    >
    {Object.entries(categories[category]?.subcategories).map(([key, item], index) => (
        <TouchableOpacity 
        key={index} 
        style={styles.itemContainer}
        onPress={() => handleChooseSubcategory(item.name)}
        > 
        <View style={styles.iconCircle}>
            {item.icon}
        </View>
        <Text style={styles.label}>{item.armenianName}</Text>
        </TouchableOpacity>
    ))}
    </ScrollView>
)
}

export default SubCategoriesIcons;
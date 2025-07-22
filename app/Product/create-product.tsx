import { FormInput } from "@/components/Form/FormInput";
import ImageUpload from "@/components/ImageUpload";
import { category, ProductItemProps } from "@/types/Product/ProductItemProps";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { categories } from "@/constants/categories";
import AddProductHero from "@/components/AddProductHero";
import FormList from "@/components/Form/FormList";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { db } from "@/lib/appwrite";
import { ID } from "react-native-appwrite";
import { ENV } from "@/constants/env";

const AddProduct = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [category, setCategory] = useState<category>("Kitchen");
  const { userData } = useSelector((state: RootState) => state.userData.authUserInfo);
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ProductItemProps>({
    defaultValues: {
      name: "",
      price: "",
      description: "",
      images: [],
      category: category,
      subCategory: "",
      options: [],
    },
    mode: "onChange",
  });

  const handleImageUpload = (url: string) => {
    const updated = [...imageUrls, url];
    setImageUrls(updated);
    setValue("images", updated);
  };

  const handleDelete = (url: string) => {
    const updated = imageUrls.filter((i) => i !== url);
    setImageUrls(updated);
    setValue("images", updated);
  };

  const onSubmit = async (data: ProductItemProps) => {
    const id = ID.unique();
    try {
        await db.createDocument(
        ENV.APPWRITE_ENDPOINT,
        ENV.DB_PRODUCTS_COL_ID,
        id,
        {
            name: data.name,
            price: data.price.toString(),
            description: data.description,
            autor: userData?.email,
            images: data.images,
            category: data.category,
            subCategory: data.subCategory || '',
            options: JSON.stringify(data.options ?? []),
            id: id,
        }
        );
        console.log("✅ Product created:", id);
        return null;
    } catch (err: any) {
        console.error("❌ Submission Error:", err);
        return err instanceof Error ? err.message : "Անսպասելի սխալ առաջացավ։";
    }  
};

  return (
    <ScrollView style={styles.container}>
      <AddProductHero />

      <View style={styles.formContainer}>
      <Controller
        control={control}
        name="name"
        rules={{ required: "Պարտադիր է" }}
        render={({ field }) => (
          <FormInput
            label="Անուն"
            value={field.value}
            onChange={field.onChange}
            error={errors.name?.message}
            keyboardType="default"
            autoCapitalize="none"
          />
        )}
      />

      <Controller
        control={control}
        name="price"
        rules={{ required: "Պարտադիր է" }}
        render={({ field }) => (
          <FormInput
            label="Գին (դրամ)"
            value={field.value.toString()}
            onChange={(text) => field.onChange(Number(text))}
            error={errors.price?.message}
            keyboardType="numeric"
            autoCapitalize="none"
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        rules={{ required: "Պարտադիր է" }}
        render={({ field }) => (
          <FormInput
            label="Նկարագրություն"
            value={field.value}
            onChange={field.onChange}
            error={errors.description?.message}
            keyboardType="default"
            autoCapitalize="none"
          />
        )}
      />

      <Text style={styles.label}>Կատեգորիա</Text>
      <Controller
        control={control}
        name="category"
        rules={{ required: "Պարտադիր է" }}
        render={({ field: { value, onChange } }) => (
          <Picker
            selectedValue={value}
            onValueChange={(val) => {onChange(val); setCategory(val)}}
            style={styles.picker}
          >
            <Picker.Item label="Ընտրել կատեգորիա" value="" />
            {Object.entries(categories).map(([key, item], index) => (
              <Picker.Item
                key={index}
                value={key}
                label={item.armenianName}
              />
            ))}
            {errors.category && (
            <Text style={styles.errorText}>
                {errors.category.message}
            </Text>
            )}
          </Picker>
        )}
      />

        <Controller
        control={control}
        name="subCategory"
        rules={{ required: "Պարտադիր է" }}
        render={({ field: { value, onChange } }) => (
          <Picker
            selectedValue={value}
            onValueChange={(val) => onChange(val)}
            style={styles.picker}
          >
            <Picker.Item label="Ընտրել կատեգորիա" value="" />
            {categories[category]?.subcategories.map((item, index) => (
              <Picker.Item
                key={index}
                value={item.name}
                label={item.armenianName}
              />
            ))}
            {errors.subCategory && (
            <Text style={styles.errorText}>
                {errors.subCategory.message}
            </Text>
            )}
          </Picker>
        )}
      />

      <ImageUpload onFinish={handleImageUpload} handleDelete={handleDelete} />
      </View>

      <FormList errors={errors} control={control} setValue={setValue} getValues={getValues}/>

      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Text>
        Ավելացնել
        </Text>
    </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 'auto',
        width: '100%',
        padding: 16,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 6,
    },
    formContainer: {
        width: '93%',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#1f2937',
        marginBottom: 24,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
        color: '#374151', 
    },
    picker: {
        marginBottom: 20,
        backgroundColor: '#f3f4f6', 
        borderRadius: 8,
    },
    errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    },
    submitButton: {
        marginBottom: 50
    }
});

export default AddProduct;
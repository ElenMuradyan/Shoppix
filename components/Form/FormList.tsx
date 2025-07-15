import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Controller, useFieldArray } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { optionNamesOptions, suboptions } from "@/constants/optionNamesOptions";
import { Ionicons } from "@expo/vector-icons";
import { FormListProps, optionType } from "@/types/Product/ProductItemProps";

const FormList = ({control, setValue, getValues, errors}: FormListProps) => {
const [selectOptions, setSelectOptions] = useState<string[]>([]);

const { fields, append } = useFieldArray({
    control,
    name: "options",
});

const onDelete = (index: number) => {
    const newArr = selectOptions.filter((_, i) => i !== index);
    setSelectOptions(newArr);
    const currentOptions = getValues("options") || [];
    const updatedFormOptions = currentOptions.filter((_: optionType, i: number) => i !== index);
    setValue("options", updatedFormOptions);
}

return (
<ScrollView style={styles.container}>
    {fields.map((field, index) => {
    return (
        <View key={field.id} style={styles.fieldRow}>            
        <View style={styles.fieldColumn}>
        <Text style={styles.label}>Հատկանիշի Անունը</Text>
            <Controller
            control={control}
            name={`options.${index}.optionName` as const}
            rules={{ required: "Պարտադիր է" }}
            render={({ field: { onChange, value } }) => (
                <Picker
                selectedValue={value}
                style={styles.picker}
                onValueChange={(itemValue) => {
                    setSelectOptions((prev) => {
                    const newArr = [...prev];
                    newArr[index] = itemValue;
                    return newArr;
                    });
                    onChange(itemValue);
                    setValue(`options.${index}.optionValue`, []);
                }}
                >
            <Picker.Item label="Ընտրել հատկությունը" value="" />
                {optionNamesOptions.map((opt) => (
                    <Picker.Item enabled={!selectOptions.includes(opt.value)} key={opt.value} label={opt.label} value={opt.value} />
                ))}
                </Picker>
            )}
            />
            {errors.options?.[index]?.optionName && (
            <Text style={styles.errorText}>
                {errors.options[index].optionName?.message}
            </Text>
            )}
        </View>

        <View style={styles.fieldColumn}>
        <Text style={styles.label}>Հատկանիշի Արժեքներ</Text>
            <Controller
            control={control}
            name={`options.${index}.optionValue` as const}
            rules={{ required: "Պարտադիր է" }}
            render={({ field: { onChange, value } }) => (
                <View style={styles.multiSelectContainer}>
                {(suboptions[selectOptions[index]] || []).map((opt) => {
                    const selected = value?.includes(opt.value);
                    return (
                    <TouchableOpacity
                        key={opt.value}
                        style={[styles.tag, selected && styles.tagSelected]}
                        onPress={() => {
                        const updated = selected
                            ? value.filter((v: string) => v !== opt.value)
                            : [...(value || []), opt.value];
                        onChange(updated);
                        }}
                    >
                        <Text style={styles.tagText}>{opt.label}</Text>
                    </TouchableOpacity>
                    );
                })}
                </View>
            )}
            />
            {errors.options?.[index]?.optionValue && (
            <Text style={styles.errorText}>
                {errors.options[index].optionValue?.message}
            </Text>
            )}
        </View>

        <TouchableOpacity
            onPress={() => onDelete(index)}
            style={styles.deleteButton}
            accessibilityLabel="Delete attribute"
        >
            <Ionicons name="trash" size={20} color="white" />
        </TouchableOpacity>
        </View>
    );
    })}

    <TouchableOpacity
    style={styles.addButton}
    onPress={() => append({ optionName: "", optionValue: [] })}
    >
    <Text style={styles.addText}>+ Ավելացնել Հատկանիշ</Text>
    </TouchableOpacity>
</ScrollView>
);
};

export default FormList;

const styles = StyleSheet.create({
    container: {
    padding: 16,
    },
    fieldRow: {
    marginBottom: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 12,
    },
    fieldColumn: {
    marginBottom: 10,
    },
    label: {
    fontWeight: "bold",
    marginBottom: 4,
    },
    picker: {
    height: 50,
    backgroundColor: "#fff",
    },
    multiSelectContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    },
    tag: {
    backgroundColor: "#ddd",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    margin: 4,
    },
    tagSelected: {
    backgroundColor: "#007AFF",
    },
    tagText: {
    color: "white",
    },
    deleteButton: {
    marginTop: 8,
    alignSelf: "flex-start",
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 6,
    borderRadius: 4,
    },
    addButton: {
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 10,
    },
    addText: {
    color: "white",
    fontWeight: "bold",
    },
    submitButton: {
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    },
    submitText: {
    color: "white",
    fontWeight: "bold",
    },
    errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    },
});
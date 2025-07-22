import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { Button } from "react-native-paper";
import CardTotal from "@/components/CardTotal";
import { FormInput } from "@/components/Form/FormInput";
import { handlePlaceOrder } from "@/utils/handlers/cart_handlers/handlePlaceOrder";

type FormData = {
  region: string;
  city: string;
  street: string;
  postIndex: string;
  homeIndex: string;
};

export default function PlaceOrder () {
  const { userData } = useSelector((state: RootState) => state.userData.authUserInfo);
  const { cartItems } = useSelector((state: RootState) => state.cartItems);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();

  useEffect(() => {
    if (userData) {
      const { region, city, street, postIndex, homeIndex } = userData;
      setValue("region", region);
      setValue("city", city);
      setValue("street", street);
      setValue("postIndex", postIndex);
      setValue("homeIndex", homeIndex);
    }
  }, [userData]);

  const onSubmit = (values: any) => {
    handlePlaceOrder({ values, userData, setLoading, cartItems, dispatch });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formSection}>
        <View style={styles.title}>
          <Text>ԱՌԱՔՄԱՆ ՏՎՅԱԼՆԵՐ</Text>
        </View>

        <Controller
          control={control}
          name="region"
          rules={{ required: "Տարածաշրջանը պարտադիր է" }}
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Տարածաշրջան"
              value={value}
              onChange={onChange}
              error={errors.region?.message}
              delaytime={600}
            />
          )}
        />

        <Controller
          control={control}
          name="city"
          rules={{ required: "Քաղաքը պարտադիր է" }}
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Քաղաք"
              value={value}
              onChange={onChange}
              error={errors.city?.message}
              delaytime={700}
            />
          )}
        />

        <Controller
          control={control}
          name="street"
          rules={{ required: "Փողոցը պարտադիր է" }}
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Փողոց"
              value={value}
              onChange={onChange}
              error={errors.street?.message}
              delaytime={800}
            />
          )}
        />

        <Controller
          control={control}
          name="postIndex"
          rules={{
            required: "Փոստային ինդեքսը պարտադիր է",
            pattern: {
              value: /^[0-9]+$/,
              message: "Փոստային ինդեքսը պետք է լինի թվային",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Փոստային ինդեքս"
              value={value}
              onChange={onChange}
              error={errors.postIndex?.message}
              keyboardType="numeric"
              delaytime={900}
            />
          )}
        />

        <Controller
          control={control}
          name="homeIndex"
          rules={{ required: "Տան համարի ինդեքսը պարտադիր է" }}
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Տան համար"
              value={value}
              onChange={onChange}
              error={errors.homeIndex?.message}
              delaytime={1000}
            />
          )}
        />

        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
          style={styles.submitButton}
        >
          {loading ? <ActivityIndicator color="#fff" /> : "ՊԱՏՎԻՐԵԼ"}
        </Button>
      </View>

      <View style={styles.summarySection}>
        <CardTotal />
        <View style={styles.paymentSection}>
          <Text>ՎՃԱՐՄԱՆ ԵՂԱՆԱԿԸ</Text>
          <TouchableOpacity style={styles.paymentOption}>
            <View style={styles.radioCircle} />
            <Text style={styles.paymentText}>ՎՃԱՐԵԼ ԱՌԱՔՄԱՆ ՊԱՀԻՆ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  formSection: {
    flex: 1,
    marginBottom: 24,
  },
  title: {
    marginBottom: 12,
  },
  input: {
    marginBottom: 12,
  },
  submitButton: {
    marginTop: 24,
    paddingVertical: 8,
  },
  summarySection: {
    marginTop: 32,
  },
  paymentSection: {
    marginTop: 32,
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    padding: 12,
    borderRadius: 6,
    marginTop: 12,
  },
  radioCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1,
    marginRight: 12,
  },
  paymentText: {
    fontSize: 14,
    color: "#555",
  },
});
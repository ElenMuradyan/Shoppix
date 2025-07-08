import { FormInput } from "@/components/Form/FormInput";
import { styles } from "@/styles/signupStyles";
import { ROUTE_CONSTANTS } from "@/utils/routes";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { handleSignIn } from "@/utils/auth_handlers/signin";
import { emailRules, passwordRules } from "@/constants/auth/validation";

type FormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [error, setError] = useState<string | null>(null);
  const { push } = useRouter();
  const theme = useTheme();

  const onSubmit = (data: FormData) => {
    handleSignIn(data.email, data.password, setError);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <Text style={styles.title} variant="headlineMedium">
          Welcome Back
        </Text>

        <Controller
          control={control}
          name="email"
          rules={emailRules}
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Email"
              value={value}
              onChange={onChange}
              error={errors.email?.message}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={passwordRules}
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Password"
              value={value}
              onChange={onChange}
              error={errors.password?.message}
              secureTextEntry
            />
          )}
        />

        {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}

        <Button style={styles.buton} onPress={handleSubmit(onSubmit)} mode="contained">
          Sign In
        </Button>
        <Button
          style={styles.switch}
          onPress={() => push(ROUTE_CONSTANTS.AUTH_PROTECTED.REGISTER)}
          mode="text"
        >
          Don’t have an account? Sign Up
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}
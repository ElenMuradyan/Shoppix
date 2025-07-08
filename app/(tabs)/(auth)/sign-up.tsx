import { ROUTE_CONSTANTS } from "@/utils/routes";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { TextInput, Text, Button, useTheme } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { userDataType } from "@/types/slices/userSlice";
import { ScrollView } from "react-native";
import { handleSignUp } from "@/utils/auth_handlers/signup";
import { styles } from "@/styles/signupStyles";
import { FormInput } from "@/components/Form/FormInput";
import { passwordRules } from "@/constants/auth/validation";

export default function SignUp() {
    const { control, handleSubmit, formState: { errors } } = useForm<userDataType>({
        defaultValues: {
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        region: "",
        city: "",
        street: "",
        postIndex: "",
        homeIndex: "",
        password: ""
        }
    });
    const [error, setError] = useState<string | null>(null);
    const {push} = useRouter();
    const theme = useTheme();

    async function signUp(data: userDataType) {
    const result = await handleSignUp(data);
    if (result) {
        setError(result);
    } else {
        push(ROUTE_CONSTANTS.HOME);
    }
    }

    const handleSwitchMode = () => {
        push(ROUTE_CONSTANTS.AUTH_PROTECTED.LOGIN);
    }

    return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
        <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
        >
            <View style={styles.container}>
                <Text style={styles.title} variant="headlineMedium">
                    Create Account
                </Text>

                <Controller
                control={control}
                name="firstName"
                rules={{ required: "First name is required" }}
                render={({ field: { onChange, value } }) => (
                    <FormInput
                    label="First Name"
                    value={value}
                    onChange={onChange}
                    error={errors.firstName?.message}
                    />
                )}
                />

                <Controller
                control={control}
                name="lastName"
                rules={{ required: "Last name is required" }}
                render={({ field: { onChange, value } }) => (
                    <FormInput
                    label="Last Name"
                    value={value}
                    onChange={onChange}
                    error={errors.lastName?.message}
                    />
                )}
                />

                <Controller
                control={control}
                name="email"
                rules={{
                    required: "Email is required",
                    pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                    },
                }}
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
                    value={value!}
                    onChange={onChange}
                    error={errors.password?.message}
                    secureTextEntry
                    helperText="6–16 chars, 1+ number, 1+ special (!@#$%^&*)"
                    />
                )}
                />

                <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, value } }) => (
                    <FormInput
                    label="Phone (optional)"
                    value={value}
                    onChange={onChange}
                    keyboardType="phone-pad"
                    error={errors.phone?.message}
                    />
                )}
                />

                <Controller
                control={control}
                name="region"
                rules={{ required: "Region is required" }}
                render={({ field: { onChange, value } }) => (
                    <FormInput
                    label="Region"
                    value={value}
                    onChange={onChange}
                    error={errors.region?.message}
                    />
                )}
                />

                <Controller
                control={control}
                name="city"
                rules={{ required: "City is required" }}
                render={({ field: { onChange, value } }) => (
                    <FormInput
                    label="City"
                    value={value}
                    onChange={onChange}
                    error={errors.city?.message}
                    />
                )}
                />

                <Controller
                control={control}
                name="street"
                rules={{ required: "Street is required" }}
                render={({ field: { onChange, value } }) => (
                    <FormInput
                    label="Street"
                    value={value}
                    onChange={onChange}
                    error={errors.street?.message}
                    />
                )}
                />

                <Controller
                control={control}
                name="postIndex"
                rules={{
                    required: "Post index is required",
                    pattern: {
                    value: /^[0-9]+$/,
                    message: "Post index must be numeric",
                    },
                }}
                render={({ field: { onChange, value } }) => (
                    <FormInput
                    label="Post Index"
                    value={value}
                    onChange={onChange}
                    error={errors.postIndex?.message}
                    keyboardType="numeric"
                    />
                )}
                />

                <Controller
                control={control}
                name="homeIndex"
                rules={{ required: "Home index is required" }}
                render={({ field: { onChange, value } }) => (
                    <FormInput
                    label="Home Index"
                    value={value}
                    onChange={onChange}
                    error={errors.homeIndex?.message}
                    />
                )}
                />


                {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}

                <Button
                onPress={handleSubmit(signUp)}
                mode="contained"
                >
                Test Sign Up
                </Button>
                <Button style={styles.switch} onPress={handleSwitchMode} mode='text'>Already habe an account? Sign In</Button>
            </View>
        </ScrollView>
    </KeyboardAvoidingView>)
}
import { ROUTE_CONSTANTS } from "@/utils/routes";
import { useRouter } from "expo-router";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { userDataType } from "@/types/slices/userSlice";
import { ScrollView } from "react-native";
import { handleSignUp } from "@/utils/auth_handlers/signup";
import { FormInput } from "@/components/Form/FormInput";
import { passwordRules } from "@/constants/auth/validation";
import Animated, { FadeInDown } from "react-native-reanimated";
import SignUpWrapper from "@/components/Form/sign-up-wrapper";

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

    async function onSubmit(data: userDataType) {
    const result = await handleSignUp(data);
    if (result) {
        setError(result);
    } else {
        push(ROUTE_CONSTANTS.HOME);
    }
    }

    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
        >
            <SignUpWrapper>
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
                    delaytime={100}
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
                    delaytime={200}
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
                    delaytime={300}
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
                    delaytime={400}
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
                    delaytime={500}
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
                    delaytime={600}
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
                    delaytime={700}
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
                    delaytime={800}
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
                    delaytime={900}
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
                    delaytime={1000}
                    />
                )}
                />


                {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}

                <View className="flex w-full justify-between items-center">
                <Animated.View entering={FadeInDown.delay(1100).duration(1000).springify()}>
                    <TouchableOpacity onPress={handleSubmit(onSubmit)} className='w-[100px] p-1 bg-[#000000] rounded-2xl mb-3'>
                        <Animated.Text className='text-sm font-bold text-white text-center'>
                            Sign Up
                        </Animated.Text>
                    </TouchableOpacity>
                </Animated.View>

                <Animated.Text className="text-black">Already have an account? <Animated.Text onPress={() => push(ROUTE_CONSTANTS.AUTH_PROTECTED.LOGIN)} className='text-[#0062ff]'>Sign In</Animated.Text></Animated.Text>
                </View>
            </SignUpWrapper>
        </ScrollView>
    )
}
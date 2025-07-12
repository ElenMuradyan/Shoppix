import { FormInput } from "@/components/Form/FormInput";
import { styles } from "@/styles/signupStyles";
import { ROUTE_CONSTANTS } from "@/utils/routes";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { handleSignIn } from "@/utils/auth_handlers/signin";
import { emailRules, passwordRules } from "@/constants/auth/validation";
import Animated, { FadeInDown } from "react-native-reanimated";
import SignInWrapper from "@/components/Form/sign-in-wrapper";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { fetchUserProfileInfo } from "@/store/slices/userSlice";

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
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: FormData) => {
    setError(null);
    try{
      await handleSignIn(data.email, data.password);
      dispatch(fetchUserProfileInfo());
    }catch(err: any){
      setError(err.message);
    }
  };

  return (
    <SignInWrapper>
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
              delaytime={100}
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
              delaytime={200}
            />
          )}
        />

        {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}

        <View className="flex w-full justify-between items-center">
        <Animated.View entering={FadeInDown.delay(1100).duration(1000).springify()}>
            <TouchableOpacity onPress={handleSubmit(onSubmit)} className='w-[100px] p-1 bg-[#000000] rounded-2xl mb-3'>
                <Animated.Text className='text-sm font-bold text-white text-center'>
                    Sign In
                </Animated.Text>
            </TouchableOpacity>
        </Animated.View>

        <Animated.Text className="text-black">Don't have an account? <Animated.Text onPress={() => push(ROUTE_CONSTANTS.AUTH_PROTECTED.REGISTER)} className='text-[#0062ff]'>Sign Up</Animated.Text></Animated.Text>
        </View>
    </SignInWrapper>
  );
}
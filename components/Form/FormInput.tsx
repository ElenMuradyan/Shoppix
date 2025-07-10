import React from "react";
import { Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { TextInput } from "react-native";

interface Props {
  label: string;
  value: string;
  onChange: (text: string) => void;
  error?: string;
  helperText?: string;
  delaytime: number,
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

export const FormInput = ({
  label,
  value,
  onChange,
  error,
  helperText,
  delaytime,
  keyboardType = "default",
  secureTextEntry = false,
  autoCapitalize = "sentences",
}: Props) => {
  return (
        <Animated.View entering={FadeInDown.delay(delaytime).duration(1000).springify()} className="m-3 w-full">
        <TextInput
            placeholder={label}
            placeholderTextColor={'black'}
            value={value}
            onChangeText={onChange}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            autoCapitalize={autoCapitalize}
            style={{
              borderWidth: 0,
              outlineStyle: undefined,
              width: '100%',
              height: 50,
              borderRadius: 12,
            }}
            className="text-black bg-[#dbdbdb] p-3 w-full"
        />
        {error ? (
            <Text style={styles.error}>{error}</Text>
        ) : helperText ? (
            <Text style={styles.helper}>{helperText}</Text>
        ) : null}
        </Animated.View>
  );
};

const styles = StyleSheet.create({
  input: { marginBottom: 8 },
  error: { color: "red", marginBottom: 8 },
  helper: { color: "gray", marginBottom: 8, fontSize: 12 },
});
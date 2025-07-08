import React from "react";
import { TextInput, Text } from "react-native-paper";
import { StyleSheet } from "react-native";

interface Props {
  label: string;
  value: string;
  onChange: (text: string) => void;
  error?: string;
  helperText?: string;
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
  keyboardType = "default",
  secureTextEntry = false,
  autoCapitalize = "sentences",
}: Props) => {
  return (
        <>
        <TextInput
            label={label}
            mode="outlined"
            value={value}
            onChangeText={onChange}
            error={!!error}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            autoCapitalize={autoCapitalize}
            style={styles.input}
        />
        {error ? (
            <Text style={styles.error}>{error}</Text>
        ) : helperText ? (
            <Text style={styles.helper}>{helperText}</Text>
        ) : null}
        </>
  );
};

const styles = StyleSheet.create({
  input: { marginBottom: 8 },
  error: { color: "red", marginBottom: 8 },
  helper: { color: "gray", marginBottom: 8, fontSize: 12 },
});
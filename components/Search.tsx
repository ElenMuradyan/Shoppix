import React, { useState, useRef, useEffect } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { navigate } from 'expo-router/build/global-state/routing';

export default function SearchBar({ handleSearch }: { handleSearch: (val: string) => void }) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (Platform.OS === 'web' && inputRef.current) {
      const node = inputRef.current as any;
      if (node && node._inputElement) {
        node._inputElement.style.outline = 'none';
      }
    }
  }, []);

  const handleNav = () => {console.log(window.location.pathname);
  
    if(window.location.pathname === '/'){
        navigate('/search');
    }
  }

  return (
    <View style={styles.wrapper}>
        <TouchableOpacity
        onPress={handleNav}
        style={styles.inputContainer}
        >
        <TextInput
            ref={inputRef}
            value={inputValue}
            onChangeText={setInputValue}
            style={styles.searchContainer}
            placeholder="Որոնում"
            placeholderTextColor="#666"
            underlineColorAndroid="transparent"
        />
        </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleSearch?.(inputValue)}>
        <AntDesign name="search1" size={20} color="#333" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center', 
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingTop: 30,
    paddingVertical: 4,
    width: '100%',
  },
  inputContainer: {
    flex: 1, 
    height: 40,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    color: '#000',
  },
  searchContainer: {
    flex: 1, 
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    color: '#000',
  },
  button: {
    marginLeft: 8,
    padding: 10,
    width: 40,
    height: 40,
    color: 'white',
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

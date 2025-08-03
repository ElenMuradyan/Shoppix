import { FontAwesome6 } from '@expo/vector-icons';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

const NoProducts = () => {
  return (
    <View style={styles.container}>
        <Text>Համապատասխանող ապրանքներ չեն գտնվել</Text>
        <FontAwesome6 name="face-sad-tear" size={24} color="black" />  
    </View>
  )
}

export default NoProducts;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    }
})
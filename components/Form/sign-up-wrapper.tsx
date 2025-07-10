import React from 'react'
import { Image, KeyboardAvoidingView, Platform, StatusBar, Text, View } from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function SignUpWrapper ({children}: {children: React.ReactNode}) {
  return (
    <View className='h-full w-full'>
        <Image style={{height: '100%', width: '100%'}} className='w-full absolute' source={require('../../assets/images/darkbg.png')}/>
        <View className='flex-row justify-around w-full absolute'>
            <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} style={{width: 40, height: 100}} source={require('../../assets/images/light.png')}/>
            <Animated.Image entering={FadeInUp.delay(400).duration(1000).springify()} style={{width: 65, height: 160}} source={require('../../assets/images/light.png')}/>
        </View>

        <View className='h-full w-full justify-around pt-16 mb-36'>
            <View className='flex items-start'>
                <Animated.Text exiting={FadeInUp.duration(1000).springify()} className='text-white font-bold tracking-wider text-5xl'>
                    Sign Up
                </Animated.Text>
            </View>

        <KeyboardAvoidingView className='flex items-center mx-4 space-y-4' behavior={Platform.OS === "ios" ? "padding" : "height"}>
            {children}
        </KeyboardAvoidingView>
        </View>
    </View>
  )
}
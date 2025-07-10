import React from 'react'
import { Image, KeyboardAvoidingView, Platform, View } from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function SignInWrapper ({children}: {children: React.ReactNode}) {
  return (
    <View className='h-full w-full'>
        <Image style={{height: '100%', width: '100%'}} className='absolute' source={require('../../assets/images/darkbg.png')}/>
        <View className='flex-row justify-around w-full absolute'>
            <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} style={{width: 80, height: 200}} source={require('../../assets/images/light.png')}/>
            <Animated.Image entering={FadeInUp.delay(400).duration(1000).springify()} style={{width: 65, height: 160}} source={require('../../assets/images/light.png')}/>
        </View>

        <View className='h-full w-full flex justify-around pt-30'>
            <View className='flex items-center'>
                <Animated.Text exiting={FadeInUp.duration(1000).springify()} className='text-white font-bold tracking-wider text-5xl'>
                    Sign In
                </Animated.Text>
            </View>

        <KeyboardAvoidingView className='flex items-center mx-4 space-y-4' behavior={Platform.OS === "ios" ? "padding" : "height"}>
            {children}
        </KeyboardAvoidingView>
        </View>
    </View>
  )
}
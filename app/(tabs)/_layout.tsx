import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/Ionicons';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import '../../global.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchUserProfileInfo } from '@/store/slices/userSlice';
import { useEffect } from 'react';
import { Middleware } from '@/wrappers/Middleware';
import { useJwtRefresh } from '@/utils/auth_handlers/cachingUser';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, authUserInfo } = useSelector((state: RootState) => state.userData);
  const [loaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useJwtRefresh();

  useEffect(() => {    
    dispatch(fetchUserProfileInfo());
  }, [])

  if (!loaded || loading) {
    return null;
  }

  return (
    <Middleware isAuth={authUserInfo.isAuth}>
    <ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
      <Tabs screenOptions={{ tabBarActiveTintColor: 'coral' }}>
        {authUserInfo.isAuth && (
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              headerShown: false,
              tabBarIcon: ({ color, focused }) =>
                focused ? (
                  <FontAwesome5 name="home" size={24} color={color} />
                ) : (
                  <AntDesign name="home" size={24} color={color} />
                ),
            }}
          />
        )}

        {!authUserInfo.isAuth && (
          <Tabs.Screen
            name="login"
            options={{
              title: 'Login',
              tabBarIcon: ({ color, focused }) =>
                focused ? (
                  <Ionicons name="person" size={24} color={color} />
                ) : (
                  <Ionicons name="person-outline" size={24} color={color} />
                ),
            }}
          />
        )}
      </Tabs>
      <StatusBar style="auto" />
    </ThemeProvider>
  </Middleware>
  );
}

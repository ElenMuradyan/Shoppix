import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import '../../global.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchUserProfileInfo } from '@/store/slices/userSlice';
import { useEffect } from 'react';
import { useJwtRefresh } from '@/utils/auth_handlers/cachingUser';
import { initClientJWT } from '@/utils/auth_handlers/refreshJWT';
import { AntDesign, Entypo, Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.userData);
  const [loaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useJwtRefresh();

  useEffect(() => {
    async function initAuth() {
      await initClientJWT();
      dispatch(fetchUserProfileInfo());
    }
    initAuth();
  }, [dispatch]);

  if (!loaded || loading) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
      <Tabs screenOptions={{ tabBarActiveTintColor: 'black' }}>
        <Tabs.Screen name="index" options={{ title: "Home", headerShown: false, 
          tabBarIcon: ({color, focused}) => {
          return focused ? <Entypo name="home" size={24} color={color} />: <AntDesign name="home" size={24} color={color} />
        }}} />

        <Tabs.Screen name="search" options={{ title: "Search", headerShown: false, 
          tabBarIcon: ({color, focused}) => {
          return focused ? <Ionicons name="search-circle-sharp" size={24} color={color} /> :<Ionicons name="search-circle-outline" size={24} color={color} />
        }}} />

        <Tabs.Screen name="cart" options={{ title: "Cart", headerShown: false, 
          tabBarIcon: ({color, focused}) => {
          return focused ? <Ionicons name="cart" size={24} color={color} /> : <Ionicons name="cart-sharp" size={24} color={color} />
        }}} />

        <Tabs.Screen name="profile" options={{ title: "Profile", headerShown: false, 
          tabBarIcon: ({color, focused}) => {
          return focused ? <FontAwesome5 name="user-alt" size={24} color={color} /> : <FontAwesome5 name="user" size={24} color={color} />
        }}} />

        <Tabs.Screen name="orders" options={{ title: "Orders", headerShown: false, 
          tabBarIcon: ({color, focused}) => {
          return focused ? <FontAwesome5 name="box-open" size={24} color={color} /> : <FontAwesome5 name="box" size={24} color={color} />
        }}} />
      </Tabs>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

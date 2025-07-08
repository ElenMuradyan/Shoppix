import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/Ionicons';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Tabs screenOptions={{tabBarActiveTintColor: 'coral'}}>
        <Tabs.Screen name="index" options={{ title: "Home", headerShown: false, 
          tabBarIcon: ({color, focused}) => {
          return focused ? <FontAwesome5 name="home" size={24} color={color} /> : <AntDesign name="home" size={24} color={color} />
        }}} />
        <Tabs.Screen name="login" options={{ title: "Login", tabBarIcon: ({color, focused}) => {
          return focused ? <Ionicons name="person" size={24} color={color} /> : <Ionicons name="person-outline" size={24} color={color} />
        }}}/>
      </Tabs>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

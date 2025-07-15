import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Slot, Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import 'react-native-reanimated';
import "../global.css";
import { Middleware } from '@/wrappers/Middleware';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }
  
  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <Middleware>
                <Slot />
              </Middleware>
        <StatusBar style="auto" />
      </ThemeProvider>
    </Provider>
  );
}
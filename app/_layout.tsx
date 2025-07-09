import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import "../global.css";
import { useColorScheme } from '@/hooks/useColorScheme';
import { useEffect } from 'react';
import { ROUTE_CONSTANTS } from '@/utils/routes';

function RouteGuard({children}: {children: React.ReactNode}) {
  const isAuth = false;
  const router = useRouter();
  useEffect(() => {
    const timeout = setTimeout(() => {
      if(!isAuth) {
        router.replace(ROUTE_CONSTANTS.AUTH_PROTECTED.LOGIN);
      }    
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  return <>{children}</>;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <RouteGuard>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Slot />
        <StatusBar style="auto" />
      </ThemeProvider>
    </RouteGuard>
  );
}

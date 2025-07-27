import { useColorScheme } from '@/hooks/useColorScheme';
import { SystemConfigProvider } from '@/providers/SystemConfig';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MenuProvider } from 'react-native-popup-menu';
import 'react-native-reanimated';

export default function RootLayout() {
  // TODO: Use colorscheme later in settings page
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <SystemConfigProvider>
      <MenuProvider>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="home/index" options={{
              title: 'Home',
            }} /> 
            <Stack.Screen name="game/index" /> 
            {/* <Stack.Screen name="(tabs)" />
            <Stack.Screen name="+not-found" /> */}
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </MenuProvider>
    </SystemConfigProvider>
  );
}

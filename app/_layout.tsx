import { useColorScheme } from '@/hooks/useColorScheme';
import { SystemConfigProvider } from '@/providers/SystemConfig';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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
        <ThemeProvider
          value={
            colorScheme === "dark"
              ? DarkTheme
              : DefaultTheme
          }
        >
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer screenOptions={{ headerShown: false }}>
              <Drawer.Screen
                name="(stacks)"
                options={{
                  title: 'Home',
                }}
              />
              <Drawer.Screen
                name="+not-found"
                options={{
                  // drawerLabel: () => null,
                  // drawerIcon: () => null,
                  drawerItemStyle: { display: 'none' },
                }}
              />
            </Drawer>
          </GestureHandlerRootView>
        </ThemeProvider>
      </MenuProvider>
    </SystemConfigProvider>
  );
}

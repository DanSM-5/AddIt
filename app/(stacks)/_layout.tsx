import { MenuIconMemo } from '@/components/MenuButton';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export const StacksRoot = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name='index'
          options={{
            title: 'Home',
            headerLeft: () => <MenuIconMemo />
          }}
        />
        <Stack.Screen name="game/index" />
        {/* <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" /> */}
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}

export default StacksRoot;
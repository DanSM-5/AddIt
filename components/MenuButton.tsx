import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { memo, useMemo } from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';

const styles = StyleSheet.create({
  iconContainer: {
    marginRight: 20,
  },
  icon: {
    padding: 10,
  },
});

const MenuIcon = () => {
  const nav = useNavigation();
  const colorScheme = useColorScheme();
  const iconColor = useMemo(() => {
    return colorScheme === 'dark' ? 'white' : 'dark'
  }, [colorScheme]);

  return (
    <View
      style={styles.iconContainer}
    >
      <Ionicons
        name='menu'
        size={24}
        style={styles.icon}
        color={iconColor}
        onPress={() => {
          nav.dispatch(DrawerActions.openDrawer());
        }}
      />
    </View>
  );
}

const MenuIconMemo = memo(MenuIcon)

export {
  MenuIcon,
  MenuIconMemo
};


import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { memo, useMemo } from 'react';
import { StyleSheet, type TextStyle, useColorScheme, View, type ViewStyle } from 'react-native';

const styles = StyleSheet.create({
  iconContainer: {
  },
  icon: {
    padding: 10,
  },
});

const MenuIcon = ({
  containerStyles,
  iconStyles,
}: {
  containerStyles?: ViewStyle,
  iconStyles?: TextStyle,
} = {}) => {
  const nav = useNavigation();
  const colorScheme = useColorScheme();
  const iconColor = useMemo(() => {
    return colorScheme === 'dark' ? 'white' : 'dark'
  }, [colorScheme]);

  return (
    <View
      style={[styles.iconContainer, containerStyles]}
    >
      <Ionicons
        name='menu'
        size={24}
        style={[styles.icon, iconStyles]}
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


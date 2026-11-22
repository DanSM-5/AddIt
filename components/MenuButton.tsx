import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from 'expo-router/react-navigation';
import { useNavigation } from 'expo-router';
import { memo } from 'react';
import { StyleSheet, type TextStyle, View, type ViewStyle } from 'react-native';
import { useThemeColors } from '@/hooks/useThemeColors';

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
  const iconColor = useThemeColors().text;

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


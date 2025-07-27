import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const MenuButton = ({ navigation, onPress, activeBorder = true }) => {
  return (
    <TouchableOpacity
      style={activeBorder ? styles.borderTouch : styles.regularTouch}
      onPress={() => onPress()}>
      <Image style={styles.image} source={require('@/images/menu.webp')} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 20,
    height: 20,
  },
  borderTouch: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 2,
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  regularTouch: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MenuButton;

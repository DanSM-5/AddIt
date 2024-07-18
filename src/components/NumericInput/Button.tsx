import React from 'react';
import {
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
} from 'react-native';

function _handlePress(callback: Parameters<typeof requestAnimationFrame>[0]) {
  requestAnimationFrame(callback);
}

interface ButtonProps {
  disabled: boolean;
  style: Record<string, string | undefined>;
  onPress: Parameters<typeof requestAnimationFrame>[0];
}

const Button = (props: React.PropsWithChildren<ButtonProps>) => {
  return Platform.OS === 'ios' ? (
    <TouchableOpacity
      disabled={props.disabled}
      style={props.style}
      onPress={() => _handlePress(props.onPress)}>
      {props.children}
    </TouchableOpacity>
  ) : (
    <TouchableNativeFeedback
      disabled={props.disabled}
      onPress={() => _handlePress(props.onPress)}>
      <View style={props.style}>{props.children}</View>
    </TouchableNativeFeedback>
  );
};

export default Button;

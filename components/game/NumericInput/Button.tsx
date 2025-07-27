import React from 'react';
import {
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  ViewStyle,
  StyleProp,
} from 'react-native';

function _handlePress(callback: Parameters<typeof requestAnimationFrame>[0]) {
  requestAnimationFrame(callback);
}

interface ButtonProps {
  disabled: boolean;
  style?: StyleProp<ViewStyle> | undefined;
  onPress: Parameters<typeof requestAnimationFrame>[0];
}

export const Button = (props: React.PropsWithChildren<ButtonProps>) => {

  return (
    <TouchableOpacity
      disabled={props.disabled}
      style={props.style}
      onPress={() => _handlePress(props.onPress)}>
      {props.children}
    </TouchableOpacity>
  );

  // TODO: Investigate if this is necessary.
  // It does not work on web, so it needs to be adjusted
  // return Platform.OS === 'ios' ? (
  //   <TouchableOpacity
  //     disabled={props.disabled}
  //     style={props.style}
  //     onPress={() => _handlePress(props.onPress)}>
  //     {props.children}
  //   </TouchableOpacity>
  // ) : (
  //   <TouchableNativeFeedback
  //     disabled={props.disabled}
  //     onPress={() => _handlePress(props.onPress)}>
  //     <View style={props.style}>{props.children}</View>
  //   </TouchableNativeFeedback>
  // );
};

export default Button;

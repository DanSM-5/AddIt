import { Dimensions } from 'react-native';

export const isPortrait = () => {
  const { height, width } = Dimensions.get('window');
  return height > width;
};

export const isLandscape = () => {
  const { height, width } = Dimensions.get('window');
  return height < width;
};

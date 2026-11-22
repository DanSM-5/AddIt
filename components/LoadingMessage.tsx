import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useThemeColors } from '@/hooks/useThemeColors';

const LoadingMessage = ({ message }: { message: string }) => {
  const colors = useThemeColors();

  return (
    <View style={styles.loadingView}>
      <Text style={[styles.loadingText, { color: colors.text }]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingView:{
    flex:1,
    justifyContent: "center", 
    alignItems: "center",
  },
  loadingText:{
    fontSize: 25,
  },
});

export default LoadingMessage;
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

export const Header: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.brandName}>wayt</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  brandName: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.primary,
    letterSpacing: -0.5,
  },
});

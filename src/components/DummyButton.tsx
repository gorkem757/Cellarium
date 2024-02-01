import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

type CellariumButtonProps = {
  label: string; // Required label prop
} & TouchableOpacity['props']; // Include all TouchableOpacity props

const CellariumButton = ({ label, ...props }: CellariumButtonProps) => {
  return (
    <TouchableOpacity {...props}>
      <View style={styles.container}>
        <Text>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1, // Add some styling for visualization
    borderColor: 'black', // Add some styling for visualization
  },
});

export default CellariumButton;

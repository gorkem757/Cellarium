// src/components/CellariumButton.tsx

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface CellariumButtonProps extends TouchableOpacityProps {
  onPress: () => void;
  label: string;
}

const CellariumButton: React.FC<CellariumButtonProps> = ({
  onPress,
  label,
  ...props
}) => {
  return (
    <TouchableOpacity onPress={onPress} {...props}>
      <View style={{padding: 10, backgroundColor: 'blue', borderRadius: 5}}>
        <Text style={{color: 'white'}}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CellariumButton;

import React from 'react';
import {Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';

export interface CellariumButtonProps extends TouchableOpacityProps {
  label: string;
}

const CellariumButton: React.FC<CellariumButtonProps> = ({label, ...props}) => {
  return (
    <TouchableOpacity {...props}>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

export default CellariumButton;

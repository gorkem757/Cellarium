import React from 'react';
import { TouchableOpacityProps } from 'react-native';
interface CellariumButtonProps extends TouchableOpacityProps {
    onPress: () => void;
    label: string;
}
declare const CellariumButton: React.FC<CellariumButtonProps>;
export default CellariumButton;

import React from 'react';
import { Text, TextProps } from 'react-native';

interface CustomTextProps extends TextProps {
    children: string;
};

const CustomText: React.FC<CustomTextProps> = ({ children, style, ...restProps }) => {
    // Validate children to be of type string 
    if (typeof children !== 'string') {
        console.error('Children of CustomText must be a string.');
        return null;
    }
    return (
        <Text style={style} {...restProps}> {children} </Text>);
};

export default CustomText;
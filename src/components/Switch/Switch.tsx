import React, { useState } from 'react';
import { StyleSheet, Switch, SwitchProps, Text, TextProps, View, ViewStyle, } from 'react-native';

interface CustomSwitchProps {
    title: string;
    titleProps?: TextProps;
    subtitle?: string;
    subtitleProps?: TextProps;
    switchProps?: Omit<SwitchProps, 'onValueChange'>;
    containerStyle?: ViewStyle;
    onValueChange?: ((value: boolean) => void | Promise<void>) | null | undefined;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
    title,
    titleProps,
    subtitle,
    subtitleProps,
    switchProps = {},
    containerStyle,
    onValueChange,
}) => {
    const [isEnabled, setIsEnabled] = useState<boolean>(switchProps.value ?? false);
   
    const toggleSwitch = () => {
        if (onValueChange && typeof onValueChange === 'function') {
            // sendingThe next value which will be the current value after the state is updated 
            onValueChange(!isEnabled);
        }
        setIsEnabled(previousState => !previousState);
    };
    
    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.textContainer}>
                <Text
                    {...titleProps}
                    style={[styles.title, titleProps?.style]}
                >
                    {title}
                </Text>
                {subtitle &&
                    <Text
                        {...subtitleProps}
                        style={[styles.subtitle, subtitleProps?.style]}
                    >
                        {subtitle}
                    </Text>
                }
            </View>
            <Switch
                value={isEnabled}
                {...switchProps}
                onValueChange={toggleSwitch} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textContainer: {
        flex: 1,
    },
    title: {
        color: '#28190E',
        fontWeight: '800',
        marginBottom: 6,
    },
    subtitle: {
        color: '#28190E',
        fontWeight: '500',
    },
});


export default CustomSwitch;
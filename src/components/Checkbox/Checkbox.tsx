import React, { useMemo } from 'react';
import {
    StyleSheet,
    Text,
    TextProps,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';

type Variant = 'checkbox' | 'radioButton';

interface CellariumCheckboxProps {
    label: string;
    description?: string;
    isChecked: boolean;
    onToggle: () => void;
    size?: number;
    color?: string;
    labelProps?: TextProps;
    descriptionProps?: TextProps;
    containerStyle?: ViewStyle;
    variant?: Variant;
}

//#region Constants 

const CHECKED_INDICATOR_OFFSET: number = 8;
const CHECKED_INDICATOR_MIN_MULTIPLIER: number = 8;
const DEFAULT_CHECKBOX_SIZE: number = 16;
const DEFAULT_CHECKBOX_COLOR: string = '#333';
const CHECKED_INDICATOR_BORDER_RADIUS: number = 2;
const CHECKBOX_BORDER_RADIUS: number = 4;
const CHECKBOX_BORDER_WIDTH: number = 2;
const LABEL_FONT_SIZE: number = 16;
const DESCRIPTION_FONT_SIZE: number = 14;
const DEFAULT_DESCRIPTION_COLOR: string = '#555';
const ACTIVE_OPACITY: number = 0.7;

//#endregion 

const Checkbox: React.FC<CellariumCheckboxProps> = ({
    label,
    description,
    isChecked,
    onToggle,
    size = DEFAULT_CHECKBOX_SIZE,
    color = DEFAULT_CHECKBOX_COLOR,
    labelProps,
    descriptionProps,
    containerStyle,
    variant = 'checkbox',
}) => {

    //#region Dynamic Styles 

    const checkedIndicatorSize: number = useMemo(() => {
        return size - CHECKED_INDICATOR_OFFSET <= 0
            ? size * CHECKED_INDICATOR_MIN_MULTIPLIER
            : size - CHECKED_INDICATOR_OFFSET
    }, [size]);

    const checkboxStyle: ViewStyle = useMemo(() => {
        return {
            width: size,
            height: size,
            borderColor: color,
        }
    }, [size, color]);

    const checkedIndicatorStyle: ViewStyle = useMemo(() => {
        return {
            width: checkedIndicatorSize,
            height: checkedIndicatorSize,
            backgroundColor: color,
            borderRadius: variant === 'checkbox'
                ? CHECKED_INDICATOR_BORDER_RADIUS
                : checkedIndicatorSize / 2,
        };
    }, [checkedIndicatorSize, color, variant]);

    const labelStyle: TextStyle = useMemo(() => {
        return {
            color: color,
        };
    }, [color]);

    const dynamicCheckboxStyle: ViewStyle = useMemo(() => {
        return {
            borderRadius: variant === 'checkbox'
                ? CHECKBOX_BORDER_RADIUS
                : size / 2,
        };
    }, [variant, size]);

    //#endregion 

    return (
        <TouchableOpacity
            onPress={onToggle}
            activeOpacity={ACTIVE_OPACITY}
            style={[styles.checkboxContainer, containerStyle]}>
            <View style={styles.labelContainer}>
                <Text style={[styles.label, labelStyle]} {...labelProps}>{label}</Text>
                {description && (
                    <Text style={styles.description} {...descriptionProps}>
                        {description}
                    </Text>
                )}
            </View>
            <View
                style={[
                    styles.checkbox,
                    dynamicCheckboxStyle,
                    checkboxStyle
                ]}>
                {isChecked && <View style={checkedIndicatorStyle} />}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    checkbox: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: CHECKBOX_BORDER_WIDTH,
    },
    labelContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    label: {
        fontSize: LABEL_FONT_SIZE,
        fontWeight: 'bold',
    },
    description: {
        fontSize: DESCRIPTION_FONT_SIZE,
        color: DEFAULT_DESCRIPTION_COLOR,
        marginTop: 6,
    },
});


export default Checkbox;



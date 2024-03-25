import React, { useRef, useState } from 'react';
import {
    Animated,
    StyleProp,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';

const LABEL_FOCUS_TOP_POSITION = -6;
const LABEL_BLUR_TOP_POSITION = 6;
const LABEL_FOCUS_LEFT_POSITION = 6;
const LABEL_BLUR_LEFT_POSITION = 8;
const ANIMATION_DURATION = 300; // ms 
const FOCUS_COLOR = '#161c20';
const BLUR_COLOR = 'gray';
const FOCUS_WIDTH = 1.2;
const BLUR_WIDTH = 1;
const FOCUS_HEIGHT = 60;
const EMPTY_HEIGHT = 40;

interface Props extends TextInputProps {
    label: string;
    labelStyle?: TextStyle;
    containerStyle?: ViewStyle;
    error?: string;
}

const LabeledInput: React.FC<Props> = ({
    label,
    labelStyle,
    style,
    containerStyle,
    error,
    ...rest
}) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const { value, onChangeText, ...remainingRest } = rest;
    const translateX = useRef(new Animated.Value(LABEL_BLUR_LEFT_POSITION)).current;
    const translateY = useRef(new Animated.Value(LABEL_BLUR_TOP_POSITION)).current;

    const handleOnFocus = () => {
        setIsFocused(true);
        Animated.parallel([
            Animated.timing(translateX,
                {
                    toValue: LABEL_FOCUS_LEFT_POSITION,
                    duration: ANIMATION_DURATION,
                    useNativeDriver: true,
                }
            ),
            Animated.timing(translateY,
                {
                    toValue: LABEL_FOCUS_TOP_POSITION,
                    duration: ANIMATION_DURATION,
                    useNativeDriver: true,
                }
            ),
        ]).start();
    };

    const handleOnBlur = () => {
        setIsFocused(false);
        Animated.parallel([
            Animated.timing(translateX,
                {
                    toValue: LABEL_BLUR_LEFT_POSITION,
                    duration: ANIMATION_DURATION,
                    useNativeDriver: true,
                }
            ),
            Animated.timing(translateY,
                {
                    toValue: LABEL_BLUR_TOP_POSITION,
                    duration: ANIMATION_DURATION,
                    useNativeDriver: true,
                }
            ),
        ]).start();
    };

    const dynamicInputStyle: TextStyle = {
        minHeight: isFocused ? FOCUS_HEIGHT : value ? FOCUS_HEIGHT : EMPTY_HEIGHT,
        textAlignVertical: 'top',
        textAlign: 'left',
        borderColor: isFocused ? FOCUS_COLOR : BLUR_COLOR,
        borderWidth: isFocused ? FOCUS_WIDTH : BLUR_WIDTH,
    };

    // @ts-ignore 
    const dynamicLabelStyle: StyleProp<TextStyle> = {
        transform: [{ translateX }, { translateY }],
        color: isFocused ? FOCUS_COLOR : BLUR_COLOR,
        backgroundColor: labelStyle?.backgroundColor ?? 'white',
    };

    return (
        <View style={[styles.container, containerStyle]}>
            <TextInput
                style={[styles.input, style, dynamicInputStyle]}
                {...rest}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                placeholder={undefined}
                value={value}
                onChangeText={onChangeText}
            />
            <Animated.Text style={[styles.label, dynamicLabelStyle, labelStyle]}>
                {isFocused ? label : remainingRest.placeholder ?? label}
            </Animated.Text>
            {error && error.trim().length !== 0 ? (
                <Text
                    style={styles.error}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {error}
                </Text>
            ) : null
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16
    },
    input: {
        borderRadius: 16,
        paddingLeft: 14,
    },
    label: {
        position: 'absolute',
        fontSize: 12,
        paddingHorizontal: 6,
    },
    error: {
        color: 'red'
    },
});

export default LabeledInput;
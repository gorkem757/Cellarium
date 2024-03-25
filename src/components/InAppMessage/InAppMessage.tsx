import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    Animated,
    Dimensions,
    Pressable,
    StyleProp,
    StyleSheet,
    Text,
    ViewStyle
} from 'react-native';


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');
const DEFAULT_DISPLAY_DURATION = 3000;
const ANIMATION_DURATION = 300;
const CONTAINER_TOP_POSITION = 56;
const CONTAINER_PADDING_HORIZONTAL = 6;
const CONTAINER_PADDING_VERTICAL = 8;
const CONTAINER_BORDER_RADIUS = 8;
const SLIDE_OFFSET = SCREEN_WIDTH - 32;

export type InAppMessageVariant = 'alert' | 'warning' | 'success';
export type InAppMessagePosition = 'top' | 'bottom';

export type InitialState = {
    visible: boolean;
    message?: string;
    variant: InAppMessageVariant;
    position: InAppMessagePosition;
    leftIcon?: JSX.Element;
    rightIcon?: JSX.Element;
};


interface InAppMessageProps {
    displayDuration?: number;
    /** 
     * Dispatch your global state function to close the message 
     */
    onMessageHide: () => void;
    /** 
     * Global State 
     */
    storeState: InitialState;
}

const InAppMessage: React.FC<InAppMessageProps> = ({ displayDuration = DEFAULT_DISPLAY_DURATION, onMessageHide, storeState, }) => {
    const [viewHeight, setViewHeight] = useState<number | null>(null);
    const { visible, message, variant, position, leftIcon: LeftIcon, rightIcon: RightIcon, } = storeState;
    const slideAnimation = useMemo(() => new Animated.Value(-SCREEN_WIDTH), []);

    const hideMessage = useCallback(() => {
        Animated.timing(slideAnimation,
            {
                toValue: -SCREEN_WIDTH,
                duration: ANIMATION_DURATION,
                useNativeDriver: false,
            }
        ).start(() => {
            onMessageHide();
        });
    }, [slideAnimation, onMessageHide]);

    useEffect(() => {
        if (!visible) {
            return;
        }
        const toValue = 16;
        Animated.timing(
            slideAnimation,
            {
                toValue,
                duration: ANIMATION_DURATION,
                useNativeDriver: false,
            }
        ).start();

        const timeoutId = setTimeout(() => {
            hideMessage();
            onMessageHide();
        }, displayDuration);
        return () => clearTimeout(timeoutId);
    }, [visible, position, slideAnimation, hideMessage, onMessageHide, displayDuration]);

    if (!visible) {
        return null;
    }

    const backgroundColor = variant === 'alert' ? '#FF6961' :
        variant === 'warning' ? '#FFD700'
            : '#7CFC00';

    const containerStyle: StyleProp<ViewStyle> = [
        styles.container,
        {
            top: position === 'top' ? CONTAINER_TOP_POSITION
                : viewHeight ? SCREEN_HEIGHT - (viewHeight + 88)
                    : CONTAINER_TOP_POSITION,
            backgroundColor
        }
    ];

    const handleLayout = (event: any) => {
        const { height } = event.nativeEvent.layout;
        setViewHeight(height);
    };

    return (
        <Animated.View
            style={[
                containerStyle,
                { transform: [{ translateX: slideAnimation }] }
            ]}
            onLayout={handleLayout}>
            <Pressable onPress={hideMessage}>
                {LeftIcon}
                <Text
                    numberOfLines={4}
                    ellipsizeMode="tail"
                    style={[styles.messageText, { textAlign: 'left' }]}>{message}
                </Text>
                {RightIcon}
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        paddingHorizontal: CONTAINER_PADDING_HORIZONTAL,
        paddingVertical: CONTAINER_PADDING_VERTICAL,
        borderRadius: CONTAINER_BORDER_RADIUS,
        zIndex: 999,
        width: SLIDE_OFFSET,
    },
    messageText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    }
});


export default InAppMessage;
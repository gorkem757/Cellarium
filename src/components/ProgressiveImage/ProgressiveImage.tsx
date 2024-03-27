import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';
import FastImage, { FastImageProps, ResizeMode } from 'react-native-fast-image';

type CustomFastImageProps = FastImageProps & { source: FastImageProps['source']; } // Override source to be required

type CellariumProgressiveImageProps = {
    containerStyle?: ViewStyle;
    /** 
     * FadeIn animation duration after the high resolution image is loaded. 
     */
    fadeDuration?: number;
    thumbnailProps: CustomFastImageProps;
    imageProps: Omit<CustomFastImageProps, 'onLoad'>;
    resizeMode?: ResizeMode;
    disableDelay?: boolean;
};

const ProgressiveImage: React.FC<CellariumProgressiveImageProps> = ({
    containerStyle,
    fadeDuration = 800,
    thumbnailProps,
    imageProps,
    resizeMode = 'contain',
    disableDelay,
}) => {
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeOutAnim = useRef(new Animated.Value(1)).current;

    const onImageLoad = () => {
        setIsImageLoaded(true);
    };

    useEffect(() => {
        console.log('isImageLoaded:' + isImageLoaded);
        if (!isImageLoaded) {
            return;
        }

        const triggerFadeIn = () => {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: fadeDuration,
                useNativeDriver: true,
            }).start();
        };

        const triggerFadeOut = () => {
            Animated.timing(fadeOutAnim, {
                toValue: 0,
                duration: fadeDuration,
                useNativeDriver: true,
            }).start();
        };

        setTimeout(() => {
            triggerFadeIn();
            triggerFadeOut();
        }, disableDelay ? 0 : fadeDuration);
    }, [isImageLoaded]);

    return (
        <View style={containerStyle}>
            <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                <FastImage
                    {...imageProps}
                    onLoad={onImageLoad}
                    resizeMode={resizeMode}
                />
            </Animated.View>
            <Animated.View style={[styles.content, { opacity: fadeOutAnim }]}>
                <FastImage
                    {...thumbnailProps}
                    resizeMode={resizeMode}
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
});


export default ProgressiveImage;
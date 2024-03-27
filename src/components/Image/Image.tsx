import React from 'react';
import FastImage, { FastImageProps, Source } from 'react-native-fast-image';

export interface CellariumImageProps extends FastImageProps { source: Source; }

const Image: React.FC<CellariumImageProps> = ({ source, ...props }) => {
    return (
        <FastImage
            source={{
                ...source,
                priority: source.priority ?? FastImage.priority.normal,
            }}
            {...props} />
    );
};


export default Image;
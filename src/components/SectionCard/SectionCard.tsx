import React, { ReactNode } from 'react';
import { StyleProp, TextStyle, View, ViewStyle, Text, StyleSheet } from 'react-native';

type Props = {
    header: string;
    description?: string;
    containerStyle?: StyleProp<ViewStyle>;
    headerStyle?: StyleProp<TextStyle>;
    descriptionStyle?: StyleProp<TextStyle>;
    children: ReactNode;
};

const SectionCard: React.FC<Props> = ({
    header,
    description,
    descriptionStyle,
    containerStyle,
    headerStyle,
    children
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.headerContainer}>
                <Text style={[styles.header, headerStyle]}>{header}</Text>
                {description && (
                    <Text style={[styles.description, descriptionStyle]}>{description}</Text>)}
            </View>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        borderRadius: 12,
        paddingVertical: 22,
        backgroundColor: 'white'
    },
    headerContainer: {
        marginBottom: 14,
    },
    header: {
        color: 'tomato'
    },
    description: {
        marginTop: 10,
        color: '#200000'
    }
})


export default SectionCard;
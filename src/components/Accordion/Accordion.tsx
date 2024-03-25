import React, { useCallback, useState } from 'react';
import {
    LayoutAnimation,
    Platform,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    UIManager,
    View,
    ViewStyle
} from 'react-native';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
};

interface Icons {
    expandedIcon: JSX.Element;
    closedIcon: JSX.Element;
};

interface AccordionItemProps {
    title: string;
    content: string | JSX.Element;
    icons?: Icons;
    containerStyle?: ViewStyle;
    titleContainerStyle?: ViewStyle;
    titleStyle?: TextStyle;
    contentContainerStyle?: ViewStyle;
    contentStyle?: TextStyle;
    onToggleAccordion?: (isExpanded: boolean) => void;
};

const AccordionItem: React.FC<AccordionItemProps> = ({
    title,
    content,
    containerStyle,
    titleContainerStyle,
    titleStyle,
    contentContainerStyle,
    contentStyle,
    icons,
    onToggleAccordion
}) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const toggleAccordion = () => {
        // Enable smooth layout animation 
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpanded(!isExpanded);
        if (onToggleAccordion && typeof onToggleAccordion === 'function') {
            // sending the value that the switch is about to be to the callback function 
            onToggleAccordion(!isExpanded);
        }
    };

    const RenderIcon = useCallback(() => {
        if (!icons) {
            return <></>;
        }
        if (isExpanded) {
            return icons.expandedIcon;
        }
        return icons.closedIcon;
    }, [isExpanded, icons]);

    return (
        <View style={(styles.container, containerStyle)}>
            <TouchableOpacity
                onPress={toggleAccordion}
                style={[styles.header, titleContainerStyle]}>
                <Text style={[styles.title, titleStyle]}>
                    {title}
                </Text>
                <RenderIcon />
            </TouchableOpacity>
            {isExpanded && (
                <View style={[styles.contentContainer, contentContainerStyle]}>
                    {typeof content === 'string' ?
                        (<Text style={[styles.content, contentStyle]}>{content}</Text>)
                        : (content)
                    }
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        margin: 8,
        overflow: 'hidden'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#f0f0f0'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    contentContainer: {
        padding: 16,
        backgroundColor: '#fff'
    },
    content: {
        fontSize: 14
    },
});


export default AccordionItem;
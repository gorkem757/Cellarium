import React from 'react';
import {
    Dimensions,
    StyleProp,
    Text,
    TextProps,
    TextStyle
} from 'react-native';

interface ParsedTextProps extends TextProps {
    parsePatterns?: Array<{
        parseText: string;
        style: TextStyle;
        rest?: TextProps;
    }>;
    children: string;
}

/** * ParsedText component allows for styling specific patterns within the provided text. 
 * 
 * @param {ParsedTextProps} props - Component props. 
 * @returns {JSX.Element} - ParsedText component. 
 */
const ParsedText: React.FC<ParsedTextProps> = ({ parsePatterns = [], children, ...otherProps }: ParsedTextProps): JSX.Element => {

    // Generate JSX elements for each pattern 
    const parsedChildren: JSX.Element[] = parsePatterns.map(({ parseText, style, rest }) => {
        return (
            <Text
                style={style}
                {...rest}
                key={parseText}>
                {parseText}
            </Text>
        );
    });

    /**
     * Replace variables in the template with corresponding JSX elements. 
     * 
     * @param {string} template - The original text template. 
     * @param {JSX.Element[]} replacements - JSX elements to replace variables. 
     * @returns {JSX.Element[]} - Resulting JSX elements after replacements. 
     */
    const replaceVariables = (template: string, replacements: JSX.Element[]): JSX.Element[] => {
        //@ts-ignore
        return template.split(/(\{\d+\})/).map((part, index) => {
            const match = part.match(/\{(\d+)\}/);
            if (match) {
                // @ts-ignore
                const replacementIndex = parseInt(match[1], 10);
                return replacements[replacementIndex] !== undefined ? (replacements[replacementIndex]) : <></>;
            }
            return <Text {...otherProps} key={index}>{part}</Text>;
        });
    };

    const containerStyle: StyleProp<TextStyle>[] = [
        { maxWidth: Dimensions.get('screen').width - 25 },
        otherProps.style,
    ];

    // Replace variables with JSX elements 
    const result = replaceVariables(children, parsedChildren);
    // Render the final component 
    return (
        <Text
            {...otherProps}
            style={containerStyle}>
            {result}
        </Text>
    );
};
// Default props for parsePatterns 
ParsedText.defaultProps = { parsePatterns: [], };

export default ParsedText;
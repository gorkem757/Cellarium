import React from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

// Define the possible variants for the button 
type ButtonVariant = 'cta' | 'default' | 'text-only' | 'explanatory';

// Base props shared by all button variants 
interface BaseCellariumButtonProps extends TouchableOpacityProps {
  title: string;
  onButtonPress: () => void;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  variant: ButtonVariant;
}

// Variant-specific props interfaces 
interface CtaButtonProps extends BaseCellariumButtonProps {
  variant: 'cta';
}
interface DefaultButtonProps extends BaseCellariumButtonProps {
  variant: 'default';
}
interface TextOnlyButtonProps extends BaseCellariumButtonProps {
  variant: 'text-only';
}
interface ExplanatoryButtonProps extends BaseCellariumButtonProps {
  variant: 'explanatory';
  subtitle: string;
  subtitleStyle?: TextStyle;
}

// Union type for all possible props 
type CellariumButtonProps = | CtaButtonProps | DefaultButtonProps | TextOnlyButtonProps | ExplanatoryButtonProps;

// The CellariumButton component 
const CellariumButton: React.FC<CellariumButtonProps> = ({ title, onButtonPress, containerStyle, labelStyle, variant, ...rest }) => {

  // Helper function to determine the button style based on the variant 
  const getButtonStyle = (): ViewStyle => {
    switch (variant) {
      case 'cta':
        return styles.ctaButton;
      case 'default':
        return styles.defaultButton;
      case 'text-only':
        return styles.textOnlyButton;
      case 'explanatory':
        return styles.explanatoryButton;
      default:
        return styles.defaultButton;
    }
  };

  // Extracting explanatory-specific props 
  const explanatoryRest = rest as ExplanatoryButtonProps;
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, getButtonStyle(), containerStyle]}
      onPress={onButtonPress}>
      <Text style={[styles.buttonLabel, labelStyle]}>{title}</Text>
      {variant === 'explanatory' && explanatoryRest.subtitle && (
        <Text style={[styles.subtitle, explanatoryRest.subtitleStyle]}>{explanatoryRest.subtitle}</Text>
      )}
    </TouchableOpacity>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  buttonContainer: {
    width: '90%',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonLabel: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  ctaButton: {
    backgroundColor: 'green',
  },
  defaultButton: {
    backgroundColor: 'blue',
  },
  textOnlyButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'black',
  },
  explanatoryButton: {
    backgroundColor: 'yellow',
  },
  subtitle: {
    marginTop: 5,
    textAlign: 'center',
  },
});

export default CellariumButton;

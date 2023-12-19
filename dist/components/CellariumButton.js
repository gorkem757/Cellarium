"use strict";
// src/components/CellariumButton.tsx
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const CellariumButton = ({ onPress, label, ...props }) => {
    return (react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: onPress, ...props },
        react_1.default.createElement(react_native_1.View, { style: { padding: 10, backgroundColor: 'blue', borderRadius: 5 } },
            react_1.default.createElement(react_native_1.Text, { style: { color: 'white' } }, label))));
};
exports.default = CellariumButton;

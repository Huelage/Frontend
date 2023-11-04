import React from "react";
import { ScrollView, View } from "react-native";

export default () => <View />;

export const KeyboardAwareScrollView = ({ children }: { children: React.ReactNode; }) => <ScrollView>{children}</ScrollView>;
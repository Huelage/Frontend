import { ReactNode } from "react";
import { View } from "react-native";

export default () => <View />;
export const BlurView = ({ children }: { children: ReactNode; }) => <View>{children}</View>;
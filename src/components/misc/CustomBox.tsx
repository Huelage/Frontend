import { useAppTheme } from "@hooks";
import { Canvas, RoundedRect, Shadow } from "@shopify/react-native-skia";
import React, { memo } from "react";
import { StyleSheet } from "react-native";

interface CustomBoxInterface {
  height: number;
  width: number;
  pad: number;
  r: number;
  left?: number;
  bgColor?: string;
  shadowColor?: string;
}

const CustomBox = ({ height, width, pad, r, left, bgColor, shadowColor }: CustomBoxInterface) => {
  const { color } = useAppTheme();
  return (
    <Canvas style={[styles.container, { height, width, left: left || 0 }]}>
      <RoundedRect x={pad} y={pad} width={width - 20} height={height - 20} r={r} color={bgColor ?? color.cardBg}>
        <Shadow dx={4} dy={4} blur={4} color={shadowColor ?? color.cardShadow} />
      </RoundedRect>
    </Canvas>
  );
};

export default memo(CustomBox);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0
  }
});
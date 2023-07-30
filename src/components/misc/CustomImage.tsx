import { Canvas, Fit, Group, Image, Shadow, rect, rrect, useImage } from '@shopify/react-native-skia';
import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

interface ImageInterface {
  imgUrl: string;
  imgSize: number;
  imgPad: number;
  imgFit?: Fit;
  shadowBlur?: number;
  shadowColor?: string;
  shadowHeight?: number;
  shadowWidth?: number;
  style: StyleProp<ViewStyle>;
}

const CustomImage = ({ imgUrl, imgSize, imgPad, imgFit, style, shadowBlur, shadowColor, shadowHeight, shadowWidth }: ImageInterface) => {
  const img = useImage(imgUrl);
  const roundedRect = rrect(rect(imgPad, imgPad, imgSize, imgSize), 1000, 1000);
  return (
    <Canvas style={style}>
      <Shadow dx={shadowWidth || 0} dy={shadowHeight || 6} blur={shadowBlur || 5} color={shadowColor || "rgba(0, 0, 0, .4)"} />
      <Group clip={roundedRect}>
        <Image image={img} x={imgPad} y={imgPad} width={imgSize} height={imgSize} fit={imgFit || "cover"} />
      </Group>
    </Canvas>
  );
};

export default CustomImage;

const styles = StyleSheet.create({
});
import { Canvas, Group, Image, Shadow, rect, rrect, useImage } from '@shopify/react-native-skia';
import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

interface ImageInterface {
  imgUrl: string;
  imgSize: number;
  imgPad: number;
  shadowColor?: string;
  style: StyleProp<ViewStyle>;
}

const CustomImage = ({ imgUrl, imgSize, imgPad, style, shadowColor }: ImageInterface) => {
  const img = useImage(imgUrl);
  const roundedRect = rrect(rect(imgPad, imgPad, imgSize, imgSize), 1000, 1000);
  return (
    <Canvas style={style}>
      <Shadow dx={0} dy={6} blur={5} color={shadowColor || "rgba(0, 0, 0, .4)"} />
      <Group clip={roundedRect}>
        <Image image={img} x={imgPad} y={imgPad} width={imgSize} height={imgSize} fit="cover" />
      </Group>
    </Canvas>
  );
};

export default CustomImage;

const styles = StyleSheet.create({
});
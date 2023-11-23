import { Image, ImageStyle } from "expo-image";
import React, { memo } from "react";
import { StyleProp } from "react-native";

interface FastImageInterface {
  src: string;
  style: StyleProp<ImageStyle>;
  testId?: string;
}

const blurs = ["LPPGa7a}?woe-;ofM|R+OGRjr;xu", "L6PZfSi_.AyE_3t7t7R**0o#DgR4", "LSLDofR5TeR*~WD$Mwt6b|spv~jG"]

const FastImage = ({ src, style, testId }: FastImageInterface) => {
  const blurHash = blurs[Math.floor(Math.random() * blurs.length)]
  return (
    <Image
      source={src}
      placeholder={blurHash}
      style={style}
      transition={500}
      testID={testId}
    />
  )
}

export default memo(FastImage);

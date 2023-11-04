import React, { LegacyRef } from "react";
import { ScrollView, View } from "react-native";

const Carousel = React.forwardRef((props, ref: LegacyRef<View>) => <View ref={ref} {...props} />);

export type ICarouselInstance = ScrollView;
export default Carousel;

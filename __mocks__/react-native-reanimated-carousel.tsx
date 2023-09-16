import React, { LegacyRef } from 'react';
import { View } from 'react-native';

const Carousel = React.forwardRef((props, ref: LegacyRef<View>) => <View ref={ref} {...props} />);

export type ICarouselInstance = boolean;
export default Carousel;
import React, { LegacyRef, useRef } from 'react';
import { View, ScrollView, Text } from 'react-native';

const Carousel = React.forwardRef((props, ref: LegacyRef<View>) => <View ref={ref} {...props} />);

export type ICarouselInstance = ScrollView;

const Yin = () => {
	const ref = useRef<ScrollView>(null);
	return (
		<ScrollView ref={ref}>
			<Text>Hello</Text>
		</ScrollView>
	);
};
export default Carousel;
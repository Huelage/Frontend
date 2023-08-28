import { mockCategories } from '@api/mock';
import React, { useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CategoryCard from './CategoryCard';

const CustomCarousel = () => {
  const carouselRef = useRef<ICarouselInstance>(null);
  const isNewSwap = useRef<boolean>(false);
  const [itemIdx, setItemIdx] = useState<number>(0);
  const baseOptions = {
    vertical: false,
    width: wp('100%'),
    height: hp('50%')
  } as const;

  const onScrollBegin = () => { isNewSwap.current = true; };
  const onProgressChange = (_: any, absoluteProgress: number) => {
    if (carouselRef.current) {
      const progress = absoluteProgress - carouselRef.current.getCurrentIndex();
      if (carouselRef.current && Math.abs(progress) >= 0.4 && isNewSwap.current) {
        isNewSwap.current = false;
        setTimeout(() => {
          if (carouselRef.current)
            setItemIdx(carouselRef.current.getCurrentIndex());
        }, 50);
      }
    }
  };
  const goToIdx = (index: number) => {
    if (carouselRef.current) {
      setItemIdx(index);
      carouselRef.current.scrollTo({ index });
    }
  };

  return (
    <>
      <Carousel
        ref={carouselRef}
        {...baseOptions}
        loop
        autoPlay={true}
        withAnimation={{
          type: "spring",
          config: {
            damping: 13,
          },
        }}
        autoPlayInterval={10000}
        data={mockCategories}
        onScrollBegin={onScrollBegin}
        onProgressChange={onProgressChange}
        onSnapToItem={idx => setItemIdx(idx)}
        renderItem={({ item, index, animationValue }) => (
          <CategoryCard
            {...item}
            animationValue={animationValue}
            key={index}
            idx={index}
            addToCart={() => console.log("addedd")}
          />
        )}
      />
      <FlatList
        data={Array.from({ length: mockCategories.length }, (_, i) => i)}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => goToIdx(item)}>
            <View style={[styles.carouselIndicator, item === itemIdx && styles.carouselIndicatorActive]} />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.indicatorBox}
      />
    </>
  );
};

export default CustomCarousel;

const styles = StyleSheet.create({
  indicatorBox: {
    alignItems: 'center',
    flex: 1,
    gap: 5,
    justifyContent: 'center',
    paddingVertical: 10
  },
  carouselIndicator: {
    backgroundColor: 'rgba(188, 181, 181, 0.38)',
    borderRadius: 5,
    height: 10,
    width: 10
  },
  carouselIndicatorActive: {
    backgroundColor: "#47CA4C"
  }
});
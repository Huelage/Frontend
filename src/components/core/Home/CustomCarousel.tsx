import { mockCategories } from '@api/mock';
import { UserFoodInterface } from '@interfaces';
import React, { useRef, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CategoryCard from './CategoryCard';

interface CustomCarouselInterface {
  items: UserFoodInterface[];
  addToCart: (id: string) => void;
}

const CustomCarousel = ({ items, addToCart }: CustomCarouselInterface) => {
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
        data={items}
        testID='carousel'
        onScrollBegin={onScrollBegin}
        onProgressChange={onProgressChange}
        onSnapToItem={idx => setItemIdx(idx)}
        renderItem={({ item, index, animationValue }) => (
          <CategoryCard category={item} animationValue={animationValue} key={index} idx={index} addToCart={addToCart} />
        )}
      />
      <FlatList
        data={Array.from({ length: mockCategories.length }, (_, i) => i)}
        horizontal
        keyExtractor={item => item.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => goToIdx(item)}>
            <View testID={`carousel indicator ${item}`} style={[styles.carouselIndicator, item === itemIdx && styles.carouselIndicatorActive]} />
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
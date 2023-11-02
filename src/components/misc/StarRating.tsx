import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type IconName = keyof typeof Ionicons.glyphMap;
type IconProps = {
  1: IconName;
  0.5: IconName;
  0: IconName;
};
interface RatingProps {
  color?: string;
  gap?: number;
  rating: number;
}

const StarRating = ({ color, gap, rating }: RatingProps) => {
  const rate = Math.floor(rating);
  const ratemantissa = rating - rate;
  const ratingArray = Array(rate).fill(1);
  if (ratemantissa >= 0.5) ratingArray.push(0.5);
  for (let i = ratingArray.length; i < 5; i++) ratingArray.push(0);
  const iconName: IconProps = {
    1: "ios-star",
    0.5: "ios-star-half",
    0: "ios-star-outline"
  };
  return (
    <View style={[styles.container, { gap: gap || 3 }]} testID='star rating'>
      {ratingArray.map((item: keyof IconProps, idx) => (
        <Ionicons testID={iconName[item]} key={idx} name={iconName[item]} size={16} color={color || "#F2DB06"} />
      ))}
    </View>
  );
};

export default StarRating;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
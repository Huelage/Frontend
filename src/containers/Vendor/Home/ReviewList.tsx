import { mockReviews } from '@api/mock';
import { ReviewElement } from '@components/vendor/Home';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@hooks';
import { fonts } from '@utils';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const ReviewList = () => {
  const { color } = useAppTheme();
  return (
    <View style={styles.container} testID='review list'>
      <View style={styles.header}>
        <Text style={[styles.title, { color: color.mainText }]}>Ratings and Reviews</Text>
        <Ionicons name="md-arrow-forward-sharp" size={20} color={color.mainText} />
      </View>
      <FlatList
        data={mockReviews}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ReviewElement {...item} />
        )}
        testID='review elements'
        scrollEnabled={false}
        contentContainerStyle={styles.reviewBox}
      />
    </View>
  );
};

export default ReviewList;

const styles = StyleSheet.create({
  container: {
    gap: 30
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 30,
    justifyContent: 'space-between'
  },
  title: {
    fontFamily: fonts.I_600,
    fontSize: 20
  },
  reviewBox: {
    gap: 20
  }
});
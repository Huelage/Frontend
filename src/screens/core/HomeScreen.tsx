import { MainSearchBar } from '@components/core/Home';
import { Categories, PopularFood, PopularRestaurant } from '@containers';
import { useAppTheme } from '@hooks';
import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';

const HomeScreen = () => {
  const { color, theme } = useAppTheme();
  const heroImage = Image.resolveAssetSource(require('@images/HomeHero.png')).uri;
  const heroImageDark = Image.resolveAssetSource(require('@images/HomeHeroDark.png')).uri;
  return (
    <View style={{ flex: 1, backgroundColor: color.mainBg }}>
      <ScrollView>
        <View style={{ gap: 10 }}>
          <MainSearchBar />
          <Image style={styles.heroImage} source={{ uri: theme === 'dark' ? heroImageDark : heroImage }} />
          <PopularFood />
          <PopularRestaurant />
          <Categories />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  heroImage: {
    width: '100%',
    aspectRatio: 16 / 9,
    height: undefined,
    marginTop: -10
  }
});
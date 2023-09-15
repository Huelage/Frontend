import restuarants from '@api/mock/mockRestaurants';
import { MainSearchBar } from '@components/core/Home';
import { VendorResCard } from '@components/core/Vendor';
import { useAppTheme } from '@hooks';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const VendorScreen = () => {
  const { color } = useAppTheme();
  const handleSearch = (val: string) => { console.log(val); };
  return (
    <View style={[styles.container, { backgroundColor: color.mainBg }]} testID='vendor screen'>
      <FlatList
        data={restuarants}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<MainSearchBar searchFunc={handleSearch} />}
        keyExtractor={item => item.id}
        testID='vendors list'
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 20 }}>
            <VendorResCard resId={item.id} />
          </View>
        )}
        contentContainerStyle={styles.vendorList}
      />
    </View>
  );
};

export default VendorScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  vendorList: {
    gap: 15,
    paddingTop: 0,
    width: wp('100%')
  }
});
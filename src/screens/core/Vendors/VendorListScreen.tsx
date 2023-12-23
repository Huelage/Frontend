import { GET_VENDORS_LIST } from "@api/graphql";
import { useQuery } from "@apollo/client";
import { MainSearchBar } from "@components/core/Home";
import { VendorResCard, VendorResCardInterface } from "@components/core/Vendor";
import { VendorListLoader } from "@components/loaders";
import { useAppTheme } from "@hooks";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const VendorListScreen = () => {
  const { color } = useAppTheme();
  const { data, loading } = useQuery(GET_VENDORS_LIST);
  const [vendors, setVendors] = useState<VendorResCardInterface[]>([]);
  const handleSearch = (val: string) => { console.log(val); };

  useEffect(() => {
    if (data) {
      const vendors = data.getAllVendors;
      setVendors(vendors.map((vendor: any) => ({
        id: vendor.vendorId, name: vendor.businessName,
        address: vendor.businessAddress, imgUrl: vendor.entity.imgUrl
      })));
    }
  }, [data]);
  return (
    <View style={[styles.container, { backgroundColor: color.mainBg }]} testID="vendor list screen">
      <MainSearchBar searchFunc={handleSearch} />
      {loading ? <VendorListLoader /> : (
        <FlatList
          data={vendors}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id!}
          testID="vendors list"
          renderItem={({ item }) => (
            <VendorResCard {...item} />
          )}
          contentContainerStyle={styles.vendorList}
        />
      )}
    </View>
  );
};

export default VendorListScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1
  },
  vendorList: {
    gap: 15,
    paddingBottom: 30,
    paddingHorizontal: 20,
    paddingTop: 0,
    width: wp("100%")
  }
});
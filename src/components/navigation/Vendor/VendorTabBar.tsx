import { useAppTheme } from "@hooks";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { fonts } from "@utils";
import React from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Path, Svg } from "react-native-svg";

const VendorTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();
  const { color } = useAppTheme();
  return (
    <View style={[styles.tabBg, { backgroundColor: color.tabBg, paddingBottom: (insets.bottom + (Platform.OS === "ios" ? 0 : 15)) }]} testID="vendor tab bar">
      {state.routes.map((route, idx) => {
        const { options } = descriptors[route.key];
        const label = route.name;
        let iconPathD = "";
        if (label === "Home") iconPathD = "M28.0269 11.964L16.0259 0.641003C16.02 0.635885 16.0145 0.630372 16.0094 0.624502C15.5675 0.222668 14.9917 0 14.3945 0C13.7972 0 13.2214 0.222668 12.7796 0.624502L12.7631 0.641003L0.775566 11.964C0.531042 12.1888 0.335854 12.462 0.202354 12.7662C0.0688547 13.0703 -5.04686e-05 13.3989 2.77341e-08 13.7311V27.5998C2.77341e-08 28.2364 0.252878 28.8469 0.703003 29.297C1.15313 29.7471 1.76363 30 2.4002 30H9.60082C10.2374 30 10.8479 29.7471 11.298 29.297C11.7481 28.8469 12.001 28.2364 12.001 27.5998V20.3992H16.8014V27.5998C16.8014 28.2364 17.0543 28.8469 17.5044 29.297C17.9546 29.7471 18.5651 30 19.2016 30H26.4022C27.0388 30 27.6493 29.7471 28.0994 29.297C28.5496 28.8469 28.8024 28.2364 28.8024 27.5998V13.7311C28.8025 13.3989 28.7336 13.0703 28.6001 12.7662C28.4666 12.462 28.2714 12.1888 28.0269 11.964ZM26.4022 27.5998H19.2016V20.3992C19.2016 19.7626 18.9488 19.1521 18.4986 18.702C18.0485 18.2519 17.438 17.999 16.8014 17.999H12.001C11.3644 17.999 10.7539 18.2519 10.3038 18.702C9.85369 19.1521 9.60082 19.7626 9.60082 20.3992V27.5998H2.4002V13.7311L2.41671 13.7161L14.4012 2.39765L26.3872 13.7131L26.4037 13.7281L26.4022 27.5998Z";
        if (label === "Orders") iconPathD = "M29.7217 21.2842L21.5625 29.458L17.6221 25.5029L18.9404 24.1846L21.5625 26.792L28.4033 19.9658L29.7217 21.2842ZM15 9.375H9.375V7.5H15V9.375ZM15 13.125H9.375V11.25H15V13.125ZM9.375 15H15V16.875H9.375V15ZM7.5 9.375H5.625V7.5H7.5V9.375ZM7.5 13.125H5.625V11.25H7.5V13.125ZM5.625 15H7.5V16.875H5.625V15ZM16.875 9.375V1.875H3.75V28.125H16.875V30H1.875V0H18.208L26.25 8.04199V18.75L24.375 20.625V9.375H16.875ZM18.75 7.5H23.042L18.75 3.20801V7.5Z";
        if (label === "Menu") iconPathD = "M2.33333 30L0 27.6667L17.0833 10.5833C16.5833 9.41667 16.5139 8.09722 16.875 6.625C17.2361 5.15278 18.0278 3.83333 19.25 2.66667C20.7222 1.19444 22.3611 0.333333 24.1667 0.0833333C25.9722 -0.166667 27.4444 0.277778 28.5833 1.41667C29.7222 2.55556 30.1667 4.02778 29.9167 5.83333C29.6667 7.63889 28.8056 9.27778 27.3333 10.75C26.1667 11.9722 24.8472 12.7639 23.375 13.125C21.9028 13.4861 20.5833 13.4167 19.4167 12.9167L17.3333 15L30 27.6667L27.6667 30L15 17.4167L2.33333 30ZM7.25 15.75L2.25 10.75C0.75 9.25 0 7.45833 0 5.375C0 3.29167 0.75 1.5 2.25 0L12.5833 10.4167L7.25 15.75Z";
        if (label === "Account") iconPathD = "M15 15C16.9891 15 18.8968 14.2098 20.3033 12.8033C21.7098 11.3968 22.5 9.48912 22.5 7.5C22.5 5.51088 21.7098 3.60322 20.3033 2.1967C18.8968 0.790177 16.9891 0 15 0C13.0109 0 11.1032 0.790177 9.6967 2.1967C8.29018 3.60322 7.5 5.51088 7.5 7.5C7.5 9.48912 8.29018 11.3968 9.6967 12.8033C11.1032 14.2098 13.0109 15 15 15ZM20 7.5C20 8.82608 19.4732 10.0979 18.5355 11.0355C17.5979 11.9732 16.3261 12.5 15 12.5C13.6739 12.5 12.4021 11.9732 11.4645 11.0355C10.5268 10.0979 10 8.82608 10 7.5C10 6.17392 10.5268 4.90215 11.4645 3.96447C12.4021 3.02678 13.6739 2.5 15 2.5C16.3261 2.5 17.5979 3.02678 18.5355 3.96447C19.4732 4.90215 20 6.17392 20 7.5ZM30 27.5C30 30 27.5 30 27.5 30H2.5C2.5 30 0 30 0 27.5C0 25 2.5 17.5 15 17.5C27.5 17.5 30 25 30 27.5ZM27.5 27.49C27.4975 26.875 27.115 25.025 25.42 23.33C23.79 21.7 20.7225 20 15 20C9.275 20 6.21 21.7 4.58 23.33C2.885 25.025 2.505 26.875 2.5 27.49H27.5Z";
        const isFocused = state.index === idx;
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, { merge: true });
          }
        };
        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            style={styles.tabButton}
            testID={`${label} tab button`}
            key={route.name}
          >
            {!!iconPathD && (
              <Svg height={25} width={25} viewBox="0 0 30 30" fill="none" strokeWidth={1}>
                <Path fill={isFocused ? color.mainGreen : color.mainText} d={iconPathD} />
              </Svg>
            )}
            <Text style={[styles.tabLabel, { color: isFocused ? color.mainGreen : color.mainText }]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default VendorTabBar;

const styles = StyleSheet.create({
  tabBg: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 30,
    paddingTop: 20
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 32,
    gap: 5
  },
  tabLabel: {
    fontFamily: fonts.I_500,
    fontSize: 12
  },
  tabLine: {
    backgroundColor: "transparent",
    borderRadius: 2,
    color: "transparent",
    height: 4,
    width: 22
  }
});
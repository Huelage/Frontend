import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '../../utils/fontEnum';

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <View style={styles.tabBg}>
      {state.routes.map((route, idx) => {
        const { options } = descriptors[route.key];
        const label = route.name;
        let iconName: keyof typeof Ionicons.glyphMap;
        if (label === 'Home') iconName = "ios-home";
        else if (label === 'Menu') iconName = "ios-book-outline";
        else if (label === 'Favourite') iconName = "md-heart-outline";
        else if (label === 'Profile') iconName = "md-person-outline";
        else iconName = "close";
        const isFocused = state.index === idx;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, { merge: true });
          }
        };
        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
            key={route.name}
          >
            <Ionicons name={iconName} size={36} color={isFocused ? '#4CAF50' : 'rgba(0, 0, 0, .3)'} />
            <Text style={isFocused ? styles.tabTextActive : styles.tabText}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  tabBg: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    height: 100,
    borderWidth: 2,
    borderColor: "#4CAF50",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 20
  },
  tabButton: {
    alignItems: 'center',
    gap: 2,
    justifyContent: 'center'
  },
  tabText: {
    color: "rgba(0, 0, 0, .3)",
    fontSize: 14,
    fontFamily: fonts.O_400
  },
  tabTextActive: {
    color: "#4CAF50",
    fontSize: 14,
    fontFamily: fonts.O_600
  }
});
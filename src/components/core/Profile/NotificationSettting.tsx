import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { fonts } from "@utils";
import ToggleSwitch from "@containers/User/Profile/ToggleSwitch";
import { useState } from "react";

const NotificationSetting = () => {
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
    const handleNotificationsToggle = () => {
        setIsNotificationsEnabled(false);
    };
    const { color } = useAppTheme();

    return (
        <View style={styles.container} testID="Notification Settings">
            <View style={styles.mainBox}>
                <View style={styles.innerBox}>
                    <MaterialCommunityIcons name="bell-outline" size={30} color={color.mainGreen} ></MaterialCommunityIcons>
                    <Text style={[styles.textStyle, { color: color.mainText }]}>   Notifications </Text>
                </View>
                <View style={styles.toggle}>
                    <ToggleSwitch
                        label="Permissions"
                        initialValue={isNotificationsEnabled}
                        onValueChange={handleNotificationsToggle}
                    />
                </View>

            </View>
        </View>
    );
};

export default NotificationSetting;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainBox: {
        gap: 10,
        flex: 1,
        alignItems: "flex-start",
        flexDirection: "column"

    },
    innerBox: {
        flex: 1,
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
    },
    toggle: {
        marginTop: 2,
        marginHorizontal: 55,
        gap: 5,
        justifyContent: "space-between",
        width: "100%"
    },
    textStyle: {
        fontSize: 22,
        fontFamily: fonts.I_500,
        fontWeight: "500",
    },
});
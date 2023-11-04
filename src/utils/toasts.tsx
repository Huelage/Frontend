import { store } from "@api/app/store";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { showMessage } from "react-native-flash-message";

export const showError = (message: string) => {
  const allowToast = store.getState().global.allowToast;
  if (!allowToast) return;
  showMessage({
    message,
    type: "danger",
    duration: 3000,
    icon: () => <MaterialIcons name="error" size={24} color="black" />,
    style: styles.toast
  });
};

export const showSuccess = (message: string) => {
  const allowToast = store.getState().global.allowToast;
  if (!allowToast) return;
  showMessage({
    message,
    type: "success",
    duration: 3000,
    icon: () => <AntDesign name="checkcircleo" size={24} color="white" />,
    style: styles.toast
  });
};

const styles = StyleSheet.create({
  toast: {
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
    width: "100%",
    textAlign: "center"
  }
});
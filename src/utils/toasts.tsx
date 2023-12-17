import { store } from "@api/app/store";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { showMessage } from "react-native-flash-message";
import Toast from "react-native-root-toast";

export const showError = (message: string) => {
  const toastType = store.getState().global.toastType;
  if (toastType === "banner") {
    showMessage({
      message,
      type: "danger",
      duration: 3000,
      icon: () => <MaterialIcons name="error" size={24} color="black" />,
      style: styles.toast
    });
  } else {
    Toast.show(message, {
      duration: 3000,
      backgroundColor: "#d9534f",
      opacity: 1,
      textColor: "white",
      position: Toast.positions.TOP,
      shadowColor: "rgba(233, 53, 37, .15)"
    })
  }
};

export const showSuccess = (message: string) => {
  const toastType = store.getState().global.toastType;
  if (toastType === "none") return;
  if (toastType === "banner") {
    showMessage({
      message,
      type: "success",
      duration: 3000,
      icon: () => <AntDesign name="checkcircleo" size={24} color="white" />,
      style: styles.toast
    });
  } else {
    Toast.show(message, {
      duration: 3000,
      backgroundColor: "#5cb85c",
      opacity: 1,
      textColor: "white",
      position: Toast.positions.TOP,
      shadowColor: "rgba(91, 207, 95, .3)"
    })
  }
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
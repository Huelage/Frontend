import { Modal } from "react-native";
import { ModalProps } from "react-native-modal";

export default (props: ModalProps) => <Modal {...props}>{props.children}</Modal>;
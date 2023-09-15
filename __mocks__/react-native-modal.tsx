import { ReactNode } from 'react';
import { Modal } from 'react-native';

export default () => <Modal />;
export const RNModal = ({ children }: { children: ReactNode; }) => <Modal testID='modal'>{children}</Modal>;
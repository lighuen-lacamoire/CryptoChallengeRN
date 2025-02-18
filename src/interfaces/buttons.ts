import { Animated, TouchableWithoutFeedbackProps } from 'react-native';

export type ButtonGroupData = {
  title: string;
  id: string;
  active: boolean;
};

export type ModalMessage = {
  header?: JSX.Element | string;
  title?: string;
  content?: JSX.Element | string;
  selfClose?: boolean;
  isVisible?: boolean;
  onBackdropPress?: (() => void) | undefined;
  actions?: ModalActions;
};

export type ButtonAction = {
  component?: JSX.Element;
  content?: JSX.Element | string;
  onPress?: (<T>(a: T) => T) | (() => void);
};

export type ModalActions = {
  primary?: ButtonAction;
  secondary?: ButtonAction;
};

export type TouchableRipple = TouchableWithoutFeedbackProps & {
  rippleColor: string;
  rippleOpacity: number;
  rippleDuration: number;
  rippleSize: number;
  rippleContainerBorderRadius: number;
  rippleCentered: boolean;
  rippleSequential: boolean;
  rippleFades: boolean;
  disabled: boolean;
  onRippleAnimation: (animation: any, callback: any) => any;
};

export type RippleAnim = {
  unique: number;
  progress: Animated.Value;
  locationX: number;
  locationY: number;
  R: number;
};

export type IconProps = {
  name: string;
  size: number;
  color: string;
};

export type ImageProps = IconProps & { isSvg: boolean };

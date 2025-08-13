import 'react-native';

declare module 'react-native' {
  interface NativeTouchEvent {
    /** Apple Pencil only property */
    altitudeAngle?: number;
  }
}
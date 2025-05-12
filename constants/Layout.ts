import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 24,
    circle: 9999,
  },
  typography: {
    h1: {
      fontSize: 24,
      lineHeight: 32,
      fontFamily: 'Roboto-Bold',
    },
    h2: {
      fontSize: 20,
      lineHeight: 28,
      fontFamily: 'Roboto-Bold',
    },
    h3: {
      fontSize: 18,
      lineHeight: 24,
      fontFamily: 'Roboto-Bold',
    },
    subtitle1: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: 'Roboto-Medium',
    },
    subtitle2: {
      fontSize: 14,
      lineHeight: 20,
      fontFamily: 'Roboto-Medium',
    },
    body1: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: 'Roboto-Regular',
    },
    body2: {
      fontSize: 14,
      lineHeight: 20,
      fontFamily: 'Roboto-Regular',
    },
    caption: {
      fontSize: 12,
      lineHeight: 16,
      fontFamily: 'Roboto-Regular',
    },
    button: {
      fontSize: 14,
      lineHeight: 20,
      fontFamily: 'Roboto-Medium',
    },
  },
};
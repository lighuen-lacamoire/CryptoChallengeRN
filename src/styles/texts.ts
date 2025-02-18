import { StyleSheet } from 'react-native';
import platform from './platform';

/**
 * Estilos
 */
const textstyles = StyleSheet.create({
  headerDates: {
    fontVariant: ['lining-nums'],
    fontWeight: '500',
    fontSize: platform.fontSizes.HEADER,
    color: platform.colors.text,
  },
  textBodyLegend: {
    fontVariant: ['lining-nums'],
    fontWeight: '500',
    fontSize: platform.fontSizes.LARGE,
    color: platform.colors.text,
  },
  textButtonLegend: {
    fontVariant: ['lining-nums'],
    fontWeight: '600',
    fontSize: platform.fontSizes.LARGE,
    color: platform.colors.white,
  },
  textInputForm: {
    fontVariant: ['lining-nums'],
    fontWeight: '400',
    fontSize: platform.fontSizes.MEDIUM,
    color: platform.colors.text,
  },
  textCaption: {
    fontVariant: ['lining-nums'],
    fontWeight: '500',
    fontSize: platform.fontSizes.SMALL,
  },
});

export default textstyles;

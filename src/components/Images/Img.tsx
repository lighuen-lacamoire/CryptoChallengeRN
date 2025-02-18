
import { ImageProps } from '../../interfaces/buttons';
import React from 'react';
import { View } from 'react-native';
import { SvgProps } from 'react-native-svg';

interface SvgComponent {
  [name: string]: React.FC<
    SvgProps & {
      color?: string;
      size?: number;
    }
  >;
}

const ImageSvg: SvgComponent = {
  coin: require('./Svg/Coin').default,
};

/**
 * Icono generico
 * @param {string} name Nombre
 * @param {string} color color
 * @param {number} size size
 * @param {boolean} isSvg es SVG true o usa fontawesome false
 */
const Img = (props: Partial<ImageProps>) => {
  const { name, size, color } = props;
  if (name) {
    const ImgComp = ImageSvg[name];
    const iconColor = color ? color.toString() : undefined;
    if (ImgComp) {
      return <ImgComp color={iconColor} fontSize={size} />;
    }
  }
  return <View />;
};

export default Img;

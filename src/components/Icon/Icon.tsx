import { ImageProps } from '../../interfaces/buttons';
import React from 'react';
import IconSVG from './IconSVG';
import IconTTF from './IconTTF';
import iconset from '../../assets/fonts/tabler-icons.json';
/**
 * Icono generico
 * @param {string} name Nombre
 * @param {string} color color
 * @param {number} size size
 * @param {boolean} isSvg es SVG true o usa fontawesome false
 */
const Icon = (props: Partial<ImageProps>) => {
  const { name = 'plus', size = 24, color = '#333', isSvg = false } = props;
  if (isSvg) {
    const IconCustom = IconSVG[name];
    const iconColor = color.toString();
    if (IconCustom) {
      return <IconCustom color={iconColor} fontSize={size} />;
    }
  }
  return (
    <IconTTF
      iconSet={iconset}
      icon={name}
      color={color.toString()}
      size={size}
    />
  );
  //return <FontAwesomeIcon name={name} color={color} size={size} {...props} />;
};

export default Icon;

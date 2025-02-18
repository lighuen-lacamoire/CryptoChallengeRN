import React, {
  CSSProperties,
  JSXElementConstructor,
  SVGProps,
  //createElement,
} from 'react';
import Svg, { Path } from 'react-native-svg';

type IconSetItem = {
  properties: {
    name: string;
  };
  icon: {
    paths: string[];
    attrs?: any[];
    width?: number | string;
  };
};

type IconSet = {
  icons: IconSetItem[];
};

export interface IconProps extends SVGProps<SVGElement> {
  icon: string;
  size?: string | number;
  title?: string;
  disableFill?: boolean;
  removeInlineStyle?: boolean;
  native?: boolean;
  SvgComponent?: JSXElementConstructor<any>;
  PathComponent?: JSXElementConstructor<any>;
  style?: CSSProperties;
}

interface IcoMoonProps extends IconProps {
  iconSet: IconSet;
}

const IconTTF = ({
  iconSet,
  icon,
  color,
  size,
  title,
  disableFill,
  removeInlineStyle,
  native,
  SvgComponent,
  PathComponent,
  ...props
}: IcoMoonProps) => {
  if (!iconSet || !icon) {return null;}

  const currentIcon = iconSet.icons.find(
    (item) => item.properties.name === icon,
  );
  if (!currentIcon) {return null;}

  const comptuedStyle = {
    ...(removeInlineStyle ? {} : {}),
    ...(size ? { width: size, height: size } : {}),
    ...(props.style || {}),
  };

  const { width = '1024' } = currentIcon.icon;

  const viewBox = `0 0 ${width} ${width}`;

  const children = currentIcon.icon.paths.map((path, index) => {
    const attrs = currentIcon.icon.attrs?.[index];

    return <Path key={icon + index} d={path} {...(attrs ? attrs : {})} />;
    // return createElement(PathComponent || 'path', pathProps);
  });

  if (title && !native) {
    //children.push(createElement('title', { key: title }, title));
  }
  /*
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        fill={color}
        strokeWidth={1}
        stroke={color}
        d="M12 2C6.489 2 2 6.489 2 12s4.489 10 10 10 10-4.489 10-10S17.511 2 12 2zm0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8z"
      />
    </Svg>
  );
  */
  return (
    <Svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="currentColor"
      color={color}
      stroke="currentColor">
      {children}
    </Svg>
  );
  /*return createElement(
    SvgComponent || 'svg',
    { ...props, viewBox, style: comptuedStyle },
    children,
  );
  */
};

export const iconList = (iconSet: IconSet) => {
  if (!iconSet || !Array.isArray(iconSet.icons)) {return null;}

  return iconSet.icons.map((icon) => icon.properties.name);
};
export default IconTTF;

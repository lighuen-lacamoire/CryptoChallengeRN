import { SvgProps } from 'react-native-svg';



interface SvgComponent {
  [name: string]: React.FC<
    SvgProps & {
      color?: string;
      size?: number;
    }
  >;
}

const IconSVG: SvgComponent = {
  'radio-empty': require('./Svg/RadioEmpty').default,
  'radio-full': require('./Svg/RadioFull').default,
  'tickBox-empty': require('./Svg/TickBoxEmpty').default,
  'tickBox-full': require('./Svg/TickBoxFull').default,
};

export default IconSVG;

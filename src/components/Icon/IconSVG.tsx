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
  'crypto-bitcoin': require('./Svg/CryptoBitcoin').default,
  'crypto-bitcoin-cash': require('./Svg/CryptoBitcoinCash').default,
  'crypto-multi-collateral-dai': require('./Svg/CryptoDAI').default,
  'crypto-litecoin': require('./Svg/CryptoLitecoin').default,
  'crypto-usd': require('./Svg/CryptoUSD').default,
  'crypto-usd-coin': require('./Svg/CryptoUSDC').default,
  'crypto-tether': require('./Svg/CryptoUSDT').default,
  'crypto-ark': require('./Svg/CryptoArk').default,
  'crypto-elixir-deusd': require('./Svg/CryptoElixir').default,
  'crypto-ethereum': require('./Svg/CryptoEthereum').default,
  'crypto-ethereum-classic': require('./Svg/CryptoEthereum').default,
  'crypto-default': require('./Svg/CryptoCoin').default,
};

export default IconSVG;

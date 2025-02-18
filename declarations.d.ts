declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
declare module "react-native-config" {
  export interface NativeConfig {
    REACT_APP_OAUTH_GOOGLE_CLIENT_ID?: string;
    REACT_APP_OAUTH_GOOGLE_CLIENT_SECRET?: string;
    REACT_APP_OAUTH_GOOGLE_APPCLIENT_ID?: string;
    REACT_APP_MARKET_API_BASEURL?: string;
    REACT_APP_MARKET_API_KEY?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}

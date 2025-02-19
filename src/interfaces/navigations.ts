import { Pages } from "../configuration/constants";
import { CryptoCurrencyDto } from "./backend";

export type NavigationParamList = {
  [Pages.PUBLICROUTER]: undefined;
  [Pages.LOGINPAGE]: undefined;
  [Pages.PRIVATEROUTER]: undefined;
  [Pages.MANAGEMENTROUTER]: undefined;
  [Pages.HOMEPAGE]: undefined;
  [Pages.BALANCEROUTER]: undefined;
  [Pages.SOURCELISTPAGE]: undefined;
  [Pages.SOURCEDETAILPAGE]: undefined | { selected?: CryptoCurrencyDto };
};

export type CardInterpolator = {
  current: {
    progress: any;
  };
};

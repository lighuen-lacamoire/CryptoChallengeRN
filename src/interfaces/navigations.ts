import { Pages } from "../configuration/constants";
import { CryptoCurrencyDto, CurrencyBasicDto } from "./backend";

type NavigatorDefaultParams = {
  screen: string;
  params?: any;
};

export type NavigationParamList = {
  [Pages.PUBLICROUTER]?: NavigatorDefaultParams;
  [Pages.LOGINPAGE]: undefined;
  [Pages.PRIVATEROUTER]?: NavigatorDefaultParams;
  [Pages.MANAGEMENTROUTER]?: NavigatorDefaultParams;
  [Pages.HOMEPAGE]: undefined;
  [Pages.BALANCEROUTER]?: NavigatorDefaultParams;
  [Pages.SOURCELISTPAGE]: undefined;
  [Pages.SOURCEDETAILPAGE]?: { selected?: CurrencyBasicDto };
};

export type CardInterpolator = {
  current: {
    progress: any;
  };
};

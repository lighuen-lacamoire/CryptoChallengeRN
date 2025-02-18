import { NavigationParamList } from './src/interfaces/navigations';

declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends NavigationParamList,
        SettingsParamList,
        BalanceParamList,
        CatalogParamList {}
  }
}

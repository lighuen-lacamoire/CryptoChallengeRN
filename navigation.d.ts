import { NavigationParamList } from "./src/interfaces/navigations";
/**
 * Tipado para los parametros de navegacion en los routers
 */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends NavigationParamList {}
  }
}

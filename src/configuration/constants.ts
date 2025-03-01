/** Rutas de navegacion de la App */
enum Pages {
  PUBLICROUTER = "PublicRouter",
  LOGINPAGE = "LoginPage",
  PRIVATEROUTER = "PrivateRouter",
  LOGOUTROUTER = "LogoutRouter",
  LOGOUTPAGE = "LogoutPage",
  MANAGEMENTROUTER = "ManagementRouter",
  HOMEPAGE = "HomePage",
  BALANCEROUTER = "BalanceRouter",
  SOURCELISTPAGE = "SourceListPage",
  SOURCEDETAILPAGE = "SourceDetailPage",
}

/** Configuracion especifica de la App */
const appConfig = {
  timeOut: 3000,
  balance: {
    delimiter: ".", // Miles
    separator: ",", // Decimales
    decimalCount: 2,
  },
  google: {
    redirectScheme: "com.cryptomarket",
    clientId: "",
    clientSecret: "",
    appClientId: "",
    scopes: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  },
};

export { Pages, appConfig };

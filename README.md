# Proyecto Crypto App

El proyecto posee el siguiente stack tecnologico

- [React-Native](https://reactnative.dev/architecture/landing-page)
- Navegabilidad/Ruteo lo que le permite manejar distintas pilas de pantallas, navegar entre ellas y bloquear algunas segun se necesite, para ello se utilizo [React-Navigation](https://reactnavigation.org/)
- Autenticación mediante el metodo OAuth contra google permitiendo configurar y eliminar quienes seran los usuarios con acceso a la app, utilizando un wrapper que posee las funcionalidades de google [react-native-google-signin](https://react-native-google-signin.github.io/docs/install)
- Manejo de estados de la app para guardar las acciones del usuario, se ha implementado como middleware Thunk, mediante la famosa libreria [Redux](https://redux.js.org/introduction/installation)
- Persistencia de los datos sencibles y/o core de la app como pueden serlo autenticacion, datos ingresados en formularios etc, en este caso con muy buena compatibilidad con redux se ha usado [Async-Storage](https://react-native-async-storage.github.io/async-storage/docs/install/)

### Requisitos

- [x] [Java SDK](https://openjdk.org/projects/jdk/17/)
- [x] [Android Studio](https://developer.android.com/studio?hl=es-419)
- [x] Variables de ambiente seteadas: _ANDROID_HOME_, _JAVA_HOME_

### Instalación

**1.** Instalar la SDK de Java (por tema Kotlin)

**2.** Configurar las variables de ambiente segun lo indica la [documentación](https://reactnative.dev/docs/set-up-your-environment?os=windows)
_ANDROID_HOME_: "%LOCALAPPDATA%\Android\Sdk"
_JAVA_HOME_: "alguna-version/java/jdk-11+/"
_PATH_: agregar a la lista "%LOCALAPPDATA%\Android\Sdk\platform-tools"

**3.A** Android:
correr los siguientes comandos

```powershell
yarn run ad-run // builder la app en modo local
yarn run ad-start // en caso de que se cierre en bundler
```

**3.B** IOS:
correr los siguientes comandos

```powershell
yarn run ios-start // para instalar los pods
yarn run ios-run // builder la app en modo local
```

### Flujo de Autenticación

```mermaid
graph TD;

  NodeAuth1 -.-> NodeAuthSuccess((Valido)) -.-> NodeHome1
  NodeAuth1 -.-> NodeAuthFail((Invalido)) -.-> NodeLogin1
  NodeLogin2 -.-> NodeLoginSuccess((Exitoso)) -.-> NodeHome1
  NodeLogin2 -.-> NodeLoginFail((Fallido)) -.-> NodeLogin1

  subgraph "Home"
  NodeHome1(Comienza la navegacion)
  NodeHome1 --> NodeHome2
  NodeHome2[Pantalla Inicial]
  end

  subgraph "Login"
  NodeLogin1 --> NodeLogin2
  NodeLogin1[Pantalla de Login]
  NodeLogin2{El usuario se autentica con Google}
  end

  subgraph "Autenticacion"
  NodeAuth1{Verificacion de token}
  end

  subgraph "Carga/Inicio (Splash)"
  NodeSplash1(Carga/Inicio de la app)
  NodeSplash1 --> NodeAuth1
  end

  classDef clsSuccess font-size:14px,color:#FFF,fill:#007A6E,stroke:#007A6E,stroke-width:0px
  classDef clsError font-size:14px,color:#FFF,fill:#E4002B,stroke:#E4002B,stroke-width:0px
  classDef clsScreen font-size:14px,color:#FFF,fill:#307ecc,stroke:#307ecc,stroke-width:0px
  class NodeAuthFail,NodeLoginFail clsError
  class NodeAuthSuccess,NodeLoginSuccess clsSuccess
  class NodeLogin1,NodeHome2 clsScreen

```

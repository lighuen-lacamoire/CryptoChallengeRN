const genericMessages = {
  yes: "Si",
  no: "No",
  ok: "OK",
  back: "Atras",
  next: "Siguiente",
  continue: "Continuar",
  finish: "Finalizar",
  accept: "Aceptar",
  cancel: "Cancelar",
  apply: "Aplicar",
  edit: "Editar",
  new: "Nuevo",
  manage: "Gestionar",
  administer: "Administrar",
  check: "Checkear",
  search: "Buscar",
  clean: "Limpiar",
  save: "Guardar",
  delete: "Eliminar",
  create: "Crear",
  update: "Actualizar",
  refresh: "Actualizar",
  list: {
    empty: "No contiene elementos",
    duplicated: (key: string, value: string) =>
      `Ya existe un elemento con el ${key} "${value}"`,
  },
  requestConfirmation: {
    title: "Confirmación",
    text: "¿Está seguro de que desea continuar?",
  },
};

const loginMessages = {
  login: "Iniciar sesión con Google",
};

/**
 * Textos de la pantalla de cierre de sesion
 */
const logoutMessages = {
  title: "Salir",
  close: {
    title: "Cerrar sesión",
    text: "¿Está seguro que desea salir?",
  },
};

const navigationMessages = {
  headers: {
    loginPage: "Loguearse",
    homePage: (value?: string | null) => `Hola ${value}!`,
    logoutPage: logoutMessages.close.title,
    sourceListPage: "Monedas",
    sourceDetailPage: (value?: string) => `${value}`,
  },
};

export { genericMessages, logoutMessages, navigationMessages, loginMessages };

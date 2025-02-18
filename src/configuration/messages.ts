const genericMessages = {
  yes: 'Si',
  no: 'No',
  ok: 'OK',
  back: 'Atras',
  next: 'Siguiente',
  continue: 'Continuar',
  finish: 'Finalizar',
  accept: 'Aceptar',
  cancel: 'Cancelar',
  apply: 'Aplicar',
  edit: 'Editar',
  new: 'Nuevo',
  manage: 'Gestionar',
  administer: 'Administrar',
  check: 'Checkear',
  search: 'Buscar',
  clean: 'Limpiar',
  save: 'Guardar',
  delete: 'Eliminar',
  create: 'Crear',
  update: 'Actualizar',
  refresh: 'Actualizar',
  list: {
    empty: 'No contiene elementos',
    duplicated: (key: string, value: string) =>
      `Ya existe un elemento con el ${key} "${value}"`,
  },
  requestConfirmation: {
    title: 'Confirmación',
    text: '¿Está seguro de que desea continuar?',
  },
};

const driveMessages = {
  folderInDrive: 'Carpeta en Drive',
  fileExpenses: 'Archivo de Gastos',
  fileCatalogues: 'Archivo de Listas',
};

const loginMessages = {
  login: 'Iniciar sesión con Google',
};

const navigationMessages = {
  headers: {
    loginScreen: 'Loguearse',
    settingsDetailScreen: (value: string) => `Bienvenido ${value}`,
    accountStatementsScreen: 'Estado de cuenta',
    catalogListScreen: 'Listas',
    movementListScreen: 'Movimientos',
    movementDetailScreen: (value: string) => `${value} movimiento`,
  },
};

export { genericMessages, navigationMessages, loginMessages, driveMessages };

export interface ActionContent {
  type: string;
  payload?: any;
}

export interface ActionDispatch {
  type: string;
}

/**
 * Type generico para los Action
 */
export type Action = ActionContent;

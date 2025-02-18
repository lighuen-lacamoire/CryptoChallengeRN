export interface MessageTitle {
  title?: string;
  message?: string;
}

export type ValidationError = {
  field: string;
  message: string;
  validation: string;
};

export interface FormError {
  [key: string]: string | undefined;
}

export interface AppFileTypeProps {
  id: string;
  name: string;
  prefix: string;
}

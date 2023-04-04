export type AuthFormState = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar?: File;
};

export type AuthFormAction<T> = {
  type: keyof T;
  payload: T[keyof T];
};

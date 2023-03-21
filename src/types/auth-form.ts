export type AuthFormState = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type AuthFormAction<T> = {
  type: keyof T;
  payload: string;
};

export type UserState = {
  user: UserLogin | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
};

export type User = {
  id: number;
  name: string;
  email: string;
};

export type UserLogin = {
  id: number;
  email: string;
};

export type UserProp ={
  token: string;
  user: UserLogin;
}

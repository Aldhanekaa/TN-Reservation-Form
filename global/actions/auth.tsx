import { Dispatch } from "redux";

// eslint-disable-next-line no-shadow
export enum AUTH_ACTIONS {
  AUTH_LOADING = "AUTH_LOADING",
  AUTH_FAIL = "AUTH_FAIL",
  AUTH_LOGOUT = "AUTH_LOGOUT",
  AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS",
  AUTH_SIGNUP_SUCCESS = "AUTH_SIGNUP_SUCCESS",
  AUTH_LOGIN = "AUTH_LOGIN",
  AUTH_SIGNUP = "AUTH_SIGNUP",
  AUTH_SET_TOKEN = "AUTH_SET_TOKEN",
  AUTH_CHECK_TOKEN = "AUTH_SET_TOKEN",
}

export interface AuthFail {
  type: AUTH_ACTIONS.AUTH_FAIL;
}

export interface AuthLogout {
  type: AUTH_ACTIONS.AUTH_LOGOUT;
}

export interface AuthSetToken {
  type: AUTH_ACTIONS.AUTH_SET_TOKEN;
}
export interface AuthCheckToken {
  type: AUTH_ACTIONS.AUTH_CHECK_TOKEN;
}

export interface AuthMain {
  type: AUTH_ACTIONS.AUTH_LOGIN | AUTH_ACTIONS.AUTH_SIGNUP;
}

export interface AuthSuccess {
  type: AUTH_ACTIONS.AUTH_LOGIN_SUCCESS | AUTH_ACTIONS.AUTH_SIGNUP_SUCCESS;
  me: {
    statusVisitor:
      | "Mentor"
      | "Siswa"
      | "Orang Tua"
      | "Lainnya"
      | "Saudara"
      | "";
    levelSiswa: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
    namaPengunjung: string;
    namaLengkapSiswa: string;
    id: string;
  };
}

export type AuthDispatchTypes =
  | AuthFail
  | AuthSuccess
  | AuthMain
  | AuthCheckToken
  | AuthLogout;

export const UserLogin = (form: { username: string; password: string }) => ({
  type: AUTH_ACTIONS.AUTH_LOGIN,
  form,
});
export const UserSignup = (form: { username: string; password: string }) => ({
  type: AUTH_ACTIONS.AUTH_SIGNUP,
  form,
});

export const UserLoginSuccess =
  (user: {
    statusVisitor:
      | "Mentor"
      | "Siswa"
      | "Orang Tua"
      | "Lainnya"
      | "Saudara"
      | "";
    levelSiswa: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
    namaPengunjung: string;
    namaLengkapSiswa: string;
    id: string;
  }) =>
  async (dispatch: Dispatch<AuthDispatchTypes>) => {
    dispatch<AuthSuccess>({
      type: AUTH_ACTIONS.AUTH_LOGIN_SUCCESS,
      me: user,
    });
  };

export const UserLogout =
  () => async (dispatch: Dispatch<AuthDispatchTypes>) => {
    dispatch<AuthLogout>({
      type: AUTH_ACTIONS.AUTH_LOGOUT,
    });
  };

export const UserAuthFail =
  (message: string) => async (dispatch: Dispatch<AuthDispatchTypes>) => {
    dispatch<AuthFail>({
      type: AUTH_ACTIONS.AUTH_FAIL,
    });
  };

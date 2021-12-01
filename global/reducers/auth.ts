import { AuthDispatchTypes, AUTH_ACTIONS } from "../actions/auth";

export interface AuthState {
  loading: boolean;
  logggedIn: boolean;
  fetched: boolean;
  me?: {
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

const defaultState: AuthState = {
  loading: true,
  logggedIn: false,
  fetched: false,
};

const authReducer = (
  state: AuthState = defaultState,
  action: AuthDispatchTypes
): AuthState => {
  switch (action.type) {
    case AUTH_ACTIONS.AUTH_LOGIN_SUCCESS:
      // console.log("ACTION", action);
      return {
        ...state,
        logggedIn: true,
        loading: false,
        fetched: true,
        me: action.me,
      };
    case AUTH_ACTIONS.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        fetched: false,
        logggedIn: false,
      };

    default:
      return state;
  }
};

export default authReducer;

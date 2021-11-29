import { AuthDispatchTypes, AUTH_ACTIONS } from "../actions/auth";

export interface AuthState {
  loading: boolean;
  logggedIn: boolean;
  fetched: boolean;
  me?: {
    id: string;
    name: string;
    level: number;
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

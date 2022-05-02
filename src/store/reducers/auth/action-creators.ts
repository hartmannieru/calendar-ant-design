import { IUser } from './../../../models/IUser';
import { AppDispatch } from "../..";
import { AuthActionEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction } from "./types";
import UserService from '../../../api/UserService';

export const AuthActionCreators = {
  setUser: (user: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
  setAuth: (auth: boolean): SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload: auth}),
  setIsLoading: (payload: boolean): SetIsLoadingAction => ({type: AuthActionEnum.SET_IS_LOADING, payload: payload}),
  setError: (payload: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload: payload}),
  login: (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.setIsLoading(true));
      setTimeout(async () => {
        const response = await UserService.getUsers();
        const mockUser = response.data.find(user => user.username === username && user.password === password);
        
        if (mockUser) {
          localStorage.setItem('auth', 'true');
          localStorage.setItem('username', mockUser.username);
          dispatch(AuthActionCreators.setUser(mockUser));
          dispatch(AuthActionCreators.setAuth(true));
        } else {
          dispatch(AuthActionCreators.setError('An error occurred with your login or password'))
        }
        dispatch(AuthActionCreators.setIsLoading(false));
      }, 1000)
    } catch (e) {
      dispatch(AuthActionCreators.setError('Login error'))
    }
  },
  logout: () => async (dispatch: AppDispatch) => {
    try {
      localStorage.removeItem('auth');
      localStorage.removeItem('username');
      dispatch(AuthActionCreators.setUser({} as IUser));
      dispatch(AuthActionCreators.setAuth(false));
    } catch (e) {
      console.error(e);
    }
  },
}
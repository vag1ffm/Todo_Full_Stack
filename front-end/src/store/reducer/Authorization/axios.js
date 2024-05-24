import {createAsyncThunk} from "@reduxjs/toolkit";
import httpClient from "../../../server/httpClient";
import {error, logoutUser} from "../user/userSlice";
import {haveAuthorizated, logoutAuth} from "./authSlice";

export const LoginAxios = createAsyncThunk(
    "auth/loginSlice",
    async (payload, {dispatch, rejectWithValue}) => {
        try {
            let parameters = {
                url: '/api/auth/token/login/',
                payload,
            }
            await httpClient.post(parameters).then(res => {
                console.log(res)
                // if (res?.response?.status === 400) {
                // } else {
                dispatch(haveAuthorizated())
                localStorage.setItem('authToken', res.data.auth_token)
                // }
            })
        } catch (e) {
            dispatch(error(e.response.data.error))

            console.log(e)
        }
    }
);

export const RegisterationAxios = createAsyncThunk(
    "auth/Registration",
    async (payload, {dispatch, rejectWithValue}) => {
        try {
            let parameters = {
                url: '/api/auth/users/',
                payload,
            }
            await httpClient.post(parameters).then(() => {
                dispatch(LoginAxios(payload))
            })

        } catch (e) {
            dispatch(error(e.response.data.error))
            console.log(e)
        }
    }
);
export const LogoutAxios = createAsyncThunk(
    "auth/Logout",
    async (payload, {dispatch, rejectWithValue}) => {
        try {
            let parameters = {
                url: '/api/auth/token/logout/',
            }
            await httpClient.LogoutPost(parameters).then(() => {
                localStorage.removeItem('authToken')
                // dispatch(statusReset())
                dispatch(logoutUser())
                dispatch(logoutAuth())

            })
        } catch (e) {
            console.log(e)
        }
    }
);
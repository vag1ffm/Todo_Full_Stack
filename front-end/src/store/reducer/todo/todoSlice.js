import { createSlice} from "@reduxjs/toolkit";
import {LoginAxios} from "../Authorization/axios";
import createGroup from "../../../components/createGroup";
import {CreateTodoGroupAxios} from "./axios";

const initialState = {
    groups: [],
    todos: [],
    members: [],
    isLoading: false,
    error: '',
    status: 0,
}

export const todoSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getTodoGroups(state, {payload}){
            state.status = 0
            state.isLoading = false
            state.groups = payload
        },
        getTodos(state, {payload}) {
            state.isLoading = false
            state.todos = payload
        },
        getGroupMembers(state, {payload}) {
            state.isLoading = false
            state.members = payload
        },
        statusReset(state) {
          state.status = 0
        },


        loading(state) {
            state.isLoading = true

        },
        error(state, {payload}) {
            state.isLoading = false
            state.error = 'payload'
        },
    },
    extraReducers: (reducerChanger) => {
        reducerChanger.addCase(CreateTodoGroupAxios.pending, (state) => {
            state.status = 0;
            state.isLoading = true;
        });
        reducerChanger.addCase(CreateTodoGroupAxios.fulfilled, (state) => {
            state.status = 1;
            state.isLoading = false;
        });
        reducerChanger.addCase(CreateTodoGroupAxios.rejected, (state) => {
            state.status = 0;
        });
    }



})


export const {
    getTodoGroups,
    getTodos,
    loading,
    error,
    getGroupMembers,
    statusReset
} = todoSlice.actions
export default todoSlice.reducer;
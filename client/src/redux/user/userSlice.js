import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState : {
    currentUser : null,
    error: null,
    loading: false,
  },
  reducers: {
    signUpStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signUpSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null
    },
    signUpFailure: (state, action) => {
      state.error = action.payload
      state.loading = false;
    },
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;

    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStart: (state)=>{
      state.loading = true;
      state.error = null
    },
    updateSuccess: (state,action)=>{
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action)=>{
      state.error = action.payload;
      state.loading = false;
    },
    deleteStart: (state)=>{
      state.loading = true;
      state.error = null
    },
    deleteSuccess: (state)=>{
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteFailure: (state, action)=>{
      state.error = action.payload;
      state.loading = false;
    },
    signoutSuccess: (state)=>{
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    }
  },
})

export const { signUpStart, signUpSuccess, signUpFailure,
      signInStart, signInSuccess, signInFailure,
      updateStart, updateSuccess, updateFailure,
      deleteStart, deleteSuccess, deleteFailure,
      signoutSuccess } = userSlice.actions

export default userSlice.reducer
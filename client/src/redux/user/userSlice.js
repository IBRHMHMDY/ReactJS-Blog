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
    SignUpFailure: (state, action) => {
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
      state.error = null;
    },
    SignInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
})

export const { signUpStart, signUpSuccess, SignUpFailure,
              signInStart, signInSuccess, SignInFailure } = userSlice.actions

export default userSlice.reducer
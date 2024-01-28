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
        state.loading = false;
        state.error = null
        state.currentUser = action.payload;
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
        state.loading = false;
        state.error = null
        state.currentUser = action.payload;
    },
    SignInFailure: (state, action) => {
      state.error = action.payload
      state.loading = false;
    },
  },
})

export const { signUpStart, signUpSuccess, SignUpFailure,
              signInStart, signInSuccess, SignInFailure } = userSlice.actions

export default userSlice.reducer
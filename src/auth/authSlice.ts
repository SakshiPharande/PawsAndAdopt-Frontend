import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SignUpResponse } from './types/signup-type';

interface AuthState {
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  } | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<SignUpResponse>) => {
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

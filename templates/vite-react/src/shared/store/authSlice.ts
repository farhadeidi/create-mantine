import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Props {
  isLoggedIn: boolean;
}
const initialState: Props = {
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    mutateIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const selector = (state: StoreProps) => state.auth;
export const { mutateIsLoggedIn } = authSlice.actions;

export default authSlice.reducer;

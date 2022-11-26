import { configureStore } from '@reduxjs/toolkit';

import authSlice from './authSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

declare global {
  export type StoreProps = RootState;
}

export type AppDispatch = typeof store.dispatch;

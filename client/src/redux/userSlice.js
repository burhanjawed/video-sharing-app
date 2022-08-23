import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: () => {
      return initialState;
    },
    subscription: (state, action) => {
      if (state.currentUser.subscriptions.includes(action.payload)) {
        state.currentUser.subscriptions.splice(
          state.currentUser.subscriptions.findIndex(
            (channelId) => channelId === action.payload
          ),
          1
        );
      } else {
        state.currentUser.subscriptions.push(action.payload);
      }
    },
  },
});

// export functions
export const { loginStart, loginSuccess, loginFailure, logout, subscription } =
  userSlice.actions;

// export reducer
export default userSlice.reducer;

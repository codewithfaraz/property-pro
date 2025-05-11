import { createSlice, configureStore } from "@reduxjs/toolkit";
import { UserState } from "../types/userTypes";

const initialState: UserState = {
  userType: null,
  user: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      state.userType = action.payload.userType;
    },
  },
});

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
export default store;
export const userActions = userSlice.actions;

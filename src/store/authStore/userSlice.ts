// src/features/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface UserState {
  id: number | null;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  token: string;
}
const initialState: UserState = {
  id: null,
  firstName: "",
  lastName: "",
  email: "",
  mobileNumber: "",
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.mobileNumber = action.payload.mobileNumber;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.id = null;
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.mobileNumber = "";
      state.token = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;

// this slice is to keep track of the user's authentication status and user data
// whether user is logged in or not, we will ask from the store

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: false,
	userData: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action) => {
			state.status = true;
			state.userData = action.payload.userData;
		},
		logout: (state) => {
			state.status = false;
			state.userData = null;
		},
	},
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

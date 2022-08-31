import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isOpenSidebar: true,
	isCollapsed: false,
};

const globals = createSlice({
	name: "globals",
	initialState,
	reducers: {
		onHandleSidebar: (state, action) => {
			state.isOpenSidebar = action.payload;
		},
		onHandleCollapsed: (state, action) => {
			state.isCollapsed = action.payload;
		},
	},
});

export const { onHandleSidebar, onHandleCollapsed } = globals.actions;

export default globals.reducer;

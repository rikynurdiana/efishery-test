import { configureStore } from "@reduxjs/toolkit";
import productPrice from "../redux/slice/productPrice";
import globals from "../redux/slice/globals";

export const store = configureStore({
	reducer: {
		globals: globals,
		productPrice: productPrice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

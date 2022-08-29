import { configureStore } from "@reduxjs/toolkit";
import productPrice from "../redux/slice/productPrice";

export const store = configureStore({
	reducer: {
		productPrice: productPrice,
	},
});

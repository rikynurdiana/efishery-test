import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../config/api";
import SteinStore from "stein-js-client";

const API_PRODUCT_PRICE = new SteinStore(API.PRODUCT_PRICE.LIST_DATA);
// const API_AREA = new SteinStore(API.PRODUCT_PRICE.AREA);
// const API_SIZE = new SteinStore(API.PRODUCT_PRICE.SIZE);

const initialState = {
	isLoading: false,
	error: null,
	searchValue: [],
	listData: [],
	filteredData: [],
};

export const getData = createAsyncThunk("productPrice/getData", async () => {
	try {
		const response = await API_PRODUCT_PRICE.read("data", {
			limit: 10,
			offset: 0,
		}).then((res) => {
			return res;
		});

		console.log("response", response);
		return response;
	} catch (error) {
		throw Error(error);
	}
});

const productPrice = createSlice({
	name: "productPrice",
	initialState,
	reducers: {},
	extraReducers: {
		[getData.pending]: (state) => {
			state.isLoading = true;
			state.error = null;
		},
		[getData.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.listData = action.payload;
			state.filteredData = action.payload;
		},
		[getData.rejected]: (state) => {
			state.isLoading = false;
			state.error = false;
		},
	},
});

// export const {} = pokemon.actions;

export default productPrice.reducer;

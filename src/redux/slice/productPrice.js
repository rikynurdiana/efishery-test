import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { API } from "../../config/api";
import SteinStore from "stein-js-client";

import isEmpty from "lodash/isEmpty";
import cloneDeep from "lodash/cloneDeep";
import filter from "lodash/filter";
import sortBy from "lodash/sortBy";

import {
	setOptionValue,
	setOptionProvince,
	setOptionKomoditas,
	currencyToNumber,
	setOptionCity,
	prepareListData,
} from "../../libs/helpers";

const API_PRODUCT_PRICE = new SteinStore(API.PRODUCT_PRICE.LIST_DATA);
const API_AREA = new SteinStore(API.PRODUCT_PRICE.AREA);
const API_SIZE = new SteinStore(API.PRODUCT_PRICE.SIZE);

const formModel = {
	komoditas: "",
	area_provinsi: "",
	area_kota: "",
	size: "",
	price: "",
	uuid: "",
};

const tableHeader = [
	{
		label: "Komoditas Ikan",
		isSort: true,
		value: "komoditas",
		width: "70px",
	},
	{
		label: "Provinsi",
		isSort: true,
		value: "area_provinsi",
		width: "70px",
	},
	{
		label: "Kota",
		isSort: true,
		value: "area_kota",
		width: "60px",
	},
	{
		label: "Ukuran",
		isSort: true,
		value: "size",
		width: "30px",
	},
	{
		label: "Harga",
		isSort: true,
		value: "price",
		width: "40px",
		type: "currency",
	},
	{
		label: "Aksi",
		isSort: false,
		value: "action",
		width: "25px",
	},
];

const tableAction = {
	edit: true,
	view: true,
	delete: true,
};

const initialState = {
	isLoading: false,
	error: null,
	isEdit: false,

	tableHeader: cloneDeep(tableHeader),
	tableAction: cloneDeep(tableAction),

	listData: [],
	filteredData: [],

	rawProvince: [],
	listProvince: [],
	listCity: [],
	listSize: [],
	listKomoditas: [],

	filterModel: cloneDeep(formModel),
	formModel: cloneDeep(formModel),

	isFilterOpen: false,
	isModalViewOpen: false,
	isModalAddOpen: false,
	isModalEditOpen: false,

	selectedViewData: {},
	selectedEditData: {},

	toast: {
		show: false,
		title: "",
		message: "",
	},
};

export const getData = createAsyncThunk("productPrice/getData", async () => {
	try {
		const response = await API_PRODUCT_PRICE.read("data", {
			limit: 10,
			offset: 0,
		}).then((res) => {
			return res;
		});

		return response;
	} catch (error) {
		throw Error(error);
	}
});

export const getDataByLength = createAsyncThunk(
	"productPrice/getData",
	async (params) => {
		try {
			const response = await API_PRODUCT_PRICE.read("data", {
				limit: params,
				offset: 0,
			}).then((res) => {
				return res;
			});

			return response;
		} catch (error) {
			throw Error(error);
		}
	}
);

export const getOptionSize = createAsyncThunk(
	"productPrice/getOptionSize",
	async () => {
		try {
			const response = await API_SIZE.read("size").then((res) => {
				return res;
			});

			return response;
		} catch (error) {
			throw Error(error);
		}
	}
);

export const getOptionKomoditas = createAsyncThunk(
	"productPrice/getOptionKomoditas",
	async () => {
		try {
			const response = await API_PRODUCT_PRICE.read("data", {
				limit: 150,
				offset: 0,
			}).then((res) => {
				return res;
			});

			return response;
		} catch (error) {
			throw Error(error);
		}
	}
);

export const getOptionProvince = createAsyncThunk(
	"productPrice/getOptionProvince",
	async () => {
		try {
			const response = await API_AREA.read("area").then((res) => {
				return res;
			});

			return response;
		} catch (error) {
			throw Error(error);
		}
	}
);

export const addData = createAsyncThunk(
	"productPrice/addData",
	async (params) => {
		try {
			const response = await API_PRODUCT_PRICE.append("data", [
				params,
			]).then(async (res) => {
				const updateSize = await API_SIZE.read("size").then((res) => {
					return res;
				});

				const updateKomoditas = await API_PRODUCT_PRICE.read("data", {
					limit: 150,
					offset: 0,
				}).then((res) => {
					return res;
				});

				return {
					updateSize,
					updateKomoditas,
					res,
				};
			});

			return response;
		} catch (error) {
			throw Error(error);
		}
	}
);

export const onApplyFilter = createAsyncThunk(
	"productPrice/handleFilterData",
	async (params) => {
		try {
			const newPayload = {};

			Object.entries(params).forEach((item) => {
				if (!isEmpty(item[1])) {
					Object.assign(newPayload, {
						[item[0]]:
							item[0] === "price"
								? currencyToNumber(item[1])
								: item[1],
					});
				}
			});

			const response = await API_PRODUCT_PRICE.read("data", {
				search: newPayload,
			}).then((res) => {
				return res;
			});

			return response;
		} catch (error) {
			throw Error(error);
		}
	}
);

export const deleteData = createAsyncThunk(
	"productPrice/deleteData",
	async (params) => {
		try {
			const response = await API_PRODUCT_PRICE.delete("data", {
				search: { uuid: params.uuid },
			}).then(async (res) => {
				const updateSize = await API_SIZE.read("size").then((res) => {
					return res;
				});

				const updateKomoditas = await API_PRODUCT_PRICE.read("data", {
					limit: 150,
					offset: 0,
				}).then((res) => {
					return res;
				});

				const updateListData = await API_PRODUCT_PRICE.read("data", {
					limit: 10,
					offset: 0,
				}).then((res) => {
					return res;
				});

				return {
					updateSize,
					updateKomoditas,
					updateListData,
					res,
				};
			});

			return response;
		} catch (error) {
			throw Error(error);
		}
	}
);

export const editData = createAsyncThunk(
	"productPrice/editData",
	async (params) => {
		try {
			const response = await API_PRODUCT_PRICE.edit("data", {
				search: { uuid: params.uuid },
				set: params,
			}).then(async (res) => {
				const updateSize = await API_SIZE.read("size").then((res) => {
					return res;
				});

				const updateKomoditas = await API_PRODUCT_PRICE.read("data", {
					limit: 150,
					offset: 0,
				}).then((res) => {
					return res;
				});

				const updateListData = await API_PRODUCT_PRICE.read("data", {
					limit: 10,
					offset: 0,
				}).then((res) => {
					return res;
				});

				return {
					updateSize,
					updateKomoditas,
					updateListData,
					res,
				};
			});

			return response;
		} catch (error) {
			throw Error(error);
		}
	}
);

const productPrice = createSlice({
	name: "productPrice",
	initialState,
	reducers: {
		onHandleSort: (state, action) => {
			const currentData = current(state.listData);
			const sortDataBy = sortBy(currentData, [action.payload]);
			state.filteredData = sortDataBy;
		},
		onResetFilter: (state) => {
			const listData = current(state.listData);
			state.filterModel = initialState.filterModel;
			state.filteredData = listData;
		},

		onShowFilter: (state, action) => {
			state.isFilterOpen = action.payload;
		},
		onShowModalView: (state, action) => {
			state.isModalViewOpen = action.payload;
		},
		onShowModalAdd: (state, action) => {
			state.isModalAddOpen = action.payload;
			if (action.payload === true) {
				state.formModel = initialState.formModel;
				state.selectedEditData = initialState.formModel;
			}
		},
		onShowModalEdit: (state, action) => {
			state.isModalEditOpen = action.payload;
			if (action.payload === false) {
				state.formModel = initialState.formModel;
				state.selectedEditData = initialState.formModel;
			}
		},
		onHandleToast: (state, action) => {
			state.toast = {
				show: action.payload,
				title: "",
				message: "",
			};
		},

		setModalViewData: (state, action) => {
			state.selectedViewData = action.payload;
		},
		setModalEditData: (state, action) => {
			const newData = {
				...action.payload,
				komoditas: {
					label: action.payload.komoditas,
					value: action.payload.komoditas,
				},
				area_provinsi: action.payload.area_provinsi,
				area_kota: action.payload.area_kota,
				size: {
					label: action.payload.size,
					value: action.payload.size,
				},
			};
			state.selectedEditData = newData;

			const getCityFromProvince = filter(current(state.rawProvince), {
				province: action.payload.area_provinsi,
			});
			state.listCity = setOptionCity(getCityFromProvince);
		},
	},
	extraReducers: {
		[getData.pending]: (state) => {
			state.isLoading = true;
			state.error = null;
		},
		[getData.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.listData = prepareListData(action.payload);
			state.filteredData = prepareListData(action.payload);
		},
		[getData.rejected]: (state) => {
			state.isLoading = false;
			state.error = false;
		},

		[getDataByLength.pending]: (state) => {
			state.isLoading = true;
			state.error = null;
		},
		[getDataByLength.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.listData = prepareListData(action.payload);
			state.filteredData = prepareListData(action.payload);
		},
		[getDataByLength.rejected]: (state) => {
			state.isLoading = false;
			state.error = false;
		},

		[onApplyFilter.pending]: (state) => {
			state.isLoading = true;
			state.error = null;
		},
		[onApplyFilter.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.filteredData = action.payload;
		},
		[onApplyFilter.rejected]: (state) => {
			state.isLoading = false;
			state.error = false;
		},

		[addData.pending]: (state) => {
			state.isLoading = true;
			state.error = null;
		},
		[addData.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.isModalAddOpen = false;
			state.listKomoditas = setOptionKomoditas(
				prepareListData(action.payload.updateKomoditas)
			);
			state.listSize = setOptionValue(action.payload.updateSize);
			state.toast = {
				show: true,
				title: "Berhasil",
				message: "Data Berhasil Ditambahkan",
			};
			state.formModel = formModel;
		},
		[addData.rejected]: (state) => {
			state.isLoading = false;
			state.error = false;
		},

		[editData.pending]: (state) => {
			state.isLoading = true;
			state.error = null;
		},
		[editData.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.isModalEditOpen = false;
			state.listKomoditas = setOptionKomoditas(
				prepareListData(action.payload.updateKomoditas)
			);
			state.listSize = setOptionValue(action.payload.updateSize);
			state.toast = {
				show: true,
				title: "Berhasil",
				message: "Data Berhasil di Perbarui",
			};
			state.formModel = formModel;
			state.listData = prepareListData(action.payload.updateListData);
			state.filteredData = prepareListData(action.payload.updateListData);
		},
		[editData.rejected]: (state) => {
			state.isLoading = false;
			state.error = false;
		},

		[deleteData.pending]: (state) => {
			state.isLoading = true;
			state.error = null;
		},
		[deleteData.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.listKomoditas = setOptionKomoditas(
				prepareListData(action.payload.updateKomoditas)
			);
			state.listSize = setOptionValue(action.payload.updateSize);
			state.toast = {
				show: true,
				title: "Berhasil",
				message: "Data Berhasil di Hapus",
			};
			state.formModel = initialState.formModel;
			state.listData = prepareListData(action.payload.updateListData);
			state.filteredData = prepareListData(action.payload.updateListData);
		},
		[deleteData.rejected]: (state) => {
			state.isLoading = false;
			state.error = false;
		},

		[getOptionProvince.fulfilled]: (state, action) => {
			state.listProvince = setOptionProvince(action.payload);
			state.rawProvince = action.payload;
		},

		[getOptionSize.fulfilled]: (state, action) => {
			state.listSize = setOptionValue(action.payload);
		},
		[getOptionKomoditas.fulfilled]: (state, action) => {
			state.listKomoditas = setOptionKomoditas(
				prepareListData(action.payload)
			);
		},
	},
});

export const {
	onShowFilter,
	onResetFilter,
	onShowModalView,
	setModalViewData,
	onShowModalAdd,
	onHandleToast,
	onShowModalEdit,
	setModalEditData,
	onHandleSort,
} = productPrice.actions;

export default productPrice.reducer;

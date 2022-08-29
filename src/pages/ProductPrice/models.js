// eslint-disable-next-line
export const filterModel = {
	komoditas: {
		type: "text",
		required: false,
		placeholder: "komoditas",
		label: "Komoditas",
	},
	area_provinsi: {
		type: "select",
		required: false,
		options: [
			{
				value: "1",
				label: "item 1",
			},
			{
				value: "2",
				label: "item 2",
			},
		],
		placeholder: "Area Provinsi",
		label: "Area Provinsi",
	},
	area_kota: {
		type: "select",
		required: false,
		options: [
			{
				value: "1",
				label: "item 1",
			},
			{
				value: "2",
				label: "item 2",
			},
		],
		placeholder: "Area Kota",
		label: "Area Kota",
	},
	ukuran: {
		type: "number",
		required: false,
		placeholder: "Ukuran",
		label: "Ukuran",
	},
	harga: {
		type: "currency",
		required: false,
		placeholder: "Harga",
		label: "Harga",
	},
	Save: {
		type: "submit",
		label: "Terapkan Filter",
		variant: "success",
	},
};

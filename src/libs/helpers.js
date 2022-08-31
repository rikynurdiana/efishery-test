import filter from "lodash/filter";
import uniqWith from "lodash/uniqWith";
import isEqual from "lodash/isEqual";

export function numberToCurrency(n) {
	// format number 1000000 to 1,234,567
	let str = typeof n !== "string" ? String(n) : n;
	return str.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function currencyToNumber(n) {
	// format number 1,234,567 to 1000000
	let str = typeof n !== "string" ? String(n) : n;
	// eslint-disable-next-line
	return str.replace(/[\,\.]/g, "");
}

export function prepareListData(data) {
	const newData = [];
	// eslint-disable-next-line
	data.map((item) => {
		if (item.uuid !== null) {
			newData.push(item);
		}
	});

	return newData;
}

export function setOptionValue(data) {
	const options = [];
	data.forEach((item) => {
		Object.keys(item).forEach((key) => {
			options.push({
				value: item[key],
				label: item[key],
			});
		});
	});
	return options;
}

export function setOptionProvince(data) {
	const options = [];

	data.forEach((item) => {
		Object.keys(item).forEach((key) => {
			if (key === "province") {
				options.push({
					value: item[key],
					label: item[key],
				});
			}
		});
	});

	const reduceListProvince = uniqWith(options, isEqual);
	return reduceListProvince;
}

export function setOptionCity(data) {
	const options = [];

	data.forEach((item) => {
		Object.keys(item).forEach((key) => {
			if (key === "city") {
				options.push({
					value: item[key],
					label: item[key],
				});
			}
		});
	});

	const reduceListCity = uniqWith(options, isEqual);
	return reduceListCity;
}

export function setOptionKomoditas(data) {
	const options = [];

	data.forEach((item) => {
		Object.keys(item).forEach((key) => {
			if (key === "komoditas") {
				options.push({
					value: item[key],
					label: item[key],
				});
			}
		});
	});

	const reduceListKomoditas = uniqWith(options, isEqual);
	return reduceListKomoditas;
}

export function handleChangeForm({ event, formState, setFormState }) {
	const name = event?.target?.name;
	const value = event?.target?.value;
	setFormState({
		...formState,
		[name]: value,
	});
}

export function handleChangeProvince({
	event,
	formState,
	setFormState,
	setListCity,
	rawProvince,
}) {
	const name = event?.target?.name;
	const value = event?.target?.value;
	setFormState({
		...formState,
		[name]: value,
	});

	const getCityFromProvince = filter(rawProvince, {
		province: value,
	});

	setListCity(setOptionCity(getCityFromProvince));
}

export function handleSetCityinEditForm({
	formState,
	setFormState,
	rawProvince,
	provinceState,
	cityState,
	setListCity,
}) {
	setFormState({
		...formState,
		area_kota: {
			label: cityState,
			value: cityState,
		},
	});

	const getCityFromProvince = filter(rawProvince, {
		province: provinceState,
	});

	setListCity(setOptionCity(getCityFromProvince));
}

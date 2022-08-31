import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "react-bootstrap/Card";
import { confirmAlert } from "react-confirm-alert";
import { Ikan } from "@onefish/icons-react";

import TableSection from "../../components/Tables";
import FormSection from "./FormSection";
import FilterSection from "./FilterSection";
import DetailSection from "./DetailSection";
import ButtonSection from "./ButtonSection";

import {
	getData,
	getOptionSize,
	getOptionProvince,
	onShowModalView,
	setModalViewData,
	getOptionKomoditas,
	onShowModalEdit,
	setModalEditData,
	deleteData,
} from "../../redux/slice/productPrice";

import "./style.scss";

const ProductPrice = () => {
	const dispatch = useDispatch();

	const handleDelete = (params) => {
		confirmAlert({
			title: "Konfirmasi",
			message: "Apakah anda yakin akan menghapus data ini?",
			buttons: [
				{
					label: "Hapus",
					onClick: () => dispatch(deleteData(params)),
				},
				{
					label: "Batal",
					onClick: () => {},
				},
			],
		});
	};

	const handleView = (params) => {
		dispatch(setModalViewData(params));
		dispatch(onShowModalView(true));
	};

	const handleEdit = (params) => {
		dispatch(setModalEditData(params));
		dispatch(onShowModalEdit(true));
	};

	useEffect(() => {
		return () => {
			dispatch(getData());
			dispatch(getOptionSize());
			dispatch(getOptionProvince());
			dispatch(getOptionKomoditas());
		};
	}, [dispatch]);

	return (
		<main className="product-price">
			<header>
				<h1>
					<Ikan
						color="#3da090"
						weight="fill"
						size={50}
						className="title-icon"
					/>
					Product Price
				</h1>
			</header>

			<Card>
				<Card.Body>
					<ButtonSection />
					<FilterSection />
					<TableSection
						tableHeader={useSelector(
							(state) => state.productPrice.tableHeader
						)}
						tableData={useSelector(
							(state) => state.productPrice.filteredData
						)}
						tableAction={useSelector(
							(state) => state.productPrice.tableAction
						)}
						handleDelete={handleDelete}
						handleView={handleView}
						handleEdit={handleEdit}
					/>
				</Card.Body>
			</Card>

			<FormSection />
			<DetailSection />
		</main>
	);
};

export default ProductPrice;

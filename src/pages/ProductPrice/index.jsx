import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Ikan } from "@onefish/icons-react";
import Table from "../../components/Tables";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

import { getData } from "../../redux/slice/productPrice";
import CustomForm from "../../components/CustomForm";
import { filterModel } from "./models";

import "./style.scss";

const ProductPrice = () => {
	const dispatch = useDispatch();
	const [filterOpen, setFilterOpen] = useState(false);
	const tableData = useSelector((state) => state.productPrice.listData);
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
		},
		{
			label: "Aksi",
			isSort: false,
			value: "action",
			width: "65px",
		},
	];

	const tableAction = {
		edit: true,
		view: true,
		delete: true,
	};

	const handleDelete = (param) => {
		console.log("param", param);
	};

	const submit = (params) => {
		console.log(params);
	};

	useEffect(() => {
		return () => {
			dispatch(getData());
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
					{/* BUTTON SECTION */}
					<div className="btn-wrapper">
						<div className="btn-add">
							<Button variant="primary">Tambah Data</Button>
						</div>
						<div className="btn-filter">
							<Button
								variant="secondary"
								onClick={() => setFilterOpen(!filterOpen)}
							>
								Filter Data
							</Button>
						</div>
					</div>

					{/* FILTER SECTION */}
					<Collapse in={filterOpen} className="filter-wrapper">
						<div id="form-filter">
							<CustomForm model={filterModel} onSubmit={submit} />
						</div>
					</Collapse>

					{/* TABLE SECTION */}
					<Table
						tableHeader={tableHeader}
						tableData={tableData}
						tableAction={tableAction}
						handleDelete={handleDelete}
					/>
				</Card.Body>
			</Card>
		</main>
	);
};

export default ProductPrice;

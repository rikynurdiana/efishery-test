import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MagnifyingGlass, Plus } from "@onefish/icons-react";

import {
	onShowFilter,
	onShowModalAdd,
	getDataByLength,
	onHandleSort,
} from "../../redux/slice/productPrice";

const ButtonSection = () => {
	const dispatch = useDispatch();
	const filterOpen = useSelector((state) => state.productPrice.isFilterOpen);
	const tableHeader = useSelector((state) => state.productPrice.tableHeader);

	return (
		<Row>
			<Col lg="3">
				<Button
					variant="primary"
					onClick={() => dispatch(onShowModalAdd(true))}
					style={{ width: "100%", marginBottom: "18px" }}
				>
					<Plus /> Tambah Data
				</Button>
			</Col>

			<Col lg="3">
				<Button
					variant="secondary"
					onClick={() => dispatch(onShowFilter(!filterOpen))}
					style={{ width: "100%", marginBottom: "18px" }}
				>
					<MagnifyingGlass /> Filter Data
				</Button>
			</Col>

			<Col lg="3">
				<Form.Select
					aria-label="sort-data"
					onChange={(e) => dispatch(onHandleSort(e.target.value))}
					style={{ width: "100%", marginBottom: "18px" }}
				>
					<option>Sorting</option>
					{tableHeader.map((item, key) => {
						return (
							<option key={key} value={item.value}>
								{item.label}
							</option>
						);
					})}
				</Form.Select>
			</Col>

			<Col lg="3">
				<Form.Select
					aria-label="data-length"
					onChange={(e) => dispatch(getDataByLength(e.target.value))}
					style={{ width: "100%", marginBottom: "18px" }}
				>
					<option value="10">10 Data</option>
					<option value="20">20 Data</option>
					<option value="30">30 Data</option>
					<option value="40">40 Data</option>
					<option value="50">50 Data</option>
					<option value="60">60 Data</option>
					<option value="70">70 Data</option>
					<option value="80">80 Data</option>
					<option value="90">90 Data</option>
					<option value="100">100 Data</option>
				</Form.Select>
			</Col>
		</Row>
	);
};

export default ButtonSection;

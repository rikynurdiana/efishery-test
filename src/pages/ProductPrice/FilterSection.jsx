import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";

import isEmpty from "lodash/isEmpty";
import cloneDeep from "lodash/cloneDeep";

import {
	numberToCurrency,
	handleChangeForm,
	handleChangeProvince,
} from "../../libs/helpers";

import { onApplyFilter, onResetFilter } from "../../redux/slice/productPrice";

const FilterSection = () => {
	const dispatch = useDispatch();
	const initialFilterModel = cloneDeep(
		useSelector((state) => state.productPrice.filterModel)
	);
	const [formState, setFormState] = useState(initialFilterModel);
	const listProvince = useSelector(
		(state) => state.productPrice.listProvince
	);
	const rawProvince = useSelector((state) => state.productPrice.rawProvince);
	const [listCity, setListCity] = useState([]);
	const listSize = useSelector((state) => state.productPrice.listSize);
	const listKomoditas = useSelector(
		(state) => state.productPrice.listKomoditas
	);
	const filterOpen = useSelector((state) => state.productPrice.isFilterOpen);

	return (
		<Collapse in={filterOpen} className="filter-wrapper">
			<div id="form-filter">
				<Row>
					<Col lg="3" style={{ marginBottom: "18px" }}>
						<FloatingLabel label="Komoditas">
							<Form.Select
								id="komoditas"
								aria-label="Komoditas"
								value={formState.komoditas}
								name="komoditas"
								onChange={(event) =>
									handleChangeForm({
										event,
										formState,
										setFormState,
									})
								}
							>
								<option value="">Pilih Ikan</option>
								{listKomoditas.map((item, key) => (
									<option key={key} value={item.value}>
										{item.label}
									</option>
								))}
							</Form.Select>
						</FloatingLabel>
					</Col>

					<Col lg="3" style={{ marginBottom: "18px" }}>
						<FloatingLabel label="Area Provinsi">
							<Form.Select
								id="area_provinsi"
								aria-label="Area Provinsi"
								value={formState.area_provinsi}
								name="area_provinsi"
								onChange={(event) =>
									handleChangeProvince({
										event,
										formState,
										setFormState,
										setListCity,
										rawProvince,
									})
								}
							>
								<option value="">Pilih Provinsi</option>
								{listProvince.map((item, key) => (
									<option key={key} value={item.value}>
										{item.label}
									</option>
								))}
							</Form.Select>
						</FloatingLabel>
					</Col>

					<Col lg="3" style={{ marginBottom: "18px" }}>
						<FloatingLabel label="Area Kota">
							<Form.Select
								id="area_kota"
								aria-label="Area Kota"
								value={formState.area_kota}
								name="area_kota"
								onChange={(event) =>
									handleChangeForm({
										event,
										formState,
										setFormState,
									})
								}
								disabled={isEmpty(formState.area_provinsi)}
							>
								<option value="">Pilih Kota</option>
								{listCity.map((item, key) => (
									<option key={key} value={item.value}>
										{item.label}
									</option>
								))}
							</Form.Select>
						</FloatingLabel>
					</Col>

					<Col lg="3" style={{ marginBottom: "18px" }}>
						<FloatingLabel label="Ukuran">
							<Form.Select
								id="size"
								aria-label="Ukuran"
								value={formState.size}
								name="size"
								onChange={(event) =>
									handleChangeForm({
										event,
										formState,
										setFormState,
									})
								}
							>
								<option>Pilih Ukuran</option>
								{listSize.map((item, key) => (
									<option key={key} value={item.value}>
										{item.label}
									</option>
								))}
							</Form.Select>
						</FloatingLabel>
					</Col>
				</Row>

				<Row>
					<Col lg="3" style={{ marginBottom: "18px" }}>
						<FloatingLabel label="Harga">
							<Form.Control
								type="text"
								id="price"
								aria-describedby="harga"
								placeholder="Harga"
								value={numberToCurrency(formState.price)}
								name="price"
								onChange={(event) =>
									handleChangeForm({
										event,
										formState,
										setFormState,
									})
								}
							/>
						</FloatingLabel>
					</Col>
				</Row>

				<hr />

				<Row>
					<Col lg="12">
						<div className="btn-wrapper">
							<div className="btn-apply-filter">
								<Button
									variant="success"
									onClick={() =>
										dispatch(onApplyFilter(formState))
									}
								>
									Terapkan Filter
								</Button>
							</div>

							<div className="btn-reset-filter">
								<Button
									variant="danger"
									onClick={() => {
										setFormState(initialFilterModel);
										dispatch(onResetFilter());
									}}
								>
									Reset Filter
								</Button>
							</div>
						</div>
					</Col>
				</Row>
			</div>
		</Collapse>
	);
};

export default FilterSection;

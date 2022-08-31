import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import CreatableSelect from "react-select/creatable";

import isEmpty from "lodash/isEmpty";
import cloneDeep from "lodash/cloneDeep";
import uuid from "react-uuid";

import {
	numberToCurrency,
	handleChangeForm,
	handleChangeProvince,
} from "../../libs/helpers";

import {
	onShowModalAdd,
	onShowModalEdit,
	addData,
	editData,
} from "../../redux/slice/productPrice";

const FormSection = () => {
	const dispatch = useDispatch();
	const isEdit = useSelector((state) => state.productPrice.isModalEditOpen);
	const isAdd = useSelector((state) => state.productPrice.isModalAddOpen);
	const isLoading = useSelector((state) => state.productPrice.isLoading);

	const initialFormModel = cloneDeep(
		useSelector((state) => state.productPrice.formModel)
	);
	const [formState, setFormState] = useState(initialFormModel);
	const listSize = useSelector((state) => state.productPrice.listSize);
	const listProvince = useSelector(
		(state) => state.productPrice.listProvince
	);
	const [listCity, setListCity] = useState([]);
	const listKomoditas = useSelector(
		(state) => state.productPrice.listKomoditas
	);
	const rawProvince = useSelector((state) => state.productPrice.rawProvince);
	const selectedListCity = useSelector(
		(state) => state.productPrice.listCity
	);
	const selectedEditData = useSelector(
		(state) => state.productPrice.selectedEditData
	);

	const handleChangeReactSelect = (newValue, actionMeta) => {
		setFormState({
			...formState,
			[actionMeta.name]: {
				label: newValue.value,
				value: newValue.value,
			},
		});
	};

	const handleSubmit = () => {
		// set value before submit
		const payload = {
			...formState,
			komoditas: formState.komoditas.value,
			size: formState.size.value,
			uuid: isAdd ? uuid() : formState.uuid,
			tgl_parsed: new Date().toISOString(),
			timestamp: Date.now(),
		};
		if (isAdd) {
			dispatch(addData(payload));
		} else if (isEdit) {
			dispatch(editData(payload));
		}
		setFormState(initialFormModel);
	};

	const onHideModal = () => {
		if (isAdd) {
			dispatch(onShowModalAdd(false));
		} else if (isEdit) {
			dispatch(onShowModalEdit(false));
		}
	};

	function usePrevious(value) {
		const ref = useRef();
		useEffect(() => {
			ref.current = value;
		});
		return ref.current;
	}

	useEffect(() => {
		return () => {
			setFormState(initialFormModel);
		};
		// eslint-disable-next-line
	}, []);

	const prevState = usePrevious(formState);

	useEffect(() => {
		if (isEdit) {
			if (prevState.uuid !== selectedEditData.uuid) {
				setFormState(selectedEditData);
				setListCity(selectedListCity);
			}
		}

		if (isAdd) {
			if (prevState.uuid !== "") {
				setFormState(initialFormModel);
			}
		}
	}, [
		isEdit,
		isAdd,
		prevState,
		initialFormModel,
		formState,
		selectedEditData,
		rawProvince,
		selectedListCity,
	]);

	return (
		<Modal
			show={isAdd || isEdit}
			onHide={onHideModal}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			backdrop="static"
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					{isAdd ? "Tambah Data Baru" : "Ubah Data Terpilih"}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row className="row-filter">
					<Col lg="6" style={{ marginBottom: "18px" }}>
						<Form.Label>Komoditas</Form.Label>
						<CreatableSelect
							name="komoditas"
							id="komoditas"
							searchable={true}
							value={formState.komoditas}
							isClearable
							onChange={handleChangeReactSelect}
							options={listKomoditas}
							placeholder="komoditas"
						/>
					</Col>

					<Col lg="6" style={{ marginBottom: "18px" }}>
						<Form.Label>Ukuran</Form.Label>
						<CreatableSelect
							name="size"
							id="size"
							searchable={true}
							value={formState.size}
							isClearable
							onChange={handleChangeReactSelect}
							options={listSize}
							placeholder="Ukuran"
						/>
					</Col>

					<Col lg="6" style={{ marginBottom: "18px" }}>
						<Form.Label>Area Provinsi</Form.Label>
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
					</Col>

					<Col lg="6" style={{ marginBottom: "18px" }}>
						<Form.Label>Area Kota</Form.Label>
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
					</Col>

					<Col lg="6" style={{ marginBottom: "18px" }}>
						<Form.Label>Harga</Form.Label>
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
					</Col>
				</Row>
			</Modal.Body>
			<Modal.Footer>
				<div className="btn-wrapper">
					<Button
						variant="primary"
						type="submit"
						style={{ marginRight: "18px" }}
						onClick={handleSubmit}
						disabled={isLoading}
					>
						{isLoading ? "Loading…" : "Simpan"}
					</Button>
					<Button
						variant="secondary"
						onClick={onHideModal}
						disabled={isLoading}
					>
						{isLoading ? "Loading…" : "Batal"}
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
};

export default FormSection;

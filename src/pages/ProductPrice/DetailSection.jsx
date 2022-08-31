import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

import isEmpty from "lodash/isEmpty";
import DayJS from "react-dayjs";

import { numberToCurrency } from "../../libs/helpers";

import { onShowModalView } from "../../redux/slice/productPrice";

const DetailSection = () => {
	const dispatch = useDispatch();
	const data = useSelector((state) => state.productPrice.selectedViewData);

	return (
		<Modal
			show={useSelector((state) => state.productPrice.isModalViewOpen)}
			onHide={() => dispatch(onShowModalView(false))}
			size="lg"
			aria-labelledby="modal-view"
			centered
			backdrop="static"
		>
			<Modal.Header closeButton>
				<Modal.Title id="modal-view">Detail Data</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div>
					{!isEmpty(data) && (
						<Table striped>
							<tbody>
								<tr>
									<td>UUID</td>
									<td>{data.uuid}</td>
								</tr>
								<tr>
									<td>Komoditas</td>
									<td>{data.komoditas}</td>
								</tr>
								<tr>
									<td>Harga</td>
									<td>Rp {numberToCurrency(data.price)}</td>
								</tr>
								<tr>
									<td>Ukuran</td>
									<td>{data.size} Gram</td>
								</tr>
								<tr>
									<td>Area Provinsi</td>
									<td>{data.area_provinsi}</td>
								</tr>
								<tr>
									<td>Area Kota</td>
									<td>{data.area_kota}</td>
								</tr>
								<tr>
									<td>Tanggal</td>
									<td>
										<DayJS format="DD-MM-YYYY">
											{data.tgl_parsed}
										</DayJS>
									</td>
								</tr>
							</tbody>
						</Table>
					)}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={() => dispatch(onShowModalView(false))}>
					Tutup
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default DetailSection;

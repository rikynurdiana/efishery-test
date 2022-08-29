import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "./style.scss";

const filter = () => {
	return (
		<div id="form-filter">
			<Row className="row-filter">
				<Col lg="3">
					<FloatingLabel label="Komoditas">
						<Form.Control
							type="text"
							id="komoditas"
							aria-describedby="komoditas"
							placeholder="Komoditas"
						/>
					</FloatingLabel>
				</Col>

				<Col lg="3">
					<FloatingLabel label="Area Provinsi">
						<Form.Select aria-label="Area Provinsi">
							<option>Pilih</option>
							<option value="1">One</option>
							<option value="2">Two</option>
							<option value="3">Three</option>
						</Form.Select>
					</FloatingLabel>
				</Col>

				<Col lg="3">
					<FloatingLabel label="Area Kota">
						<Form.Select aria-label="Area Kota">
							<option>Pilih</option>
							<option value="1">One</option>
							<option value="2">Two</option>
							<option value="3">Three</option>
						</Form.Select>
					</FloatingLabel>
				</Col>

				<Col lg="3">
					<FloatingLabel label="Ukuran">
						<Form.Control
							type="text"
							id="ukuran"
							aria-describedby="ukuran"
							placeholder="Ukuran"
						/>
					</FloatingLabel>
				</Col>
			</Row>

			<Row>
				<Col lg="3">
					<FloatingLabel label="Harga">
						<Form.Control
							type="number"
							id="harga"
							aria-describedby="harga"
							placeholder="Harga"
						/>
					</FloatingLabel>
				</Col>
			</Row>
		</div>
	);
};

export default filter;

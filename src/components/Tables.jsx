import React from "react";
import Table from "react-bootstrap/Table";
import isEmpty from "lodash/isEmpty";
import Dropdown from "react-bootstrap/Dropdown";
import { Eye, NotePencil, Trash, ListBullets } from "@onefish/icons-react";
import { numberToCurrency } from "../libs/helpers";

const Tables = ({
	tableHeader,
	tableData,
	tableAction,
	handleDelete,
	handleView,
	handleEdit,
}) => {
	const header = tableHeader.map((item, index) => (
		<th key={index} style={{ textAlign: "center", maxWidth: item.width }}>
			{item.label}
		</th>
	));

	const data = tableData.map((val, index) => (
		<tr key={index}>
			{tableHeader.map((item, k) => (
				<td key={k} style={{ maxWidth: item.width }}>
					{item.type === "currency"
						? `Rp ${numberToCurrency(val[item.value])}`
						: val[item.value]}
					{item.value === "action" ? (
						<div style={{ textAlign: "center" }}>
							<Dropdown>
								<Dropdown.Toggle
									variant="outline-primary"
									id="dropdown-basic"
								>
									<ListBullets />
								</Dropdown.Toggle>

								<Dropdown.Menu>
									{tableAction.edit && (
										<Dropdown.Item
											onClick={() => handleEdit(val)}
										>
											<NotePencil /> Ubah
										</Dropdown.Item>
									)}

									{tableAction.view && (
										<Dropdown.Item
											onClick={() => handleView(val)}
										>
											<Eye /> Detail
										</Dropdown.Item>
									)}

									{tableAction.delete && (
										<Dropdown.Item
											onClick={() => handleDelete(val)}
										>
											<Trash /> Hapus
										</Dropdown.Item>
									)}
								</Dropdown.Menu>
							</Dropdown>
						</div>
					) : null}
				</td>
			))}
		</tr>
	));

	return (
		<>
			{!isEmpty(tableData) ? (
				<div className="table-responsive">
					<Table striped bordered hover style={{ minWidth: "800px" }}>
						<thead>
							<tr>{header}</tr>
						</thead>
						<tbody>{data}</tbody>
					</Table>
				</div>
			) : (
				<Table striped bordered hover>
					<thead>
						<tr style={{ textAlign: "center" }}>
							<th>Data Tidak Tersedia</th>
						</tr>
					</thead>
				</Table>
			)}
		</>
	);
};

export default Tables;

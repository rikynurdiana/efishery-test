import React from "react";
import Table from "react-bootstrap/Table";
import isEmpty from "lodash/isEmpty";
import Button from "react-bootstrap/esm/Button";

const Tables = ({ tableHeader, tableData, tableAction, handleDelete }) => {
	const handleClickEdit = (id) => {
		console.log("edit button", id);
	};
	const handleClickView = (id) => {
		console.log("view button", id);
	};
	const handleClickDelete = (id) => {
		console.log("delete button", id);
		handleDelete(id);
	};

	const header = tableHeader.map((item, index) => (
		<th key={index} style={{ textAlign: "center", maxWidth: item.width }}>
			{item.label}
		</th>
	));

	const data = tableData.map((val, index) => (
		<tr key={index}>
			{tableHeader.map((item, k) => (
				<td key={k} style={{ maxWidth: item.width }}>
					{val[item.value]}
					{item.value === "action" ? (
						<div style={{ textAlign: "center" }}>
							{tableAction.edit && (
								<Button
									variant="outline-success"
									onClick={() => handleClickEdit(val.id)}
									style={{
										marginRight: "10px",
										marginBottom: "10px",
									}}
									size="sm"
								>
									Ubah
								</Button>
							)}
							{tableAction.view && (
								<Button
									variant="outline-warning"
									onClick={() => handleClickView(val.id)}
									style={{
										marginRight: "10px",
										marginBottom: "10px",
									}}
									size="sm"
								>
									Detail
								</Button>
							)}
							{tableAction.delete && (
								<Button
									variant="outline-danger"
									onClick={() => handleClickDelete(val.id)}
									style={{
										marginRight: "10px",
										marginBottom: "10px",
									}}
									size="sm"
								>
									Hapus
								</Button>
							)}
						</div>
					) : null}
				</td>
			))}
		</tr>
	));

	return (
		<>
			{!isEmpty(tableData) ? (
				<Table striped bordered hover>
					<thead>
						<tr>{header}</tr>
					</thead>
					<tbody>{data}</tbody>
				</Table>
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

import React from "react";
import Toast from "react-bootstrap/Toast";
import { useDispatch, useSelector } from "react-redux";
import { onHandleToast } from "../redux/slice/productPrice";

const Notification = () => {
	const dispatch = useDispatch();
	const toast = useSelector((state) => state.productPrice.toast);

	return (
		<Toast
			onClose={() => dispatch(onHandleToast(false))}
			show={toast.show}
			bg="success"
			delay={5000}
			autohide={true}
			style={{
				position: "absolute",
				right: "20px",
				top: "20px",
				zIndex: "9999",
				color: "#ffffff",
			}}
		>
			<Toast.Header>
				<strong className="me-auto">{toast.title}</strong>
			</Toast.Header>
			<Toast.Body>{toast.message}</Toast.Body>
		</Toast>
	);
};

export default Notification;

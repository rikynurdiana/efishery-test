import React from "react";
import { FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { onHandleSidebar } from "../redux/slice/globals";

const ToggleSidebar = () => {
	const dispatch = useDispatch();
	const isOpenSidebar = useSelector((state) => state.globals.isOpenSidebar);

	return (
		<div
			className="btn-toggle"
			onClick={() => dispatch(onHandleSidebar(!isOpenSidebar))}
		>
			<FaBars />
		</div>
	);
};

export default ToggleSidebar;

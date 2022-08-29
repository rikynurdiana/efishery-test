import React from "react";
import { FaBars } from "react-icons/fa";

const toggleSidebar = ({ handleToggleSidebar }) => {
	return (
		<div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
			<FaBars />
		</div>
	);
};

export default toggleSidebar;

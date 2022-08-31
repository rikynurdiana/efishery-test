import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useIntl } from "react-intl";
import {
	ProSidebar,
	Menu,
	MenuItem,
	SidebarHeader,
	SidebarFooter,
	SidebarContent,
} from "react-pro-sidebar";
import { FaGithub } from "react-icons/fa";
import { Ikan } from "@onefish/icons-react";

import { onHandleSidebar, onHandleCollapsed } from "../redux/slice/globals";

import sidebarBg from "../assets/bg1.jpg";
import logoEfishery from "../assets/logo-efishery.png";

const Aside = () => {
	const dispatch = useDispatch();
	const intl = useIntl();
	const isCollapsed = useSelector((state) => state.globals.isCollapsed);
	const isOpenSidebar = useSelector((state) => state.globals.isOpenSidebar);
	return (
		<ProSidebar
			image={sidebarBg}
			collapsed={isCollapsed}
			toggled={isOpenSidebar}
			breakPoint="md"
			onToggle={() => dispatch(onHandleSidebar(!isOpenSidebar))}
		>
			<SidebarHeader
				onClick={() => dispatch(onHandleCollapsed(!isCollapsed))}
			>
				<div
					style={{
						padding: "24px",
						textTransform: "uppercase",
						fontWeight: "bold",
						fontSize: 14,
						letterSpacing: "1px",
						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
					}}
				>
					<img src={logoEfishery} alt="images" />
				</div>
			</SidebarHeader>

			<SidebarContent>
				<Menu iconShape="circle">
					<MenuItem icon={<Ikan size={28} />}>
						{" "}
						<Link to="/">Product Price</Link>
					</MenuItem>
				</Menu>
			</SidebarContent>

			<SidebarFooter style={{ textAlign: "center" }}>
				<div
					className="sidebar-btn-wrapper"
					style={{
						padding: "20px 24px",
					}}
				>
					<a
						href="https://github.com/rikynurdiana/efishery-test"
						target="_blank"
						className="sidebar-btn"
						rel="noopener noreferrer"
					>
						<FaGithub />
						<span
							style={{
								whiteSpace: "nowrap",
								textOverflow: "ellipsis",
								overflow: "hidden",
							}}
						>
							{intl.formatMessage({ id: "viewSource" })}
						</span>
					</a>
				</div>
			</SidebarFooter>
		</ProSidebar>
	);
};

export default Aside;

import React from "react";
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
import { Perahu, Ikan } from "@onefish/icons-react";
import sidebarBg from "../assets/bg2.jpg";
import { Link } from "react-router-dom";
import logoEfishery from "../assets/logo-efishery.png";

const Aside = ({ image, collapsed, rtl, toggled, handleToggleSidebar }) => {
	const intl = useIntl();
	return (
		<ProSidebar
			image={image ? sidebarBg : false}
			rtl={rtl}
			collapsed={collapsed}
			toggled={toggled}
			breakPoint="md"
			onToggle={handleToggleSidebar}
		>
			<SidebarHeader>
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
					<MenuItem icon={<Perahu size={28} />}>
						{" "}
						<Link to="/">Dashboard</Link>
					</MenuItem>

					<MenuItem icon={<Ikan size={28} />}>
						{" "}
						<Link to="/product-price">Product Price</Link>
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

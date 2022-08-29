import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { IntlProvider } from "react-intl";

import Aside from "./layouts/Aside";
import Main from "./pages/Main";
import ProductPrice from "./pages/ProductPrice/index";
import ToogleSidebar from "./components/toggleSidebar";

import messages from "./lang/messages";

function App() {
	const [locale] = useState("en");
	const [collapsed, setCollapsed] = useState(false);
	const [image] = useState(true);
	const [toggled, setToggled] = useState(false);

	const handleCollapsedChange = (checked) => {
		setCollapsed(checked);
	};

	const handleToggleSidebar = (value) => {
		setToggled(value);
	};

	return (
		<IntlProvider locale={locale} messages={messages[locale]}>
			<div className="app">
				<Aside
					image={image}
					collapsed={collapsed}
					toggled={toggled}
					handleToggleSidebar={handleToggleSidebar}
				/>
				<ToogleSidebar />
				<Routes>
					<Route
						path="/"
						element={
							<Main
								image={image}
								toggled={toggled}
								collapsed={collapsed}
								handleToggleSidebar={handleToggleSidebar}
								handleCollapsedChange={handleCollapsedChange}
							/>
						}
					/>
					<Route
						path="/product-price"
						element={
							<ProductPrice
								handleToggleSidebar={handleToggleSidebar}
							/>
						}
					/>
				</Routes>
			</div>
		</IntlProvider>
	);
}

export default App;

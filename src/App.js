import React from "react";
import { Route, Routes } from "react-router-dom";
import { IntlProvider } from "react-intl";

import Aside from "./layouts/Aside";
import Main from "./pages/Main";
import ProductPrice from "./pages/ProductPrice/index";
import ToogleSidebar from "./components/ToggleSidebar";
import messages from "./lang/messages";

function App() {
	const locale = "en";

	return (
		<IntlProvider locale={locale} messages={messages[locale]}>
			<div className="app">
				<Aside />
				<ToogleSidebar />
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/product-price" element={<ProductPrice />} />
				</Routes>
			</div>
		</IntlProvider>
	);
}

export default App;

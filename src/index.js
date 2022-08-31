import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";

import App from "./App";
import Notification from "./components/Notification";
import LoadingOverlay from "./components/LoadingOverlay";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

function Index() {
	return (
		<React.StrictMode>
			<Provider store={store}>
				<BrowserRouter>
					<LoadingOverlay />
					<Notification />
					<App />
				</BrowserRouter>
			</Provider>
		</React.StrictMode>
	);
}

root.render(<Index />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

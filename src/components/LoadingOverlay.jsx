import React from "react";
import { useSelector } from "react-redux";
import { DartsSpinnerOverlay } from "react-spinner-overlay";

const LoadingOverlay = () => {
	const isLoading = useSelector((state) => state.productPrice.isLoading);
	return (
		<DartsSpinnerOverlay
			loading={isLoading}
			message="Harap Menunggu..."
			zIndex="9999"
		/>
	);
};

export default LoadingOverlay;

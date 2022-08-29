import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { numberToCurrency, currencyToNumber } from "../helpers/libs";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import FloatingLabel from "react-bootstrap/FloatingLabel";

const CustomDatePicker = React.forwardRef(
	(
		{ onChange, placeholder, value, id, onClick, name, disabled, required },
		ref
	) => {
		return (
			<input
				ref={ref}
				onChange={onChange}
				placeholder={placeholder}
				value={value}
				id={id}
				name={name}
				onClick={onClick}
				disabled={disabled}
				required={required}
				autoComplete="off"
			/>
		);
	}
);

function usePrevious(value) {
	const ref = React.useRef();
	React.useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

// eslint-disable-next-line
export default ({ model, onSubmit, onChange }) => {
	const defaultState = Object.keys(model).reduce((a, b) => {
		const { defaultValue, type } = model[b];
		if (type === "date") {
			a[b] = defaultValue ? defaultValue.toISOString() : "";
		} else if (type === "select") {
			a[b] = defaultValue
				? model[b].options.find(
						(option) => option.value === defaultValue
				  )
				: "";
		} else if (type === "checkbox") {
			a[b] = defaultValue && defaultValue.length ? defaultValue : [];
		} else if (type === "submit") {
			return a;
		} else {
			a[b] = defaultValue || "";
		}
		return a;
	}, {});

	const defaultCurrency = Object.keys(model).reduce((a, b) => {
		const { defaultValue } = model[b];
		if (model[b].type === "currency") {
			a[b] = numberToCurrency(defaultValue) || "";
		}
		return a;
	}, {});

	const defaultOptions = Object.keys(model).reduce((a, b) => {
		if (model[b].type === "select") {
			a[b] = model[b].options;
		}
		return a;
	}, {});

	const formItems = [];
	const onFormSubmit = (e) => {
		e.preventDefault();
		onSubmit(state);
	};

	const [state, setState] = React.useState(defaultState);
	const [currency, setCurrency] = React.useState(defaultCurrency);
	const [options] = React.useState(defaultOptions);

	const prevState = usePrevious(state);

	const onChangeState = (e) => {
		const changedObject = {};
		const { value, name } = e.currentTarget;
		changedObject[name] = value;
		setState({
			...state,
			...changedObject,
		});
	};

	const onChangeCurrency = (e) => {
		const changedObject = {};
		const currencyObject = {};
		const { value, name } = e.currentTarget;
		changedObject[name] = currencyToNumber(value);
		setState({
			...state,
			...changedObject,
		});
		currencyObject[name] = numberToCurrency(value);
		setCurrency({
			...currency,
			...currencyObject,
		});
	};

	const onChangeStateSelect = (event, name) => {
		const changedObject = {};
		const value = event.target.value;

		changedObject[name] = value === null ? "" : value === "-" ? "" : value;
		setState({
			...state,
			...changedObject,
		});
	};

	const onChangeStateDate = (key, value) => {
		const changedObject = {};
		changedObject[key] = value.toISOString();
		setState({
			...state,
			...changedObject,
		});
	};

	Object.keys(model).forEach((key) => {
		if (model[key].type === "date") {
			formItems.push(
				<Col lg="3" style={{ marginBottom: "18px" }} key={key}>
					<FloatingLabel label={model[key].label || ""}>
						<DatePicker
							id={key}
							name={key}
							selected={state[key] ? new Date(state[key]) : ""}
							onChange={(value) => onChangeStateDate(key, value)}
							dateFormat={model[key].format || "dd-MM-yyyy"}
							customInput={<CustomDatePicker />}
							disabled={model[key].disabled}
							placeholderText={model[key].placeholder}
							required={model[key].required}
						/>
					</FloatingLabel>
				</Col>
			);
		} else if (model[key].type === "select") {
			formItems.push(
				<Col lg="3" style={{ marginBottom: "18px" }} key={key}>
					<FloatingLabel label={model[key].label || ""}>
						<Form.Select
							name={key}
							onChange={(e) => onChangeStateSelect(e, key)}
						>
							<option value={null}>-</option>
							{options[key].map((item, key) => (
								<option id={key} key={key} value={item.value}>
									{item.label}
								</option>
							))}
						</Form.Select>
					</FloatingLabel>
				</Col>
			);
		} else if (model[key].type === "currency") {
			formItems.push(
				<Col lg="3" style={{ marginBottom: "18px" }} key={key}>
					<FloatingLabel label={model[key].label || ""}>
						<Form.Control
							id={key}
							name={key}
							type="text"
							placeholder={model[key].placeholder}
							value={currency[key]}
							onChange={onChangeCurrency}
						/>
					</FloatingLabel>
				</Col>
			);
		} else if (model[key].type === "submit") {
			formItems.push(
				<Row
					key={key}
					className="mb-4"
					style={{ marginBottom: "18px" }}
				>
					<Col lg="3">
						<Button
							type={model[key].type}
							variant={model[key].variant}
						>
							{model[key].label}
						</Button>
					</Col>
				</Row>
			);
		} else {
			formItems.push(
				<Col lg="3" style={{ marginBottom: "18px" }} key={key}>
					<FloatingLabel label={model[key].label || ""}>
						<Form.Control
							id={key}
							name={key}
							type="text"
							placeholder={model[key].placeholder}
							value={state[key]}
							onChange={onChangeState}
						/>
					</FloatingLabel>
				</Col>
			);
		}
	});

	React.useEffect(() => {
		if (onChange) {
			const changedObject = [];
			if (prevState && Object.keys(prevState).length > 0) {
				Object.keys(prevState).forEach((key) => {
					if (prevState[key] !== state[key]) {
						changedObject.push(key);
					}
				});
				onChange({
					value: state,
					changed: changedObject,
				});
			}
		}
	}, [state, prevState, onChange]);

	return (
		<>
			<Form onSubmit={onFormSubmit}>
				<Row>{formItems}</Row>
			</Form>
		</>
	);
};

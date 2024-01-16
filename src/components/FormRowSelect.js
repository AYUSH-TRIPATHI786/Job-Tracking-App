const FormRowSelect = ({ label, name, list, value, handleChange }) => {
	return (
		<div className="form-row">
			<label htmlFor={name} className="form-label">
				{label || name}
			</label>
			<select
				className="form-select"
				name={name}
				id={name}
				onChange={handleChange}
				value={value}
			>
				{list.map((item) => (
					<option value={item} key={item}>
						{item}
					</option>
				))}
			</select>
		</div>
	);
};
export default FormRowSelect;

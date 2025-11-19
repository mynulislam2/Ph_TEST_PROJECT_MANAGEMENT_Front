import '../../../styles/components/form.css';

export const Select = ({ label, options = [], ...props }) => (
  <label className="form-group">
    {label && <span className="form-label">{label}</span>}
    <select className="form-input" {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
);


import '../../../styles/components/form.css';

export const Input = ({ label, hint, ...props }) => (
  <label className="form-group">
    {label && <span className="form-label">{label}</span>}
    <input className="form-input" {...props} />
    {hint && <small>{hint}</small>}
  </label>
);


import '../../../styles/components/form.css';

export const FormGroup = ({ label, children }) => (
  <div className="form-group">
    {label && <span className="form-label">{label}</span>}
    {children}
  </div>
);


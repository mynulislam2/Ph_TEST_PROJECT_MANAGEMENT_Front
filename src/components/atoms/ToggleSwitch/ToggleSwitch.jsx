import './ToggleSwitch.css';

export const ToggleSwitch = ({ label, checked, onChange }) => (
  <label className="toggle-switch">
    <input type="checkbox" checked={checked} onChange={onChange} />
    <span className="slider" />
    {label && <span className="toggle-label">{label}</span>}
  </label>
);


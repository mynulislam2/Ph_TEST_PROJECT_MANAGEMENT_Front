import { Link } from 'react-router-dom';
import './AuthTemplate.css';

export const AuthTemplate = ({ title, subtitle, children, footer }) => (
  <div className="auth-template">
    <div className="auth-template__card">
      <h2>{title}</h2>
      <p>{subtitle}</p>
      {children}
      {footer && <p className="auth-template__footer">{footer}</p>}
    </div>
  </div>
);

export const AuthFooterLink = ({ text, to, linkText }) => (
  <span>
    {text} <Link to={to}>{linkText}</Link>
  </span>
);


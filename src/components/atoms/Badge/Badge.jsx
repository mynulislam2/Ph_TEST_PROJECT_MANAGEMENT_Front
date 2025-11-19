import clsx from 'classnames';
import './Badge.css';

const variantClass = {
  Low: 'badge-low',
  Medium: 'badge-medium',
  High: 'badge-high',
};

export const Badge = ({ label, variant = 'Low' }) => (
  <span className={clsx('badge', variantClass[variant] || 'badge-low')}>{label}</span>
);


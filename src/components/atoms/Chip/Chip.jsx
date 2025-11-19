import clsx from 'classnames';
import './Chip.css';

const variantClass = {
  Pending: 'chip-pending',
  'In Progress': 'chip-progress',
  Done: 'chip-done',
};

export const Chip = ({ label }) => <span className={clsx('chip', variantClass[label])}>{label}</span>;


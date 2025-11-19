import clsx from 'classnames';
import '../../../styles/components/button.css';

export const Button = ({ variant = 'primary', children, className, type = 'button', ...props }) => (
  <button type={type} className={clsx('btn', `btn-${variant}`, className)} {...props}>
    {children}
  </button>
);


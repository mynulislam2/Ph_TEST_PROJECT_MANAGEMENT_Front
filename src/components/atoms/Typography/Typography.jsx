import clsx from 'classnames';
import './Typography.css';

export const Typography = ({ variant = 'body', children, className }) => {
  if (variant === 'title') {
    return <h2 className={clsx('typography-title', className)}>{children}</h2>;
  }
  if (variant === 'subtitle') {
    return <p className={clsx('typography-subtitle', className)}>{children}</p>;
  }
  return <p className={clsx('typography-body', className)}>{children}</p>;
};


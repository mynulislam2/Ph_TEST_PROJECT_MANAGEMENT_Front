import './Avatar.css';

export const Avatar = ({ name }) => {
  const initials = name
    ? name
        .split(' ')
        .map((chunk) => chunk[0])
        .join('')
        .toUpperCase()
    : '?';
  return <div className="avatar">{initials}</div>;
};


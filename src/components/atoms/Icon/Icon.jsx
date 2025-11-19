export const Icon = ({ name, size = 18 }) => (
  <span
    style={{
      display: 'inline-flex',
      width: size,
      height: size,
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: size,
    }}
    aria-hidden="true"
  >
    {name}
  </span>
);


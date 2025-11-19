export const required = (value) => (value ? undefined : 'Required');

export const minLength = (value, length) =>
  value && value.length >= length ? undefined : `Minimum ${length} characters`;


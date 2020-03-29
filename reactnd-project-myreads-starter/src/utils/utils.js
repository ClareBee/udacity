export const formatString = originalString => {
  const formatted = originalString.split(/(?<=[a-z])(?=[A-Z])/).join(" ");
  const remainder = formatted.substring(1, formatted.length);
  const capital = formatted.slice(0, 1).toUpperCase();
  return capital + remainder;
};

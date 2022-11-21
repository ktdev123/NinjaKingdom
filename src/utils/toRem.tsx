export const pxToRem = (px: number, baseUnit = 16): string => {
  return `${px / baseUnit}rem`;
};

export const formatPrice = (price: number) => {
  return `Rs. ${price.toLocaleString()}`;
};

export const capitalize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const truncateText = (text: string, length: number) => {
  return text.length > length ? text.slice(0, length) + "..." : text;
};
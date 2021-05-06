export const getTotalAmountFromItems = (items) => {
  return items.reduce((total, data) => {
    total += (+data.price || 0) * (data.quantity || 1);
    return total;
  }, 0);
}

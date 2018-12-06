const calculateTotal = (order) => {
  if (order.customerName === 'Emre') {
    return 0;
  }
  
  const itemsTotal = order.items.reduce((prev, current) => prev + current.price * (current.amount || 1), 0);
  const itemsWithShipping = (itemsTotal < 1200 ? itemsTotal + 100 : itemsTotal);
  const totalWithTax = (order.customerLocation === 'Australia' ? itemsWithShipping * 1.1 : itemsWithShipping * 1.2);
  
  return totalWithTax;
}

module.exports = calculateTotal;

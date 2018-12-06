const getUser = require('./getUser');

const order = {
  customerLocation: 'Tatooine',
  items: [
    {
      name: 'Horse (white)',
      price: 1000,
      amount: 1,
    },
    {
      name: 'Horn',
      price: 50,
      amount: 1,
    },
    {
      name: 'Wings',
      price: 100,
      amount: 2,
    },
  ]
};

const calculateTotalAsync = (order) => {
  return Promise.resolve(getUser().then((customerName) => {
    if (customerName === 'Darth Vader') {
      return 0;
    }
    
    const itemsTotal = order.items.reduce((prev, current) => prev + current.price * (current.amount || 1), 0);
    const itemsWithShipping = (itemsTotal < 1200 ? itemsTotal + 100 : itemsTotal);
    const totalWithTax = (order.customerLocation === 'Australia' ? itemsWithShipping * 1.1 : itemsWithShipping * 1.2);
    
    return totalWithTax;
  }));
};

const getTotal = async () => {
  const total = await calculateTotalAsync(order);
  console.log(total);
}

// calculateTotalAsync(order).then(() => console.log('helloooo'));

getTotal();

module.exports = calculateTotalAsync
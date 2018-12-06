const calculateTotal = require('./calculateTotal');

it('calculates total correctly', () => {
  const order = {
    customerName: 'John',
    customerLocation: 'South Pole',
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

  expect(calculateTotal(order)).toBe(1500);
});

it('calculates total correctly if customerName is not given', () => {
  const order = {
    customerLocation: 'South Pole',
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

  expect(calculateTotal(order)).toBe(1500);
})

it('calculates total correctly if customerLocation is not given', () => {
  const order = {
    customerName: 'John',
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

  expect(calculateTotal(order)).toBe(1500);
})

it('calculates total correctly if customerName is Emre', () => {
  const order = {
    customerName: 'Emre',
    customerLocation: 'South pole',
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

  expect(calculateTotal(order)).toBe(0);
})

it('calculates total correctly if customer is in Australia', () => {
  const order = {
    customerName: 'John',
    customerLocation: 'Australia',
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

  expect(calculateTotal(order)).toBe(1375);
})

it('calculates total correctly if user only buys single item', () => {
  const order = {
    items: [
      {
        name: 'Horse (white)',
        price: 1000,
        amount: 1,
      },
    ]
  };

  expect(calculateTotal(order)).toBe(1320);
})

it('calculates total correctly if amount is omitted', () => {
  const order = {
    items: [
      {
        name: 'Horse (white)',
        price: 1000,
      },
    ]
  };

  expect(calculateTotal(order)).toBe(1320);
});

it('calculates total correctly for different amounts of items', () => {
  const order = {
    items: [
      {
        name: 'Horse (white)',
        price: 1000,
        amount: 3
      },
    ]
  };

  expect(calculateTotal(order)).toBe(3600);
});
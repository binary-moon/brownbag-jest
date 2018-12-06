const calculateTotalAsync = require('./calculateTotalAsync');

jest.mock('./getUser');
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

const getUserMockForEmre = jest.fn(() => new Promise((resolve) => {
  resolve('Emre');
}));

const getUserMockForVader = jest.fn(() => new Promise((resolve) => {
  resolve('Darth Vader');
}));

describe('Test for Emre', () => {
  beforeAll(() => {
    getUser.mockImplementation(getUserMockForEmre);
  });

  it('returns correct total for Emre', (done) => {
    calculateTotalAsync(order).then((total) => {
      expect(total).toBe(1500);
      done();
    })
  });
});

describe('Test for Darth Vader', () => {
  beforeAll(() => {
    getUser.mockImplementation(getUserMockForVader);
  });

  it('returns correct total for Darth Vader', (done) => {
    calculateTotalAsync(order).then((total) => {
      expect(total).toBe(0);
      done();
    })
  });
});
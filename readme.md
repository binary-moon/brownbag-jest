# Brown Bag, Testing with Jest

## What's Unit Testing?
A software development technique where you divide your software into small, isolated units and then you write automated tests to confirm each unit works as expected.

## Why?
As the softwares grow, they tend to be more complex. There will be always more use cases. Writing unit tests keep things manageable and reduces the complexity. Let's start with something simple:

```javascript
const order = [
  {
    name: 'Horse (white)',
    price: 1000,
  },
  {
    name: 'Horn',
    price: 50,
  },
]

const calculateTotal = () => order.reduce((prev, current) => prev.price + current.price);
```
This can go out of hand quite easily. Let's introduce a few rules from potential business logic:
* Users can buy multiple of the items.
* Users need to pay shipping of flat 100 if their total is less then 1200.
* Users need to pay tax 10% of the total amount if they order from Australia, 20% if they order for anywhere else.
* Users receive their unicorn for free if their name is Emre (why not?).
```javascript
const order = {
  customerName: 'Emre',
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

const calculateTotal = () => {
  if (order.customerName === 'Emre') {
    return 0;
  }
  
  const itemsTotal = order.items.reduce((prev, current) => prev + current.price * current.amount, 0);
  const itemsWithShipping = (itemsTotal < 1200 ? itemsTotal + 100 : itemsTotal);
  const totalWithTax = (order.customerLocation === 'Australia' ? itemsWithShipping * 1.1 : itemsWithShipping * 1.2);
  
  return totalWithTax;
}
```
## How?
To simplify the complex logic, there is a method called **Test Driven Development**. In this approach you first write your tests, so they will all fail, and then you will start to write the actual implementation. Eventually all the tests will be green. This will allow you to think about the logic beforehand, divide it by digestible chunks, get prepared for what's to come and identify potential pitfalls before it's too late.

There are three approaches you can take
* Triangulation
* FITYMI (Fake it till you make it)
* Obvious implementation

```javascript
/* Example 1 */
const orderTotal = () => {
  /* Write implementation */
}
if (orderTotal({
  items: [
    { name: 'Horse (white)', price: 1000 },
    { name: 'Horn', price: 50 },
  ]
}) !== 1050) {
  throw new Error('Check fail');
}
```

Note: *Unit tests works as a good communication channel to yourself and to your co-workers.*

## Test runners
A tool that runs unit tests for us, so you don't have to write tests like I did above :) What's wrong with that? What are the benefits of test runners?

* Makes your code dry. Which means it removes the duplication and seperates tests from the logic.
* You get pretty test results.
* Syntax will be predictable for team.
* CI integration.
* Auto runs the tests.

So, this brings us to the topic of today. **JEST**. Yes that's right, Jest is a test runner. But then, why Jest? 

* Established, comes with bundled with create-react-app published by Facebook.
* Ready to use. Inclues both an assertion library and a mocking library.
* Snapshot testing
* Built-in code coverage reports.

## Matchers
Matchers are the statements where you verify your logic works or not. There are lots of matchers that you can use and it's not necessary to memorize all of them. Here are a list of common ones: 
https://jest-bot.github.io/jest/docs/using-matchers.html

### An example:
```javascript
test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
})
```

In this code, `expect(2 + 2)` returns an "expectation" object. You typically won't do much with these expectation objects except call matchers on them. In this code, `.toBe(4)` is the matcher. When Jest runs, it tracks all the failing matchers so that it can print out nice error messages for you.

## Setup
Sometimes, while writing tests, you will need to run some functions or initialising some variables, before or after running the tests. You can use `beforeAll()`, `beforeEach()`, `afterAll()` and `afterEach()` for these purposes.

### Scoping
By default, the before and after blocks apply to every test in a file. You can also group tests together using a describe block. When they are inside a describe block, the before and after blocks only apply to the tests within that describe block.

```javascript
beforeEach(() => {
  return initialisePlanetDatabase();
})

it('consists Tatooine in planet database', () => {
  expect(isPlanet('Tatooine')).toBeTruthy();
})

describe('matching creatures to planets', () => {
  beforeEach(() => {
    return initialiseCreatureDatabase();
  })

  it('Jawas live on Tattooine', () => {
    expect(isCreatureLiveOnPlanet('Jawa', 'Tatooine')).toBeTruthy();
  })
})
```

### Individual tests
By also using `it.only` syntax, you can only run single test. This is very useful for debugging purposes as you don't need to wait for all other tests. You can also skip a test by using `it.skip` syntax. This is useful if you are planning to implement the logic later but write the test description first to remind yourself.

## Mock functions
Mock functions, as the name suggests, are fake functions. Mock functions make it easy to test the links between code by erasing the actual implementation of a function, capturing calls to the function (and the parameters passed in those calls) and allowing test-time configuration of return values.

Perhaps our application needs to make calls to some external payment API. and as seen in previous example, we write lots of tests to check as many possibilities as possible. Obviously we don't want to make hundreds of calls to this payment API just to test how our code works. Mock functions save the day.

More information on: https://jestjs.io/docs/en/mock-functions
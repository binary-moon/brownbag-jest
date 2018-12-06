const fetch = require('node-fetch');

const getUser = () => {
  return fetch('https://swapi.co/api/people/' + getRandomInt(1, 9))
    .then(response => response.json())
    .then(data => data.name)
}

function getRandomInt(minimum, maximum) {
  const min = Math.ceil(minimum);
  const max = Math.floor(maximum);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = getUser;
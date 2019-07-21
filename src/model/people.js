const url = 'https://swapi.co/api/people/';

export function getPeople() {
  return fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function ({results}) {
      return results;
    })
    .catch(alert);
}


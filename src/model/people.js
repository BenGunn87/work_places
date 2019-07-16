export function getPeople() {
  return fetch('https://swapi.co/api/people/')
    .then(function (response) {
      return response.json();
    })
    .then(function ({results}) {
      return results;
    })
    .catch(alert);
}


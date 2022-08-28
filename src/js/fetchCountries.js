export { fetchCountries };

function fetchCountries(searchName) {
  return fetch(`https://restcountries.com/v2/name/${searchName}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => console.log(`${error.name}: ${error.message}`));
}

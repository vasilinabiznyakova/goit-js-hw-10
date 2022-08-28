import './css/styles.css';

import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';

import Notiflix from 'notiflix';

import 'notiflix/dist/notiflix-3.2.5.min.css';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const onInputSearch = e => {
  const nameToSearch = searchBox.value.trim();

  fetchCountries(nameToSearch)
    .then(data => {
      validateCountry(data);
    })
    .catch(error => {
      if (nameToSearch !== '') {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
    });
};

function validateCountry(data) {
  if (data.length > 10) {
    clearData(countryList);
    clearData(countryInfo);

    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (data.length > 1 && data.length <= 10) {
    clearData(countryList);
    clearData(countryInfo);

    return (countryList.innerHTML = data
      .map(
        item => `
                
                    <li class = 'country'>
                        <img src = '${item.flags.svg}' />
                        <p>${item.name}</p>
                    </li>
                
                `
      )
      .join(''));
  } else {
    clearData(countryList);
    clearData(countryInfo);

    return (countryInfo.innerHTML = data
      .map(
        item => `
                
                    <div class = 'country'>
                    
                        <img src = '${item.flags.svg}' />
    
                        <div class = 'country-body'>
                        
                            <h3>${item.name}</h3>
                            <p><b>Region: </b> ${item.region}</p>
                            <p><b>Capital: </b> ${item.capital}</p>
                            <p><b>Population: </b> ${item.population.toLocaleString()}</p>
                            <p><b>Languages: </b> ${item.languages[0].name}</p>
                        </div>
    
                    </div>
                
                `
      )
      .join(''));
  }
}

function clearData(output) {
  output.innerHTML = '';
}
searchBox.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

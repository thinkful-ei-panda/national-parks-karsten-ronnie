'use strict';


const apiKey = 'BHdpifp0DR4BAmeEJIgAEK5DRk8FZISEmDgerUEX'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks?';


function displayResults(responseJson) {
  
  console.log(responseJson);
  $('#results-list').empty();
  
  for (let i = 0; i < responseJson.data.length; i++){
    
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <a href='${responseJson.data[i].url}'>${responseJson.data[i].url}'</a>
      </li>`
    )};
  
  $('#results').removeClass('hidden');
};

const searchTerm = $('#js-search-area').val();

function getNationalParks(searchTerm, maxResults) {
    if(searchTerm.length > 2){
        searchTerm.replace(',','&stateCode=')
    }
//use header
  const url = 'https://developer.nps.gov/api/v1/parks?stateCode='+ searchTerm + '&api_key=' + apiKey + '&limit=' + maxResults;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-area').val();
    const maxResults = $('#js-max-results').val();
    getNationalParks(searchTerm, maxResults);
  });
}

$(watchForm);
// Fetching to OMDbAPI
const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: 'c2523724',
            s: searchTerm
        }
    });
    if (response.data.Error) {
        return [];
    }
    return response.data.Search;

};

const root = document.querySelector('.autocomplete');
root.innerHTML = `
<label><b>Search for a movie</b></label>
<input class="input" />
<div class="dropdown is-active">
      <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
      </div>
    </div>

`;

// Searching in API with input value
const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');
// Fetching input value
const onInput = async event => {
    const movies = await fetchData(event.target.value);
    for (let movie of movies) {
        const div = document.createElement('div');
        div.innerHTML = `
            <img src="${movie.Poster}" />
            <h1>${movie.Title}</h1>
        `;
        document.querySelector('#target').appendChild(div);
    }
};
input.addEventListener('input', debounce(onInput, 500));
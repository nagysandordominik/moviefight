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
// Search result display with image and its title 
const root = document.querySelector('.autocomplete');
root.innerHTML = `
<label><b>Search for a movie</b></label>
<input class="input" />
<div class="dropdown">
      <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
      </div>
    </div>

`;

// Searching in API with input value and showing the results 
const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

// Fetching input value
const onInput = async event => {
    const movies = await fetchData(event.target.value);

    // When there is nothing in input, does not show the dropdown menu 
    if (!movies.length) {
        dropdown.classList.remove('is-active');
        return;
    }
    // Handling broken images about the movies 
    resultsWrapper.innerHTML = '';
    dropdown.classList.add('is-active');
    for (let movie of movies) {
        const option = document.createElement('a');
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;

        // Displaying the movie poster and its title 
        option.classList.add('dropdown-item')
        option.innerHTML = `
            <img src="${imgSrc}" />
            ${movie.Title}
        `;
        option.addEventListener('click', () => {
            dropdown.classList.remove('is-active');
            input.value = movie.Title;
            onMovieSelect(movie);
        });

        resultsWrapper.appendChild(option);
    }
};
input.addEventListener('input', debounce(onInput, 500));

// Whenever clicking somewhere else than the dropdown menu, it disappears
document.addEventListener('click', event => {
    if (!root.contains(event.target)) {
        dropdown.classList.remove('is-active')
    }
});
// Selects the specific movie from the list 
const onMovieSelect = async movie => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: 'c2523724',
            i: movie.imdbID
        }
    });
    document.querySelector('#summary').innerHTML = movieTemplate(response.data);
};
// Creates a movie card from the selected movie 
const movieTemplate = movieDetail => {
    return `
    <article class="media">
        <figure class="media-left">
            <p class="image">
                <img src="${movieDetail.Poster}"/>
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <h1>${movieDetail.Title}</h1>
                <h4>${movieDetail.Genre}</h4>
                <p>${movieDetail.Plot}</p>
            </div>
        </div>
    </article>
    <article class="notification is-primary">
    <p class="title">${movieDetail.Awards}</p>
    <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary">
    <p class="title">${movieDetail.BoxOffice}</p>
    <p class="subtitle">Box Office</p>
    </article>
    <article class="notification is-primary">
    <p class="title">${movieDetail.Metascore}</p>
    <p class="subtitle">Metascore rating</p>
    </article>
    <article class="notification is-primary">
    <p class="title">${movieDetail.imdbRating}</p>
    <p class="subtitle">IMDb rating</p>
    </article>
    <article class="notification is-primary">
    <p class="title">${movieDetail.imdbVotes}</p>
    <p class="subtitle">IMDb votes</p>
    </article>
    `;
};
const createAutoComplete = ({ root }) => {
    // Search result display with image and its title 
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
    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');

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
};
const autocompleteConfig = {
    renderOption(item) {
        const imgSrc = item.Poster === 'N/A' ? '' : item.Poster;
        return `
            <img src="${imgSrc}" />
            ${item.Title} (${item.Year})
        `;
    },

    inputValue(item) {
        return item.Title;
    },

    async fetchData(searchTerm) {
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
    }
};

createAutoComplete({
    ...autocompleteConfig,
    root: document.querySelector('#left-autocomplete'),
    onOptionSelect(item) {
        document.querySelector('.tutorial').classList.add('is-hidden');
        onItemSelect(item, document.querySelector('#left-summary'), 'left');
    }
});

createAutoComplete({
    ...autocompleteConfig,
    root: document.querySelector('#right-autocomplete'),
    onOptionSelect(item) {
        document.querySelector('.tutorial').classList.add('is-hidden');
        onItemSelect(item, document.querySelector('#right-summary'), 'right');
    }
});


let leftItem;
let rightItem;
// Selects the specific item from the list
const onItemSelect = async (item, summaryElement, side) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: 'c2523724',
            i: item.imdbID
        }
    });
    summaryElement.innerHTML = itemTemplate(response.data);
    if (side === 'left') {
        leftItem = response.data;
    } else {
        rightItem = response.data;
    }
    if (leftItem && rightItem) {
        runComparison();

    }
};
// Comparison between movies
const runComparison = () => {
    console.log('Comparison time!')
};

// Creates an item card from the selected item 
const itemTemplate = itemDetail => {
    const dollars = parseInt(itemDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, '')
    );
    const metaScore = parseInt(itemDetail.Metascore);
    const imdbRating = parseFloat(itemDetail.imdbRating);
    const imdbVotes = parseInt(itemDetail.imdbVotes.replace(/,/g, ''));

    const awardWins = itemDetail.Awards.split(' ').reduce((prev, word) => {
        const value = parseInt(word);
        if (isNaN(value)) {
            return prev;
        } else {
            return prev + value;
        }
    }, 0);

    return `
    <article class="media">
        <figure class="media-left">
            <p class="image">
                <img src="${itemDetail.Poster}"/>
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <h1>${itemDetail.Title}</h1>
                <h4>${itemDetail.Genre}</h4>
                <p>${itemDetail.Plot}</p>
            </div>
        </div>
    </article>
    <article data-value=${awardWins} class="notification is-primary">
    <p class="title">${itemDetail.Awards}</p>
    <p class="subtitle">Awards</p>
    </article>
    <article data-value=${dollars} class="notification is-primary">
    <p class="title">${itemDetail.BoxOffice}</p>
    <p class="subtitle">Box Office</p>
    </article>
    <article data-value=${metaScore} class="notification is-primary">
    <p class="title">${itemDetail.Metascore}</p>
    <p class="subtitle">Metascore rating</p>
    </article>
    <article data-value=${imdbRating} class="notification is-primary">
    <p class="title">${itemDetail.imdbRating}</p>
    <p class="subtitle">IMDb rating</p>
    </article>
    <article data-value=${imdbVotes} class="notification is-primary">
    <p class="title">${itemDetail.imdbVotes}</p>
    <p class="subtitle">IMDb votes</p>
    </article>
    `;
};
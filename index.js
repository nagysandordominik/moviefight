// Fetching to OMDbAPI
const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: 'c2523724',
            s: searchTerm
        }
    });
    return response.data.Search;

};

// Searching in API with input value
const input = document.querySelector('input');

// Fetching input value
const onInput = async event => {
    const movies = await fetchData(event.target.value);
    console.log(movies);
};
input.addEventListener('input', debounce(onInput, 500));
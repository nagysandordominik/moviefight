// Fetching to OMDbAPI
const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: 'c2523724',
            s: searchTerm
        }
    });
    console.log(response.data)

};

// Searching in API with input value
const input = document.querySelector('input');

let timeoutId;
const onInput = event => {
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
        fetchData(event.target.value);
    }, 3000)
};

input.addEventListener('input', onInput);
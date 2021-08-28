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

// Timeout with debounce
const debounce = (func, delay = 1000) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};

// Fetching input value
const onInput = event => {
    fetchData(event.target.value);
};
input.addEventListener('input', debounce(onInput, 500));
const fetchData = async () => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: 'c2523724',
            s: 'avengers',
        }
    });
    console.log(response.data)
};

fetchData();
const createAutoComplete = ({
    root, renderOption, onOptionSelect, inputValue, fetchData
}) => {
    // Search result display with image and its title 
    root.innerHTML = `
<label><b>Search</b></label>
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
        const items = await fetchData(event.target.value);

        // When there is nothing in input, does not show the dropdown menu 
        if (!items.length) {
            dropdown.classList.remove('is-active');
            return;
        }
        // Handling broken images about the items 
        resultsWrapper.innerHTML = '';
        dropdown.classList.add('is-active');
        for (let item of items) {
            const option = document.createElement('a');

            // Displaying the item poster and its title 
            option.classList.add('dropdown-item');
            option.innerHTML = renderOption(item);
            option.addEventListener('click', () => {
                dropdown.classList.remove('is-active');
                input.value = inputValue(item);
                onOptionSelect(item);
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
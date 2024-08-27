### English Dictionary 
It's day 7 of the #100daysofMiva coding challenge. Today was a really busy day but I had to write js because why not?🌚 

This documentation provides a detailed overview of the HTML structure, CSS classes, and JavaScript functionalities I used to create an interactive Dictionary search interface. This interface allows users to search for words and retrieve their meanings, examples, synonyms, and pronunciation. Let's Dive into it!

---

#### 📝 HTML Structure

```html
<div style="max-width: 600px" class="wrapper czrhe coe0p ckwv3">
    <!-- Decorative border -->
    <div class="cr8aa clot7 cag0k ccjiw cr2ij cevtx cpue7 cjkk2 csmr0 cym3j crgvw cq4r1 cehp5 cxgoq cr5hf c1qs0 c26dl cxpxq c2z22 cfdqj chqy8 ci2tu c0cnt cvvig cba0k ck5ws c5pov" aria-hidden="true"></div>

    <header>English Dictionary</header>
    <div class="search ckwv3">
        <div class="cwysf cr8aa c9v7h cu4yo cezsk chwso cyi7p cud52 cis7l">
            <i style="display:none" class="cdyx3 fa-solid fa-spinner rotating" aria-hidden="true"></i>
            <i style="display:block" class="cdyx3 fa-solid fa-search" aria-hidden="true"></i>
        </div>
        <input id="edit_short_url" class="short-url coyoz coe0p cyujy cjygq cc7et" type="text" placeholder="Search a word" required spellcheck="false" aria-label="Search for a word">
    </div>
    <p class="info-text">Type any existing word and press enter to get meaning, example, synonyms, etc.</p>
    <ul>
        <li class="word">
            <div class="details">
                <p>__</p>
                <span>_ _</span>
            </div>
            <i class="fas fa-volume-up" aria-label="Play pronunciation"></i>
        </li>
        <div class="content">
            <li class="meaning">
                <div class="details">
                    <p>Meaning</p>
                    <span>___</span>
                </div>
            </li>
            <li class="example">
                <div class="details">
                    <p>Example</p>
                    <span>___</span>
                </div>
            </li>
            <li class="synonyms">
                <div class="details">
                    <p>Synonyms</p>
                    <div class="list"></div>
                </div>
            </li>
        </div>
    </ul>
</div>
```

- **`wrapper`**: The main container that holds the entire dictionary UI, ensuring it doesn't exceed a width of 600px.
- **`search`**: Contains the search input field and icons for user interaction.
- **`info-text`**: Provides feedback or instructions to the user, such as prompts or error messages.
- **`word`**: Displays the searched word along with its phonetic transcription.
- **`meaning`, `example`, `synonyms`**: Sections for showing the word's meaning, example sentence, and a list of synonyms, respectively.
- **`.fa-search`**: A search icon that indicates the user can input a search term.
- **`.fa-spinner`**: A spinner icon that appears during loading to show the user that the search is in progress.
- **`.fa-volume-up`**: A speaker icon allowing users to listen to the pronunciation of the searched word.

---

#### 🎨 CSS Classes and Styles

- **`.wrapper`**: Contains the overall layout with a maximum width, ensuring the content is well-centered and readable.
- **`.search`**: Styles the search bar and its associated icons.
- **`.info-text`**: Handles the styling for instructions and feedback messages.
- **`.word`, `.meaning`, `.example`, `.synonyms`**: Each section has its own styling to differentiate the word, its meaning, examples, and synonyms.
- **`.fa-search`**: Default search icon styling.
- **`.fa-spinner`**: Rotating spinner icon used during searches to indicate loading.

---

#### ⚙️ JavaScript Functionality

The JavaScript code drives the interactivity of the dictionary search UI. It handles the search process, updates the user interface based on search results, and provides feedback in case of errors.

##### Key Variables

- **`wrapper`**: The main UI container, used to control the visibility of elements based on the search state.
- **`searchInput`**: The input field where the user types the word they want to search.
- **`volume`**: The icon used to play the pronunciation of the searched word.
- **`infoText`**: The paragraph element that provides instructions or error messages to the user.
- **`synonyms`**: The container where synonyms for the searched word are displayed.
- **`spinner`, `searchIcon`**: Icons used to indicate whether a search is in progress or idle.

##### Functions

- **`updateUIForSearch()`**: 
  - **Purpose**: Prepares the UI for a search operation by showing the spinner and hiding the search icon.
  - **How It Works**: Removes the "active" class from the `wrapper`, changes the `infoText` color to black, and swaps the search icon for the spinner.
  - **Code**:
    ```javascript
    function updateUIForSearch() {
        wrapper.classList.remove("active");
        infoText.style.color = "#000";
        spinner.style.display = 'inline-block';
        searchIcon.style.display = 'none';
    }
    ```

- **`resetUIAfterSearch()`**: 
  - **Purpose**: Resets the UI to its idle state after a search is completed.
  - **How It Works**: Hides the spinner and displays the search icon.
  - **Code**:
    ```javascript
    function resetUIAfterSearch() {
        spinner.style.display = 'none';
        searchIcon.style.display = 'inline-block';
    }
    ```

- **`displayErrorMessage(word)`**:
  - **Purpose**: Displays an error message if the search fails or the word is not found.
  - **How It Works**: Updates `infoText` to inform the user that the word couldn't be found, and resets the UI.
  - **Code**:
    ```javascript
    function displayErrorMessage(word) {
        infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
        resetUIAfterSearch();
    }
    ```

- **`displaySearchResults(result, word)`**:
  - **Purpose**: Updates the UI with the search results, including the word's meaning, example, and synonyms.
  - **How It Works**: If the word is found, it populates the respective UI elements with the data returned by the API. If synonyms are available, they are listed; otherwise, the synonym section is hidden.
  - **Code**:
    ```javascript
    function displaySearchResults(result, word) {
        resetUIAfterSearch();
        if(result.title){
            displayErrorMessage(word);
            return;
        }
        
        wrapper.classList.add("active");
        let definitions = result[0].meanings[0].definitions[0],
            phontetics = `${result[0].meanings[0].partOfSpeech} /${result[0].phonetics[0].text}/`;

        document.querySelector(".word p").innerText = result[0].word;
        document.querySelector(".word span").innerText = phontetics;
        document.querySelector(".meaning span").innerText = definitions.definition;
        document.querySelector(".example span").innerText = definitions.example;
        audio = new Audio(result[0].phonetics[0].audio);

        if(!definitions.synonyms.length) {
            synonyms.parentElement.style.display = "none";
        } else {
            synonyms.parentElement.style.display = "block";
            synonyms.innerHTML = "";
            definitions.synonyms.slice(0, 5).forEach((synonym, index) => {
                let tag = `<span onclick="search('${synonym}')">${synonym}${index < 4 ? ',' : ''}</span>`;
                synonyms.insertAdjacentHTML("beforeend", tag);
            });
        }
    }
    ```

- **`search(word)`**:
  - **Purpose**: Initiates the search process when the user presses "Enter" after typing a word.
  - **How It Works**: Calls `updateUIForSearch()` to show the loading state, then fetches data from the dictionary API for the word provided.
  - **Code**:
    ```javascript
    function search(word){
        if (!word) return;
        updateUIForSearch();
        fetchApi(word);
    }
    ```

- **`fetchApi(word)`**:
  - **Purpose**: Fetches word data from the dictionary API.
  - **How It Works**: Makes a GET request to the API endpoint with the searched word, and processes the response to display the results.
  - **Code**:
    ```javascript
    function fetchApi(word) {
        let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        fetch(url)
            .then(response => response.json())
            .then(result => displaySearchResults(result, word))
            .catch(() => displayErrorMessage(word));
    }
    ```

##### Event Listeners

- **`searchInput

.addEventListener('keyup', (e) => {...})`**:
  - **Purpose**: Listens for the Enter key press within the search input.
  - **How It Works**: Triggers the search function when the user presses Enter after typing a word.
  - **Code**:
    ```javascript
    searchInput.addEventListener("keyup", e => {
        if (e.key === "Enter") {
            search(e.target.value);
        }
    });
    ```

- **`volume.addEventListener('click', () => {...})`**:
  - **Purpose**: Listens for clicks on the volume icon to play the word's pronunciation.
  - **How It Works**: Plays the pronunciation audio when the volume icon is clicked.
  - **Code**:
    ```javascript
    volume.addEventListener("click", () => {
        if(audio) audio.play();
    });
    ```

---

This documentation provides a comprehensive understanding of the HTML, CSS, and JavaScript components that work together to create a dynamic and user-friendly English Dictionary search interface. Feel free to explore and customize the code further to suit your needs! 🚀

Check it out here 
https://app.marvelly.com.ng/100daysofMiva/day-7/

Source Code
https://github.com/Marvellye/100daysofMiva/blob/main/Projects/Day_7-Simple_Dictionary/index.html

Day 8 of #100daysofMiva coding challenge and I worked on a simple translator model that translates a language to another 😂 
It's JS, it's magic✨🥲


# 🌍 Language Translator Script Documentation

## Overview
This JavaScript code is designed to create a playful, interactive language translator! It utilizes the MyMemory API to translate text between different languages and allows you to swap languages, copy translations, or even have the text spoken aloud. 🌐🔄

---

## Features
- **🌐 Language Selection:** Users can choose from a wide array of languages, ranging from Amharic to Zulu!
- **🔄 Language Swap:** Easily swap between the source and target languages with a click of a button.
- **💬 Text-to-Speech:** Listen to the original or translated text in the selected language.
- **📋 Copy to Clipboard:** Copy the original or translated text with a single click.

---

## Code Breakdown

### Language Data
```javascript
const countries = { /*...*/ } 
```
This object contains the available languages and their respective country codes. For example, `"en-GB": "English"` pairs the language code with its name.

### Dynamic Dropdowns
```javascript
selectTag.forEach((tag, id) => {
    /*...*/
});
```
This code dynamically populates the dropdown menus with all the languages listed in the `countries` object. The first dropdown defaults to English (`"en-GB"`), and the second to Hindi (`"hi-IN"`).

### Language Swap
```javascript
exchageIcon.addEventListener("click", () => {
    /*...*/
});
```
Clicking the swap icon allows users to swap the text and selected languages between the "from" and "to" fields.

### Real-Time Translation
```javascript
translateBtn.addEventListener("click", () => {
    /*...*/
});
```
When the "Translate" button is clicked, the text is sent to the MyMemory API, and the translated text is displayed in the "to-text" field. While waiting for the response, a "Translating..." placeholder is shown.

### Text-to-Speech & Copy
```javascript
icons.forEach(icon => {
    /*...*/
});
```
This section handles the Text-to-Speech and copy functionalities:
- **Speech**: Plays the text aloud in the selected language.
- **Copy**: Copies the text to the clipboard.

---

## How It Works

1. **Select Languages** 🌍: Choose your languages from the dropdowns.
2. **Type or Paste Text** ✍️: Input the text you want to translate.
3. **Translate** 🚀: Click the "Translate" button and watch the magic happen!
4. **Swap, Listen, or Copy** 🔄🎧📋: Swap languages, listen to the translation, or copy the text to your clipboard.

---

## Dependencies
- **MyMemory API**: The translation functionality is powered by the MyMemory API. Ensure you have an active internet connection for it to work.

---

## Potential Enhancements
- **Language Auto-Detection**: Automatically detect the language of the input text.
- **Advanced Error Handling**: Improve the response for translation errors or API failures.
- **Multiple Translations**: Show alternative translations where available.

---

Here’s a step-by-step breakdown of how the code works and what it does:

### Step 1: **Defining Available Languages**
```javascript
const countries = { /*...*/ }
```
- **What it does**: This object contains key-value pairs where the key is a language-country code (like `"en-GB"` for English) and the value is the name of the language (like `"English"`).
- **Purpose**: This data is used to populate the language selection dropdowns so users can choose their source and target languages.

### Step 2: **Selecting DOM Elements**
```javascript
const fromText = document.querySelector(".from-text"),
      toText = document.querySelector(".to-text"),
      exchageIcon = document.querySelector(".exchange"),
      selectTag = document.querySelectorAll("select"),
      icons = document.querySelectorAll(".row i");
      translateBtn = document.querySelector("button"),
```
- **What it does**: This code selects various elements from the HTML document and stores them in variables for easy access later.
  - `fromText` and `toText`: Text areas where users input text and see the translation.
  - `exchageIcon`: The icon used to swap languages and text.
  - `selectTag`: The dropdown menus for selecting languages.
  - `icons`: Icons for copy and speech functions.
  - `translateBtn`: The button that triggers the translation.

### Step 3: **Populating Language Dropdowns**
```javascript
selectTag.forEach((tag, id) => {
    for (let country_code in countries) {
        let selected = id == 0 ? country_code == "en-GB" ? "selected" : "" : country_code == "hi-IN" ? "selected" : "";
        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});
```
- **What it does**: This loop goes through the `countries` object and adds each language as an option in the language selection dropdowns.
  - If the dropdown is the first one (`id == 0`), English (`"en-GB"`) is selected by default.
  - If the dropdown is the second one (`id == 1`), Hindi (`"hi-IN"`) is selected by default.

### Step 4: **Swapping Languages and Text**
```javascript
exchageIcon.addEventListener("click", () => {
    let tempText = fromText.value,
        tempLang = selectTag[0].value;
    fromText.value = toText.value;
    toText.value = tempText;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;
});
```
- **What it does**: When the swap icon is clicked, this function swaps the text between the "from" and "to" text areas as well as the selected languages.
  - `tempText` temporarily holds the original text from the "from-text" field.
  - `tempLang` temporarily holds the original language from the first dropdown.
  - The "from-text" is then replaced with the "to-text", and vice versa. The selected languages are also swapped.

### Step 5: **Clearing Translated Text**
```javascript
fromText.addEventListener("keyup", () => {
    if(!fromText.value) {
        toText.value = "";
    }
});
```
- **What it does**: If the user deletes all the text from the "from-text" field, this function automatically clears the "to-text" field as well.
- **Purpose**: Ensures that if the input text is cleared, the translation is cleared too, preventing confusion.

### Step 6: **Translating Text**
```javascript
translateBtn.addEventListener("click", () => {
    let text = fromText.value.trim(),
        translateFrom = selectTag[0].value,
        translateTo = selectTag[1].value;
    if(!text) return;
    toText.setAttribute("placeholder", "Translating...");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText;
        data.matches.forEach(data => {
            if(data.id === 0) {
                toText.value = data.translation;
            }
        });
        toText.setAttribute("placeholder", "Translation");
    });
});
```
- **What it does**: When the "Translate" button is clicked, this function:
  1. **Extracts the text** from the "from-text" field.
  2. **Identifies the selected languages** from the dropdowns.
  3. **Sends a request** to the MyMemory API with the text and selected languages.
  4. **Receives the translation** from the API and displays it in the "to-text" field.
  5. **Updates the placeholder text** while waiting for the translation to indicate that the process is ongoing.


### Summary
The script allows users to translate text between different languages with a dynamic and interactive interface. Users can select languages, type in their text, translate it with a click, swap languages and text, hear the translation spoken aloud, or copy it to their clipboard.

Enjoy playing with different languages and make your translation journey fun and interactive! 🌐🎉 Unto the next 🥲✌🏻✨

Check it out here 
https://app.marvelly.com.ng/100daysofMiva/day-8/

Documentation 
https://dev.to/marvellye/simple-language-translator-with-api-3bd7

Source code 
https://github.com/Marvellye/100daysofMiva/blob/main/Projects%2FDay_8-Simple_language_translator

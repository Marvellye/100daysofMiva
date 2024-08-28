Day 8 of #100daysofMiva coding challenge and I worked on a simple translator model that translates a language to another 😂
it's JS, it's magic

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

Enjoy playing with different languages and make your translation journey fun and interactive! 🌐🎉
Unto the next 🥲✌🏻✨
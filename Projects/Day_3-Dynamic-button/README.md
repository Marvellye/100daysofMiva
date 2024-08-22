# Day 3

Today I didn't do anything on backend. I need to strengthen my front-end skills. I'll be working on a simple button UX design with JavaScript. Have you ever submitted a form on any website or application and instead of just waiting for the response, you get to see these fancy texts changing on the button you clicked. 

![1000439337.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/a6812de7-300e-4679-a445-a43161be1332/54fd9540-53dc-46a0-a285-f8f255ccf7d7/1000439337.gif)

That's what I'll be coding today. Let's Go!👏🏻🚀

We will be working on the Client Side also known as the Front-end with basic Html and Dynamic JS. 

### HTML

For html, I wrote a basic form with one input and a submit button. 

```html
<div>    
<h2>Button UI</h2>  
  <div id="message"></div>   
  <form id="linkForm" onsubmit="submitForm(event)">     
     <label for="rand_word">Enter Random Word</label>   
          <input type="text" id="rand_word" name="rand_word" placeholder="e.g What is life?" required />    
              <button type="submit" id="submitButton">Submit</button>  
   </form>
</div>
```

This form is a simple HTML structure that allows a user to input a random word and submit it. Here’s a breakdown of each element:

### 1.`<div>`

- **Purpose**: Acts as a container for the form and its related elements.
- **Content**:  - A heading (`<h2>`) labeled "Button UI".
- A message area (`<div id="message">`) where feedback is displayed to the user after form submission.  - The actual form (`<form>`), which contains an input field and a submit button.

### 2. `<h2>Button UI</h2>`

- **Purpose**: Provides a title or heading for the section of the page that contains the form.
- **Text**: "Button UI".

### 3. `<div id="message"></div>`

- **Purpose**: This `div` is used to display messages to the user, such as confirmation of what they typed after they submit the form. Initially, it's empty and may be hidden, but it will be populated with text and shown after form submission.

### 4. `<form id="linkForm" onsubmit="submitForm(event)">`

- **Purpose**: This is the form element that groups together the input field and submit button.

 **Attributes**:  

- `id="linkForm"`: Gives the form a unique identifier so it can be referenced in JavaScript.
- `onsubmit="submitForm(event)"`: Specifies the JavaScript function to be called when the form is submitted. The `submitForm(event)` function is intended to handle the form submission process and prevent the default behavior of reloading the page.

### 5. `<label for="rand_word">Enter Random Word</label>`

- **Purpose**: Provides a label for the input field, which improves accessibility by indicating what the user should input.
- **Attributes**:  - `for="rand_word"`: Associates the label with the input field that has the `id="rand_word"`.
- **Text**: "Enter Random Word".

### 6. `<input type="text" id="rand_word" name="rand_word" placeholder="e.g What is life?" required />`

- **Purpose**: This is the input field where the user types in a random word.

**Attributes**:  

- `type="text"`: Indicates that this is a text input field.
- `id="rand_word"`: Provides a unique identifier for the input, linking it to the label and allowing it to be referenced in JavaScript.
- `name="rand_word"`: This is the name of the form data key that will be sent when the form is submitted.
- `placeholder="e.g What is life?"`: Provides a hint inside the input field before the user types anything, suggesting an example of what they might input.
- `required`: Makes this field mandatory, meaning the form cannot be submitted until the user has entered something.

### 7. `<button type="submit" id="submitButton">Submit</button>`

- **Purpose**: This is the button that the user clicks to submit the form.

**Attributes**:  

- `type="submit"`: Indicates that this button will submit the form data when clicked.
- `id="submitButton"`: Provides a unique identifier for the button, so it can be easily accessed and modified by JavaScript.
- **Text**: "Submit" — this is the text displayed on the button.

### HTML Summary

- **User Interaction**: The user enters a random word in the input field and clicks the "Submit" button. When the form is submitted, the `submitForm(event)`   JavaScript function is called, which handles the submission process (e.g., displaying messages, preventing page reload, possibly sending data to a server).
- **Purpose**:  This form could be used for various purposes, such as collecting user input, interacting with a backend service, or even just demonstrating form handling in a user interface.

## JavaScript

```html
<!-- JavaScript Code -->  
  <script>    
  function submitForm(event) {      
    event.preventDefault(); // Prevent the form from submitting the default way
    const formData = new FormData(document.getElementById('linkForm'));       
    const submitButton = document.getElementById('submitButton');        
    const message = document.getElementById('message');        
    const randWord = formData.get('rand_word'); // Get the value of the rand_word field
    let dotCount = 0;        
    const updateDots = () => {        
        dotCount = (dotCount + 1) % 4;           
        return '.'.repeat(dotCount);       
    };
    const baseMessages = [            
       "Submitting",            
       "Still working on it",            
       "Hold on",            
       "Almost done"        
    ];
    submitButton.innerText = `${baseMessages[0]}${updateDots()}`;        
    submitButton.classList.add('submitting');        
    submitButton.disabled = true;        
    message.style.display = 'none'; // Hide the message box initially
        // Generate a random delay between 1 and 10 seconds        const delay = Math.floor(Math.random() * 9000) + 1000;
        if (delay > 2000) {        
            let messageIndex = 0;                        
            const messageInterval = setInterval(() => {              
              submitButton.innerText = `${baseMessages[messageIndex]}${updateDots()}`;                
              if (dotCount === 0) {                  
                messageIndex = (messageIndex + 1) % baseMessages.length;                
              }            
            }, 500);   // Clear the interval after the delay to stop the loop            
            setTimeout(() => clearInterval(messageInterval), delay - 500);        
            }
        // Simulate a wait time of random delay        
        setTimeout(() => {            message.innerText = 'You typed: ' + randWord; // Show the submitted data in the message box            
        message.style.display = 'block';
            submitButton.innerText = 'Submitted';            
            submitButton.classList.remove('submitting');            
            submitButton.classList.add('submitted');
            // Reset the button state after 2 seconds            
            setTimeout(() => {                submitButton.innerText = 'Submit';                
            submitButton.classList.remove('submitted');                submitButton.disabled = false;            
            }, 4000);
            document.getElementById('linkForm').reset(); // Reset the form fields        
            }, delay); // Wait for the random delay before showing the message    
            }</script>
```

This JavaScript code handles the form submission process, providing an enhanced user experience by simulating a dynamic waiting period with animated dots and changing messages.

Below is the result.

[]()

As a backend Dev, the only issue I had was getting the dots animated. It took a while but I was able to overcome it. I'm looking forward to coding tomorrow 😂👀
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
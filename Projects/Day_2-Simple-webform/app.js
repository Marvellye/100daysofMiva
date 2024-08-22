function submitForm(event) {
     // Prevent the form from submitting the default way
     event.preventDefault(); 

     // Assign the form data to constants
     const formData = new FormData(document.getElementById('linkForm'));
     const submitButton = document.getElementById('submitButton');

     // I like dynamic UX so... this changes the button text
     submitButton.innerText = 'Submitting... Please wait';
     submitButton.classList.add('submitting');
     submitButton.disabled = true;

     // Use fetch to send the form data to the server or backend
     fetch('./addlinks', {
             method: 'POST',
             body: formData
         })
         .then(response => response.json()) // Parse the response as JSON
         .then(data => {
             if (data.message) {
                 document.getElementById('message').innerText = data.message;
                 document.getElementById('message').style.display = 'block';
             }

             loadLinks(); // Refresh the links table
             document.getElementById('linkForm').reset(); // Reset the form fields

             submitButton.innerText = 'Submitted';
             submitButton.classList.remove('submitting');
             submitButton.classList.add('submitted');

             setTimeout(() => {
                 submitButton.innerText = 'Submit';
                 submitButton.classList.remove('submitted');
                 submitButton.disabled = false;
             }, 2000); // Reset the button state after 2 seconds
         })
         .catch(error => {
             console.error('Error:', error);
             document.getElementById('message').innerText = 'Error submitting the form. Please try again.';
             document.getElementById('message').style.display = 'block';

             submitButton.innerText = 'Submit';
             submitButton.classList.remove('submitting');
             submitButton.disabled = false;
         });

 }
 
 // This script fetches the links from the server or backend and populate the table
 function loadLinks() {
    fetch('./links')
         .then(response => response.json())
         .then(data => {
             const tableBody = document.getElementById('linksTableBody');
             tableBody.innerHTML = ''; // Clear any existing rows

             data.forEach(link => {
                 const row = document.createElement('tr');
                 row.innerHTML = `
                        <td><a href="${link.github}" target="_blank">${link.github}</a></td>
                        <td><a href="${link.linkedin}" target="_blank">${link.linkedin}</a></td>
                        <td><a href="${link.devto}" target="_blank">${link.devto}</a></td>
                        <td><a href="${link.portfolio ? link.portfolio : '#'}" target="_blank">${link.portfolio ? link.portfolio : 'N/A'}</a></td>
                    `;
                 tableBody.appendChild(row);
             });
         })
         .catch(error => console.error('Error:', error));
 }

//Lastly, this script loads the table data when the page loads
document.addEventListener('DOMContentLoaded', function() {
     loadLinks(); // Load the links when the page loads
 });
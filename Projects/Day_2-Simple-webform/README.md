# DAY #2

Day 2 #100daysofMiva. 

Initially, I planned my schedule on what I'd be working on for each day but I had to skip today’s schedule. The #100daysofMiva coding challenge has quite a number of participants and we'd love to connect with each other on GitHub, LinkedIn, Devto and on any other blogging platform but there was a problem 🌚 we needed a platform to share our links for easy navigation. Of course, there's a lot of ways to get the job done but it's not bad to walk the “Coding Path” right? 🫠 Let's go 🥲🤞🏻

First things first, I narrowed down to the most important segments: 

1. A form,
2. A database and
3. A table.

For this project, I will be going through the modest way of parsing data and information.🌚 

There's already a blog on how web communication works on this #100daysofMiva coding challenge. https://dev.to/adeleke123/day-1-understanding-apis-the-backbone-of-web-communication-4kn2


From client to server than database also from server back to client. Please read through this blog if you are new to Web communication with API. 

For this Project, I will be working on the 

1. Front-end: which is client with basic html, CSS, JS and a custom tailus UI CSS🌚. I may be a professional backend and API Dev but my front-end still aches😭. 
2. Backend: which is the server that'll communicate with the database in the three major backend languages… PHP, python and Nodejs 🌚. Trust me… backend is easier than front-end🙂‍↕️
3. Database: where I’ll store the information from the form. For this project, **I’ll be working with MySQL because why not?

Let’s Get started.

## PART 1

### **Frontend**

My fronted is based on just basic html and js. You can style it yourself. first, the code for the form in html 

```html
<div id="message"></div>
<form id="linkForm" onsubmit="submitForm(event)">
    <label for="githubLink">GitHub Link</label>
    <input type="url" id="githubLink" name="github" placeholder="Enter your GitHub profile link" required />

    <label for="linkedinLink">LinkedIn Link</label>
    <input type="url" id="linkedinLink" name="linkedin" placeholder="Enter your LinkedIn profile link" required />

    <label for="devtoLink">Dev.to Link</label>
    <input type="url" id="devtoLink" name="devto" placeholder="Enter your Dev.to profile link" required />

    <label for="portfolioLink">Portfolio Link (Optional)</label>
    <input type="url" id="portfolioLink" name="portfolio" placeholder="Enter your personal portfolio link" />

    <button type="submit" id="submitButton">Submit</button>
</form>
```

## Documentation for the Link Submission Form

### Overview

This form allows users to submit their profile links for GitHub, LinkedIn, [Dev.to](http://dev.to/), and an optional personal portfolio. It is handled asynchronously using JavaScript to prevent a full page reload on form submission.

### Elements

### 1. **Message Display (`div#message`)**

```html
<div id="message"></div>
```

- **Purpose**: This element is used to display feedback messages to the user after submitting the form, such as success or error messages.
- **Initial State**: It is hidden by default using `display: none;`. The message becomes visible with appropriate text when the form is submitted successfully or when an error occurs.
- **Usage**: JavaScript dynamically updates the text and visibility of this element based on the form submission status.

### 2. **Form (`form#linkForm`)**

```html
<form id="linkForm" onsubmit="submitForm(event)">
    <!-- Form Inputs Here -->
</form>

```

- **ID**: `linkForm`
- **onsubmit**: The `submitForm(event)` function is called when the form is submitted. This function handles the form submission using `fetch` to prevent a traditional form submission and reload.
- **Purpose**: It gathers the user's input for their various profile links and sends it to the server via an asynchronous POST request.

### 3. **GitHub Link (`input#githubLink`)**

```html
<label for="githubLink">GitHub Link</label>
<input type="url" id="githubLink" name="github" placeholder="Enter your GitHub profile link" required />
```

- **Type**: `url`
- **ID**: `githubLink`
- **Name**: `github`
- **Required**: Yes
- **Placeholder**: "Enter your GitHub profile link"
- **Validation**: This field expects a valid URL, enforced by the `url` input type and `required` attribute. thesame goes for Linkedin, Devto and an optional portfolio

### 4. **Submit Button (`button#submitButton`)**

```html
<button type="submit" id="submitButton">Submit</button>
```

- **Type**: `submit`
- **ID**: `submitButton`
- **Text**: "Submit"
- **Function**: This button triggers the form submission. It is disabled and its text changes to "Submitting..." while the form is being processed. Upon successful submission, the button shows "Submitted" and reverts back to "Submit" after a short delay.

### JavaScript Behavior

The form is handled by the JavaScript function `submitForm(event)` that does the following:

- Prevents the default form submission.
- Uses `fetch` to send the form data to the server asynchronously.
- Shows the submission status in the `#message` element.
- Updates the form button (`#submitButton`) to indicate progress.
- On success, the submitted data is processed, and the form is reset.

Below is the said Javascript 

```jsx
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
```

That’s all for the client-side or front-end 🌚 

### Backend

1. PHP 

First, you set your connection to your database (I’m using MySQL) then a query to `SELECT` all data from Links and parse them into a JSON array. It’s easy.

```php
<?php
// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "links";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set the content type to JSON
header('Content-Type: application/json');

// Fetch all links
$sql = "SELECT github, linkedin, devto, portfolio FROM links";
$result = $conn->query($sql);

$links = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $links[] = $row;
    }
}

// Return JSON encoded array of links
echo json_encode($links);

$conn->close();
?>
```

1. Nodejs

To get the links from the database using Node.js script using Express and MySQL, you'll need to set up a MySQL connection in Node.js, query the database, and return the results as JSON.

### Prerequisites

1. Make sure you have Node.js installed.
2. Install the required Node.js packages using the following command:

```bash
npm install express mysql
```

### Node.js Code (`app.js`)

```jsx
const express = require('express');
const mysql = require('mysql');

const app = express();

// Database connection parameters
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'links'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to the database.');
});

// Set up /getlinks route
app.get('/getlinks', (req, res) => {
    const sql = 'SELECT github, linkedin, devto, portfolio FROM links';

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on <http://localhost>:${PORT}`);
});

```

### Explanation:

1. **MySQL Connection:**
    - We use the `mysql` package to connect to the MySQL database with the same credentials you used in your PHP code.
2. **Route `/getlinks`:**
    - The `/getlinks` route handles the request and sends a query to the database to select the `github`, `linkedin`, `devto`, and `portfolio` fields from the `links` table.
    - If the query is successful, the results are sent back as a JSON response.
    - If an error occurs, it returns a 500 status with the error message.
3. **Starting the Server:**
    - The server listens on port 3000, and you can access the route by visiting `http://localhost:3000/getlinks`.

### Running the Code:

1. Save the code above to `app.js`.
2. Run the script using:

```bash
node app.js
```

1. Visit `http://localhost:3000/getlinks` in your browser, and you should see the JSON output of the links from your MySQL database.

1. Python 

You can achieve the same functionality using Python with the `Flask` web framework and `mysql-connector-python` library for MySQL database connectivity. Here's how to write your PHP script in Python:

### Prerequisites

1. Make sure you have Python installed.
2. Install the required packages using the following command:

```bash
pip install flask mysql-connector-python
```

### Python Code (`app.py`)

```python
from flask import Flask, jsonify
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)

# Database connection parameters
db_config = {
    'host': 'localhost',
    'user': 'marvell1_info',
    'password': 'H9y2P8ez5yBM@Ef',
    'database': 'marvell1_miva'
}

def get_db_connection():
    try:
        connection = mysql.connector.connect(**db_config)
        if connection.is_connected():
            print('Connected to the database.')
            return connection
    except Error as e:
        print(f"Error while connecting to MySQL: {e}")
        return None

@app.route('/getlinks', methods=['GET'])
def get_links():
    connection = get_db_connection()
    if connection is None:
        return jsonify({'error': 'Failed to connect to database'}), 500

    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT github, linkedin, devto, portfolio FROM links")

    links = cursor.fetchall()
    cursor.close()
    connection.close()

    return jsonify(links)

if __name__ == '__main__':
    app.run(port=3000)
```

1. **MySQL Connection:**
    - The `mysql.connector.connect` function is used to connect to the MySQL database using the provided credentials.
2. **Route `/getlinks`:**
    - The `/getlinks` route executes the SQL query to fetch the `github`, `linkedin`, `devto`, and `portfolio` fields from the `links` table.
    - The results are fetched as a list of dictionaries and returned as a JSON response using Flask's `jsonify` function.
3. **Starting the Server:**
    - The Flask app is configured to run on port 3000. When you run the script, you can access the route by visiting `http://localhost:3000/getlinks`.

### Running the Code:

1. Save the code above to `app.py`.
2. Run the script using:

```bash
python app.py
```

1. Open your browser and visit `http://localhost:3000/getlinks` to see the JSON output of the links from your MySQL database.

This Python version does the same job as the original PHP script but leverages Python's Flask and MySQL connector libraries.

Bonus tip: 

when deploying on a server, 

`passenger_wsgi.py`

```python
import sys
import os

# Add the current directory to the sys.path
sys.path.insert(0, os.path.dirname(__file__))

# Import the Flask app (assuming app.py contains your Flask app)
from app import app as application
```

This marks the first phase of getting the links. I will keep you updated on part 2 for posting or saving the form data on the database. Let’s Go!
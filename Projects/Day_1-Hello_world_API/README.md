# Hello World API

This project contains simple "Hello World" APIs written in PHP, Node.js, and Python. Each API returns a JSON response with a message when accessed via an HTTP GET request.

## Table of Contents
- [Project Structure](#project-structure)
- [PHP](#php)
  - [Installation and Usage](#installation-and-usage)
- [Node.js](#nodejs)
  - [Installation and Usage](#installation-and-usage-1)
- [Python (Flask)](#python-flask)
  - [Installation and Usage](#installation-and-usage-2)

## Project Structure

```
/HelloWorldAPI
|- php
|  |- index.php
|- nodejs
|  |- app.js
|  |- package.json
|- python
   |- app.py
```

## PHP

### hello.php
This is a simple PHP script that returns a JSON response with a "Hello, World!" message.

#### Installation and Usage
1. **Prerequisites**: PHP installed on your system.
2. Place `index.php` on your server or run it locally using:
   ```bash
   php -S localhost:8000
   ```
3. Access the API by visiting `http://localhost:8000/index.php` in your browser.

### Example Response
```json
{
  "message": "Hello, World!"
}
```

## Node.js

### app.js
This Node.js script uses Express to create a simple server that responds with a JSON "Hello, World!" message.

### package.json
This file contains the project metadata and dependencies required to run the Node.js application.

#### Installation and Usage
1. **Prerequisites**: Node.js and npm installed on your system.
2. Navigate to the `nodejs` directory.
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. For development mode (with auto-reloading):
   ```bash
   npm run dev
   ```
6. Access the API by visiting `http://localhost:3000/hello` in your browser.

### Example Response
```json
{
  "message": "Hello, World!"
}
```

## Python (Flask)

### app.py
This Python script uses Flask to create a simple web server that returns a JSON "Hello, World!" message.

#### Installation and Usage
1. **Prerequisites**: Python and pip installed on your system.
2. Navigate to the `python` directory.
3. Install Flask:
   ```bash
   pip install Flask
   ```
4. Run the server:
   ```bash
   python app.py
   ```
5. Access the API by visiting `http://localhost:5000/hello` in your browser.

### Example Response
```json
{
  "message": "Hello, World!"
}
```

## License
This project is licensed under the General public License. Feel free to use and modify the code.

---

I'm sorry if this `README.md` does not look engaging 😂😭💔 I'm not very good at documentation. but let's see... I'll improve as the days goes by

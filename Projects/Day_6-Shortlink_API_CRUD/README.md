Here's a simple API documentation for the endpoints described in your Node.js application:

---

## API Documentation

### Base URL
`https://yourdomain.com`

### Endpoints

#### 1. **Create Shortlink**
- **URL:** `/shortlink`
- **Method:** `GET`
- **Description:** Creates a new shortlink and generates a QR code.
- **Query Parameters:**
  - `url` (required): The URL to shorten.
  - `title` (optional): The title for the shortlink.
- **Success Response:**
  - **Code:** `200 OK`
  - **Content:**
    ```json
    {
      "id": 1,
      "clicks": 0,
      "unique_id": 123456,
      "main_id": "abc123",
      "title": "My Title",
      "original_title": "Original Page Title",
      "short_url": "https://sl.free.nf/abc123",
      "long_url": "https://example.com",
      "qr_code": "https://yourdomain.com/public/123456.png",
      "timestamp": "2024-08-26T12:34:56Z"
    }
    ```
- **Error Response:**
  - **Code:** `400 Bad Request`
  - **Content:**
    ```json
    {
      "error": "Please pass a URL and title or a main_id"
    }
    ```

#### 2. **Track Clicks**
- **URL:** `/shortlink`
- **Method:** `GET`
- **Description:** Tracks the clicks for a shortlink based on `main_id`.
- **Query Parameters:**
  - `main_id` (required): The `main_id` of the shortlink to track.
  - `clicks` (required): Should be set to `1` to increment the click count.
- **Success Response:**
  - **Code:** `200 OK`
  - **Content:**
    ```json
    {
      "id": 1,
      "clicks": 1,
      "unique_id": 123456,
      "main_id": "abc123",
      "title": "My Title",
      "original_title": "Original Page Title",
      "short_url": "https://sl.free.nf/abc123",
      "long_url": "https://example.com",
      "qr_code": "https://yourdomain.com/public/123456.png",
      "timestamp": "2024-08-26T12:34:56Z"
    }
    ```
- **Error Response:**
  - **Code:** `404 Not Found`
  - **Content:**
    ```json
    {
      "error": "Shortlink not found"
    }
    ```

#### 3. **Edit Shortlink**
- **URL:** `/shortlink`
- **Method:** `GET`
- **Description:** Edits an existing shortlink and updates its QR code.
- **Query Parameters:**
  - `unique_id` (required): The unique ID of the shortlink to edit.
  - `edit_title` (optional): New title for the shortlink.
  - `edit_long_url` (optional): New long URL for the shortlink.
  - `edit_main_id` (optional): New main ID for the shortlink.
- **Success Response:**
  - **Code:** `200 OK`
  - **Content:**
    ```json
    {
      "id": 1,
      "clicks": 0,
      "unique_id": 123456,
      "main_id": "newMainId",
      "title": "New Title",
      "original_title": "Original Page Title",
      "short_url": "https://sl.free.nf/newMainId",
      "long_url": "https://new-url.com",
      "qr_code": "https://yourdomain.com/public/123456.png",
      "timestamp": "2024-08-26T12:34:56Z",
      "edited_at": "2024-08-26T12:34:56Z"
    }
    ```
- **Error Response:**
  - **Code:** `404 Not Found`
  - **Content:**
    ```json
    {
      "error": "Shortlink not found"
    }
    ```

#### 4. **Delete Shortlink**
- **URL:** `/shortlink`
- **Method:** `GET`
- **Description:** Deletes a shortlink and its associated QR code.
- **Query Parameters:**
  - `unique_id` (required): The unique ID of the shortlink to delete.
  - `delete` (required): Should be set to `1` to delete the shortlink.
- **Success Response:**
  - **Code:** `200 OK`
  - **Content:**
    ```json
    {
      "message": "Shortlink deleted successfully"
    }
    ```
- **Error Response:**
  - **Code:** `404 Not Found`
  - **Content:**
    ```json
    {
      "error": "Shortlink not found"
    }
    ```

#### 5. **Reset Clicks**
- **URL:** `/shortlink`
- **Method:** `GET`
- **Description:** Resets the click count for a shortlink.
- **Query Parameters:**
  - `unique_id` (required): The unique ID of the shortlink.
  - `delete` (required): Should be set to `2` to reset the click count.
- **Success Response:**
  - **Code:** `200 OK`
  - **Content:**
    ```json
    {
      "message": "Clicks reset successfully"
    }
    ```
- **Error Response:**
  - **Code:** `404 Not Found`
  - **Content:**
    ```json
    {
      "error": "Shortlink not found"
    }
    ```

---

Feel free to customize the documentation based on your specific requirements and any additional details you want to include.
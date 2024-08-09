# Notes API
### Description
This is a RESTful API for a note-taking application. The API allows users to perform CRUD (Create, Read, Update, Delete) operations on their notes and is secured using Google OAuth for authentication.

### Installation
Install Dependencies
```
npm install
```

### Setup Environment Variables
Create a .env file in the root directory and add the following environment variables:
```
MONGO_URI=mongodb://127.0.0.1:27017/notes-app
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
BASE_URL=http://localhost:3000
JWT_SECRET_KEY=<your-jwt-secret-key>
```
Then Replace the existing values

### Run the Application
```
npm run start
```

### API Endpoints
##### Authentication
Initiate Google OAuth
Endpoint: GET ```/auth/google```
Description: Starts the Google OAuth authentication process. Redirects the user to Google for login.

##### Google OAuth Callback
Endpoint: GET ```/auth/google/callback```
Description: Handles the Google OAuth callback. After successful login, it validates the user and returns the user information.

### Notes
##### Create a New Note
Endpoint: POST ```/api/notes```
Description: Creates a new note for the authenticated user.
Request Body:
```
json
{
  "title": "Note Title",
  "content": "Note Content"
}
```
Authorization: Requires Google OAuth token.

##### Retrieve All Notes
Endpoint: GET ```/api/notes```
Description: Retrieves a list of notes for the authenticated user with optional pagination.
Query Parameters:
page (optional): Page number for pagination (default is 1).
limit (optional): Number of notes per page (default is 10).
Authorization: Requires Google OAuth token.

##### Retrieve a Specific Note
Endpoint: GET ```/api/notes/:noteId```
Description: Retrieves details of a specific note.
Parameters:
noteId: The ID of the note to retrieve.
Authorization: Requires Google OAuth token.

##### Update a Note
Endpoint: PUT ```/api/notes/:noteId```
Description: Updates an existing note.
Parameters:
noteId: The ID of the note to update.
Request Body:
```
json
{
  "title": "Updated Note Title",
  "content": "Updated Note Content"
}
```
Authorization: Requires Google OAuth token.

##### Delete a Note
Endpoint: DELETE ```/api/notes/:noteId```
Description: Deletes a note.
Parameters:
noteId: The ID of the note to delete.
Authorization: Requires Google OAuth token.Q

##### Error Handling
```
404 Not Found: Resource not found (e.g., note not found).
401 Unauthorized: Authentication failed or invalid token.
403 Forbidden: User not authorized to perform the action.
```

##### Testing
Tests are provided for the API endpoints using Jest and Supertest. To run the tests, use:
```npm test```

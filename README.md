# MERN Assignment Project

This project is a full-stack web application built using the MERN (MongoDB, Express, React, Node.js) stack. It is a simple user management system that allows users to view, add, update, and delete user information. The project implements user authentication using JSON Web Tokens (JWT) & Passport JS for securing API endpoints.

Live Preview Link : https://mern-assignment-client.onrender.com/

## Features
- View all users in a table with pagination support.
- Search users by name or username.
- Sort users by name or username in ascending or descending order.
- Add new users with name, email (used as username), and password.
- Update existing user information.
- Delete users from the database.
- User authentication using JWT & Passport JS for secure API access.

## Technologies Used
- Frontend: React (Create React App), React Router, Axios, Bootstrap, Font Awesome.
- Backend: Node.js, Express.js, MongoDB (Mongoose), Passport.js, JSON Web Tokens (JWT), bcrypt.
- Database: MongoDB (NoSQL database for storing user information).
- Styling: Bootstrap for basic styling, custom CSS for specific styles.

## Prerequisites
Before running this project, make sure you have the following software installed on your system:

- Node.js (https://nodejs.org) - for running the backend server and frontend development.
- MongoDB (https://www.mongodb.com) - for the database storage.

## Getting Started
1. Clone the repository to your local machine:
   ```
    mkdir MERN-Assignment
    cd MERN-Assignment
    git clone https://github.com/PankajBaliyan/MERN-Assignment-Client.git
    git clone https://github.com/PankajBaliyan/MERN-Assignment-Server.git
    cd ..
   ```

2. Install the required dependencies for the Server and Client:
    ```
    cd MERN-Assignment-Client
    npm install
    cd ..
    cd MERN-Assignment-Server
    npm install
    ```

3. Set up environment variables:

    Create a .env file in the MERN-Assignment-Server & MERN-Assignment-Client directory and add the following variables:

    ```
    # MERN-Assignment-Client
    REACT_APP_SERVER_URL = https://mern-assignment-5qen.onrender.com


    # MERN-Assignment-Server
    PORT = 3001
    URI=<your-mongodb-uri>
    SESSION_SECRET_KEY=<your-secret-key>
    ```
    Replace <your-mongodb-uri> with your MongoDB connection string and <your-secret-key> with a secret key for JWT authentication.

4. Run the application:

    Open two terminal windows (one for the Server and the other for the Client) and run the following commands:

    ```
    # In the MERN-Assignment-Server terminal window
    cd MERN-Assignment-Server
    node ./index.js

    # In the MERN-Assignment-Client terminal window
    cd MERN-Assignment-Client
    npm start
    ```

    The backend server will start on http://localhost:3001, and the frontend development server will start on http://localhost:3000. The application should automatically open in your web browser.

5. Access the application:

    Open your web browser and navigate to http://localhost:3000 to access the application.

## Usage
Home Page:

- The home page displays a button "Add user!" that triggers a custom notification when a new user created.
- The "Add User" form allows you to create new users by entering their name, email (used as username), and password.
- Clicking the "Add User" button will add the user to the database.

All Users List:

- The "Refresh Table Data" button fetches all users from the backend and updates the user table.
- The search bar allows you to search for users by name or username.
- Clicking on the column headers "Name" and "Username" will sort the users in ascending or descending order.
- The table displays users with their names, usernames, and two action buttons: "Update" and "Delete".
- Clicking the "Update" button opens a modal that allows you to update the user's name, email, and password.
- Clicking the "Delete" button will remove the user from the database.
## License
This project is licensed under the MIT License. Feel free to use and modify the code as per your requirements.

## Contact
If you have any questions or need further assistance, feel free to contact me at pankajbaliyan90@gmail.com . Happy coding!





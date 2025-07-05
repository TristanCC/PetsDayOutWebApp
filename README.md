
<div align="center">

# Pets Day Out Customer Management System

[![License](https://img.shields.io/badge/License-Placeholder-blue.svg)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/TristanCC/PetsDayOutWebApp?style=social)](https://github.com/TristanCC/PetsDayOutWebApp)
[![Forks](https://img.shields.io/github/forks/TristanCC/PetsDayOutWebApp?style=social)](https://github.com/TristanCC/PetsDayOutWebApp)

</div>

This web application, is designed to manage customer and pet information for a pet grooming or daycare business. It provides features such as customer and pet management, and tracking pet attendance. The frontend is built using React and Vite, while the backend uses Node.js, Express, and PostgreSQL.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Customer Management:** Add, view, edit, and search customer information.
- **Pet Management:**  Add, view, edit, and link pets to customers, including the ability to manage shared pet pools among households.
- **Appointment Tracking:** Mark customers and their pets as present for appointments and track their records.
- **User Authentication:** Secure user login with local and Google OAuth strategies.
- **Image Uploads:** Upload pet photos using AWS S3.
- **Household Management:** Group customers into households to share pet information.
- **Responsive UI:**  Built with Chakra UI and React Aria Components for a modern and accessible user experience.
- **Color Mode:** The frontend features both light and dark mode settings with customizable color palettes.
## Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/TristanCC/PetsDayOutWebApp.git
    cd PetsDayOutWebApp
    ```

2.  Install backend dependencies:

    ```bash
    cd backend
    npm install
    ```

3.  Configure the backend environment variables:

    Create a `.env` file in the `backend` directory with the following variables:

    ```
    PORT=5000
    DATABASE_URL=<Your PostgreSQL Database URL>
    SESSION_SECRET=<Your Session Secret>
    GOOGLE_CLIENT_ID=<Your Google Client ID>
    GOOGLE_CLIENT_SECRET=<Your Google Client Secret>
    GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback
    FRONTEND_URL=http://localhost:5173
    AWS_ACCESS_KEY_ID=<Your AWS Access Key ID>
    AWS_SECRET_ACCESS_KEY=<Your AWS Secret Access Key>
    ```
4.  Install frontend dependencies:

    ```bash
    cd ../frontend
    npm install
    ```
5.  Configure the frontend environment variables:

    Create a `.env` file in the `frontend` directory with the following variables:

    ```
    VITE_BACKEND_URL=http://localhost:5000
    ```

## Running the Project

1.  Start the backend server:

    ```bash
    cd backend
    npm run dev
    ```

2.  Start the frontend development server:

    ```bash
    cd ../frontend
    npm run dev
    ```

    The frontend application will be accessible at `http://localhost:5173`.

## Dependencies

**Backend:**

-   `@aws-sdk/client-s3`:  For interacting with AWS S3 for image uploads.
-   `@aws-sdk/s3-request-presigner`: Used to generate pre-signed URLs for S3.
-   `bcryptjs`: For password hashing.
-   `cors`:  Middleware for enabling Cross-Origin Resource Sharing.
-   `dotenv`: For loading environment variables from a `.env` file.
-   `express`: Web framework for Node.js.
-   `express-session`: Middleware for handling sessions.
-   `node-fetch`:  For making HTTP requests from Node.js.
-   `passport`: Authentication middleware for Node.js.
-   `passport-google-oauth20`: Strategy for Google OAuth 2.0 authentication.
-   `passport-local`: Strategy for local username/password authentication.
-   `pg`: PostgreSQL client for Node.js.
-   `pg-hstore`:  For serializing and deserializing JSON data in PostgreSQL.
-   `sequelize`:  ORM for interacting with the database.
    
**Frontend:**

-   `@auth0/auth0-react`: Authentication with Auth0
-   `@chakra-ui/react`: UI component library.
-   `@emotion/react`: CSS-in-JS library used by Chakra UI.
-   `axios`:  HTTP client for making API requests.
-   `framer-motion`: Animation library for React.
-   `react`: JavaScript library for building user interfaces.
-   `react-aria-components`: Library of unstyled components for accessible interfaces.
-   `react-dom`: Provides DOM-specific methods for React.
-   `react-icons`: Include popular icons in your React projects easily with `Lucide React`
-   `react-router-dom`: DOM bindings for React Router.
-   `vite`: Build tool and development server.

## License

This project is licensed under the [MIT](LICENSE).


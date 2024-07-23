# Jobs API Documentation

The Jobs API is designed to provide a robust and flexible platform for managing job-related data and user information. This API serves as the backend for job management applications, facilitating the creation, retrieval, updating, and deletion of job details, as well as user management. The endpoints are organized to handle various operations seamlessly, making it easy to integrate with front-end applications and third-party services.

## Resources Overview

### Jobs

The Jobs resource provides endpoints to manage job data. This includes operations to create new jobs, retrieve existing jobs, update job details, and delete jobs. Additionally, it offers endpoints to fetch jobs within a specific radius or distance.

### Users

The Users resource encompasses endpoints for managing user data. This includes fetching user details, updating user information, and deleting user accounts. The API supports operations for both regular users and administrators, ensuring secure and efficient user management.

### Authentications

The Authentications resource provides endpoints for user authentication processes, including signing up, logging in, and password management. These endpoints ensure secure access to the job application and allow users to manage their credentials effectively.

## Detailed Endpoint Descriptions

### Jobs Endpoints

1. **Get All Jobs**

    - **Endpoint:** GET /jobs
    - **Description:** Retrieves a comprehensive list of all available jobs. Useful for displaying all job options to users.
    - **Request Parameters:** None
    - **Response:**
        - **Status:** 200 OK
        - **Body:** An array of job objects containing details like title, description, location, and salary.

2. **Get Job By ID**

    - **Endpoint:** GET /jobs/:id
    - **Description:** Fetches details of a specific job by its unique identifier. Essential for viewing detailed information about a particular job.
    - **Request Parameters:**
        - **Path:** id (String, required)
    - **Response:**
        - **Status:** 200 OK
        - **Body:** A single job object with detailed information.

3. **Create New Job**

    - **Endpoint:** POST /jobs
    - **Description:** Creates a new job with specified details. Enables adding new jobs to the system.
    - **Request Parameters:**
        - **Body:** JSON object with new job details.
    - **Response:**
        - **Status:** 201 Created
        - **Body:** The newly created job object.

4. **Update Job**

    - **Endpoint:** PATCH /jobs/:id
    - **Description:** Updates details of an existing job identified by its ID. Allows modification of job attributes like title, description, and location.
    - **Request Parameters:**
        - **Path:** id (String, required)
        - **Body:** JSON object with job attributes to update.
    - **Response:**
        - **Status:** 200 OK
        - **Body:** The updated job object.

5. **Delete Job**

    - **Endpoint:** DELETE /jobs/:id
    - **Description:** Deletes a job identified by its ID. Permanently removes the job from the system.
    - **Request Parameters:**
        - **Path:** id (String, required)
    - **Response:**
        - **Status:** 204 No Content

### Users Endpoints

1. **Get All Users**

    - **Endpoint:** GET /users
    - **Description:** Retrieves a list of all registered users. Useful for administrative purposes.
    - **Request Parameters:** None
    - **Response:**
        - **Status:** 200 OK
        - **Body:** An array of user objects with user details.

2. **Get User By ID**

    - **Endpoint:** GET /users/:id
    - **Description:** Fetches details of a specific user by their unique ID. Essential for viewing individual user information.
    - **Request Parameters:**
        - **Path:** id (String, required)
    - **Response:**
        - **Status:** 200 OK
        - **Body:** A single user object with detailed information.

3. **Update User**

    - **Endpoint:** PATCH /users/:id
    - **Description:** Updates details of a specific user by their ID. Allows modification of user attributes like name and email.
    - **Request Parameters:**
        - **Path:** id (String, required)
        - **Body:** JSON object with user attributes to update.
    - **Response:**
        - **Status:** 200 OK
        - **Body:** The updated user object.

4. **Delete User**

    - **Endpoint:** DELETE /users/:id
    - **Description:** Deletes a user identified by their ID. Permanently removes the user from the system.
    - **Request Parameters:**
        - **Path:** id (String, required)
    - **Response:**
        - **Status:** 204 No Content

### Authentications Endpoints

1. **Signup**

    - **Endpoint:** POST /user/signup
    - **Description:** Registers a new user by creating an account with provided credentials. Necessary for accessing protected routes and features of the application.
    - **Request Parameters:**
        - **Body:** JSON object with user credentials.
    - **Response:**
        - **Status:** 201 Created
        - **Body:** The newly created user object.

2. **Login**

    - **Endpoint:** POST /user/login
    - **Description:** Authenticates an existing user using their credentials. Upon successful login, returns a token for accessing protected routes.
    - **Request Parameters:**
        - **Body:** JSON object with user credentials.
    - **Response:**
        - **Status:** 200 OK
        - **Body:** An object containing the authentication token.

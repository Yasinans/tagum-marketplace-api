# Tagum Marketplace API

The **Tagum Marketplace API** is the backend service for the **Tagum Marketplace POS + IMS** application. It provides the necessary endpoints for managing sales, inventory, and other related operations. The API is built using **Node.js** and **Express**, and it connects to a **MySQL** database for data storage.

---

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Database](#database)
- [Development](#development)
- [License](#license)

---

## Installation

To set up the API locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Yasinans/tagum-marketplace-api.git
   cd tagum-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database (see [Database](#database) section).

4. Start the server:
   ```bash
   node server.js
   ```

   Alternatively, if you have built the application into an executable using `pkg`, run:
   ```bash
   ./tagum-api.exe
   ```

---

## Configuration

The API uses a `config.json` file for configuration. By default, the configuration is set internally, but you can override it by placing a `config.json` file in the same directory as the executable. The structure of the `config.json` file is as follows:

```json
{
  "port": 3000,
  "database": {
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "db_name"
  },
  "jwt": {
    "secret": "secret"
  }
}
```

### Key Configuration Fields
- **port**: The port on which the API will run.
- **database**: Contains the MySQL database connection credentials.
  - `host`: Database host (e.g., `localhost`).
  - `user`: Database username.
  - `password`: Database password.
  - `database`: Database name.
- **jwt**: Contains settings for JSON Web Token (JWT) authentication.
  - `secret`: Secret key for signing JWTs.

---

## Usage

### Running the API
- To run the API in development mode:
  ```bash
  node server.js
  ```

- To build the API into an executable using `pkg`:
  ```bash
  pkg .
  ```

  This will generate an executable file (e.g., `tagum-api.exe`). Place the `config.json` file in the same directory as the executable if you need to override the default configuration.

### Testing the API
- Use tools like **Postman** or **cURL** to test the API endpoints.
- Ensure the API is running and accessible at `http://localhost:3000` (or the configured port).

---

## Database

The API connects to a **MySQL** database. To set up the database:

1. Create a database with the name specified in the `config.json` file (e.g., `db_name`).
2. Import the necessary schema and initial data (if applicable).

### Database Configuration
- Update the `database` section in the `config.json` file with your MySQL credentials:
  ```json
  "database": {
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "db_name"
  }
  ```

---

## Development

This project is for school purposes and is not open for contributions. However, if you are working on it locally, here are some useful commands:

- **Run the server**:
  ```bash
  node server.js
  ```

- **Use nodemon for development** (if installed):
  ```bash
  nodemon server.js
  ```

---

## License

This project does not have a specific license. It is intended for educational and school purposes only.

---

## Acknowledgments

This project was developed as part of a school requirement. Special thanks to the tools and libraries used, including **Node.js**, **Express**, **MySQL**, and **JSON Web Tokens (JWT)**.

---

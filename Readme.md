# Vlocity.ai Task - BE

## Project Overview

This project is a backend service for Vlocity.ai. It provides various functionalities and APIs to support the application built where user can add poll , vote on them in the realtime.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/parinit25/vlocity-backend.git
   cd vlocity-ai-task-be
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

### Setting Up Environment Variables

Create a `.env` file in the root directory of the project and add the following environment variables:

PORT=5000
MONGODB_URI=mongodb+srv://{USER_NAME}:{USER_PASSWORD}@{CLUSTER_NAME}.jssau.mongodb.net/{DB_NAME}
ACCESS_TOKEN_SECRET= GENERATE A SECRET KEY TO ENCRYPT THE ACCESS TOKEN
REFRESH_TOKEN_SECRET= GENERATE A SECRET KEY TO ENCRYPT THE REFRESH TOKEN

### Running the Project

To start the project, run:

```sh
npm start
```

The server will start on the port specified in the `.env` file.

## Libraries Used

- **Express**: Web framework for Node.js
- **Mongoose**: MongoDB object modeling tool
- **jsonwebtoken**: For handling JWT authentication
- **dotenv**: For loading environment variables
- **bcrypt**: For hashing passwords
- **cors**: For enabling Cross-Origin Resource Sharing
- **socket.io**: For counting the realtime votes

## Technologies Used

- **Node.js**: JavaScript runtime environment
- **MongoDB**: NoSQL database
- **Express**: Web application framework
- **JWT**: JSON Web Tokens for authentication

## Contributing

Feel free to submit issues and pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.

## Contact

For any questions or inquiries, please contact [your email].

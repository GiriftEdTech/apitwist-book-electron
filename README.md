![Logo](https://apitwist.com/assets/img/logo/apitwist_logo.svg)

# Book

The adaptive, interactive, and personalized book app written with React.

## Installation

Clone the repository

```bash
git clone https://gitlab.com/GiriftEdTech/ApiTwist/web.git
```

Navigate to the cloned directory

```bash
cd web
```

Copy enviroment example

```bash
cp .env.example .env
```

Update enviroment variables

```bash
REACT_APP_CLIENT_TOKEN_URL=/oauth/token/
REACT_APP_CLIENT_ID=123
REACT_APP_CLIENT_SECRET=secret

REACT_APP_API_URL=/api/v1/web
REACT_APP_LOGIN_URL=/api/v1

REACT_APP_IMAGES_URL=https://media.apitwist.com/i/
REACT_APP_CONTENT_URL=https://media.apitwist.com/

REACT_APP_OPENAI_API_KEY=key

REACT_APP_PIXABAY_API_KEY=key
```

Install project dependencies

```bash
npm install
```

Start the development server

```bash
npm start
```

This will start the development server, and you should be able to view the React application in your browser by accessing http://localhost:3000 (unless stated otherwise in the project's configuration).

That's it! You have successfully cloned the Apitwist Book project and started using it on your local machine with React. Now you can make changes to the project and experiment with it as needed.

## Technologies

React, Redux, Bootstrap

## Deployment

AWS Amplify automatically deploys when a pr is merged to dev and main branches.

-   Dev : https://dev.apitwist.com

-   Production : https://apitwist.com

## Reference

Apitwist Book project works with API in this [repository](https://gitlab.com/GiriftEdTech/ApiTwist/studio).

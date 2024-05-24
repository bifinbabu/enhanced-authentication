# <p align="center">Enhanced Authentication API</p>

This project is an enhanced backend API for an authentication system, featuring user profile visibility settings (public/private) and role-based access controls. It is built using Node.js and integrates with authentication services from GitHub.

## Hosting and API Playground

IMPORTANT NOTE: For testing the endpoints in the user routes, you need to first log in. The token received after logging in must be used to authorize in Swagger.

- Hosted on Vercel: https://enhanced-authentication.vercel.app/
- Swagger is used for API documentation and interactive testing. You can access the Swagger UI at: https://enhanced-authentication.vercel.app/api-docs/

<hr />

## Installation

```bash
$ git clone https://github.com/bifinbabu/enhanced-authentication.git
$ npm install
$ npm start
```

<hr />

## Features

1. User Registration and Authentication:

- Register a new account
- Third-party authentication (Github)
- JWT for authentication

2. Role-Based Access:

- Admin users can view both public and private profiles
- Normal users can only access public profiles

3. Profile Management:

- Set profile visibility to public or private

4. Optional Enhancements:

- Interactive API playground using Swagger
- Hosted on Vercel

# Write Flow App Documentation

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Using Docker](#using-docker)
  - [Using Your Own Postgres Server](#using-your-own-postgres-server)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Write Flow is a web application designed to streamline the process of writing and organizing content. It provides a user-friendly interface and a powerful backend for managing posts and user interactions.

## Prerequisites

Before you start, ensure you have the following installed:

- Node.js (v20 or higher)
- Docker
- Docker Compose

## Installation

### Install Bun
  #### Linux
  ```bash
    curl -fsSL https://bun.sh/install | bash
  ```

  #### Windows
  ```bash
    powershell -c "irm bun.sh/install.ps1 | iex"
  ```

### Using Docker

1. Clone the repository:

   ```bash
   git clone https://github.com/vishal-kumar3/WriteFlow.git
   cd WriteFlow
   ```

2. Build and run the application using Docker Compose:

   ```bash
   docker-compose -f docker-compose.dev.yml up
   ```

   The application will be accessible at [http://localhost:3000](http://localhost:3000), and the Postgres database will be running in the background.

### Using Your Own Postgres Server

1. Clone the repository:

   ```bash
   git clone https://github.com/vishal-kumar3/WriteFlow.git
   cd WriteFlow
   ```

2. Install the necessary dependencies:

   ```bash
   bun install
   ```

3. Set up your Postgres database:
   - Create a database named `writeflow`.
   - Create a user (if necessary) to access the database.

4. Update your `.env` file with the database connection details:

   ```plaintext
   AUTH_TRUST_HOST=http://localhost:3000
   NEXT_PUBLIC_HOST=http://localhost:3000
   DATABASE_URL=postgresql://<user>:<password>@localhost:5432/writeflow
   AUTH_SECRET=secret
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   ```

5. Run the application:

   ```bash
   bun run dev
   ```

   The application will be accessible at [http://localhost:3000](http://localhost:3000).

## Running the Application

After following either the Docker or Postgres setup instructions, the application should be up and running. You can access the application by navigating to [http://localhost:3000](http://localhost:3000) in your web browser.

## Environment Variables

Ensure you set the following environment variables in your `.env` file:

```plaintext
AUTH_TRUST_HOST=http://localhost:3000
NEXT_PUBLIC_HOST=http://localhost:3000
DATABASE_URL=postgresql://<user>:<password>@localhost:5432/writeflow
AUTH_SECRET=secret
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

### Explanation of Variables:

- **AUTH_TRUST_HOST**: The host URL for authorization.
- **NEXT_PUBLIC_HOST**: The public host URL for your application.
- **DATABASE_URL**: The connection string for your Postgres database.
- **AUTH_SECRET**: A secret key for authentication.
- **GOOGLE_CLIENT_ID**: Your Google OAuth client ID.
- **GOOGLE_CLIENT_SECRET**: Your Google OAuth client secret.

## Tech Stack

The Write Flow app utilizes the following technologies and libraries:

### Frontend:

- **Next.js** - A React framework for building server-rendered applications.
- **React** - A JavaScript library for building user interfaces.
- **Tailwind CSS** - A utility-first CSS framework for styling.
- **Shadcn UI** - A library for building accessible UI components.
- **Tiptap** - A headless WYSIWYG editor for rich text editing.

### Backend:

- **Node.js** - JavaScript runtime built on Chrome's V8 engine.
- **Prisma** - An ORM for Node.js and TypeScript that simplifies database access.
- **PostgreSQL** - A powerful open-source relational database.

### Others:

- **NextAuth** - A complete open-source authentication solution for Next.js.
- **Uploadcare** - A file uploading and management service.

## Features

- User authentication with Google OAuth.
- Create, edit, and delete posts.
- Organize content efficiently.
- Rich text editor for formatting posts.
- Responsive design for mobile and desktop users.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/YourFeature`).
6. Create a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

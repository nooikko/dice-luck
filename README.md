# Getting Started

## Prerequisites
- Docker Compose

## Standing Up Application (Development)
1. Run `npm install`
2. Copy .env.example to .env
3. Run `docker-compose up`
4. In a new terminal run `npm run generate`
5. Run `npm run dev`
6. Visit `http://localhost:3000` for web interface
7. Visit `http://localhost:3000/api/graphql` for GraphQL API

# Organization
As this is a NextJs application, all frontend and backend code is in a single repository.

## Helpers
When importing from a folder using typescript paths, such as `$helpers-server`, all helpers are loaded to generate the available export. This creates an issue due to server helpers requiring packages that are not available to the web interface. If we were to use 1 `/helpers` folder, both the backend and frontend would crash when importing. As such, they are broken into `/helpers/server` and `/helpers/client`.

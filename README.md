# NestJS S3 Replica Backend

This NestJS application replicates basic AWS S3 functionality using PostgreSQL as the backend storage for uploaded files. It includes features such as getting, putting, listing objects, and managing buckets. Used versioning in it. Versioning is disabled by default. To enable versioning, set the versioning flag to true during bucket creation. When creating a new entry with an existing object name or deleting an existing object, a new version is created.

## Setup

### Prerequisites

- Node.js (v16.20.0 or higher)
- PostgreSQL
- Docker (optional, for containerization)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/dthakurani/aws-s3-operations-backend.git
   cd aws-s3-operations-backend

2. Containerize the application using Docker:

   ```bash
   docker-compose up --build


That's it, Now your app is up & running.


### Configuration
Add the .env file and add the key values, take a reference from .env.sample:

    ```bash
      SERVER_PORT=
    
      DB_HOST=
      DB_PORT=
      DB_NAME=
      DB_USERNAME=
      DB_PASSWORD=

### Swagger
Access the Swagger API documentation at /api for detailed information about each endpoint.


   

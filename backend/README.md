# Backend FastAPI Service 

## Tasks

1. Create a backend REST API for `/cases` that allows the creation of a single case, and retrieval of a single and multiple cases. For clarity: we are looking for three RESTful API routes
2. The creation route should immediately return a generated id for the case and persist a record of the case with the at least the following columns:
    1. id
    2. created_at
    3. status (default: submitted)
3. When the User clicks the Continue button from Exercise 1.2, make a request to the Cases creation API route and create a new record (status: submitted)
4. Next, we want to simulate a background process for this case:
    1. For the first 10 seconds, making a retrieval request for the record will return a response in the format shown in `/assets/response-1.json` (note `summary` and `steps` are omitted whilst `status=submitted`)
    2. After 10 seconds, making a retrieval request for the record will return a response in the format shown in `/assets/response-2.json` (note `steps` is still omitted and `status=processing`)
    3. After 30 seconds, making a retrieval request for the record will return a response in the format shown in `/assets/response-3.json` (note all fields have been filled and `status=complete`)

## Database

View the README under the `alembic` folder for instructions on how to set up the database.

## Installation 

Requirements are listed in the poetry.lock file. To install the dependencies, execute the following command:
```bash
poetry install
```
To add a new dependency, execute the following command:
```bash
poetry add <dependency>
```

## Running the FastAPI Service

To run the FastAPI service, execute the following command:
```bash
poetry run uvicorn main:app --reload
```

## Linting

To lint the code, execute the following command:
```bash
poetry run isort . && poetry run black . 
```

## Generating the Frontend Client 

To generate the frontend client we can use the `openapi-generator` to generate the client.

Navigate to the root of this project and do the following:
1. First we need to install the `openapi-generator`
2. Next we need to generate the client using the `openapi-generator`
3. Ensure that the backend service is running and then execute this command in the `frontend` directory:
```bash
openapi-generator generate -i http://127.0.0.1:8000/openapi.json -g typescript-fetch -o frontend/api
```
4. Confirm that the client has been generated in the `frontend/src/api` directory, and you should be done!

## Example Requests

Start the FastAPI Service
```bash
% poetry run uvicorn main:app --reload

INFO:     Will watch for changes in these directories: ['/Users/nicholas/Code/product-engineer-starter/backend']
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [23025] using StatReload
INFO:     Started server process [23031]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

Create a Case
```bash
% curl -X 'POST' 'http://127.0.0.1:8000/cases'
{"case_id":938}
```

Retrieve a Case
```bash
% curl 'http://127.0.0.1:8000/cases/938'
{"case_id":938,"created_at":"2024-04-03T18:07:30","status":"submitted"}
```
# Backend FastAPI Service 

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
poetry run uvicorn app.main:app --reload
```

## Linting

To lint the code, execute the following command:
```bash
poetry run isort . && poetry run black . 
```
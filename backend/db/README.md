# Setup 

---

1. Ensure that you have your MySQL Database up and running locally
2. Create a new database called `co_helm` in your MySQL Database
3. Export the DB Connection string as an environment variable `DATABASE_URL` in the format `mysql+pymysql://<username>:<password>@localhost/co_helm`

## Creating the Database

---

IMPORTANT: Before you do any of this ensure that you have MySQL installed on your machine as well as a 
MySQL Database running locally.

To create the database, execute the following command:
```bash
mysql -u <username> -p -e "CREATE DATABASE co_helm"
```

For instance, I use the user `root` for my MySQL Database, so my command would look like
```bash
mysql -u root -p -e "CREATE DATABASE co_helm"
```

Your password is up to you to remember! 

## Creating Initial Migration and Tables

--- 

First we need to create an initial migration to apply, you can do this by running the following command in the `backend/db` directory:
```bash
(base) db % poetry run alembic revision --autogenerate -m "Initial migration"

INFO  [alembic.runtime.migration] Context impl MySQLImpl.
INFO  [alembic.runtime.migration] Will assume non-transactional DDL.
INFO  [alembic.autogenerate.compare] Detected added table 'cases'
  Generating /Users/nicholas/Code/product-engineer-starter/backend/db/alembic/versions/7342dcd6a761_initial_migration.py ...  done
```

Once this is done we can apply the migration to the database by running the following command:
```bash
(base) db % poetry run alembic upgrade head  
                                
INFO  [alembic.runtime.migration] Context impl MySQLImpl.
INFO  [alembic.runtime.migration] Will assume non-transactional DDL.
INFO  [alembic.runtime.migration] Running upgrade  -> a4511d09b069, Initial migration
```

Now your locally running MySQL Database should be good to go! 

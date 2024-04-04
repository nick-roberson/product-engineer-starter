import os

# Import the required environment variables, error early if they are not set
MYSQL_USER = os.getenv("MYSQL_USER")
MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD")
if not MYSQL_USER or not MYSQL_PASSWORD:
    raise ValueError("MYSQL_USER and MYSQL_PASSWORD environment variables must be set")


# Define the MySQL connection URL
MYSQL_DRIVER = "mysql+pymysql"
MYSQL_PORT = os.getenv("MYSQL_PORT", 3306)
MYSQL_HOST = os.getenv("MYSQL_HOST", "localhost")
MYSQL_DATABASE = os.getenv("MYSQL_DATABASE", "co_helm")
MYSQL_URL = f"{MYSQL_DRIVER}://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DATABASE}"

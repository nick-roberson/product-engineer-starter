import os

# Import the required environment variables, error early if they are not set
MYSQL_USER = os.getenv("MYSQL_USER")
MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD")
if not MYSQL_USER or not MYSQL_PASSWORD:
    raise ValueError("MYSQL_USER and MYSQL_PASSWORD must be set")

# Define the MySQL connection URL
MYSQL_PORT = 3306
MYSQL_HOST = "localhost"
MYSQL_DATABASE = "co_helm"
MYSQL_URL = f"mysql+pymysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DATABASE}"

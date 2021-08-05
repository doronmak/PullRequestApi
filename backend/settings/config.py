API_HOST = "0.0.0.0"
API_PORT = 8080
LOG_LEVEL = "info"
BASE_URL = "/api/v1"
OPEN_API_URL = f"{BASE_URL}/openapi.json"
DOCS_URL = f"{BASE_URL}/docs"
REDOC_URL = f"{BASE_URL}/redoc"
# mongo
MONGO_URL = "appcluster.jfpei.mongodb.net"
MONGO_USER = "app"
MONGO_PASS = "Password"
MONGO_DB_NAME = "app"
MONGO_URI = f"mongodb+srv://{MONGO_USER}:{MONGO_PASS}@{MONGO_URL}/{MONGO_DB_NAME}?retryWrites=true&w=majority"

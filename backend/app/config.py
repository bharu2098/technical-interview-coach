from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

class Settings:
    APP_NAME = "Technical Interview Coach API"
    APP_VERSION = "1.0.0"

    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

settings = Settings()
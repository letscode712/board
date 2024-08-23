"""Flask App configuration."""

# DB 연결 설정
DB_HOST = "127.0.0.1"
DB_USER = "root"
DB_PASSWORD = "1234"
DB_PORT = 3306
DATABASE = "reacttest"
DB_URL = "mysql+pymysql://root:1234@127.0.0.1:3306/reacttest"

SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:1234@127.0.0.1:3306/reacttes"
SQLALCHEMY_TRACK_MODIFICATIONS = False

# DEBUG 모드
FLASK_DEBUG = True

#
JSON_AS_ASCII = False
import os, sys
from flask import Flask, request
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_pyfile("config/config.py")

    sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

    CORS(app, resources={r'*': {'origins': '*'}})

    from api import board


    app.register_blueprint(board.bp)

    return app

app = create_app();


# from flask import Flask
# app = Flask(__name__)        #app에  Flask() 넘겨서 app 전역 객체로 사용할 수 있게 함(instance 생성)


# @app.route('/')



# def hello():
#     return 'hello world!!!!'


# if __name__== '__main__':
#     app.run() ##이거는 그냥 돌아가는 건데, 디버깅할 때마다 재시동 해줘야함
#     app.run(debug=True) ##디버깅 모드로 실행..재시동 필요없음

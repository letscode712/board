import json
import ssl
from flask import Blueprint, jsonify, request, redirect
from service import service as dbService
from http import HTTPStatus

bp = Blueprint("testdb", __name__, url_prefix='/')

bp.before_request
def before_request():
    if request.url.startswith('http://'):
        url = request.url.replace('http://', 'https://', 1)
        code=301
        return redirect(url, code=code)

@bp.route("/")
def hello_world():
    return 'Hello World!'

@bp.route("/selectBoard", methods=['GET'])
def getBoardList():

    category = ''

    if request.args.get("category") != '':
        category = request.args.get("category")

    temp = dbService.getBoardList(request.args.get('num',''), request.args.get('inputVal',''), category)

    return json.dumps(temp, default=str, ensure_ascii=False).encode('utf8')


@bp.route("/addBoard", methods=['POST'])
def insBoard():

    param = request.get_json()

    temp = dbService.addBoard(param['writer'], param['title'], param['content'])

    return json.dumps(temp, default=str)

@bp.route("/editBoard", methods=['POST'])
def editBoard():
    param = request.get_json()
    temp = dbService.editBoard(param['writer'], param['title'], param['content'], param['num'])

    return jsonify(temp)
    # return jsonify({
    #     "ok" : True,
    #     "message" : "게시글이 수정됨",
    #     "data" : temp
    # })

@bp.route("/deleteBoard", methods=['GET'])
def deleteBoard():

    temp = dbService.deleteBoard(request.args.get('num'))

    return json.dumps(temp, default=str)

#GET요청에 따라 list 내용 반환함
#restcall의 GET 요청에 따라 작업한 res를 반환하는 함수 생성
@bp.route('/get', methods=['GET'])
def get():
    print("현재 http 연결 상태:", HTTPStatus.OK)

    #getBoardList() 호출을 특정 요청 시에만 하도록 수정
    list = getBoardList() #service.py의 getBoardList() 호출

    return jsonify({"list": list, "status": HTTPStatus.OK})

#POST 요청에 따라 받은 데이터 res를 반환함
# 여기서 front의 utils/index.js로 res 보내주면 거기서 res를 edit페이지로 보내줌
@bp.route('/post', methods=['POST'])
def post():
    print("현재 http 연결 상태:", HTTPStatus.OK)
    params = request.get_json()

    return jsonify({"list": params, "status": HTTPStatus.OK})

if __name__ == '__main__':
    ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS)
    ssl_context.load_cert_chain(certfile='newcert.pem', keyfile='newkey.pem', password='secret')
    bp.run(host="0.0.0.0", port=433, ssl_context=ssl_context, debug=True) #디버깅 모드로 Flask 실행

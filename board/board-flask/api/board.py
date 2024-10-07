import json
from flask import Blueprint, jsonify, request, redirect
from service import service as dbService
from http import HTTPStatus

bp = Blueprint("testdb", __name__, url_prefix='/')

@bp.route("/")
def hello_world():
    return 'Hello World!, this page is from Backend by python Flask'

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

##review 불러오는 함수
@bp.route('/getReview', methods=['GET'])
def getReview():
    param = request.get_json()

    temp = dbService.getReview(param['writer'], param['content'])

    return json.dump(temp, default=str, ensure_ascii=False).encode('utf8')

##review 등록 함수
@bp.route('/addReview', methods=['POST'])
def insReview():
    param = request.get_json()

    temp = dbService.addReview(param['writer'], param['content'])

    return json.dumps(temp, default=str)

##review 수정 함수
@bp.route('/editReview', methods=['POST'])
def editReview():
    param = request.get_json()
    temp = dbService.editReview(param['writer'], param['content'])

    return jsonify(temp)


if __name__ == '__main__':
    bp.run(debug=True) #디버깅 모드로 flask 실행
    # bp.debug=True #디버깅 모드로 flask 실행


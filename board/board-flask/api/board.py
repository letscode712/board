import json

import flask
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
    category = ''

    if request.args.get("category") != '':
        category = request.args.get("category")

    temp = dbService.getReview(request.args.get('reviewNum',''), request.args.get('inputVal',''), category)

    return json.dumps(temp, default=str, ensure_ascii=False).encode('utf8')

##review 등록 함수
@bp.route('/addReview', methods=['POST'])
def insReview():
    param = request.get_json()
    temp = dbService.addReview(param['reviewNum'],param['postNum'], param['writer'], param['content'])

    # return json.dumps(temp, default=str)
    return jsonify(temp) #json형태로 결과 반환

##review 수정 함수
@bp.route('/editReview', methods=['POST'])
def editReview():
    param = request.get_json()
    temp = dbService.editReview(param['reviewNum'],param['postNum'], param['writer'], param['content'])

    return jsonify(temp)

##review 삭제함수
@bp.route('/deleteReview', methods=['GET'])
def deleteReview():
    temp = dbService.deleteBoard(request.args.get('reviewNum'))

    return json.dumps(temp, default=str)

if __name__ == '__main__':
    bp.run(debug=True) #디버깅 모드로 flask 실행
    # bp.debug=True #디버깅 모드로 flask 실행



##### flask jsonify와 json.dumps의 차이점 ######
#jsonify()는 json response를 보내기 위해 'application/json'으로 되어있는 flask.Response()객체 리턴함
#리스트를 파라미터로 얻을 수 있음
#flask 앱 내에서만 실행이 가능함
# def jsonify(*args, **kwargs):
#     if __debug__:
#         _assert_have_json()
#         return current_app.response_class(json.dumps(dict(*args, **kwargs),
#                                                      indent=None if request.is_xhr else 2), mimetypes='application/json')

# json.dumps()는 수동으로 mimetypes를 추가해줘야하는 encoded-string을 리턴함
# flask가 알아서 판단해서 response를 자동으로 보내줌...직접적으로 사용해야함
# response header fields는 default(text/html; charset=utf-80)으로 처리됨
# jsonify()보다 다양한 타입을 파라미터로 받아올 수 있음
# flask 앱 밖에서도 shell에서 바로 return을 받아볼 수 있음


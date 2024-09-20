import json
from flask import Blueprint, jsonify, request
from service import service as dbService

bp = Blueprint("testdb", __name__, url_prefix='/')

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

@bp.route("/deleteBoard", methods=['GET'])
def deleteBoard():

    temp = dbService.deleteBoard(request.args.get('num'))

    return json.dumps(temp, default=str)
from flask import views

from config.db import get_db
from .utils import *

def getBoardList(num, inputVal, category):

    sql = "SELECT * FROM movielist WHERE 1=1 "

    if num != '' and inputVal == '':
        sql += f' AND num = "{num}" '
    if category == 'num':
        sql += f'AND num = "{inputVal}" '
    if category == 'writer':
        sql += f'AND writer LIKE CONCAT("%", "{inputVal}", "%")'
    if category == 'title':
        sql += f'AND title LIKE CONCAT("%", "{inputVal}", "%")'

    db = get_db()
    cur = db.cursor()
    cur.execute(sql)
    result = getResults(cur)

    return result



def addBoard(writer, title, content):
    sql = f"INSERT INTO movielist (writer, title, content, date) VALUES ('{writer}', '{title}', '{content}', now())"

    db = get_db()
    cur = db.cursor()
    cur.execute(sql)
    result = cur.rowcount
    db.commit()

    return result


def editBoard(writer, title, content, num):
    sql = f"UPDATE movielist SET writer = '{writer}', title = '{title}', content = '{content}', date = now() where num = '{num}'"

    db = get_db()
    cur = db.cursor()
    cur.execute(sql)
    db.commit()
    result = getResults(cur)

    return result

def deleteBoard(num):
    sql = f"DELETE From movielist where num = {num}"

    db = get_db()
    cur = db.cursor()
    cur.execute(sql)
    result = getResults(cur)
    db.commit()

    return result


##review를 db에서 조회하는 sql문
def getReview(writer, content):
    sql= f"SELECT * FROM board2 WHERE 1=1"

    db = get_db()
    cur= db.cursor()
    cur.execute(sql)
    result = cur.rowcount
    db.commit()

    return result


##review 추가 시 board2라는 db로 리뷰가 추가되도록 한다.
def addReview(writer, content):
    sql = f"INSERT INTO board2 (writer, content) VALUES ('{writer}', '{content}')"

    db = get_db()
    cur = db.cursor()
    cur.execute(sql)
    result = cur.rowcount
    db.commit()

    return result


##review를 수정하는 sql문
def editReview(writer, content):
    sql = f"UPDATE board2 SET writer='{writer}', content='{content}'"

    db= get_db()
    cur = db.cursor()
    cur.execute(sql)
    db.commit()
    result = getResults(cur)

    return result
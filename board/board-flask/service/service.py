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
def getReview(reviewNum, inputVal, category):
    sql= f"SELECT * FROM reviewlist WHERE 1=1"

    if reviewNum != '' and inputVal == '':
        sql += f' AND reviewNum = {reviewNum} '
    if category == 'reviewNum':
        sql += f'AND reviewNum = {inputVal} '
    if category == 'writer':
        sql += f'AND writer LIKE CONCAT("%", "{inputVal}", "%")'
    if category == 'content':
        sql += f'AND content LIKE CONCAT("%", "{inputVal}", "%")'

    db = get_db()
    cur= db.cursor()
    cur.execute(sql)
    result = getResults(cur)
    db.commit()

    return result

##review 추가 시 board2라는 db로 리뷰가 추가되도록 한다.
def addReview(reviewNum, postNum, writer, content):
    sql = f"INSERT INTO reviewlist (review_num, post_num, writer, content) VALUES ({reviewNum},{postNum},'{writer}','{content}')"

    db = get_db()
    cur = db.cursor()
    cur.execute(sql)
    result = cur.rowcount
    db.commit()

    # return result
    return {"staus" : "success", "message" : "리뷰 등록 성공"}

##review를 수정하는 sql문
def editReview(reviewNum, postNum, writer, content):
    sql = f"UPDATE reviewlist SET writer='{writer}', content='{content}' WHERE review_num={reviewNum} AND post_num={postNum}"

    db= get_db()
    cur = db.cursor()
    cur.execute(sql)
    db.commit()
    result = getResults(cur)

    return result

##review를 삭제하는 sql문
def deleteReview(reviewNum):
    sql = f"DELETE FROM reviewlist WHERE review_num={reviewNum}"

    db = get_db()
    cur = db.cursor()
    cur.execute(sql)
    result = getResults(cur)
    db.commit()

    return result
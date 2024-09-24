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
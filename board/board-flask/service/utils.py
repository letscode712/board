from re import sub

class dotdict(dict):
    __getattr__ = dict.get
    __setattr__ = dict.__setitem__
    __delattr__ = dict.__delitem__

def camelCase(s):
    s = sub(r"(_|-)+", " ", s).title().replace(" ", "")
    return ''.join([s[0].lower(), s[1:]])

# db 결과 camelCase 변환
def getResults(db_cursor, list_yn = True):
    results = []

    if list_yn == True:
        for res in db_cursor.fetchall():
            temp = dict()
            for val in res.keys():
                temp[camelCase(val)] = res[val]
            results.append(temp)
    else:
        res = db_cursor.fetchone()
        temp = dict()
        for val in res.keys():
            temp[camelCase(val)] = res[val]
        return temp

    return results
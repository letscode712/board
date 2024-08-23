export const restCall = async (method, path, data) => {
    let url = ' http://127.0.0.1:5000';
    let option = {};

    option.method = method;
    option.headers = {
        'content-type': 'application/json'
    };

    if (method === 'GET') {
        path += '?';
        Object.keys(data).map((key, index) => {
            path += `${key}=${data[key] ? data[key] : ''}${((index + 1) !== Object.keys(data).length) ? '&' : ''}`;
        });
    }

    if (method === 'POST') {
        option.body = JSON.stringify(data);
    }

    url += path;

    return await fetch(url, option).then(res => {
        return res.json();
    })
}
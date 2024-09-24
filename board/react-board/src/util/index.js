export const restCall = async (method, path, data={}) => {
    let url = ' http://127.0.0.1:5000'; //기본 API 주소
    let option = {};

    option.method = method;
    option.headers = {
        'content-type': 'application/json'
    };

    //GET인 경우 url에 파라미터 추가
    if (method === 'GET') { //URL 생성
        path += `?`;
        Object.keys(data).map((key, index) => { //Object.keys(obj) - data의 키만 담은 배열을 반환...map으로 key-value 값 묶어서 관리
            path += `${key}=${data[key] ? data[key] : ''}${((index + 1) !== Object.keys(data).length) ? '&' : ''}`;
        });
    }
    if(method === 'POST'){
        option.body = JSON.stringify(data); //body에 data 추가
    }

    url += path; //최종 url

    //서버 응답처리
    return await fetch(url, option).then(async res => {
        try{
            if(!res.ok){ //success가 아니면..
                throw new Error(`HTTP error: ${res.status}`); //에러 던지기
            }
            return res.json(); //파싱해주고 서버로 응답처리해줌
        }catch (error){
            console.error('API 요청 오류: ', error); //에러 처리
            throw error;  //에러 던지기
        }
    });

    //원래 코드
    // return await fetch(url, option)
    //     .then(async res => {
    //         // console.log(res);
    //     return res.json();
    // });
}

//CRA(CreateReactApp)의 디폴트 파일 중 하나
//앱의 퍼포먼스 시간들을 분석하여 객체 형태로 보여주는 것이 목적
//react 어플리케이션의 성능을 측정하고 보고하는데 사용됨
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;

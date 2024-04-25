# 프로젝트 개요
- React 프로젝트에서 SEO 대응을 위한 최소 작업 대응

## 개발환경 세팅
- npx create-react-app chapter3
- npm install react-helmet-async
- npm install react-router-dom@6

## Favicon 세팅
 public/index.html 에 ./favicon.ico 직접 세팅

### 각 파일의 역할
- favicon.ico


## SEO 스코어 분석
- 스코어 분석에 사용한 서비스: (링크 적기, 예: https://www.seobility.net/en/seocheck/)

### 개선점
서버로부터 넘겨지는 SourcePage에는 <meta>나 <title>이 추가되지 않은 채로 넘어오고, Javascript가 실행될 때, 변환됨. JS를 실행한 뒤에 수집하는 크롤러에게는 괜찮겠지만 index.html 파일을 크롤링하는 크롤러는 변환된 메타데이터를 제대로 수집하지 못할 것 같습니다.
각각의 페이지 별로 index.html이 없기 때문에 발생한 일인 것 같습니다. Prerender를 통해 한 번 해결해 보도록 해봅시다. 
Prerender를 적용시키기 위해 여러 방안을 고민해보게 되었습니다. React-Snap은 React18버전을 제대로 지원하지 않기 때문에 React의 버전을 17로 다운시켜야 한다는 단점이 있었습니다. 때문에, 다른 방법을 고안해보게 되었고 Puppeteer과 Prerender를 활용
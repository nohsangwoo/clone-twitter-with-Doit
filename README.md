# twitter clone coding with react, typescript, redux-toolkit

## connect to git

## connect to firebase web

## ch to firebase setting and implement login function

- create account를 실행하면 firebase가 자동으로 로그인까지 실행시켜줌
- 해당 로그인 정보는 개발자 모드의
  application탭에서 [Storage > IndexedDB > firebaseLocalStorageDB > firebaseLocalStorage] 안에 저장돼있다.

## firebase의 세션관리

- firebase는 로그인 제어를 setPersistent를 통해 관리한다
- setPersistent는 local, session, none 옵션을 가지고있다
- local: 웹브라우저를 종료해도 로그인 유지
  (웹브라우저를 종료해도 로그인한 사용자의 정보를 기억할 수 있게 해주는 옵션)
- session: 웹브라우저의 탭을 종료하면 로그아웃
- none: 새로고침하면 로그아웃

## Login과 LogOut

## Social login

## Redirect and fix some bugs

## useHistory usage

- useHistory로 어떤 컴포넌트던 history 기능을 끌어다 사용할수있다.

## input form setting for tweet

## create database in firebase

- firestore - test mode

## upload to firestore Database

- firestore에 업로드 하는 방법(with javascript 9 version)

## 실시간이 아닌 사용자가 요청할때만 데이터를 불러오는 방법

```
  const dbTweets = await (
    await getDocs(collection(getFirestore(), 'tweets'))
    ).docs;
    console.log('dbTweets: ', dbTweets[0].data());
  };
  useEffect(() => {
    getTweets();
  }, []);
```

## save ID from getDocs

## data binding (tweets)

## get data with realtime way

## orderBy 사용 법 및 검색 방법 알아내기

- ref1: https://firebase.google.com/docs/firestore/query-data/order-limit-data#web-version-9
- ref2: https://firebase.google.com/docs/firestore/query-data/get-data
- ref3: https://firebase.google.com/docs/firestore/query-data/order-limit-data?hl=ko

- ref4: https://firebase.google.com/docs/firestore/query-data/listen

## Delete

- ref: https://firebase.google.com/docs/firestore/manage-data/delete-data

## Update

-ref: https://firebase.google.com/docs/firestore/manage-data/add-data#update-data

## file select and clear

## upload to firebase storage

- https://firebase.google.com/docs/storage/web/upload-files#upload_from_a_string

## use UUID

- npm install uuid
- npm i --save-dev @types/uuid // for typescript

## 스토리지에서 사진 불러오기 구현해야함

## firebase에 사진 업로드 방법(with javascript 9)

## getDownloadURL & progress

- ref: https://firebase.google.com/docs/storage/web/upload-files?hl=nb&authuser=3#monitor_upload_progress
- firebase에 파일 업로드 후 다운로드 가능한 url 등등, 후 처리 방법 적용

## tweet upload with downloadURL

## rendering tweet images

## 추가해야할 것 ----------------!!!!!!!--------------------

- 여러개의 이미지를 업로드하고 렌더링하기
  (현재 단 한개의 사진만 업로드 가능)
  (사진의 용량도 제한하기)
- 사진 없으면 트윗만 업로드 하기
- 사진 있으면 사진 업로드 후 사진주소와 같이 업로드 하기
- 위내용을 구현하고 리팩토링 하기

## 일단 진행

## delete file

## getDocs 일반적인 방법으로 데이터 불러오기(실시간 아님)

- Profile에서 구현
- 데이터 가져와서 console.log로 찍기, but 데이터 바인딩은 아직안함
- ref: https://firebase.google.com/docs/firestore/query-data/get-data

## userObj의 displayName을 처리하기

- 소셜로그인을 통해 로그인했을때만 채워지는 정보
- 일반 이메일 비밀번호 로그인을 했을때는 기본값이 null이다
- 따라서 Display Name을 업데이트 해주기위한 작업이 필요함

## Profile update

- ref: https://firebase.google.com/docs/auth/web/manage-users#update_a_users_profile

## redux 도입해서 로그인 로그아웃 관련 리렌더링 적용하기

## clean code (Refactoring)

## install and apply libs...

## redux things

- core
  redux, react-redux
- middleware
  redux-logger, redux-persist, redux-saga
- tool-kit
  npm install @reduxjs/toolkit

## socket.io-client

## animation

- npm i aos
- npm i --save-dev @types/aos

## styled-components

- npm install styled-components
- npm i --save-dev @types/styled-components

## material-ui

npm i @material-ui/core @material-ui/icons @material-ui/lab @material-ui/styles

## end of install and apply libs...

- 위 라이브러리들 적용 및 테스팅 완료

## lodash

## AOSINIT setup

## userObj ==> userInfo로 변경 및 redux stroe에 저장 및 불러오기 적용

## masonry layout 적용

https://www.npmjs.com/package/react-masonry-css

## limit 적용(한번에 표시하는 트윗 개수)

일단 테스트용으로 5개씩 표현

## for infinite scroll

infinite scroll을 위한 기능 구현 버튼형식으로 구현 완료

## getMyStream을 redux saga로 처리

## getMyDevices를 redux saga로 처리해야함

## react-slick

- npm i react-slic
- npm i --save-dev @types/react-slic

## connect to eachother

- use by webRTC

## this platform is can create only one room

and then waiting other person

## 트윗 생성과 동시에 영상통화를 위한 room 생성

## tweetFactory에서 history.push 할때 home 스냅샷 쿼리의 unsubscribe 안해줘서 memory leak 일어남 나중에 정리 해주기

## 웹브라우저 종료시 만들어진 방을(tweet)을 지우는 쿼리 생성하기

## tweet생성과 동시에 만들어진 방에 다른 유저가 클릭해서 영상통화하기

## 트윗 생성하고 브라우저를 종료하거나 방을 나가면 생성된 트윗이 삭제된다.

## roomId가 없는데 myRoom접속하면 일단 home으로 새로고침한다 (체크)

## 영상통화가 끝나면?

-시간이 없어서.... 원래는 호스트는 방과함께 남아있고 다른사람이 재접속하던지 해야함
관련된 모든것이 초기화됨
leave room 실행됨(관련 데이터 초기화);
tweet도 삭제됨

- 따로 leaveroom 작업 해줘야하는데 그냥 ... 새로고침으로 해결하자 시간이 없음

## 영상통화중에 다른사람이 접속하면?

- 영상통화중이다라는 메시지와 함꼐 접속 거부 알람

## react-masonry-css

- npm install react-masonry-css
- 일단 적용, 디자인 구상은 조금 뒤에

## home layout

## 사진 업로드 안했을때 기본 표시 이미지 설정

set default background image

## handleAddStream 동작 안함 버그 찾자

## getUserMedia 와 wss connect 하기전에 peer교환 되버리는 현상 컴포넌트 렌더링 순서 확실히 정하여 해결

## myRoom modal 형식으로 띄움

## 리렌더링 관련 버그 수정

## control panel 추가

## fix css for myRoom

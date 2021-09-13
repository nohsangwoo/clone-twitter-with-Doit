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

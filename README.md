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

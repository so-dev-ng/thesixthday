# [thesixthday] 프론트엔드 과제

## 1. 기능 구현

### Scroll 이벤트 생성
`scrollHeight`, `scrollTop`, `clientHeight` 의 개념을 공부해 ___Scroll 이벤트___ 를 추가했습니다.</br>
`scrollHeight`는 화면에 보이지 않는, 즉 사용자가 볼 수 없는 내용의 전체 높이이고 `clientHeight`은 실제 사용자가 보고있는 내용의 높이 입니다. `scrollTop`은 사용자가 스크롤해서 내린 만큼의 높이가 됩니다. 자세한 내용은 [여기](https://ko.javascript.info/size-and-scroll)를 참고했습니다. </br>

과제에서 요구한 ___Scroll 이벤트___ 는 스크롤이 끝까지 내려가 더이상 내려갈 수 없을 때, 추가 데이터를 불러오는 것이었습니다. </br>
따라서 사용자가 스크롤해서 내린 높이(`scrollTop`)와 사용자가 보고 있는 내용의 높이(`clientHeight`)를 더한 값이, 전체 내용의 높이(`scrollHeight`)와 같거나 클 때, 데이터를 불러올 수 있도록 구현했습니다. 

### 리액트 생애 주기
`componentDidMount` 와 같은 역할을 하는 `useEffect(callback, [])`를 사용해 첫 화면에 나타날 데이터를 받아오도록 설계했습니다.
여기서 ___React Hooks___ 는 `callback`과 `[]`의 의존성 검사를 진행합니다.
`callback`으로 불려질 함수가 의존적이라면 `[]` 내부에 의존하고 있는 변수, 함수명 등을 적을 것을 권고합니다. </br>
그러나, 제가 작성한 `loadMoreItems()` 함수는 state에 의존적이지만 state가 변경될 때마다 실행될 필요가 없고, 최초 한번만 불려질 수 있게 함을 의도하였기 때문에 `// eslint-disable-next-line`를 작성해 `React Hooks` 경고를 무시하도록 했습니다. </br>

관련 내용은 [여기](https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook)를 참고했습니다. 

## 2. Redux로 상태 관리 (`module.js`)
### Redux 모듈(action type, actions, reducer)을 함께 묶은 이유
Redux 공식 Github에서는 위 3개를 다 다른 폴더를 만들어 관리하도록 했습니다. 
이렇게 구성했을 때, 파일을 계속 옮겨다녀야 한다는 번거로움이 있습니다. </br>
그래서 이 모든 3개를 한 파일에 작성할 수 있는 [Ducks 패턴](https://github.com/erikras/ducks-modular-redux)을 사용했습니다. </br>
본 과제에서는 관리할 상태가 많지 않아 `module.js`라는 하나의 파일에 모든 모듈을 작성했습니다. 

관련 내용은 [여기](https://react.vlpt.us/redux/)를 참고했습니다. 

### Hooks 와 Redux의 구분
`App.js` 에서 ___error message___와 ___loading의 여부___는 Hooks로 관리하고, ___items___는 Redux로 관리했습니다.
이렇게 나눈 이유는 ___error message___와 ___loading의 여부___는 App 컴포넌트가 렌더링 되어있을 때만 필요한 state라고 생각했습니다. 즉, App이 아닌 다른 컴포넌트와의 state 공유가 불필요한 state라고 판단되어 Redux보다 간편한 Hooks를 사용해 상태 관리 했습니다. 
___items___의 경우, App 컴포넌트에서 가장 중요한 데이터이고 추후에 다른 컴포넌트에서 사용될 수 있는 가능성이 있다고 판단되어 Redux를 사용했습니다.
위 내용은 프로젝트의 상황에 따라 충분히 변경 가능하다고 생각합니다. 

## 3. 코드에는 없으나 추가로 공부한 내용
### react에서 html태그 불러오기

`dangerouslySetInnerHTML` 속성을 사용합니다. </br>
**예시**

```jsx
<div dangerouslySetInnerHTML={{ __html: item.contents }}></div>
```

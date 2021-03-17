//액션 타입
const SET_ITEMS = 'SET_ITEMS';

//액션 생성 함수
export const setItems = item => ({ type: SET_ITEMS, item });

//초기 상태
const initialState = {
  items: [],
  pages: 0,
}

//리듀서
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ITEMS:
      return {
        ...state,
        items: state.items.concat(action.item),
        pages: state.pages + 1
      };
    default:
      return state;
  }
}
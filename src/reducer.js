//액션 타입
const SET_ITEMS = 'SET_ITEMS';
const NEXT_PAGE = 'NEXT_PAGE';

//액션 생성 함수
export const setItems = item => ({ type: SET_ITEMS, item });
export const nextPage = () => ({ type: NEXT_PAGE });

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
        items: state.items.concat(action.item)
      };
    case NEXT_PAGE:
      return {
        ...state,
        pages: state.pages + 1
      };
    default:
      return state;
  }
}
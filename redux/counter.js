// HELPER
function filterInt(value) {
  if (/^[-+]?(\d+|Infinity)$/.test(value)) {
    return Number(value);
  } else {
    return NaN;
  }
}

// TYPES

const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const SET_VALUE = "SET_VALUE";

// INITIAL STATE

const initialState = {
  counter: 1,
};

// ACTION CREATORS

export const increment = () => ({
  type: INCREMENT,
});

export const decrement = () => ({
  type: DECREMENT,
});

export const setValue = (nr) => ({
  type: SET_VALUE,
  payload: nr,
});

// REDUCER

const counterReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case INCREMENT:
      return { ...state, counter: filterInt(state.counter) + 1 };
    case DECREMENT:
      return { ...state, counter: filterInt(state.counter) - 1 };
    case SET_VALUE:
      return { ...state, counter: payload };
    default:
      return state;
  }
};

export default counterReducer;

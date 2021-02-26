import axios from "axios";

// INITIALSTATE
const initialState = {
  id: "",
  coctails: [],
  loading: false,
  ingredient: "",
  error: false,
};

// TYPES
const COCTAIL_FETCH_START = "COCTAIL_FETCH_START";
const COCTAIL_FETCH_SUCCESS = "COCTAIL_FETCH_SUCCESS";
const COCTAIL_FETCH_SUCCESS2 = "COCTAIL_FETCH_SUCCESS2";
const COCTAIL_FETCH_FAIL = "COCTAIL_FETCH_FAIL";

// ACTIONCREATORS

const coctailFetchStart = (str) => ({
  type: COCTAIL_FETCH_START,
  payload: str,
});

const coctailFetchFail = () => ({
  type: COCTAIL_FETCH_FAIL,
});

const coctailFetchSuccess = (coctails) => ({
  type: COCTAIL_FETCH_SUCCESS,
  payload: coctails,
});

const coctailFetchSuccess2 = (coctails) => ({
  type: COCTAIL_FETCH_SUCCESS2,
  payload: coctails,
});

export const getCoctails = (str) => async (dispatch, getState) => {
  dispatch(coctailFetchStart(str));
  try {
    const response = await axios(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${
        getState().coctailState.ingredient
      }`
    );
    dispatch(coctailFetchSuccess(response.data.drinks));
    //console.log(response.data.drinks);
    //console.log(getState().coctailState.ingredient);
  } catch (error) {
    dispatch(coctailFetchFail());
    console.log("mislukt");
  }
};

export const getCoctailsById = (str) => async (dispatch, getState) => {
  dispatch(coctailFetchStart(str));
  try {
    const response = await axios(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=1100${
        getState().coctailState.id
      }`
    );
    dispatch(coctailFetchSuccess2(response.data.drinks));
    //console.log(response.data.drinks);
    //console.log(getState().coctailState.ingredient);
  } catch (error) {
    dispatch(coctailFetchFail());
    console.log("mislukt");
  }
};

// REDUCER

const coctailReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case COCTAIL_FETCH_START:
      return { ...state, ingredient: payload, loading: true, error: false };
    case COCTAIL_FETCH_SUCCESS:
      return { ...state, loading: false, error: false, coctails: payload };
    case COCTAIL_FETCH_SUCCESS2:
      return { ...state, loading: false, error: false, id: payload };
    case COCTAIL_FETCH_FAIL:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default coctailReducer;

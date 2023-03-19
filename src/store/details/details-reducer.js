import { CLEAR, SET_COUNTRY, SET_ERROR, SET_NEIGHBORS } from "./details-action";

const initialState = {
  currentCountry: null,
  status: "idle",
  error: null,
  neighbors: [],
};
export const detailsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_COUNTRY: {
      return {
        ...state,
        currentCountry: payload,
        error: null,
        status: "done",
      };
    }
    case SET_ERROR: {
      return {
        ...state,
        status: "rejected",
        error: payload,
      };
    }
    case CLEAR: {
      return initialState;
    }
    case SET_NEIGHBORS: {
      return {
        ...state,
        neighbors: payload,
      };
    }
    default: {
      return state;
    }
  }
};

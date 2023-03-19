export const SET_COUNTRY = "@@/details/SET_COUNTRY";
export const SET_ERROR = "@@/details/SET_ERROR";
export const CLEAR = "@@/details/CLEAR";
export const SET_NEIGHBORS = "@@/details/SET_NEIGHBORS";

const setCountry = (country) => ({
  type: SET_COUNTRY,
  payload: country,
});
const setError = (err) => ({
  type: SET_ERROR,
  payload: err,
});
export const setClear = () => ({
  type: CLEAR,
});
const setNeihbords = (countries) => ({
  type: SET_NEIGHBORS,
  payload: countries,
});
export const loadCountryByName =
  (name) =>
  (dispatch, _, { client, api }) => {
    client
      .get(api.searchByCountry(name))
      .then(({ data }) => dispatch(setCountry(data[0])))
      .catch((error) => setError(error));
  };
export const loadNeighbordsCountry =
  (borders) =>
  (dispatch, _, { client, api }) => {
    client
      .get(api.filterByCode(borders))
      .then(({ data }) => dispatch(setNeihbords(data.map((c) => c.name))))
      .catch((err) => console.error(err));
  };

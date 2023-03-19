export const selectCountriesINFO = (state) => ({
  status: state.countries.status,
  error: state.countries.error,
  qty: state.countries.list.length,
});
export const selectedAllCountries = (state) => state.countries.list;
export const selectVisibleCountres = (state, { search = "", region = "" }) => {
  return state.countries.list.filter(
    (country) =>
      country.name.toLowerCase().includes(search.toLowerCase()) &&
      country.region.includes(region)
  );
};

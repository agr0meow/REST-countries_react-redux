import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { List } from "../components/List";
import { Card } from "../components/Card";
import { Controls } from "../components/Controls";
import {
  selectCountriesINFO,
  selectVisibleCountres,
} from "../store/countres/countries-selector";
import { useEffect } from "react";
import { loadCountries } from "../store/countres/countries-action";
import { selectControls } from "../store/controls/controls-selector";

export const HomePage = () => {
  const navigate = useNavigate();
  const { search, region } = useSelector(selectControls);
  console.log(region);
  const countries = useSelector((state) =>
    selectVisibleCountres(state, { search, region })
  );
  const dispatch = useDispatch();
  const { status, error, qty } = useSelector(selectCountriesINFO);
  useEffect(() => {
    if (!qty) {
      dispatch(loadCountries());
    }
  }, [qty, dispatch]);

  return (
    <>
      <Controls />
      {error && <h2>Can't fetch data</h2>}
      {status === "loading" && <h2>Loading...</h2>}
      {status === "fullfied" && (
        <List>
          {countries.map((c) => {
            const countryInfo = {
              img: c.flags.png,
              name: c.name,
              info: [
                {
                  title: "Population",
                  description: c.population.toLocaleString(),
                },
                {
                  title: "Region",
                  description: c.region,
                },
                {
                  title: "Capital",
                  description: c.capital,
                },
              ],
            };

            return (
              <Card
                key={c.name}
                onClick={() => navigate(`/country/${c.name}`)}
                {...countryInfo}
              />
            );
          })}
        </List>
      )}
    </>
  );
};

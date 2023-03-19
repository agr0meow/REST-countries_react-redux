import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";

import { Button } from "../components/Button";
import { Info } from "../components/Info";
import {
  selectDetails,
  selectedCountries,
  selectedCurrentCountry,
} from "../store/details/details-selector";
import { loadCountryByName, setClear } from "../store/details/details-action";
import { useEffect } from "react";

export const Details = () => {
  const { currentCountry, status, error } = useSelector(selectDetails);
  const dispatch = useDispatch();
  const { name } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(loadCountryByName(name));
  }, [name, dispatch]);
  return (
    <div>
      <Button
        onClick={() => {
          navigate(-1);
          dispatch(setClear());
        }}
      >
        <IoArrowBack /> Back
      </Button>
      {currentCountry && <Info push={navigate} {...currentCountry} />}
    </div>
  );
};

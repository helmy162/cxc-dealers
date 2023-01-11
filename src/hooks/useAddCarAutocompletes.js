import { useState, useEffect } from 'react';
import RapidApi from 'src/utils/api/rapidapi';
import { fYear } from 'src/utils/formatTime';

function useAddCarAutocompletes ({ year, make, model, trim }) {
  const [ makes, setMakes ] = useState([]);
  const [ models, setModels ] = useState([]);
  const [ years, setYears ] = useState([]);
  const [ trims, setTrims ] = useState([]);
  const [ engines, setEngines ] = useState([]);
  const [ exteriorColors, setExteriorColors ] = useState([]);
  const [ interiorColors, setInteriorColors ] = useState([]);

  useEffect(() => {
    async function fetchOptions() {
      const makes = await RapidApi.fetchMakes(fYear(year));
      setMakes(makes)
    }
    fetchOptions();
  }, [year]);

  useEffect(() => {
    async function fetchOptions() {
      if (make) {
        const models = await RapidApi.fetchModels(make);
        setModels(models);
      }
    }
    fetchOptions();
  }, [make]);

  useEffect(() => {
    async function fetchOptions() {
      if (make && model) {
        const years = await RapidApi.fetchYears({ make, model });
        setYears(years);
        const formattedYear = fYear(year);
        const params = { make, model, year: formattedYear }
        const trims = await RapidApi.fetchTrims(params);
        setTrims(trims);
        if (trim) {
          const engines = await RapidApi.fetchEngines({ ...params, trim });
          setEngines(engines);
          const exteriorColors = await RapidApi.fetchExteriorColors({ ...params, trim });
          setExteriorColors([...new Set(exteriorColors.map(color => color.name))]);
          const interiorColors = await RapidApi.fetchInteriorColors({ ...params, trim });
          setInteriorColors([...new Set(interiorColors.map(color => color.name))]);
        }
      }
      
    }
    fetchOptions();
  }, [make, model, year, trim]);

  return { makes, models, years, trims, engines, exteriorColors, interiorColors };
}

export default useAddCarAutocompletes;

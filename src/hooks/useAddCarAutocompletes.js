import { set } from 'lodash';
import { useState, useEffect } from 'react';
import RapidApi from 'src/utils/api/rapidapi';
import { fYear } from 'src/utils/formatTime';

function useAddCarAutocompletes ({ year, make, model, trim, generation }) {
  const [ makes, setMakes ] = useState([]);
  const [ models, setModels ] = useState([]);
  const [ generations, setGenerations ] = useState([])
  const [ years, setYears ] = useState([]);
  const [ trims, setTrims ] = useState([]);
  const [ engines, setEngines ] = useState([]);

  useEffect(() => {
    async function fetchOptions() {
      const makes = await RapidApi.fetchMakes();
      setMakes(makes)
    }
    fetchOptions();
  }, []);

  useEffect(() => {
    async function fetchOptions() {
      if (make) {
        const models = await RapidApi.fetchModels(make.id);
        setModels(models);
      }
    }
    fetchOptions();
  }, [make]);

  useEffect(() => {
    async function fetchOptions() {
      if (model) {
        const generations = await RapidApi.fetchGenerations(model.id);
        setGenerations(generations);
      }
    }
    fetchOptions();
  }, [model]);

  useEffect(() => {
    async function fetchOptions() {
      if (make && model && generation) {
        const trims = await RapidApi.fetchTrims(generation.id);
        setTrims(trims);
        if (trim) {
          const specs = await RapidApi.fetchSpecs(trim.id);
          setEngines(specs);
        }
      }
      
    }
    fetchOptions();
  }, [generation , trim]);

  return { makes, models, generations, years, trims, engines };
}

export default useAddCarAutocompletes;

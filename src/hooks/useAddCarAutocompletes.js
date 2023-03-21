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
        const carId = makes.find(carMake => carMake.name === make)?.id;
        const models = await RapidApi.fetchModels(carId);
        setModels(models);
      }
    }
    fetchOptions();
  }, [make, makes]);

  useEffect(() => {
    async function fetchOptions() {
      const modelId = models.find(carModel => carModel.name == model)?.id;
      if (model && modelId) {
        const generations = await RapidApi.fetchGenerations(modelId);
        setGenerations(generations);
      }
    }
    fetchOptions();
  }, [model, models, make , makes]);

  useEffect(() => {
    async function fetchOptions() {
      const generationId = generations.find(carGeneration => carGeneration.name === generation)?.id;
      if (make && model && generation && generationId) {
        const trims = await RapidApi.fetchTrims(generationId);
        setTrims(trims);
        const trimId = trims.find(trimmm => (trimmm.trim + ' ' + trimmm.series) == trim)?.id;
        if (trim && trimId) {
          const specs = await RapidApi.fetchSpecs(trimId);
          setEngines(specs);
        }
      }
      
    }
    fetchOptions();
  }, [generation , trim, generations]);

  return { makes, models, generations, years, trims, engines };
}

export default useAddCarAutocompletes;

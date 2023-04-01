import { set } from 'lodash';
import { useState, useEffect } from 'react';
import carData from '../sections/AddCar/SummaryStep/carData.json'
import { fYear } from 'src/utils/formatTime';

function useAddCarAutocompletes ({  make, model, trim}) {
const [ makes, setMakes ] = useState(Object.keys(carData));
const [ models, setModels ] = useState([]);
const [ trims, setTrims ] = useState([]);

useEffect(() => {
if (make) {
  setModels(Object.keys(carData[make]) || ['Others']);
  setModels(models => [...models, 'Other']);
}
}, [make]);

useEffect(() => {
if (model !== 'Other' && make && model ) {
  setTrims(Object.keys(carData[make][model]));
  setTrims(trims => [...trims, 'Other']);
}
else if(model === 'Other' && make) {
  setTrims(['Other']);
}
}, [ make, model]);

return { makes, models, trims };
}

export default useAddCarAutocompletes;
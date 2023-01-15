import axiosInstance from "../axios";
import { fYear } from "../formatTime";

const mapSummaryToApiRequest = ({ make, model, trim, engine, ...rest }) => ({
  ...rest,
  car_name: `${make.name} ${model.name}`,
  model: model.name,
  make: make.name,
  trim,
  engine: {
    type: engine.type,
    size: engine.size,
    cylindres: engine.cylindres,
    horsepower_hp: engine.horsepower_hp,
    transmission: engine.transmission,
    fuel_type: engine.fuel_type
  }
});

const mapCarDataToApiRequest = ({ carId, ...rest }) => {
  const data = {
    car_id: carId,
    ...rest,
  };
  return data
};

const mapTiresDataToApiRequest = ({ carId, FrontLeft, FrontRight, RearLeft, RearRight, SpareTyre}) => {
  return {
    car_id: carId,
    inputs: {
      Front_Left: {
        Year: fYear(FrontLeft),
      },
      Front_Right: {
        Year: fYear(FrontRight),
      },
      Rear_Left: {
        Year: fYear(RearLeft),
      },
      Rear_Right: {
        Year: fYear(RearRight),
      }
    },
    SpareTyre,
  }
}

const generateInfo = async (form) => {
  const { data } = await axiosInstance.post('inspecter/generate-info', mapSummaryToApiRequest(form));
  return data;
};
const saveEngineAndTransmission = (data) => axiosInstance.post('inspecter/engine-transmissions', mapCarDataToApiRequest(data));
const saveSSA = (data) => axiosInstance.post('inspecter/ssa', mapCarDataToApiRequest(data));
const saveIEAC = (data) => axiosInstance.post('inspecter/ieac', mapCarDataToApiRequest(data));
const saveCarSpecs = (data) => axiosInstance.post('inspecter/car-spaces', mapCarDataToApiRequest(data));
const saveTyres = (data) => axiosInstance.post('inspecter/wheels', mapTiresDataToApiRequest(data))
const uploadPhotos = (data) => { 
  const bodyFormData = new FormData();
  (data?.images || []).map(image => bodyFormData.append('images[]', image));
  bodyFormData.append('car_id', 31); 
  axiosInstance.post('inspecter/cars/images', bodyFormData);
}

const methods = {
  generateInfo,
  saveEngineAndTransmission,
  saveSSA,
  saveIEAC,
  saveCarSpecs,
  saveTyres,
  uploadPhotos,
};

export default methods;
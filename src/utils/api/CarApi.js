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
      Front_Left_Year: fYear(FrontLeft),
      Front_Right_Year: fYear(FrontRight),
      Rear_Left_Year: fYear(RearLeft),
      Rear_Right_Year: fYear(RearRight),
    },
    Spare_Tyre: SpareTyre,
  }
};

const mapExteriorConditionToApi = ({ carId, markers }) => ({
  car_id: carId,
  markers: markers.map(marker => ({ defect: marker.defect, y: marker.top, x: marker.left })),
});

const generateInfo = async (form) => {
  const { data } = await axiosInstance.post('inspector/add/car/general-info', mapSummaryToApiRequest(form));
  return data;
};
const saveEngineAndTransmission = (data) => axiosInstance.post('inspector/add/car/engine-transmission', mapCarDataToApiRequest(data));
const saveSSA = (data) => axiosInstance.post('inspector/add/car/steering-suspension-brakes', mapCarDataToApiRequest(data));
const saveIEAC = (data) => axiosInstance.post('inspector/add/car/interior-electricals-AC', mapCarDataToApiRequest(data));
const saveCarSpecs = (data) => axiosInstance.post('inspector/add/car/specs', mapCarDataToApiRequest(data));
const saveTyres = (data) => axiosInstance.post('inspector/add/car/wheels', mapTiresDataToApiRequest(data));
const uploadPhotos = (data) => { 
  const bodyFormData = new FormData();
  (data?.images || []).map(image => bodyFormData.append('images[]', image));
  bodyFormData.append('car_id', 31); 
  axiosInstance.post('inspecter/add/cars/images', bodyFormData);
};
const saveExteriorCondition = (data) => axiosInstance.post('inspector/add/car/exterior-condition', mapExteriorConditionToApi(data));

const methods = {
  generateInfo,
  saveEngineAndTransmission,
  saveSSA,
  saveIEAC,
  saveCarSpecs,
  saveTyres,
  uploadPhotos,
  saveExteriorCondition,
};

export default methods;
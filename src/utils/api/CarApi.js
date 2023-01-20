import axiosInstance from "../axios";
import { fYear } from "../formatTime";

const mapSummaryToApiRequest = ({ make, model, trim, engine, year, carId,interior_type, body_type, 
  specification, exterior_color, interior_color, registered_emirates, keys, is_new, first_owner, mileage, service_history,
  manuals, warranty, accident_history, bank_finance, car_history_comment, ...rest }) => ({
  ...rest,
  details:{
    model: model.name,
    make: make.name,
    year: fYear(year),
    trim,
    mileage,
    engine: {
      type: engine.type,
      size: engine.size,
      cylindres: engine.cylindres,
      horsepower_hp: engine.horsepower_hp,
      transmission: engine.transmission,
      fuel_type: engine.fuel_type
    },
    registered_emirates,
    interior_type,
    body_type,
    specification,
    exterior_color,
    interior_color,
    keys,
    is_new,
    first_owner,
  },
  history:{
    service_history,
    manuals,
    warranty,
    accident_history,
    bank_finance,
    car_history_comment,
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
    Front_Left_Year: fYear(FrontLeft),
    Front_Right_Year: fYear(FrontRight),
    Rear_Left_Year: fYear(RearLeft),
    Rear_Right_Year: fYear(RearRight),
    Spare_Tyre: SpareTyre,
  }
};

const mapExteriorConditionToApi = ({ carId, markers }) => { 
  const bodyFormData = new FormData();
  bodyFormData.append('car_id', carId);
  markers.map((marker, idx) =>  {
    bodyFormData.append(`images[${idx}]`, marker.file);
    bodyFormData.append('markers[]', JSON.stringify({ x: marker.left, y: marker.top, defect: marker.defect, photo: idx }))
  });

  return bodyFormData;
};

const generateInfo = async (form) => {
  const { data } = await axiosInstance.post('inspector/add/car/general-info', mapSummaryToApiRequest(form));
  return data?.car || {};
};
const saveEngineAndTransmission = async (data) => await axiosInstance.post('inspector/add/car/engine-transmission', mapCarDataToApiRequest(data));
const saveSSA = async (data) => await axiosInstance.post('inspector/add/car/steering-suspension-brakes', mapCarDataToApiRequest(data));
const saveIEAC = async (data) => await axiosInstance.post('inspector/add/car/interior-electricals-AC', mapCarDataToApiRequest(data));
const saveCarSpecs = async (data) => await axiosInstance.post('inspector/add/car/specs', mapCarDataToApiRequest(data));
const saveTyres = async (data) => await axiosInstance.post('inspector/add/car/wheels', mapTiresDataToApiRequest(data));
const uploadPhotos = async ({ carId, ...data }) => { 
  const bodyFormData = new FormData();
  (data?.images || []).map(image => bodyFormData.append('images[]', image));
  bodyFormData.append('car_id', 2); 
  return await axiosInstance.post('inspector/add/car/images', bodyFormData);
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
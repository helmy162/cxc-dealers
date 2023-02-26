import axiosInstance from "../axios";
import { fYear } from "../formatTime";

const mapFormDataToApiRequest = ({ 
  make, 
  model, 
  trim, 
  engine, 
  year, 
  generation, 
  FrontLeft, 
  FrontRight, 
  RearLeft, 
  RearRight, 
  markers,
  images,
  id_images,
  registeration_card_images,
  vin_images,
  insurance_images,
  ...rest 
}) => {
 
  
  // Map summary data
  const summaryData = {
    ...rest,
    model: model.name,
    make: make.name,
    year: fYear(year),
    trim: trim.trim + ' ' + trim.series,
    generation: generation.name,
    engine: {
      type: engine.engineType,
      size: engine.capacityCm3,
      cylinders: engine.numberOfCylinders,
      horsepower_hp: engine.engineHp,
      transmission: engine.transmission,
    },
    Front_Left_Year: fYear(FrontLeft),
    Front_Right_Year: fYear(FrontRight),
    Rear_Left_Year: fYear(RearLeft),
    Rear_Right_Year: fYear(RearRight),

  };
  const bodyFormData = new FormData();
  Object.keys(summaryData).forEach((key) => {
    bodyFormData.append(key, summaryData[key]);
  });
  
  // Map exterior condition data
  markers.map((marker, idx) =>  {
    bodyFormData.append(`exterior_images[${idx}]`, marker.file);
    bodyFormData.append('markers[]', JSON.stringify({ x: marker.left, y: marker.top, defect: marker.defect, photo: idx }));
  });

  (images || []).map(image => bodyFormData.append('images[]', image));
  (id_images || []).map(image => bodyFormData.append('id_images[]', image));
  (registeration_card_images || []).map(image => bodyFormData.append('registeration_card_images[]', image));
  (vin_images || []).map(image => bodyFormData.append('vin_images[]', image));

  
  return bodyFormData;
};



const methods = {
 mapFormDataToApiRequest
};

export default methods;
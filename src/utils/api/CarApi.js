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
  registration_card_images,
  vin_images,
  insurance_images,
  ...rest 
}) => {
 
  // Map summary data
  const summaryData = {
    ...rest,
    model: model,
    make: make,
    year: !isNaN(new Date(year))?  new Date(year).getFullYear() : fYear(parseInt(year)),
    trim: trim,
    generation: generation,
    FrontLeft: !isNaN(new Date(FrontLeft))?  fYear(FrontLeft) : fYear(parseInt(FrontLeft)),
    FrontRight: !isNaN(new Date(FrontRight))?  fYear(FrontRight) : fYear(parseInt(FrontRight)),
    RearLeft: !isNaN(new Date(RearLeft))?  fYear(RearLeft) : fYear(parseInt(RearLeft)),
    RearRight: !isNaN(new Date(RearRight))?  fYear(RearRight) : fYear(parseInt(RearRight)),
  };

  // Create a new object with the engine properties
  const engineData = {
    type: engine.engineType,
    size: engine.capacityCm3,
    cylinders: engine.numberOfCylinders,
    horsepower_hp: engine.engineHp,
    transmission: engine.transmission,
  };

  const bodyFormData = new FormData();
  Object.keys(summaryData).forEach((key) => {
    bodyFormData.append(key, summaryData[key]);
  });

  // Append the engine data under the key "engine"
  bodyFormData.append('engine', JSON.stringify(engineData));

  
  // Map exterior condition data
  markers.map((marker, idx) =>  {
    bodyFormData.append(`exterior_images[${idx}]`, marker.file);
    bodyFormData.append('markers[]', JSON.stringify({ x: marker.left, y: marker.top, defect: marker.defect, photo: idx }));
  });

  (images || []).map(image => bodyFormData.append('images[]', image));
  (id_images || []).map(image => bodyFormData.append('id_images[]', image));
  (registration_card_images || []).map(image => bodyFormData.append('registration_card_images[]', image));
  (vin_images || []).map(image => bodyFormData.append('vin_images[]', image));
  (insurance_images || []).map(image => bodyFormData.append('insurance_images[]', image));

  
  return bodyFormData;
};



const methods = {
 mapFormDataToApiRequest
};

export default methods;
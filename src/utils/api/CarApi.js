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
  defects,
  images,
  deletedImages,
  id_images,
  deleted_id_images,
  registration_card_images,
  deleted_registration_card_images,
  vin_images,
  deleted_vin_images,
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

  const bodyFormData = new FormData();
  Object.keys(summaryData).forEach((key) => {
    bodyFormData.append(key, summaryData[key]);
  });

  bodyFormData.append('defects', JSON.stringify(defects));
  // Map exterior condition data
  // markers.map((marker, idx) =>  {
  //   bodyFormData.append(`exterior_images[${idx}]`, marker.file);
  //   bodyFormData.append('markers[]', JSON.stringify({ x: marker.left, y: marker.top, defect: marker.defect, photo: idx }));
  // });

  (images || []).map(image => bodyFormData.append('images[]', image));
  (deletedImages || []).map(image => bodyFormData.append('deletedImages[]', image));

  (id_images || []).map(image => bodyFormData.append('id_images[]', image));
  (deleted_id_images || []).map(image => bodyFormData.append('deleted_id_images[]', image));

  (registration_card_images || []).map(image => bodyFormData.append('registration_card_images[]', image));
  (deleted_registration_card_images || []).map(image => bodyFormData.append('deleted_registration_card_images[]', image));

  (vin_images || []).map(image => bodyFormData.append('vin_images[]', image));
  (deleted_vin_images || []).map(image => bodyFormData.append('deleted_vin_images[]', image));

  
  return bodyFormData;
};



const methods = {
 mapFormDataToApiRequest
};

export default methods;
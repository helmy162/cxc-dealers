import * as Yup from 'yup';


export const AllSchema = Yup.object().shape({
  // General
  seller_id: Yup.string().nullable().required('General: Seller ID is required'),
  seller_price: Yup.number('General: Should be a number').nullable().required('General: Seller price is required'),
  year: Yup.string().nullable().required('General: Year is required'),
  make: Yup.string().nullable().required('General: Make is required'),
  model: Yup.string().nullable().required('General: Model is required'),
  trim: Yup.string().nullable().required('General: Trim is required'),
  mileage: Yup.number('General: Should be a number').nullable().required('General: Mileage is required'),
  engine_size : Yup.number('General: Should be a number').nullable().required('General: Engine size is required'),
  number_of_cylinders : Yup.number('General: Should be a number').nullable().required('General: Number of Cylinders is required'),
  registered_emirates: Yup.string().nullable().required('General: Registered emirates is required'),
  body_type: Yup.string(),
  exterior_color: Yup.string().nullable(),
  interior_color: Yup.string().nullable(),
  interior_type: Yup.string(),
  specification: Yup.string(),
  first_owner: Yup.string(),
  keys: Yup.string(),
  service_history: Yup.string(),
  manuals: Yup.string(),
  warranty: Yup.string(),
  accident_history: Yup.string(),
  bank_finance: Yup.string(),
  car_history_comment: Yup.string(),

  // Documents
  id_images: Yup.array(),
  registration_card_images: Yup.array(),
  vin_images: Yup.array(),
  insurance_images: Yup.array(),

  // Exterior
  markers: Yup.array(),
  Chassis: Yup.string(),
  Chassis_Extension: Yup.string(),
  exterior_comment: Yup.string(),

  // Engine
  Radiator_Condition: Yup.string(),
  Silencer: Yup.string(),
  Axels: Yup.string(),
  Engine_Belts: Yup.string(),
  Gear_Lever: Yup.string(),
  Radiator_Fan: Yup.string(),
  Engine_Idling: Yup.string(),
  Engine_Noise: Yup.string(),
  Engine_Oil: Yup.string(),
  Engine_Smoke: Yup.string(),
  Exhaust: Yup.string(),
  Coolant: Yup.string(),
  Battery_Condition: Yup.string(),
  Gear_Shifting: Yup.string(),
  Shift_Interlock_Condition: Yup.string(),
  Oil_Leaks: Yup.string(),
  Water_Sludge: Yup.string(),
  Engine_Comment: Yup.string(),
  Warning_Signal: Yup.boolean(),

  // SSA
  Brake_Pads: Yup.string(),
  Brake_Discs_Or_Lining: Yup.string(),
  Parking_Brake_Operations: Yup.string(),
  Suspension: Yup.string(),
  Shock_Absorber_Operation: Yup.string(),
  Steering_Operation: Yup.string(),
  Steering_Alignment: Yup.string(),
  Wheel_Alignment: Yup.string(),
  Steering_Comment: Yup.string(),

  // IEAC
  Dashboard_Condition: Yup.string(),
  Steering_Mounted_Controls: Yup.string(),
  Center_Console_Box: Yup.string(),
  Speedometer_Cluster: Yup.string(),
  Door_Trim_Panels: Yup.string(),
  Headliner: Yup.string(),
  Seat_Controls: Yup.string(),
  Boot_Trunk_Area: Yup.string(),
  Central_Lock_Operation: Yup.string(),
  Music_Multimedia_System: Yup.string(),
  Navigation_Control: Yup.string(),
  Headlights: Yup.string(),
  Tail_Lights: Yup.string(),
  Sunroof_Condition: Yup.string(),
  Windows_Controls_Condition: Yup.string(),
  Cruise_Control: Yup.string(),
  Push_Stop_Button: Yup.string(),
  AC_Cooling: Yup.string(),
  Convertible_Operations: Yup.string(),
  AC_Heating: Yup.string(),
  Airbag: Yup.string(),
  Interior_Comment: Yup.string(),

  // Specs
  Drives: Yup.string(),
  Tiptronic_Gears: Yup.string(),
  Sunroof_Type: Yup.string(),
  Wheel_Type: Yup.string(),
  Convertible: Yup.string(),
  Other_Features: Yup.string(),

  // Tyres
  FrontLeft: Yup.string(),
  FrontRight: Yup.string(),
  RearLeft: Yup.string(),
  RearRight: Yup.string(),
  SpareTyre: Yup.boolean(),
  Tyres_Comment: Yup.string(),

  // Images
  images: Yup.array().required('images: Please add at least one image').min(1, 'images: Please add at least one image')
});

export const AllDefaultValues = (carData) => ( {
  // General
  seller_id: carData?.seller_id || '',
  seller_price: carData?.details?.seller_price || 0,
  year:  Date.parse(`${carData?.details.year}`) || null,
  make: carData?.details.make || '',
  model: carData?.details.model || '',
  trim: carData?.details.trim || '',
  mileage: carData?.details.mileage || 0,
  registered_emirates: carData?.details.registered_emirates || "",
  engine_size: carData?.details.engine_size || 0,
  number_of_cylinders: carData?.details.number_of_cylinders || 0,
  body_type: carData?.details.body_type || "",
  exterior_color: carData?.details.exterior_color || '',
  interior_color: carData?.details.interior_color || '',
  interior_type: carData?.details.interior_type || "",
  specification: carData?.details.specification || "",
  first_owner: carData?.details.first_owner || "",
  keys: carData?.details.keys || "",
  service_history: carData?.history.service_history || "",
  manuals: carData?.history.manuals || "",
  warranty: carData?.history.warranty || "",
  accident_history: carData?.history.accident_history || "",
  bank_finance: carData?.history.bank_finance || "",
  car_history_comment: carData?.history.car_history_comment || "",

  
  // Documents
  id_images: carData?.id_images?.map((image) => ({
    preview: `https://api.carsxchange.com/storage/id_images/${image}`,
  })) || [],
  registration_card_images: carData?.registration_card_images? carData?.registration_card_images.map((image) => ({
    preview: `https://api.carsxchange.com/storage/registration_card_images/${image}`,
  })) : [],
  vin_images: carData?.vin_images?.map((image) => ({
    preview: `https://api.carsxchange.com/storage/vin_images/${image}`,
  })) || [],
  insurance_images: [],

  // Exterior
  markers: carData?.exterior?.markers || [],
  Chassis: carData?.engine_transmission?.Chassis || 'good',
  Chassis_Extension : carData?.engine_transmission?.Chassis_Extension || 'good',
  exterior_comment: carData?.exterior?.exterior_comment || '',

  // Engine
  Radiator_Condition: carData?.engine_transmission?.Radiator_Condition || 'good',
  Silencer: carData?.engine_transmission?.Silencer || 'normal',
  Axels: carData?.engine_transmission?.Axels || 'good',
  Engine_Belts: carData?.engine_transmission?.Engine_Belts || 'good',
  Gear_Lever: carData?.engine_transmission?.Gear_Lever || 'good',
  Radiator_Fan: carData?.engine_transmission?.Radiator_Fan || 'good',
  Engine_Idling: carData?.engine_transmission?.Engine_Idling || 'normal',
  Engine_Noise: carData?.engine_transmission?.Engine_Noise || 'normal',
  Engine_Oil: carData?.engine_transmission?.Engine_Oil || 'good',
  Engine_Smoke: carData?.engine_transmission?.Engine_Smoke || 'normal',
  Exhaust: carData?.engine_transmission?.Exhaust || 'normal',
  Coolant: carData?.engine_transmission?.Coolant || 'good',
  Battery_Condition: carData?.engine_transmission?.Battery_Condition || 'good',
  Gear_Shifting: carData?.engine_transmission?.Gear_Shifting || 'good',
  Shift_Interlock_Condition: carData?.engine_transmission?.Shift_Interlock_Condition || 'good',
  Oil_Leaks: carData?.engine_transmission?.Oil_Leaks || 'none',
  Water_Sludge: carData?.engine_transmission?.Water_Sludge ||'none',
  Engine_Comment: carData?.engine_transmission?.Engine_Comment || '',
  Warning_Signal: carData?.engine_transmission?.Warning_Signal == 1 ? true : false,

  // SSA
  Brake_Pads: carData?.steering?.Brake_Pads || "good",
  Brake_Discs_Or_Lining: carData?.steering?.Brake_Discs_Or_Lining || "good",
  Parking_Brake_Operations: carData?.steering?.Parking_Brake_Operations || "good",
  Suspension: carData?.steering?.Suspension || "good",
  Shock_Absorber_Operation: carData?.steering?.Shock_Absorber_Operation || "good",
  Steering_Operation: carData?.steering?.Steering_Operation || "good",
  Steering_Alignment: carData?.steering?.Steering_Alignment || "good",
  Wheel_Alignment: carData?.steering?.Wheel_Alignment || "good",
  Steering_Comment: carData?.steering?.Steering_Comment || "",

  // IEAC
  Dashboard_Condition: carData?.interior?.Dashboard_Condition || "good",
  Steering_Mounted_Controls: carData?.interior?.Steering_Mounted_Controls ||  "good",
  Center_Console_Box: carData?.interior?.Center_Console_Box ||  "good",
  Speedometer_Cluster: carData?.interior?.Speedometer_Cluster || "good",
  Door_Trim_Panels: carData?.interior?.Door_Trim_Panels || "good",
  Headliner: carData?.interior?.Headliner || "good",
  Seat_Controls: carData?.interior?.Seat_Controls || "good",
  Boot_Trunk_Area: carData?.interior?.Boot_Trunk_Area || "good",
  Central_Lock_Operation: carData?.interior?.Central_Lock_Operation || "good",
  Music_Multimedia_System: carData?.interior?.Music_Multimedia_System || "good",
  Navigation_Control: carData?.interior?.Navigation_Control || "good",
  Headlights: carData?.interior?.Headlights || "good",
  Tail_Lights: carData?.interior?.Tail_Lights || "good",
  Sunroof_Condition: carData?.interior?.Sunroof_Condition || "good",
  Windows_Controls_Condition: carData?.interior?.Windows_Controls_Condition || "good",
  Cruise_Control: carData?.interior?.Cruise_Control || "average",
  Push_Stop_Button: carData?.interior?.Push_Stop_Button || "good",
  AC_Cooling: carData?.interior?.AC_Cooling || "good",
  Convertible_Operations: carData?.interior?.Convertible_Operations || "good",
  AC_Heating: carData?.interior?.AC_Heating || "good",
  Airbag: carData?.interior?.Airbag || "good",
  Interior_Comment: carData?.interior?.Interior_Comment || "",

  // Specs
  Drives: carData?.specs?.Drives || 'good',
  Tiptronic_Gears: carData?.specs?.Tiptronic_Gears || 'working',
  Convertible: carData?.specs?.Convertible || 'hard_top',
  Sunroof_Type: carData?.specs?.Sunroof_Type || 'not_available',
  Wheel_Type: carData?.specs?.Wheel_Type || '2wd',
  Other_Features: carData?.specs?.Other_Features || '',

  // Tyres
  FrontLeft:  Date.parse(`${carData?.wheels?.FrontLeft}`) || "",
  FrontRight:  Date.parse(`${carData?.wheels?.FrontRight}`) || "",
  RearLeft:  Date.parse(`${carData?.wheels?.RearLeft}`) || "",
  RearRight:  Date.parse(`${carData?.wheels?.RearRight}`) || "",
  Spare_Tyre: carData?.wheels?.Spare_Tyre || false,
  Tyres_Comment: carData?.wheels?.Tyre_Comment || "",

  // Images
  images: carData?.images.map((image) => ({
    preview: `https://api.carsxchange.com/storage/car_images/${image}`,
  })) || [],
});

import * as Yup from 'yup';


export const AllSchema = Yup.object().shape({
  // Details
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
  fuel_type: Yup.string(),
  transmission: Yup.string(),
  wheel_type: Yup.string(),
  car_options: Yup.string(),
  safety_belts: Yup.string(),
  first_owner: Yup.string(),
  keys: Yup.string(),

  // History
  service_history: Yup.string(),
  manuals: Yup.string(),
  warranty: Yup.string(),
  accident_history: Yup.string(),
  bank_finance: Yup.string(),
  bank_finance_status: Yup.string(),
  car_history_comment: Yup.string(),

  // Documents
  id_images: Yup.array(),
  registration_card_images: Yup.array(),
  vin_images: Yup.array(),
  insurance_images: Yup.array(),

  // Exterior
  // markers: Yup.array(),
  defects: Yup.object(),
  Chassis: Yup.string(),
  Chassis_Extension: Yup.string(),
  exterior_comment: Yup.string(),

  // Engine
  Radiator_Condition: Yup.string(),
  Silencer: Yup.string(),
  Axels: Yup.string(),
  Radiator_Fan: Yup.string(),
  Engine_Idling: Yup.string(),
  Engine_Noise: Yup.string(),
  Engine_Smoke: Yup.string(),
  Coolant: Yup.string(),
  Transmission_Condition: Yup.string(),
  Engine_Group: Yup.string(),
  Hoses_and_Pipes_Condition: Yup.string(),
  Shift_Interlock_Condition: Yup.string(),
  Oil_Leaks: Yup.string(),
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
  Rotors_and_Drums: Yup.string(),
  Struts_and_Shocks: Yup.string(),
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
  Sunroof_Type: Yup.string(),
  Convertible: Yup.string(),
  Other_Features: Yup.string(),

  // Tyres
  FrontLeft: Yup.string(),
  FrontRight: Yup.string(),
  RearLeft: Yup.string(),
  RearRight: Yup.string(),
  SpareTyre: Yup.boolean(),
  Tyres_Comment: Yup.string(),
  rim_type: Yup.string(),
  rim_condition: Yup.string(),

  // Images
  images: Yup.array().required('images: Please add at least one image').min(1, 'images: Please add at least one image'),
  deletedImages: Yup.array(),
});

export const AllDefaultValues = (carData, isEdit, savedData) => ( {
  // General
  seller_id: 
    isEdit? carData?.seller?.id || ''
    : savedData?.seller_id || '',
  seller_price: 
    isEdit? carData?.details?.seller_price || 0
    : savedData?.seller_price || 0,
  year:  
    isEdit? Date.parse(`${carData?.details.year}`) || null
    : savedData?.year || null,
  make:
    isEdit? carData?.details?.make || ''
    : savedData?.make || '',
  model: 
    isEdit? carData?.details?.model || ''
    : savedData?.model || '',
  trim: 
    isEdit? carData?.details?.trim || ''
    : savedData?.trim || '',
  mileage: 
    isEdit? carData?.details?.mileage || 0
    : savedData?.mileage || 0,
  registered_emirates: 
    isEdit? carData?.details?.registered_emirates || ''
    : savedData?.registered_emirates || '',
  engine_size: 
    isEdit? carData?.details?.engine_size || 0
    : savedData?.engine_size || 0,
  number_of_cylinders: 
    isEdit? carData?.details?.number_of_cylinders || 0
    : savedData?.number_of_cylinders || 0,
  body_type: 
    isEdit? carData?.details?.body_type || ''
    : savedData?.body_type || '',
  exterior_color: 
    isEdit? carData?.details?.exterior_color || ''
    : savedData?.exterior_color || '',
  interior_color: 
    isEdit? carData?.details?.interior_color || ''
    : savedData?.interior_color || '',
  interior_type: 
    isEdit? carData?.details?.interior_type || ''
    : savedData?.interior_type || '',
  specification: 
    isEdit? carData?.details?.specification || ''
    : savedData?.specification || '',
  fuel_type:
    isEdit? carData?.details?.fuel_type || ''
    : savedData?.fuel_type || '',
  transmission:
    isEdit? carData?.details?.transmission || ''
    : savedData?.transmission || '',
  wheel_type:
    isEdit? carData?.details?.wheel_type || ''
    : savedData?.wheel_type || '',
  car_options:
    isEdit? carData?.details?.car_options || ''
    : savedData?.car_options || '',
  safety_belt:
    isEdit? carData?.details?.safety_belt || ''
    : savedData?.safety_belt || '',

  // History
  first_owner: 
    isEdit? carData?.details?.first_owner || ''
    : savedData?.first_owner || '',
  keys: 
    isEdit? carData?.details?.keys || ''
    : savedData?.keys || '',
  service_history: 
    isEdit? carData?.history?.service_history || ''
    : savedData?.service_history || '',
  manuals: 
    isEdit? carData?.history?.manuals || ''
    : savedData?.manuals || '',
  warranty: 
    isEdit? carData?.history?.warranty || ''
    : savedData?.warranty || '',
  accident_history: 
    isEdit? carData?.history?.accident_history || ''
    : savedData?.accident_history || '',
  bank_finance: 
    isEdit? carData?.history?.bank_finance || ''
    : savedData?.bank_finance || '',
    bank_finance_status:
    isEdit? carData?.history?.bank_finance_status || 'N/A'
    : savedData?.bank_finance_status || 'N/A',
  car_history_comment: 
    isEdit? carData?.history?.car_history_comment || ''
    : savedData?.car_history_comment || '',

  
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
  // markers: carData?.exterior?.markers || [],
  defects: 
    isEdit? carData?.exterior?.markers || {}
    : savedData?.defects || {},
  Chassis: 
    isEdit? carData?.engine_transmission?.Chassis || 'good'
    : savedData?.Chassis || 'good',
  Chassis_Extension : 
    isEdit? carData?.engine_transmission?.Chassis_Extension || 'good'
    : savedData?.Chassis_Extension || 'good',
  exterior_comment: 
    isEdit? carData?.exterior?.exterior_comment || ''
    : savedData?.exterior_comment || '',

  // Engine
  Radiator_Condition: 
    isEdit ? carData?.engine_transmission?.Radiator_Condition || 'good'
    : savedData?.Radiator_Condition || 'good',
  Silencer: 
    isEdit ? carData?.engine_transmission?.Silencer || 'normal'
    : savedData?.Silencer || 'normal',
  Axels: 
    isEdit ? carData?.engine_transmission?.Axels 
    : savedData?.Axels || 'good',
  Radiator_Fan: 
    isEdit ? carData?.engine_transmission?.Radiator_Fan || 'good'
    : savedData?.Radiator_Fan || 'good',
  Engine_Idling: 
    isEdit ? carData?.engine_transmission?.Engine_Idling || 'normal'
    : savedData?.Engine_Idling || 'normal',
  Engine_Noise: 
    isEdit ? carData?.engine_transmission?.Engine_Noise || 'normal'
    : savedData?.Engine_Noise || 'normal',
  Engine_Smoke: 
    isEdit ? carData?.engine_transmission?.Engine_Smoke || 'normal'
    : savedData?.Engine_Smoke || 'normal',
  Coolant: 
    isEdit ? carData?.engine_transmission?.Coolant || 'good'
    : savedData?.Coolant || 'good',
  Transmission_Condition: 
    isEdit ? carData?.engine_transmission?.Transmission_Condition || 'good'
    : savedData?.Transmission_Condition || 'good',
  Engine_Group:
    isEdit ? carData?.engine_transmission?.Engine_Group || 'average'
    : savedData?.Engine_Group || 'average',
  Hoses_and_Pipes_Condition:
    isEdit ? carData?.engine_transmission?.Hoses_and_Pipes_Condition || 'average'
    : savedData?.Hoses_and_Pipes_Condition || 'average',
  Shift_Interlock_Condition: 
    isEdit ? carData?.engine_transmission?.Shift_Interlock_Condition || 'good'
    : savedData?.Shift_Interlock_Condition || 'good',
  Oil_Leaks: 
    isEdit ? carData?.engine_transmission?.Oil_Leaks || 'none'
    : savedData?.Oil_Leaks || 'none',
  Engine_Comment: 
    isEdit ? carData?.engine_transmission?.Engine_Comment || ''
    : savedData?.Engine_Comment || '',
  Warning_Signal: 
    isEdit? carData?.engine_transmission?.Warning_Signal == 1 ? true : false
    : savedData?.Warning_Signal == 1 ? true : false,


  // SSA
  Brake_Pads: 
    isEdit? carData?.steering?.Brake_Pads || 'good'
    : savedData?.Brake_Pads || 'good',
  Brake_Discs_Or_Lining:
    isEdit? carData?.steering?.Brake_Discs_Or_Lining  || 'good'
    : savedData?.Brake_Discs_Or_Lining || 'good',
  Parking_Brake_Operations: 
    isEdit? carData?.steering?.Parking_Brake_Operations || 'good'
    : savedData?.Parking_Brake_Operations || 'good',
  Suspension: 
    isEdit? carData?.steering?.Suspension || 'good'
    : savedData?.Suspension || 'good',
  Shock_Absorber_Operation: 
    isEdit? carData?.steering?.Shock_Absorber_Operation || 'good'
    : savedData?.Shock_Absorber_Operation || 'good',
  Steering_Operation: 
    isEdit? carData?.steering?.Steering_Operation || 'good'
    : savedData?.Steering_Operation || 'good',
  Steering_Alignment: 
    isEdit? carData?.steering?.Steering_Alignment || 'good'
    : savedData?.Steering_Alignment || 'good',
  Wheel_Alignment: 
    isEdit? carData?.steering?.Wheel_Alignment || 'good'
    : savedData?.Wheel_Alignment || 'good',
  Rotors_and_Drums:
    isEdit? carData?.steering?.Rotors_and_Drums || 'good'
    : savedData?.Rotors_and_Drums || 'good',
  Struts_and_Shocks:
    isEdit? carData?.steering?.Struts_and_Shocks || 'good'
    : savedData?.Struts_and_Shocks || 'good',
  Steering_Comment: 
    isEdit? carData?.steering?.Steering_Comment || ''
    : savedData?.Steering_Comment || '',

  // IEAC
  Dashboard_Condition: 
  isEdit ? carData?.interior?.Dashboard_Condition || 'good'
  : savedData?.Dashboard_Condition || 'good',
Steering_Mounted_Controls: 
  isEdit ? carData?.interior?.Steering_Mounted_Controls || 'good'
  : savedData?.Steering_Mounted_Controls || 'good',
Center_Console_Box: 
  isEdit ? carData?.interior?.Center_Console_Box || 'good'
  : savedData?.Center_Console_Box || 'good',
Speedometer_Cluster: 
  isEdit ? carData?.interior?.Speedometer_Cluster || 'good'
  : savedData?.Speedometer_Cluster || 'good',
Door_Trim_Panels: 
  isEdit ? carData?.interior?.Door_Trim_Panels || 'good'
  : savedData?.Door_Trim_Panels || 'good',
Headliner: 
  isEdit ? carData?.interior?.Headliner || 'good'
  : savedData?.Headliner || 'good',
Seat_Controls: 
  isEdit ? carData?.interior?.Seat_Controls || 'good'
  : savedData?.Seat_Controls || 'good',
Boot_Trunk_Area: 
  isEdit ? carData?.interior?.Boot_Trunk_Area || 'good'
  : savedData?.Boot_Trunk_Area || 'good',
Central_Lock_Operation: 
  isEdit ? carData?.interior?.Central_Lock_Operation || 'good'
  : savedData?.Central_Lock_Operation || 'good',
Music_Multimedia_System: 
  isEdit ? carData?.interior?.Music_Multimedia_System || 'good'
  : savedData?.Music_Multimedia_System || 'good',
Navigation_Control: 
  isEdit ? carData?.interior?.Navigation_Control || 'average'
  : savedData?.Navigation_Control || 'average',
Headlights: 
  isEdit ? carData?.interior?.Headlights || 'good'
  : savedData?.Headlights || 'good',
Tail_Lights: 
  isEdit ? carData?.interior?.Tail_Lights || 'good'
  : savedData?.Tail_Lights || 'good',
Sunroof_Condition: 
  isEdit ? carData?.interior?.Sunroof_Condition || 'good'
  : savedData?.Sunroof_Condition || 'good',
Windows_Controls_Condition: 
  isEdit ? carData?.interior?.Windows_Controls_Condition || 'good'
  : savedData?.Windows_Controls_Condition || 'good',
Cruise_Control: 
  isEdit ? carData?.interior?.Cruise_Control || 'average'
  : savedData?.Cruise_Control || 'average',
Push_Stop_Button: 
  isEdit ? carData?.interior?.Push_Stop_Button || 'good'
  : savedData?.Push_Stop_Button || 'good',
AC_Cooling: 
  isEdit ? carData?.interior?.AC_Cooling || 'good'
  : savedData?.AC_Cooling || 'good',
Convertible_Operations: 
  isEdit ? carData?.interior?.Convertible_Operations || 'good'
  : savedData?.Convertible_Operations || 'good',
AC_Heating: 
  isEdit ? carData?.interior?.AC_Heating || 'good'
  : savedData?.AC_Heating || 'good',
Airbag: 
  isEdit ? carData?.interior?.Airbag || 'good'
  : savedData?.Airbag || 'good',
Interior_Comment: 
  isEdit ? carData?.interior?.Interior_Comment || ''
  : savedData?.Interior_Comment || '',

  // Specs
  Drives: 
    isEdit ? carData?.specs?.Drives || 'excellent'
    : savedData?.Drives || 'excellent',
  Convertible: 
    isEdit ? carData?.specs?.Convertible || 'hard_top'
    : savedData?.Convertible || 'hard_top',
  Sunroof_Type: 
    isEdit ? carData?.specs?.Sunroof_Type || 'not_available'
    : savedData?.Sunroof_Type || 'not_available',
  Other_Features: 
    isEdit ? carData?.specs?.Other_Features || ''
    : savedData?.Other_Features || '',

  // Tyres
  FrontLeft:
    isEdit ? Date.parse(`${carData?.wheels?.FrontLeft}`) || ''
    : savedData?.FrontLeft || '',
  FrontRight: 
    isEdit ? Date.parse(`${carData?.wheels?.FrontRight}`) || ''
    : savedData?.FrontRight || '',
  RearLeft:  
    isEdit ? Date.parse(`${carData?.wheels?.RearLeft}`) || ''
    : savedData?.RearLeft || '',
  RearRight:  
    isEdit ? Date.parse(`${carData?.wheels?.RearRight}`) || ''
    : savedData?.RearRight || '',
  rim_type:
    isEdit ? carData?.wheels?.rim_type || 'alloy'
    : savedData?.rim_type || 'alloy',
  rim_condition:
    isEdit ? carData?.wheels?.rim_condition || 'good'
    : savedData?.rim_condition || 'good',
  Spare_Tyre: 
    isEdit ?carData?.wheels?.Spare_Tyre || false
    : savedData?.Spare_Tyre || false,
  Tyres_Comment: 
    isEdit ? carData?.wheels?.Tyres_Comment || ''
    : savedData?.Tyres_Comment || '',

  // Images
  images: isEdit?
    carData?.images?.length > 0 ? carData.images.map((image) => `https://api.carsxchange.com/storage/car_images/${image}`) : []
    : [],

  deletedImages: [],
});

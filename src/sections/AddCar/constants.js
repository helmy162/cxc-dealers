const BODY_TYPES_OPTIONS = [
  { value: 'Sedan', label: 'Sedan' },
  { value: 'Hatchback', label: 'Hatchback' },
  { value: 'Coupe', label: 'Coupe' },
  { value: 'SUV', label: 'SUV' },
  { value: 'Convertible', label: 'Convertible' },
  { value: 'Pickup Truck', label: 'Pickup Truck' },
  { value: 'Van', label: 'Van' },
  { value: 'Sports car', label: 'Sports car' },
]
const ENGINE_AND_TRANSMISSION_OPTIONS = [
  { value: 'no_visible_fault', label: 'No Visible Fault' },
  { value: 'average', label: 'Average' },
  { value: 'normal', label: 'Normal' },
  { value: 'bad', label: 'Bad' },
];

const ENGINE_NOISE_OPTIONS = [
  { value: 'no_visible_fault', label: 'No Visible Fault' },
  { value: 'tappet_noise', label: 'Tappet noise' },
  { value: 'drive_belt_noise', label: 'Drive belt noise' },
  { value: 'other', label: 'Other' }
];

const ENGINE_SMOKE_OPTIONS = [
  { value: 'white', label: 'White Smoke' },
  { value: 'black', label: 'Black smoke' },
  { value: 'blue', label: 'Blue smoke' }
];

const SERVICE_HISTORY_OPTIONS = [
  { value: 'Full Agency Service', label: 'Full Agency Service'},
  { value: 'Partial Agency Service', label: 'Partial Agency Service' },
  { value: 'Unknown', label: 'Unknown'}	
];

const MANUALS_OPTIONS = [
  { value: 'Available', label: 'Available '},
  { value: 'Not Available', label: 'Not Available' },
  { value: 'Unknown', label: 'Unknown'}	
];

const ACCIDENT_HISTORY_OPTIONS = [
  { value: 'Accident reported', label: 'Accident reported '},
  { value: 'Unknown', label: 'Unknown' },
  { value: 'No Accident', label: 'No Accident'}	
];

const ADD_CAR_STEPS = {
  SUMMARY: 'Car details',
  PRIVATE_PHOTOS: 'Private information',
  EXTERIOR_CONDITION: 'Exterior Condition',
  ENGINE_AND_TRANSMISSION: 'Engine and Transmission',
  SSA: 'Steering, Suspension & Brakes',
  IEAC: 'Interior, Electrical & A/C Conditions',
  CAR_SPECS_STEP: 'Car Specs',
  TYRES: 'Tyres',
  PHOTOS: 'Photos',
};

const STEPS_QUEUE = [
  ADD_CAR_STEPS.SUMMARY,
  ADD_CAR_STEPS.PRIVATE_PHOTOS,
  ADD_CAR_STEPS.EXTERIOR_CONDITION,
  ADD_CAR_STEPS.ENGINE_AND_TRANSMISSION,
  ADD_CAR_STEPS.SSA,
  ADD_CAR_STEPS.IEAC,
  ADD_CAR_STEPS.CAR_SPECS_STEP,
  ADD_CAR_STEPS.TYRES,
  ADD_CAR_STEPS.PHOTOS,
];


export {
  BODY_TYPES_OPTIONS,
  ENGINE_AND_TRANSMISSION_OPTIONS,
  ENGINE_NOISE_OPTIONS,
  ENGINE_SMOKE_OPTIONS,
  SERVICE_HISTORY_OPTIONS,
  MANUALS_OPTIONS,
  ACCIDENT_HISTORY_OPTIONS,
  ADD_CAR_STEPS,
  STEPS_QUEUE,
};

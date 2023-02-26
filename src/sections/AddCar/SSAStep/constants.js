const ENGINE_AND_TRANSMISSION_OPTIONS = [  
  { value: 'no_visible_fault', label: 'No Visible Fault' },  
  { value: 'average', label: 'Average' },  
  { value: 'normal', label: 'Normal' },  
  { value: 'bad', label: 'Bad' },
];

const brakePadsOptions = [
  { value: 'good', label: 'Good' },
  { value: 'average', label: 'Average' },
  { value: 'need_replacement', label: 'Need to be replaced soon' },
];

const brakeDiscsOrLiningOptions = [
  { value: 'good', label: 'Good' },
  { value: 'average', label: 'Average' },
  { value: 'need_polishing', label: 'Need polishing' },
  { value: 'need_replacement', label: 'Need to be replaced soon' },
];

const parkingBrakeOperationsOptions = [
  { value: 'good', label: 'Good' },
  { value: 'average', label: 'Average' },
  { value: 'need_replacement', label: 'Need to be replaced soon' },
];

const suspensionOptions = [
  { value: 'good', label: 'Good' },
  { value: 'average', label: 'Average' },
  { value: 'need_replacement', label: 'Need to be replaced soon' },
  { value: 'knocking', label: 'Knocking' },
];

const shockAbsorberOperationOptions = [
  { value: 'good', label: 'Good' },
  { value: 'average', label: 'Average' },
  { value: 'need_replacement', label: 'Need to be replaced soon' },
  { value: 'knocking', label: 'Knocking' },
];

const steeringOperationOptions = [
  { value: 'good', label: 'Good' },
  { value: 'average', label: 'Average' },
  { value: 'to_be_repaired', label: 'To be repaired' },
];

const steeringAlignmentOptions = [
  { value: 'good', label: 'Good' },
  { value: 'average', label: 'Average' },
  { value: 'to_be_repaired', label: 'To be repaired' },
];

const wheelAlignmentOptions = [
  { value: 'good', label: 'Good' },
  { value: 'average', label: 'Average' },
  { value: 'to_be_repaired', label: 'To be repaired' },
];
  
  export {
    ENGINE_AND_TRANSMISSION_OPTIONS,
    brakePadsOptions,
    brakeDiscsOrLiningOptions,
    parkingBrakeOperationsOptions,
    suspensionOptions,
    shockAbsorberOperationOptions,
    steeringOperationOptions,
    steeringAlignmentOptions,
    wheelAlignmentOptions,
  };
  
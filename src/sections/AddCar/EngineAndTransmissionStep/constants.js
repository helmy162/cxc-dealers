const ENGINE_AND_TRANSMISSION_OPTIONS = [  
  { value: 'no_visible_fault', label: 'No Visible Fault' },  
  { value: 'average', label: 'Average' },  
  { value: 'normal', label: 'Normal' },  
  { value: 'bad', label: 'Bad' },
];

const radiatorConditionOptions = [
  { value: 'good', label: 'Good' },
  { value: 'average', label: 'Average' },
  { value: 'need_to_replace', label: 'Need to be replaced' },
];

const silencerOptions = [
  { value: 'normal', label: 'Normal' },
  { value: 'average', label: 'Average' },
  { value: 'damage', label: 'Damage' },
  { value: 'need_to_replace_soon', label: 'Need to be replaced soon' },
];

const axelsOptions = [
  { value: 'good', label: 'Good' },
  { value: 'average', label: 'Average' },
  { value: 'axle_boot_leaking', label: 'Axle Boot Leaking' },
  { value: 'need_to_replace_soon', label: 'Need to be replaced soon' },
  { value: 'damaged', label: 'Damaged' },
  { value: 'to_be_repaired', label: 'To be repaired' },
];

const engineBeltsOptions = [
  { value: 'good', label: 'Good' },
  { value: 'average', label: 'Average' },
  { value: 'timebelt_noise', label: 'Timebelt Noise' },
  { value: 'drive_belt_noise', label: 'Drive Belt Noise' },
];

const gearLeverOptions = [
  { value: 'good', label: 'Good' },
  { value: 'average', label: 'Average' },
  { value: 'to_be_repaired', label: 'To be repaired' },
];

const radiatorFanOptions = [
  { value: 'good', label: 'Good' },
  { value: 'average', label: 'Average' },
  { value: 'to_be_repaired', label: 'To be repaired' },
  { value: 'noise', label: 'Noise' },
  { value: 'damaged', label: 'Damaged' },
];

const engineIdlingOptions = [
  { value: 'normal', label: 'Normal' },
  { value: 'average', label: 'Average' },
  { value: 'to_be_repaired', label: 'To be repaired' },
];

const engineNoiseOptions = [
  { value: 'normal', label: 'Normal' },
  { value: 'average', label: 'Average' },
  { value: 'valve_noise', label: 'Valve noise' },
  { value: 'tappet_noise', label: 'Tappet noise' },
  { value: 'pulley_noise', label: 'Pulley noise' },
  { value: 'engine_bearing_noise', label: 'Engine Bearing Noise' },
  { value: 'engine_knocking', label: 'Engine Knocking' },
];

const engineOilOptions = [
  { value: 'good', label: 'Good' },
  { value: 'average', label: 'Average' },
  { value: 'need_to_replace_soon', label: 'Need to be replaced soon' },
];

const engineSmokeOptions = [
  { value: 'normal', label: 'Normal' },
  { value: 'white_smoke', label: 'White smoke' },
  { value: 'black_smoke', label: 'Black Smoke' },
  { value: 'blue_smoke', label: 'Blue smoke' },
];

const exhaustOptions = [
  { value: 'normal', label: 'Normal' },
  { value: 'mainfold_noise', label: 'Mainfold noise' },
  { value: 'muffler_noise', label: 'Muffler noise' }
];

const coolantOptions = [
  { value: 'good', label: 'Good' },
  { value: 'average', label: 'Average' },
  { value: 'replace_soon', label: 'Need to be replaced soon' },
  { value: 'low_level', label: 'Level low' },
  { value: 'mixing_with_oil', label: 'Mixing with oil' }
];

const batteryConditionOptions = [
  { value: 'good', label: 'Good' },
  { value: 'average', label: 'Average' },
  { value: 'weak', label: 'Week' },
  { value: 'replace_soon', label: 'Need to be replaced soon' },
  { value: 'not_starting', label: 'Not starting' }
];

const gearShiftingOptions = [
  { value: 'good', label: 'Good' },
  { value: 'average', label: 'Average' },
  { value: 'shift_shock', label: 'Shift Shock' },
  { value: 'gear_jerk', label: 'Gear Jerk' },
  { value: 'gear_slip', label: 'Gear Slip' }
];

const shiftInterlockOptions = [
  { value: 'good', label: 'Good' },
  { value: 'average', label: 'Average' },
  { value: 'to_be_repaired', label: 'To Be Repaired' },
  { value: 'not_engaging', label: 'Not Engaging' },
  { value: 'diff_lock_not_engaging', label: 'Diff lock not Engaging' },
  { value: 'noise_in_differential', label: 'Noise In Differential' },
  { value: 'propeller_shaft_noisy', label: 'Propeller Shaft Noisy' }
];

const chassisOptions = [
  { value: 'good', label: 'Good' },
  { value: 'to_be_repaired', label: 'To be repaired' },
  { value: 'damaged', label: 'Damaged' },
]

const oilLeaksOptions = [
  { value: 'none', label: 'No Leaks' },
  { value: 'cover', label: 'Engine Valve cover oil leak' },
  { value: 'sum', label: 'Oil Sum Leak' },
]

const waterSladgeOptions = [
  { value: 'none', label: 'None'},
  { value: 'engine', label: 'Engine oil water mix' },
  { value: 'gear', label: 'Gear oil water mix' },
  { value: 'radiator', label: 'Radiator oil water mix' },
]

export {
  ENGINE_AND_TRANSMISSION_OPTIONS,
  radiatorConditionOptions,
  silencerOptions,
  axelsOptions,
  engineBeltsOptions,
  gearLeverOptions,
  radiatorFanOptions,
  engineIdlingOptions,
  engineNoiseOptions,
  engineOilOptions,
  engineSmokeOptions,
  exhaustOptions,
  coolantOptions,
  batteryConditionOptions,
  gearShiftingOptions,
  shiftInterlockOptions,
  chassisOptions,
  oilLeaksOptions,
  waterSladgeOptions
};

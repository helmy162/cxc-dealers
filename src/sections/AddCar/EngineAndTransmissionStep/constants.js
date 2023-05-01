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
  { value: 'sludge', label: 'Sludge' },
  { value: 'engine_oil_water_mix', label: 'Engine Oil Water Mix' },
  { value: 'gear_oil_water_mix', label: 'Gear Oil Water Mix' },
  { value: 'radiator_oil_water_mix', label: 'Radiator Oil Water Mix' }
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
  { value: 'need_to_replace_soon', label: 'Need to be replaced soon' },
  { value: 'damaged', label: 'Damaged' },
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
  { value: 'exhaust_manifold_noise', label: 'Exhaust Manifold Noise' },
  { value: 'exhaust_muffler_noise', label: 'Exhaust Muffler Noise' },
  { value: 'timing_belt_noise', label: 'Time Belt Noise' },
  { value: 'drive_belt_noise', label: 'Drive Belt Noise' },
  { value: 'power_steering_noise', label: 'Power Steering Noise' }
];

const engineSmokeOptions = [
  { value: 'normal', label: 'Normal' },
  { value: 'white_smoke', label: 'White smoke' },
  { value: 'black_smoke', label: 'Black Smoke' },
  { value: 'blue_smoke', label: 'Blue smoke' },
];

const coolantOptions = [
  { value: 'good', label: 'Good' },
  { value: 'average', label: 'Average' },
  { value: 'replace_soon', label: 'Need to be replaced soon' },
  { value: 'low_level', label: 'Level low' },
  { value: 'mixing_with_oil', label: 'Mixing with oil' }
];

const transmissionConditionOptions = [
  { value: 'good', label: 'Good' },
  { value: 'average', label: 'Average' },
  { value: 'shift_shock', label: 'Shift Shock' },
  { value: 'gear_jerk', label: 'Gear Jerk' },
  { value: 'gear_slip', label: 'Gear Slip' },
  { value: 'delay_in_shift', label: 'Delay In Shift' },
  { value: 'transmission_whining_sound', label: 'Transmission Whining Sound' },
  { value: 'gear_not_shifting', label: 'Gear not shifting' },
  { value: 'transmission_mount_replacement', label: 'Transmission Mount Need Replacement' },
  { value: 'hard_clutch', label: 'Hard Clutch' },
  { value: 'tiptronic_not_working', label: 'Tiptronic not working' },
  { value: 'reverse_gear_not_engaging', label: 'Reverse Gear Not Engaging' },
  { value: 'gear_shift_lock_cable_repair', label: 'Gear Shift Lock Cable Need to repair' }
];

const shiftInterlockOptions = [
  { value: 'not_available', label: 'Not Available' },
  { value: 'good', label: 'Good' },
  { value: 'average', label: 'Average' },
  { value: 'to_be_repaired', label: 'To Be Repaired' },
  { value: 'not_engaging', label: 'Not Engaging' },
  { value: 'diff_lock_not_engaging', label: 'Diff lock not Engaging' },
  { value: 'noise_in_differential', label: 'Noise In Differential' },
  { value: 'propeller_shaft_noisy', label: 'Propeller Shaft Noisy' },
  { value: 'transfer_case_repair', label: 'Transfer case repair' },
  { value: 'need_maintenance', label: 'Need maintenance' }
];

const chassisOptions = [
  { value: 'good', label: 'Good' },
  { value: 'repaired', label: 'Repaired' },
  { value: 'bulkhead_repaired', label: 'Bulkhead Repaired' },
  { value: 'radiator_support_repaired', label: 'Radiator Support Repaired' },
  { value: 'fender_frame_repaired', label: 'Fender Frame Repaired' },
  { value: 'damaged', label: 'Damaged' },
]

const chassisExtensionOptions = [
  { value: 'good', label: 'Good' },
  { value: 'repaired', label: 'Repaired' },
  { value: 'damaged', label: 'Damaged' },
]

const oilLeaksOptions = [
  { value: 'none', label: 'No Leaks' },
  { value: 'engine_valve_cover_oil_leak', label: 'Engine Valve cover oil leak' },
  { value: 'oil_sum_leak', label: 'Oil Sum Leak' },
  { value: 'coolant_leak', label: 'Coolant Leak' },
  { value: 'transmission_oil_leak', label: 'Transmission Oil Leak' },
  { value: 'differential_oil_leak', label: 'Differential Oil Leak' },
  { value: 'axle_boot_leaking', label: 'Axle Boot Leaking' },
  { value: 'head_gasket_leak', label: 'Head Gasket Leak' },
  { value: 'power_steering_oil_leak', label: 'Power Steering Oil Leak' }
]

const engineGroupOptions = [
  { value: 'average', label: 'Average' },
  { value: 'misfiring', label: 'Misfiring' },
  { value: 'sparkplug_replacement', label: 'Need to Replace Sparkplug' },
  { value: 'engine_lacks_power', label: 'Engine Lacks Power' },
  { value: 'engine_overheating', label: 'Engine Overheating' },
  { value: 'rough_idle_or_misfires', label: 'Engine Idle Rough or Misfires' },
  { value: 'engine_mount_replacement', label: 'Engine Mount Need Replacement' },
  { value: 'weak_battery', label: 'Battery Weak' },
  { value: 'dead_battery', label: 'Battery Dead' },
  { value: 'intermittent_starter_motor', label: 'Starter Motor Working Intermittently' },
  { value: 'engine_wont_start', label: "Engine won't crack or Start" }
]

const hosesConditionOptions = [
  { value: 'average', label: 'Average' },
  { value: 'coolant_hose_damage', label: 'Coolant hose damage' },
  { value: 'brake_fluid_hose_damage', label: 'Brake Fluid Hose Damage' },
  { value: 'steering_fluid_pipe_damage', label: 'Steering Fluid Pipe Damage' },
  { value: 'A/C_pipe_leak', label: 'A/C Pipe Leak' }
]

export {
  ENGINE_AND_TRANSMISSION_OPTIONS, 
  radiatorConditionOptions,
  silencerOptions,
  axelsOptions,
  radiatorFanOptions,
  engineIdlingOptions,
  engineNoiseOptions,
  engineSmokeOptions,
  coolantOptions,
  transmissionConditionOptions,
  oilLeaksOptions,
  engineGroupOptions,
  hosesConditionOptions,
  shiftInterlockOptions,
  chassisOptions,
  chassisExtensionOptions,
};

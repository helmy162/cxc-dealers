const ENGINE_AND_TRANSMISSION_OPTIONS = [  
{ value: 'no_visible_fault', label: 'No Visible Fault' },  
{ value: 'average', label: 'Average' },  
{ value: 'normal', label: 'Normal' },  
{ value: 'bad', label: 'Bad' },
];

const DASHBOARD_CONDITION_PADS_OPTIONS = [
{ value: 'good', label: 'Good' },
{ value: 'average', label: 'Average' },
{ value: 'to_be_repaired', label: 'To be repaired' },
];
    
const STEERING_MOUNTED_CONTROLS_OPTIONS = [
{ value: 'good', label: 'Good' },
{ value: 'average', label: 'Average' },
{ value: 'to_be_repaired', label: 'To be repaired' },
];

const CENTER_CONSOLE_BOX_OPTIONS = [
{ value: 'good', label: 'Good' },
{ value: 'average', label: 'Average' },
{ value: 'to_be_repaired', label: 'To be repaired' },
];

const SPEEDOMETER_CLUSTER_OPTIONS = [
{ value: 'good', label: 'Good' },
{ value: 'average', label: 'Average' },
{ value: 'to_be_repaired', label: 'To be repaired' },
];

const DOOR_TRIM_PANELS_OPTIONS = [
{ value: 'good', label: 'Good' },
{ value: 'average', label: 'Average' },
{ value: 'to_be_repaired', label: 'To be repaired' },
];

const HEADLINER_OPTIONS = [
{ value: 'good', label: 'Good' },
{ value: 'average', label: 'Average' },
{ value: 'to_be_repaired', label: 'To be repaired' },
];

const SEAT_CONTROLS_OPTIONS = [
{ value: 'good', label: 'Good' },
{ value: 'average', label: 'Average' },
{ value: 'to_be_repaired', label: 'To be repaired' },
];

const BOOT_TRUNK_AREA_OPTIONS = [
{ value: 'good', label: 'Good' },
{ value: 'average', label: 'Average' },
{ value: 'to_be_repaired', label: 'To be repaired' },
{ value: 'damaged', label: 'Damaged' },
];

const CENTRAL_LOCK_OPERATION_OPTIONS = [
{ value: 'good', label: 'Good' },
{ value: 'average', label: 'Average' },
{ value: 'to_be_repaired', label: 'To be repaired' },
];

const MUSIC_MULTIMEDIA_SYSTEM_OPTIONS = [
{ value: 'good', label: 'Good' },
{ value: 'average', label: 'Average' },
{ value: 'to_be_repaired', label: 'To be repaired' },
{ value: 'damaged', label: 'Damaged' },
];

const NAVIGATION_CONTROL_OPTIONS = [
{ value: 'good', label: 'Good' },
{ value: 'average', label: 'Average' },
{ value: 'to_be_repaired', label: 'To be repaired' },
{ value: 'not_available', label: 'Not Available' },
];

const HEADLIGHTS_OPTIONS = [
{ value: 'good', label: 'Good' },
{ value: 'average', label: 'Average' },
{ value: 'need_to_be_replaced_soon', label: 'Need to be replaced soon' },
{ value: 'damaged', label: 'Damaged' },
];

const TAIL_LIGHTS_OPTIONS = [
{ value: 'good', label: 'Good' },
{ value: 'average', label: 'Average' },
{ value: 'need_to_be_replaced_soon', label: 'Need to be replaced soon' },
{ value: 'damaged', label: 'Damaged' },
];

const SUNROOF_OPTIONS = [
{ value: 'good', label: 'Good' },
{ value: 'average', label: 'Average' },
{ value: 'to_be_repaired', label: 'To be repaired' },
{ value: 'damaged', label: 'Damaged' },
{ value: 'not_available', label: 'Not Available' }
];

const WINDOWS_CONTROLS_OPTIONS = [
{ value: 'good', label: 'Good' },
{ value: 'average', label: 'Average' },
{ value: 'to_be_repaired', label: 'To be repaired' },
{ value: 'damaged', label: 'Damaged' }
];

const CRUISE_CONTROL_OPTIONS = [
{ value: 'good', label: 'Good' },
{ value: 'average', label: 'Average' },
{ value: 'may_require_repair', label: 'May Require Repair' },
{ value: 'not_available', label: 'Not Available' }
];

const PUSH_START_STOP_BUTTON_OPTIONS = [
{ value: 'good', label: 'Good' },
{ value: 'average', label: 'Average' },
{ value: 'to_be_repaired', label: 'To be repaired' },
{ value: 'not_available', label: 'Not Available' }
];

const AC_COOLING_OPTIONS = [
{ value: 'good', label: 'Good' },
{ value: 'average', label: 'Average' },
{ value: 'may_require_repair', label: 'May Require Repair' },
{ value: 'not_blowing_cold_air', label: 'Not Blowing cold air' },
{ value: 'ac_system_needs_refrigerant', label: 'A/C systems Needs Refrigerant' },
{ value: 'compressor_not_working', label: 'Compressor not working' },
{ value: 'compressor_clutch_not_engaging', label: 'Compressor Clutch not Engaging' },
{ value: 'ac_blower_noisy', label: 'AC Blower noisy' },
{ value: 'ac_blower_not_working', label: 'AC Blower not working' },
{ value: 'duel_ac_not_working', label: 'Duel AC Not Working' },
{ value: 'need_ac_gas', label: 'Need A/C Gas' }
];

const CONVERTIBLE_OPERATIONS_OPTIONS = [
{ value: 'good', label: 'Good' },
{ value: 'average', label: 'Average' },
{ value: 'to_be_repaired', label: 'To be repaired' },
{ value: 'not_available', label: 'Not Available' },
{ value: 'damaged', label: 'Damaged' }
];

const AC_HEATING_OPTIONS = [
{ value: 'good', label: 'Good' },
{ value: 'average', label: 'Average' },
{ value: 'not_working', label: 'Not working' }
];

const AIRBAG_OPTIONS = [
    { value: 'good', label: 'Good' },
    { value: 'deployed', label: 'Deplyed' },
]

export {
ENGINE_AND_TRANSMISSION_OPTIONS,
DASHBOARD_CONDITION_PADS_OPTIONS,
STEERING_MOUNTED_CONTROLS_OPTIONS,
CENTER_CONSOLE_BOX_OPTIONS,
SPEEDOMETER_CLUSTER_OPTIONS,
DOOR_TRIM_PANELS_OPTIONS,
HEADLINER_OPTIONS,
SEAT_CONTROLS_OPTIONS,
BOOT_TRUNK_AREA_OPTIONS,
CENTRAL_LOCK_OPERATION_OPTIONS,
MUSIC_MULTIMEDIA_SYSTEM_OPTIONS,
NAVIGATION_CONTROL_OPTIONS,
HEADLIGHTS_OPTIONS,
TAIL_LIGHTS_OPTIONS,
SUNROOF_OPTIONS,
WINDOWS_CONTROLS_OPTIONS,
CRUISE_CONTROL_OPTIONS,
PUSH_START_STOP_BUTTON_OPTIONS,
AC_COOLING_OPTIONS,
CONVERTIBLE_OPERATIONS_OPTIONS,
AC_HEATING_OPTIONS,
AIRBAG_OPTIONS
};
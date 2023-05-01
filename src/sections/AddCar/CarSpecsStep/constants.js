const ENGINE_AND_TRANSMISSION_OPTIONS = [  
{ value: 'no_visible_fault', label: 'No Visible Fault' },  
{ value: 'average', label: 'Average' },  
{ value: 'normal', label: 'Normal' },  
{ value: 'bad', label: 'Bad' },
];

const Drives = [
{ value: 'excellent', label: 'Excellent'},
{ value: 'good', label: 'Good' },
{ value: 'average', label: 'Average' },
{ value: 'below_average', label: 'Below Average' }
];

const TiptronicGears = [
{ value: 'working', label: 'Working' },
{ value: 'not_working', label: 'Not working' },
{ value: 'not_available', label: 'Not available' }
];

const SunroofType = [
{ value: 'not_available', label: 'Not Available'},
{ value: 'sunroof', label: 'Sunroof' },
{ value: 'panorama', label: 'Panorama' },
{ value: 'moonroof', label: 'Moonroof' }
];

const WheelsType = [
{ value: '2wd', label: '2WD' },
{ value: '4wd', label: '4WD' },
{ value: 'awd', label: 'AWD' }
];

const ConvertibleType = [
{ value: 'not_available', label: 'Not Available' },
{ value: 'hard_top', label: 'Hard top' },
{ value: 'soft_top', label: 'Soft top' }
];

export {
ENGINE_AND_TRANSMISSION_OPTIONS,
Drives,
TiptronicGears,
SunroofType,
WheelsType,
ConvertibleType
}
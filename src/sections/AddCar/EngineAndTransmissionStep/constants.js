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

export { ENGINE_AND_TRANSMISSION_OPTIONS, ENGINE_NOISE_OPTIONS, ENGINE_SMOKE_OPTIONS };

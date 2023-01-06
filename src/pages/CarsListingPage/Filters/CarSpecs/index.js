import {
  useState,
} from 'react';
import { Box } from '@mui/material';

import Select from '../Select';
import YearsSelect from './YearsSelect';

const makeOptions = [
  'All',
  'audi',
  'bmw'
];

const modelOptions = [
  'All',
  '3',
  '5'
];

const variants = [
  'All',
  '3',
  '5'
]

export default function CarSpecFilters({
  specs
}) {
  const [make, setMake] = useState(makeOptions[0]);
  const [model, setModel] = useState(modelOptions[0]);
  const [variant, setVariant] = useState(variants[0]);

  return (
    <Box>
      <Select
        label="Make"
        value={make}
        options={makeOptions}
        onChange={(value) => setMake(value)}
      />
      <Select
        label="Model"
        value={model}
        options={modelOptions}
        onChange={(value) => setModel(value)}
      />
      <Select
        label="Variant"
        value={variant}
        options={variants}
        onChange={(value) => setVariant(value)}
      />
      <YearsSelect />
    </Box>
  )
}
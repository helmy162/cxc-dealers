import {
  useState,
} from 'react';
import { Box } from '@mui/material';

import Select from '../Select';
import YearsSelect from './YearsSelect';
import FromToSelect from '../FromToSelect';

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
];


const fromToFilter = {
  from: [
    1,
    3,
    4,
    5,
  ],
  to: [
    6,
    7,
    8,
    9
  ]
}

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
      <FromToSelect
        label="Mileage"
        value={{ from: 1, to: 6 }}
        options={fromToFilter}
        onChange={(value) => console.log(value)}
      />
      <Select
        label="Body Type"
        value={variant}
        options={variants}
        onChange={(value) => setVariant(value)}
      />
      <Select
        label="Color"
        value={variant}
        options={variants}
        onChange={(value) => setVariant(value)}
      />
      <FromToSelect
        label="Seller's Price"
        value={{ from: 3, to: 8 }}
        options={fromToFilter}
        onChange={(value) => console.log(value)}
      />
    </Box>
  )
}
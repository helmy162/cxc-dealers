// @mui
import { Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { useCallback, useState, createElement, useEffect } from 'react';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// components
import FormProvider from '../../components/hook-form';
import SummaryStep, { SummarySchema, SummaryDefaultValues } from './SummaryStep';
import ExteriorCondition, { ExteriorConditionDefaultValues, ExteriorConditionSchema } from './ExteriorConditionStep';
import EnginerAndTransmissionStep, { EngineAndTransmissionDefaultValues, EngineAndTransmissionSchema } from './EngineAndTransmissionStep';


const ADD_CAR_STEPS = {
  SUMMARY: 'summary',
  EXTERIOR_CONDITION: 'Exterior Condition',
  ENGINE_AND_TRANSMISSION: 'Engine and Transmission',
};

const STEPS_QUEUE = [ ADD_CAR_STEPS.SUMMARY, ADD_CAR_STEPS.EXTERIOR_CONDITION, ADD_CAR_STEPS.ENGINE_AND_TRANSMISSION];

const formSteps = {
  [ADD_CAR_STEPS.SUMMARY]: {
    component: SummaryStep,
    title: 'Car details',
    method: (data) => { console.log( data )},
    validationSchema: SummarySchema,
    defaultValues: SummaryDefaultValues,
  },
  [ADD_CAR_STEPS.EXTERIOR_CONDITION]: {
    component: ExteriorCondition,
    title: 'Exterior Condition',
    method: () => { },
    validationSchema: ExteriorConditionSchema,
    defaultValues: ExteriorConditionDefaultValues,
  },
  [ADD_CAR_STEPS.ENGINE_AND_TRANSMISSION]: {
    component: EnginerAndTransmissionStep,
    title: 'Engine and Transmission',
    method: () => { },
    validationSchema: EngineAndTransmissionSchema,
    defaultValues: EngineAndTransmissionDefaultValues,
  }
}
// ----------------------------------------------------------------------

export default function AddCar() {
  const [step, setFormStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);

  useEffect(() => setIsLastStep(!!(step === STEPS_QUEUE[STEPS_QUEUE.length - 1])), [step])

  const methods = useForm({
    resolver: yupResolver(formSteps[STEPS_QUEUE[step]]?.validationSchema || {}),
    defaultValues: formSteps[STEPS_QUEUE[step]]?.defaultValues || {},
  });

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = useCallback((data) => {
    !isLastStep && setFormStep(step + 1);
  }, [step, isLastStep]);

  return (
    <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h5">{formSteps[STEPS_QUEUE[step]]?.title}</Typography>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          {createElement(formSteps[STEPS_QUEUE[step]]?.component ?? <div>something went wrong</div>,
            { errors, setValue, watch }) }
          <LoadingButton
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitSuccessful || isSubmitting}
            sx={{
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
                bgcolor: 'text.primary',
                color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            },
            }}
          >
            {isLastStep ? 'Complete' : 'Next'}
          </LoadingButton>
      </FormProvider>
    </Stack>
  );
}

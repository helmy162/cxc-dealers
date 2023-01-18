// @mui
import { Stack, Typography, Link } from '@mui/material';
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
import SSAStep, { SSADefaultValues, SSASchema } from './SSAStep';
import IEACStep, { IEACDefaultValues, IEACSchema } from './IEACStep';
import CarSpecsStep, { CarSpecsDefaultValues, CarSpecsSchema } from './CarSpecsStep';
import TyresStep, { TyresDefaultValues, TyresSchema } from './TyresStep';

//api
import CarApi from '../../utils/api/CarApi';
import PhotosStep, { PhotosDefaultValues, PhotosSchema } from './PhotosStep';
import { ADD_CAR_STEPS, STEPS_QUEUE } from './constants';
import { usePrompt } from 'src/hooks/useBlocker';
import { PATH_DASHBOARD } from 'src/routes/paths';
const formSteps = {
  [ADD_CAR_STEPS.SUMMARY]: {
    component: SummaryStep,
    method: CarApi.generateInfo,
    validationSchema: SummarySchema,
    defaultValues: SummaryDefaultValues,
  },
  [ADD_CAR_STEPS.EXTERIOR_CONDITION]: {
    component: ExteriorCondition,
    method: CarApi.saveExteriorCondition,
    validationSchema: ExteriorConditionSchema,
    defaultValues: ExteriorConditionDefaultValues,
  },
  [ADD_CAR_STEPS.ENGINE_AND_TRANSMISSION]: {
    component: EnginerAndTransmissionStep,
    method: CarApi.saveEngineAndTransmission,
    validationSchema: EngineAndTransmissionSchema,
    defaultValues: EngineAndTransmissionDefaultValues,
  },
  [ADD_CAR_STEPS.SSA]: {
    component: SSAStep,
    method: CarApi.saveSSA,
    validationSchema: SSASchema,
    defaultValues: SSADefaultValues,
  },
  [ADD_CAR_STEPS.IEAC]: {
    component: IEACStep,
    method: CarApi.saveIEAC,
    validationSchema: IEACSchema,
    defaultValues: IEACDefaultValues,
  },
  [ADD_CAR_STEPS.CAR_SPECS_STEP]: {
    component: CarSpecsStep,
    method: CarApi.saveCarSpecs,
    validationSchema: CarSpecsSchema,
    defaultValues: CarSpecsDefaultValues,
  },
  [ADD_CAR_STEPS.TYRES]: {
    component: TyresStep,
    method: CarApi.saveTyres,
    validationSchema: TyresSchema,
    defaultValues: TyresDefaultValues,
  },
  [ADD_CAR_STEPS.PHOTOS]: {
    component: PhotosStep,
    method: CarApi.uploadPhotos,
    validationSchema: PhotosSchema ,
    defaultValues: PhotosDefaultValues,
  }
}
// ----------------------------------------------------------------------

export default function AddCar() {
  const [step, setFormStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [carId, setCarId] = useState(-1);
  const [showFinishMessage, setShowFinishMessage] = useState(false);

  useEffect(() => setIsLastStep(step === STEPS_QUEUE.length -1), [step])

  const methods = useForm({
    resolver: yupResolver(formSteps[STEPS_QUEUE[step]]?.validationSchema || {}),
    defaultValues: formSteps[STEPS_QUEUE[step]]?.defaultValues || {},
  });

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = methods;

  usePrompt( 'You have unsaved changes. Are you sure ou want to leave?', isDirty );

  const onSubmit = useCallback(async(data) => {
    const response = await formSteps[STEPS_QUEUE[step]]?.method({ ...data, carId });
    response?.id && setCarId(response?.id);
    reset(formSteps[STEPS_QUEUE[step + 1]]?.defaultValues);
    if (!isLastStep) {
      setFormStep(step + 1);
    } else {
      setShowFinishMessage(true);
    }
  }, [step, isLastStep, reset, carId]);

  return (
    <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h5">{[STEPS_QUEUE[step]]}</Typography>
        {showFinishMessage ? <>
          <Typography variant="h5">You've created a car</Typography>
          <Link variant="subtitle2" href={PATH_DASHBOARD.car.root }>Go to dashboard</Link>
        </>
        : <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            {createElement(formSteps[STEPS_QUEUE[step]]?.component ?? <div>something went wrong</div>,
              { errors, setValue, watch }) }
            <LoadingButton
              color="inherit"
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{
              bgcolor: 'text.primary',
              marginTop: '1rem',
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
      }
    </Stack>
  );
}

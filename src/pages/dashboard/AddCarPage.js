import { Helmet } from 'react-helmet-async';
import * as Yup from 'yup';
import { useState, createElement, useCallback, useEffect} from 'react';
// @mui
import { Container, Typography, Tab, Tabs, Box, Button, Stack} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// components
import AddCar from '../../sections/AddCar';
import { useSettingsContext } from '../../components/settings';
import FormProvider from '../../components/hook-form';

import Iconify from '../../components/iconify';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useAuthContext } from '../../auth/useAuthContext';
// sections
import {
  AccountGeneral,
  AccountBilling,
  AccountSocialLinks,
  AccountNotifications,
  AccountChangePassword,
} from '../../sections/@dashboard/user/account';

import SummaryStep, { SummarySchema, SummaryDefaultValues } from '../../sections/AddCar/SummaryStep';
import { AllSchema, AllDefaultValues } from '../../sections/AddCar/AllSteps';
import ExteriorCondition, { ExteriorConditionDefaultValues, ExteriorConditionSchema } from '../../sections/AddCar/ExteriorConditionStep';
import EnginerAndTransmissionStep, { EngineAndTransmissionDefaultValues, EngineAndTransmissionSchema } from '../../sections/AddCar/EngineAndTransmissionStep';
import SSAStep, { SSADefaultValues, SSASchema } from '../../sections/AddCar/SSAStep';
import IEACStep, { IEACDefaultValues, IEACSchema } from '../../sections/AddCar/IEACStep';
import CarSpecsStep, { CarSpecsDefaultValues, CarSpecsSchema } from '../../sections/AddCar/CarSpecsStep';
import TyresStep, { TyresDefaultValues, TyresSchema } from '../../sections/AddCar/TyresStep';
import PhotosStep, { PhotosDefaultValues, PhotosSchema } from '../../sections/AddCar/PhotosStep';
import PrivateStep, { PrivateDefaultValues, PrivateSchema } from '../../sections/AddCar/PrivateStep';

// _mock_
import { _userPayment, _userAddressBook, _userInvoices, _userAbout, _userList} from '../../_mock/arrays';
import { current } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

export default function AddCarPage() {
  const { themeStretch } = useSettingsContext();
  const {user} = useAuthContext();
  const currentUser =user; 
  
  const [currentTab, setCurrentTab] = useState('general');
  const [currentStep, setCurrentStep] = useState(0);


  const methods = useForm({
    resolver: yupResolver(AllSchema),
    defaultValues: AllDefaultValues,
  });


  const {
    handleSubmit,
    setValue,
    setError,
    watch,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = methods;

  const TABS = [
    {
      value: 'general',
      label: 'General',
      icon: <Iconify icon="ic:round-account-box" />,
      component: createElement( SummaryStep,{ setValue, watch }),
    },
    {
      value: 'documents',
      label: 'Documents',
      icon: <Iconify icon="fa:drivers-license" />,
      component: createElement( PrivateStep,{ setValue, watch })
    },
    {
      value: 'exterior',
      label: 'Exterior',
      icon: <Iconify icon="material-symbols:car-crash" />,
      component: createElement( ExteriorCondition,{ setValue, watch }),
    },
    {
      value: 'engine',
      label: 'Engine',
      icon: <Iconify icon="mdi:engine" />,
      component: createElement( EnginerAndTransmissionStep,{ setValue, watch }),
    },
    {
      value: 'SSA',
      label: 'SSA',
      icon: <Iconify icon="mdi:steering" />,
      component: createElement( SSAStep,{ setValue, watch }),
    },
    {
      value: 'IEAC',
      label: 'IEAC',
      icon: <Iconify icon="material-symbols:settings-input-svideo" />,
      component: createElement( IEACStep,{ setValue, watch }),
    },
    {
      value: 'car_specs',
      label: 'Car Specs',
      icon: <Iconify icon="ion:car-sport" />,
      component: createElement( CarSpecsStep,{ setValue, watch }),
    },
    {
      value: 'tyres',
      label: 'Tyres',
      icon: <Iconify icon="mingcute:tyre-fill" />,
      component: createElement( TyresStep,{ setValue, watch }),
    },
    {
      value: 'images',
      label: 'Images',
      icon: <Iconify icon="mdi:images" />,
      component: createElement( PhotosStep,{ setValue, watch }),
    },
    
  ];

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const errorTabKeys = Object.values(errors).map((key) => key.message.split(':')[0].toLowerCase());
      setCurrentTab(errorTabKeys[0]);
    } else {
      // setErrorTab('');
    }
  }, [errors]);

  const onSubmit = async(data) => {
    console.log(data);
    
  };

  useEffect(() => {
    setCurrentStep(TABS.findIndex(tab => tab.value === currentTab));
  }, [currentTab]);

  const onBack = (prevTab) => {
    setCurrentTab(TABS[currentStep - 1].value);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  const onNext = (nextTab) => {
    setCurrentTab(TABS[currentStep + 1].value);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  return (
    <>
      <Helmet>
        <title> Add car</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Add car
        </Typography>
        <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
          {TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          {TABS.map(
            (tab) =>
              tab.value === currentTab && (
                <Box key={tab.value} sx={{ mt: 5 }}>
                  {tab.component}
                </Box>
              )
          )}
          <Stack direction='row' alignItems='center' marginTop='20px' gap='50px' >
          {
            currentStep != 0 && 
            <Button variant="outlined" color="inherit" size='large'  onClick={onBack} disabled={currentStep == 0} >
              Back
            </Button>
          }
          
          {
            currentStep != TABS.length - 1 ? 
            <Button variant="outlined" color="inherit" size='large'  onClick={onNext} sx={{ ml: 'auto' }}>
              Next
            </Button>
            :
            <LoadingButton
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{
            ml: 'auto' ,
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
                bgcolor: 'text.primary',
                color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            },
            }}
          >
            Submit
          </LoadingButton>
          }
          
          
          
          </Stack>
        </FormProvider>
        
        {/* <AddCar /> */}
      </Container>
    </>
  );
}

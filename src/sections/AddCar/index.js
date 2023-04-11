import { useState, createElement, useCallback, useEffect} from 'react';
import { Container, Typography, Tab, Tabs, Box, Button, Stack} from '@mui/material';
import * as Yup from 'yup';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider from '../../components/hook-form';

// sections
import SummaryStep from './SummaryStep';
import { AllSchema, AllDefaultValues } from './AllSteps';
import ExteriorCondition from './ExteriorConditionStep/index';
import EnginerAndTransmissionStep from './EngineAndTransmissionStep';
import SSAStep from './SSAStep';
import IEACStep from './IEACStep';
import CarSpecsStep from './CarSpecsStep';
import TyresStep from './TyresStep';
import PhotosStep from './PhotosStep';
import PrivateStep from './PrivateStep';

// components
import Iconify from '../../components/iconify';
import { LoadingButton } from '@mui/lab';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';

// utils
import CarApi from '../../utils/api/CarApi';
import axiosInstance from '../../utils/axios';

// snackbar
import { useSnackbar } from '../../components/snackbar';
import { useNavigate } from 'react-router-dom';


import { getSellers, resetSeller } from '../../redux/slices/user';
import { useDispatch, useSelector } from '../../redux/store';
// ----------------------------------------------------------------------
const typeList = [
  'Original',
  'Damaged',
  'Repainted',
  'Portion Repainted',
  'Foiled',
  'Not Available',
];

export default function AddCar({isEdit, car}) {

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    
    const [currentTab, setCurrentTab] = useState('general');
    const [currentStep, setCurrentStep] = useState(0);
    const [markers, setMarkers] = useState([]);
    const [activeMarker, setActiveMarker] = useState(null);
    const [submittedMarkers, setSubmittedMarkers] = useState([]);
    const [isErrorDisplayed, setIsErrorDisplayed] = useState(false);
    const [file, setFile] = useState(null);

    const [partColor, setPartColor] = useState({
      0: typeList.indexOf(car?.exterior?.markers['frontBumper']) >= 0 ? typeList.indexOf(car?.exterior?.markers['frontBumper']) : 0,
      1: typeList.indexOf(car?.exterior?.markers['hood']) >= 0 ? typeList.indexOf(car?.exterior?.markers['hood']) : 0,
      2: typeList.indexOf(car?.exterior?.markers['top']) >= 0 ? typeList.indexOf(car?.exterior?.markers['top']) : 0,
      3: typeList.indexOf(car?.exterior?.markers['trunkLid']) >= 0 ? typeList.indexOf(car?.exterior?.markers['trunkLid']) : 0,
      4: typeList.indexOf(car?.exterior?.markers['backBumper']) >= 0 ? typeList.indexOf(car?.exterior?.markers['backBumper']) : 0,
      5: typeList.indexOf(car?.exterior?.markers['rightFrontPanel']) >= 0 ? typeList.indexOf(car?.exterior?.markers['rightFrontPanel']) : 0,
      6: typeList.indexOf(car?.exterior?.markers['rightFrontBumper']) >= 0 ? typeList.indexOf(car?.exterior?.markers['rightFrontBumper']) : 0,
      7: typeList.indexOf(car?.exterior?.markers['leftFrontPanel']) >= 0 ? typeList.indexOf(car?.exterior?.markers['leftFrontPanel']) : 0,
      8: typeList.indexOf(car?.exterior?.markers['leftFrontBumper']) >= 0 ? typeList.indexOf(car?.exterior?.markers['leftFrontBumper']) : 0,
      9: typeList.indexOf(car?.exterior?.markers['rightFrontDoor']) >= 0 ? typeList.indexOf(car?.exterior?.markers['rightFrontDoor']) : 0,
      10: typeList.indexOf(car?.exterior?.markers['rightBackDoor']) >= 0 ? typeList.indexOf(car?.exterior?.markers['rightBackDoor']) : 0,
      11: typeList.indexOf(car?.exterior?.markers['rightBackPanel']) >= 0 ? typeList.indexOf(car?.exterior?.markers['rightBackPanel']) : 0,
      12: typeList.indexOf(car?.exterior?.markers['rightBackBumber']) >= 0 ? typeList.indexOf(car?.exterior?.markers['rightBackBumber']) : 0,
      13: typeList.indexOf(car?.exterior?.markers['leftFrontDoor']) >= 0 ? typeList.indexOf(car?.exterior?.markers['leftFrontDoor']) : 0,
      14: typeList.indexOf(car?.exterior?.markers['leftBackDoor']) >= 0 ? typeList.indexOf(car?.exterior?.markers['leftBackDoor']) : 0,
      15: typeList.indexOf(car?.exterior?.markers['leftBackPanel']) >= 0 ? typeList.indexOf(car?.exterior?.markers['leftBackPanel']) : 0,
      16: typeList.indexOf(car?.exterior?.markers['leftBackBumper']) >= 0 ? typeList.indexOf(car?.exterior?.markers['leftBackBumper']) : 0,
    });
    useEffect(() => {
      setPartColor({
        0: typeList.indexOf(car?.exterior?.markers['frontBumper']) >= 0 ? typeList.indexOf(car?.exterior?.markers['frontBumper']) : 0,
        1: typeList.indexOf(car?.exterior?.markers['hood']) >= 0 ? typeList.indexOf(car?.exterior?.markers['hood']) : 0,
        2: typeList.indexOf(car?.exterior?.markers['top']) >= 0 ? typeList.indexOf(car?.exterior?.markers['top']) : 0,
        3: typeList.indexOf(car?.exterior?.markers['trunkLid']) >= 0 ? typeList.indexOf(car?.exterior?.markers['trunkLid']) : 0,
        4: typeList.indexOf(car?.exterior?.markers['backBumper']) >= 0 ? typeList.indexOf(car?.exterior?.markers['backBumper']) : 0,
        5: typeList.indexOf(car?.exterior?.markers['rightFrontPanel']) >= 0 ? typeList.indexOf(car?.exterior?.markers['rightFrontPanel']) : 0,
        6: typeList.indexOf(car?.exterior?.markers['rightFrontBumper']) >= 0 ? typeList.indexOf(car?.exterior?.markers['rightFrontBumper']) : 0,
        7: typeList.indexOf(car?.exterior?.markers['leftFrontPanel']) >= 0 ? typeList.indexOf(car?.exterior?.markers['leftFrontPanel']) : 0,
        8: typeList.indexOf(car?.exterior?.markers['leftFrontBumper']) >= 0 ? typeList.indexOf(car?.exterior?.markers['leftFrontBumper']) : 0,
        9: typeList.indexOf(car?.exterior?.markers['rightFrontDoor']) >= 0 ? typeList.indexOf(car?.exterior?.markers['rightFrontDoor']) : 0,
        10: typeList.indexOf(car?.exterior?.markers['rightBackDoor']) >= 0 ? typeList.indexOf(car?.exterior?.markers['rightBackDoor']) : 0,
        11: typeList.indexOf(car?.exterior?.markers['rightBackPanel']) >= 0 ? typeList.indexOf(car?.exterior?.markers['rightBackPanel']) : 0,
        12: typeList.indexOf(car?.exterior?.markers['rightBackBumber']) >= 0 ? typeList.indexOf(car?.exterior?.markers['rightBackBumber']) : 0,
        13: typeList.indexOf(car?.exterior?.markers['leftFrontDoor']) >= 0 ? typeList.indexOf(car?.exterior?.markers['leftFrontDoor']) : 0,
        14: typeList.indexOf(car?.exterior?.markers['leftBackDoor']) >= 0 ? typeList.indexOf(car?.exterior?.markers['leftBackDoor']) : 0,
        15: typeList.indexOf(car?.exterior?.markers['leftBackPanel']) >= 0 ? typeList.indexOf(car?.exterior?.markers['leftBackPanel']) : 0,
        16: typeList.indexOf(car?.exterior?.markers['leftBackBumper']) >= 0 ? typeList.indexOf(car?.exterior?.markers['leftBackBumper']) : 0,
      });
    }, [car]);

    const [change, setChange] = useState(0);
  
    const values = AllDefaultValues(car);
    const methods = useForm({
      resolver: yupResolver(AllSchema),
      defaultValues: AllDefaultValues(car),
      values
    });

    const dispatch = useDispatch();
    
    useEffect(() => {
      dispatch(getSellers());
      dispatch(resetSeller());
    }, [dispatch]);
  
    const {
      handleSubmit,
      setValue,
      setError,
      watch,
      reset,
      resetField,
      formState: { errors, isSubmitting, isDirty },
    } = methods;
  
    const values1 = watch();
  
    const TABS = [
      {
        value: 'general',
        label: 'General',
        icon: <Iconify icon="ic:round-account-box" />,
        component: createElement( SummaryStep,{ setValue, watch, values1, resetField }),
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
        component: createElement( ExteriorCondition,{ setValue, watch, markers, setMarkers, activeMarker, setActiveMarker, submittedMarkers, setSubmittedMarkers, isErrorDisplayed, setIsErrorDisplayed, file, setFile, change, setChange, partColor, setPartColor }),
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
      const mergedData = CarApi.mapFormDataToApiRequest(data);
      try {
        let res;
        isEdit?  res = await axiosInstance.post(`admin/car/${car.id}`, mergedData) :  res = await axiosInstance.post('inspector/car', mergedData);
        enqueueSnackbar( isEdit? 'Car updated successfully' : 'Car added successfully', { variant: 'success' })
        navigate(PATH_DASHBOARD.car.list);
        console.log(res);
      } catch (error) {
        console.log(error);
        enqueueSnackbar('Something went wrong', { variant: 'error' })
        navigate(PATH_DASHBOARD.car.list);
      }
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
            {isEdit ? 'Update' : 'Submit'}
          </LoadingButton>
          }
          
          
          
          </Stack>
        </FormProvider>
        
    </>
  );
}

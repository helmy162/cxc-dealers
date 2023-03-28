import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography,  TextField, InputAdornment, IconButton, Tooltip } from '@mui/material';
// utils
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// assets
import { countries } from '../../../assets/data';
// components
import Label from '../../../components/label';
import { useSnackbar } from '../../../components/snackbar';
import Iconify from '../../../components/iconify';
import FormProvider, {
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from '../../../components/hook-form';
import { MuiTelInput } from 'mui-tel-input'
// hooks
import useCopyToClipboard from '../../../hooks/useCopyToClipboard';

import axiosInstance from 'src/utils/axios';


// ----------------------------------------------------------------------

SellerNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default function SellerNewEditForm({ isEdit = false, currentUser }) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const { copy } = useCopyToClipboard();

  const [sellerID, setSellerID] = useState(currentUser?.id);

  const onCopy = (text) => {
    if (text) {
      enqueueSnackbar('Copied!');
      copy(text);
    }
  };

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phone: Yup.string().required('Phone is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '+971',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    setSellerID(currentUser?.id);
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const onSubmit = async (data) => {
    try {
      let res;
      isEdit?  res = await axiosInstance.put(`admin/sellers/${currentUser.id}`, data) :  res = await axiosInstance.post('admin/sellers', data);
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.seller.list);
    } catch (error) {
      console.error(error);
    }
  };

  // const onChange = (value) => {
  //   if (value.startsWith("971")) {
  //     setValue("phone", value.slice(3));
  //   } else {
  //     setValue("phone", value);
  //   }
  // }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>

        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(1, 1fr)',
              }}
            >
              { isEdit &&
                <Stack spacing={2}>
                <TextField
                  label="Seller ID"
                  className='w-fit'
                  value={sellerID? sellerID : 'Loading...'}
                  disabled
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title="Copy">
                          <IconButton onClick={() => onCopy(sellerID)}>
                            <Iconify icon="eva:copy-fill" width={24} />
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
              }
            
              <RHFTextField name="name" label="Full Name"/>
              <RHFTextField name="email" label="Email Address"/>
              
              <Controller
                name="phone"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <MuiTelInput
                    {...field}
                    fullWidth
                    value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
                    error={!!error}
                    label="Phone Number"
                    defaultCountry="ae"
                  />
                )}
              />

              {/* <RHFTextField name="phone" label="Phone Number"
                onChange={(e) => onChange(e.target.value)}
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      +971
                    </InputAdornment>
                  ),
                }}
              /> */}
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Seller' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

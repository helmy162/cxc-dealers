import * as Yup from 'yup';
import { useCallback } from 'react';
// form
import { useForm, Controller} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Stack, Typography, FormControlLabel, Switch} from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components
import { useSnackbar } from '../../../../components/snackbar';
import Label from '../../../../components/label';
import FormProvider, {
  RHFSwitch,
  RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
} from '../../../../components/hook-form';

import { MuiTelInput } from 'mui-tel-input'

// ----------------------------------------------------------------------

export default function AccountGeneral({user}) {
  const { enqueueSnackbar } = useSnackbar();
  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phone: Yup.string().required('Phone is required'),
    company: Yup.string().required('Company is required'),
    isVerified: Yup.boolean(),
    status: Yup.string(),
  });

  const defaultValues = {
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: user?.company || '',
    isVerified: user?.is_verified == '1' || false,
    status: user?.status || (!false && 'active') || 'pending',
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  

  const {
    setValue,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();
  
  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar('Update success!');
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('photoURL', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
          <Card sx={{ pt: 5, pb: 5, px: 3, gap:'20px', display:'flex', flexDirection: 'column' }}>

              <Stack direction='row' justifyContent='space-between'>
                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                  Account Status
                </Typography>
                <Label
                  color={values.status === 'active' ? 'success' : 'warning'}
                  sx={{ textTransform: 'uppercase',}}
                >
                  {values.status}
                </Label>
              </Stack>

              <Stack direction='row' justifyContent='space-between'>
                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                  Email Verified
                </Typography>
                <Label
                  color={values.isVerified == true ? 'success' : 'error'}
                  sx={{ textTransform: 'uppercase',}}
                >
                  {values.isVerified ? 'Verified' : 'Not Verified'}
                </Label>
              </Stack>

          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="name" label="Name" />

              <RHFTextField name="email" label="Email Address" />

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

              <RHFTextField name="company" label="Company" />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

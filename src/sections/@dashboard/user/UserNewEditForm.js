import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/label';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFSwitch,
  RHFTextField,
} from '../../../components/hook-form';
import { MuiTelInput } from 'mui-tel-input'

import axiosInstance from 'src/utils/axios';
// ----------------------------------------------------------------------

UserNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default function UserNewEditForm({ isEdit = false, currentUser }) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phoneNumber: Yup.string(),
    company: Yup.string(),
    role: Yup.string().required('Role is required'),
    isVerified: Yup.boolean(),
    status: Yup.string(),
    bidLimit: Yup.number().required('Bid limit is required'),
    password: Yup.string().when('isEdit', {
      is: (isEdit) => isEdit == false,
      then: Yup.string().required('Password is required'),
    }),
    password_confirmation: Yup.string().when('isEdit', {
      is: (isEdit) => isEdit == false,
      then: Yup.string().required('Confirm Password is required'),
    }),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phoneNumber: currentUser?.phone || '+971',
      isVerified: currentUser?.is_verified === 1 || false,
      status: currentUser?.status || (!isEdit && 'active') || 'inactive',
      company: currentUser?.company || '',
      role: currentUser?.type || 'dealer',
      bidLimit: currentUser?.bid_limit || '0',
      password: '',
      password_confirmation: '',
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
      isEdit?  res = await axiosInstance.put(`admin/users/${currentUser.id}`, data) :  res = await axiosInstance.post('admin/users', data);
      enqueueSnackbar(!isEdit ? 'User created successfully!' : 'User updated successfully!');
      navigate(PATH_DASHBOARD.user.list);
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
        setValue('avatarUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {isEdit && (
              <Label
                color={values.status === 'active' ? 'success' : 'warning'}
                sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )}

            {isEdit && (
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value === 'active'}
                        onChange={(event) =>
                          field.onChange(event.target.checked ? 'active' : 'inactive')
                        }
                      />
                    )}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Account Status
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Activate User Account
                    </Typography>
                  </>
                }
                sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
              />
            )}

            <RHFSwitch
              name="isVerified"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Email Verified
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Disabling this will automatically send the user a verification email
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
            />
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
              <RHFTextField name="name" label="Full Name"/>
              <RHFTextField name="email" label="Email Address"/>
              {
                !isEdit && <RHFTextField name="password" label="Password" type="password"/>
              }
              {
                !isEdit && <RHFTextField name="password_confirmation" label="Confirm Password" type="password"/>
              }
              <Controller
                name="phoneNumber"
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
              <RHFTextField
                name = "bidLimit"
                type="number"
                label="Bid Limit"
              />
              <RHFSelect native name="role" label="Role">
                <option value="admin">Admin</option>
                <option value="inspector">Inspector</option>
                <option value="dealer">Dealer</option>
                <option value="closer">Closer</option>
                <option value="sales">Sales</option>
              </RHFSelect>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create User' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

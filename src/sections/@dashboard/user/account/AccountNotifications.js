// form
import { useForm } from 'react-hook-form';
// @mui
import { Card, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { useSnackbar } from '../../../../components/snackbar';
import FormProvider, { RHFSwitch } from '../../../../components/hook-form';
import axiosInstance from 'src/utils/axios';

// ----------------------------------------------------------------------

const ACTIVITY_OPTIONS = [
  {
    value: 'notify_won_auction',
    label: 'Email me when I win an auction',
  },
  {
    value: 'notify_new_auction',
    label: 'Email me when a car is added to auction',
  },
];


// ----------------------------------------------------------------------

export default function AccountNotifications({user}) {
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    notify_new_auction: user.notify_new_auction,
    notify_won_auction: user.notify_won_auction,
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.put(`dealer/profile/notifications`, data);
      enqueueSnackbar('Update success!');
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3 }}>
        <Typography variant="overline" component="div" sx={{ color: 'text.secondary' }}>
          Auction
        </Typography>

        <Stack alignItems="flex-start" spacing={1} sx={{ mt: 2 }}>
          {ACTIVITY_OPTIONS.map((activity) => (
            <RHFSwitch
              key={activity.value}
              name={activity.value}
              label={activity.label}
              sx={{ m: 0 }}
            />
          ))}
        </Stack>

        <Stack>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{ ml: 'auto' }}
          >
            Save Changes
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}

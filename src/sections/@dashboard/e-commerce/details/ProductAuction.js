import * as Yup from 'yup';
// form
import { useForm, Controller} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {TimePicker, DatePicker, DateTimePicker} from '@mui/x-date-pickers';
import { LoadingButton } from '@mui/lab';
import { Box,Button,InputAdornment,TextField} from '@mui/material';

import axiosInstance from 'src/utils/axios';
import {RHFTextField, RHFAutocomplete } from '../../../../components/hook-form';
import FormProvider from '../../../../components/hook-form';

import Iconify from '../../../../components/iconify';

import ConfirmDialog from '../../../../components/confirm-dialog';
import { useSnackbar } from '../../../../components/snackbar';
import { PATH_DASHBOARD } from '../../../../routes/paths';

const auctionDurations = [
    '1 Hour',
    '2 Hours',
    '3 Hours',
    '6 Hours',
    '12 Hours',
    '24 Hours',
    '48 Hours',
    '72 Hours',
  ];
  
export default function ProductAuction({ productAsAdmin, highestbid , userrole }) {

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [isAuctioned, setIsAuctioned] = useState(!!productAsAdmin?.auction);

    const [openConfirm, setOpenConfirm] = useState(false);
    
    const NewProductSchema = Yup.object().shape({
        start_price: Yup.number().moreThan(0, 'Price should not be $0.00'),
        start_at: Yup.date().required('Start time is required'),
        end_at: Yup.date().required('End time is required'),
      });
      const defaultValues = useMemo(
        () => ({
          start_price: productAsAdmin?.auction?.start_price || highestbid,
          start_at: productAsAdmin?.auction?.start_at || new Date(),
          end_at: productAsAdmin?.auction?.end_at || new Date(),
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [productAsAdmin]
      );
    
    const methods = useForm({
        resolver: yupResolver(NewProductSchema),
        defaultValues,
      });
    
      const {
        reset,
        control,
        watch,
        setValue,
        handleSubmit,
        formState: { isSubmitting },
      } = methods;
 
    const onSubmit = async (data) => {
        try {
        const mergedDate = {start_price: data.start_price, start_at: data.start_at.toISOString(), end_at: data.end_at.toISOString(), car_id: productAsAdmin.id };
        var endpoint = isAuctioned ? `admin/auctions/${productAsAdmin?.auction?.id}` : 'admin/auctions';
        if(userrole == 'closer'){
          console.log(productAsAdmin.auction.round)
          endpoint = isAuctioned ? `closer/auctions/${productAsAdmin?.auction?.id}` : 'admin/auctions';
        }

        const method = isAuctioned ? 'put' : 'post';
        const res = await axiosInstance[method](endpoint, mergedDate);
        enqueueSnackbar(!isAuctioned? 'Auction created successfully' : 'Auction updated successfully', { variant: 'success' });
        console.error('asdasd')
        navigate(PATH_DASHBOARD.car.list);
        } catch (error) {
        console.error(error);
        }
    };

    const onDeleteAuction = async () => {
        try {
            const res = await axiosInstance.delete(`admin/auctions/${productAsAdmin?.auction?.id}`);
            setIsAuctioned(false);
            setOpenConfirm(false);
            enqueueSnackbar('Auction deleted successfully', { variant: 'success' });
            navigate(PATH_DASHBOARD.car.list);
        } catch (error) {
            console.error(error);
        }
    };


    return(
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} className="flex gap-4 items-center flex-wrap justify-center">
                <RHFTextField
                  name="start_price"
                  className="!w-1/6 !min-w-[150px]"
                  label="Start Price"
                  placeholder="0.00"
                  onChange={(event) =>
                    setValue('start_price', Number(event.target.value), { shouldValidate: true })
                  }
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <Box component="span" sx={{ color: 'text.disabled' }}>
                          AED
                        </Box>
                      </InputAdornment>
                    ),
                    type: 'number',
                  }}
                />
                <Controller
                   name="start_at"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DateTimePicker
                      {...field}
                      label="Start Time"
                      renderInput={(params) => (
                        <TextField
                          className="!w-1/6 !min-w-1/6"
                          {...params}
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  )}
                />

                <Controller
                  name="end_at"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DateTimePicker
                      {...field}
                      label="End Time"
                      renderInput={(params) => (
                        <TextField
                          className="!w-1/6 !min-w-1/6"
                          {...params}
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  )}
                />

                

                <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                  {!isAuctioned? 'Start Auction' : 'Update Auction'}
                </LoadingButton>

                { isAuctioned &&
                    <LoadingButton onClick={() => {setOpenConfirm(true)}} sx={{ color: 'error.main', border: '1px solid red', minWidth:'48px', height:'48px'}} >
                        <Iconify icon="eva:trash-2-outline" />

                    </LoadingButton>
                }
                <ConfirmDialog
                    open={openConfirm}
                    onClose={() => setOpenConfirm(false)}
                    title="Delete"
                    content="Are you sure want to delete this auction?"
                    action={
                        <Button variant="contained" color="error" onClick={onDeleteAuction}>
                        Delete
                        </Button>
                    }
                />

              </FormProvider>
    )
}
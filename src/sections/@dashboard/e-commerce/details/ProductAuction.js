import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {TimePicker, DatePicker} from '@mui/x-date-pickers';
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
  
export default function ProductAuction({ productAsAdmin }) {

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [isAuctioned, setIsAuctioned] = useState(!!productAsAdmin?.auction);

    const [auctionDate, setAuctionDate] = useState(new Date());
    const [auctionTime, setAuctionTime] = useState(new Date());
    const [duration, setDuration] = useState(auctionDurations[0]);
    const [inputValue, setInputValue] = useState('');
    const [openConfirm, setOpenConfirm] = useState(false);
    
    const NewProductSchema = Yup.object().shape({
        start_price: Yup.number().moreThan(0, 'Price should not be $0.00'),
        duration: Yup.string().required('Duration is required'),
        auctionDate: Yup.date().required('Auction date is required'),
        auctionTime: Yup.date().required('Auction time is required'),
      });
      const defaultValues = useMemo(
        () => ({
          start_price: productAsAdmin?.auction?.start_price || 0,
          duration: isAuctioned? ( Math.floor((new Date(productAsAdmin?.auction?.end_at) - new Date(productAsAdmin?.auction?.start_at)) / 1000 / 60 / 60) + ' Hours')
            : auctionDurations[0],
          auctionDate: isAuctioned ? new Date(productAsAdmin?.auction?.start_at) 
            : new Date(),
          auctionTime: isAuctioned ? new Date(productAsAdmin?.auction?.start_at)
            : new Date(),
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
        watch,
        setValue,
        handleSubmit,
        formState: { isSubmitting },
      } = methods;
 
    const onSubmit = async (data) => {
        try {
        const date = new Date(data.auctionDate.getFullYear(), data.auctionDate.getMonth(), data.auctionDate.getDate(), data.auctionTime.getHours(), data.auctionTime.getMinutes());
        const duration = data.duration;
        var parts = duration.split(" ");
        var hours = parts[0];
        var isoDuration = `PT${hours}H`;
        const mergedDate = {date: date, duration: isoDuration, start_price: data.start_price, car_id: productAsAdmin.id};
        const endpoint = isAuctioned ? `admin/auctions/${productAsAdmin?.auction?.id}` : 'admin/auctions';
        const method = isAuctioned ? 'put' : 'post';
        const res = await axiosInstance[method](endpoint, mergedDate);
        enqueueSnackbar(!isAuctioned? 'Auction created successfully' : 'Auction updated successfully', { variant: 'success' });
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

                <DatePicker
                  name="auctionDate"
                  label="Auction Date"
                  value={watch('auctionDate', defaultValues.auctionDate)}
                  onChange={function (newValue) {
                    setValue('auctionDate', newValue, { shouldValidate: true });
                    setAuctionDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} className="!w-1/6 !min-w-1/6"/>}
                  
                />

                <TimePicker
                  name="auctionTime"
                  ampm={false}
                  label="Auction Time"
                  value={watch('auctionTime', defaultValues.auctionTime)}
                  onChange={function (newValue) {
                    setValue('auctionTime', newValue, { shouldValidate: true });
                    setAuctionTime(newValue);
                  }}
                  renderInput={(params) => <TextField  {...params} className="!w-1/6 !min-w-1/6" />}
                />

                <RHFAutocomplete
                  className="!w-1/6 !min-w-[150px]"
                  name="duration"
                  label="Auction Duration"
                  value={watch('duration', defaultValues.duration)}
                  onChange={function(_,newValue){
                    setDuration(newValue)
                    setValue('duration', newValue, { shouldValidate: true })
                  }}         
                  inputValue={inputValue}
                  onInputChange={(_, newInputValue) => {
                    setInputValue(newInputValue)
                  }}     
                  options={auctionDurations.map((option) => option)}
                  ChipProps={{ size: 'small' }}
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
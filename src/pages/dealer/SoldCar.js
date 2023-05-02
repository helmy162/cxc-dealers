import ProductDetailsCarousel from "../dashboard/ProductDetailsCarousel"
import { useDispatch, useSelector } from '../../redux/store';
import { getProduct, getStatus, resetProduct, getUserOffers} from '../../redux/slices/product';
import {useEffect, useMemo} from 'react';
import { Helmet } from "react-helmet-async";
import { useState } from "react";
// add bid form
import { RHFTextField } from "src/components/hook-form";
import { InputAdornment, Box, Button } from "@mui/material";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "src/components/hook-form/FormProvider";
import CarDetails from "../dashboard/CarDetails";
import { useAuthContext } from "src/auth/useAuthContext";
import axiosInstance from 'src/utils/axios';
import { useParams, Navigate} from "react-router";
import LoadingScreen from '../../components/loading-screen';
import ConfirmDialog from '../../components/confirm-dialog';
import { useSnackbar } from '../../components/snackbar';


export default function SoldCar(){
    const {name} = useParams();
    const {user, initialize} = useAuthContext();
    const { product, isLoading, checkout, userOffers } = useSelector((state) => state.product);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        dispatch(resetProduct());
        dispatch(getProduct(name));
        dispatch(getStatus(product));
        dispatch(getUserOffers());
  }, [dispatch, name, user]);



  const NewProductSchema = Yup.object().shape({
    offer: Yup.number().required('Offer is required'),
});

  const defaultValues = useMemo(
    () => ({
      offer: product?.details?.seller_price,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [product]
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

  const [highestBid, setHighestBid] = useState(0);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [highestUserOfferOnThisCar, setHighestUserOfferOnThisCar] = useState(null);

  useEffect(() => {
    if (product?.auction?.id) {
      setHighestBid(product?.auction?.latest_bid?.bid);
      setHighestUserOfferOnThisCar( userOffers.length &&  userOffers.filter((element) => {return element.car_id == product?.id}).length ?
        userOffers
        ?.filter((element) => {return element.car_id == product?.id})
        ?.reduce((prev, current) => {return prev.amount > current.amount ? prev : current})
        : null
      )
    }
  }, [product, userOffers]);

  const onSubmit = async (data) => {
    try {
        reset();
        setOpenConfirm(false);
        const mergedDate = {amount: data.offer, car_id: product.id};
        const res = await axiosInstance.post('dealer/offer', mergedDate);
        setHighestUserOfferOnThisCar(data);
        dispatch(getUserOffers());
        
    } catch (error) {
      console.error(error);
    }
  };


  if( new Date (product?.auction?.start_at) > new Date() )  return <Navigate to={`dealer/cars/${product.id}`} />

    return(
        <>
          {(!product || product.id != name  || isLoading ) && <LoadingScreen />}
            {
                product &&
                <div>
                    <Helmet>
                      <title> {`${product.details.make} ${product.details.model} ${product.details.year} | Make an offer`} </title>
                    </Helmet>
                    <div className="flex flex-col p-[24px] gap-[44px] lg:flex-row ">
                      <div className="w-full lg:w-1/2">
                          <ProductDetailsCarousel product={product} />
                      </div>
                      <div className="flex flex-col gap-8 w-full lg:w-1/2">
                          {/* car name and timer */}
                          <div className="flex justify-between items-center">
                              <h1 className="text-[24px] font-semibold">{product.details.make} {product.details.model} {product.details.year}</h1>
                              <h2 className="text-[#8184A3] text-[16px] font-medium"> <span className="text-[#E32519]"> { 'Expired Auction'} </span></h2>
                          </div>
                          {/* prices section */}
                          <div>
                          <div className="min-h-[60px] bg-[#DFDFDF] flex p-[1px] gap-[1px] rounded-lg">
                            <div className="flex flex-col items-center justify-center basis-1/2 bg-white py-[12px] rounded-l-lg">
                                <h1 className="text-[#8184A3] text-[14px] lg:text-[16px]">Seller's Price</h1>
                                <h1 className="text-[#1E1E1E] text-[14px] lg:text-[16px] font-semibold">{product.details.seller_price.toLocaleString('en-US')} AED</h1>
                            </div>
                            <div className="flex flex-col items-center justify-center basis-1/2 bg-white py-[12px]">
                                <h1 className={`text-[#8184A3] text-[14px] lg:text-[16px]`}>Highest Bid</h1>
                                <h1 className={`text-[#1E1E1E] text-[14px] lg:text-[16px] font-semibold `}>{highestBid? highestBid.toLocaleString('en-US') + ' AED' : 'No Bids'}</h1>
                            </div>
                          </div>
                          <div className="min-h-[60px] bg-[#DFDFDF] flex  gap-[1px] rounded-lg border border-solid border-[#DFDFDF]">
                            <div className="flex flex-col items-center justify-center basis-full bg-white py-[12px] ">
                                <h1 className="text-[#8184A3] text-[14px] lg:text-[16px]">Your Highest Offer</h1>
                                <h1 className={`text-[#1E1E1E] text-[14px] lg:text-[16px] font-semibold `}>{highestUserOfferOnThisCar?.amount? highestUserOfferOnThisCar?.amount?.toLocaleString('en-US') + ' AED' : 'No Offer Yet'}</h1>
                            </div>
                          </div>
                          </div>
                          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} className="flex gap-4 items-center flex-wrap justify-center w-full bg-[#D9D9D926]/10 p-[20px] rounded-lg">
                              <RHFTextField
                                name="offer"
                                className="!w-2/6 !min-w-[200px] !bg-white rounded-lg"
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '4px', maxHeight: '48px' } }}
                                label="Offer Price"
                                placeholder="0.00"
                                onChange={(event) =>
                                    setValue('offer', Number(event.target.value), { shouldValidate: true })
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
                              <ConfirmDialog
                              
                                open={openConfirm}
                                onClose={() => setOpenConfirm(false)}
                                title="Offer Price"
                                content={<>Are you sure want to add an offer with {watch('offer')?.toLocaleString('en-US')} AED ? </>}
                                action={
                                  <Button onClick={handleSubmit(onSubmit)}  type="submit" variant="contained" size="large" loading={isSubmitting} className="max-h-[48px] !rounded">
                                    Confirm
                                  </Button>
                                }
                              />
                              <Button  variant="contained" onClick={() => setOpenConfirm(true)} className="max-h-[48px] !rounded">
                                Offer Price
                              </Button>
                          </FormProvider>
                          {/* specifications section */}
                          <div className="flex flex-wrap justify-center gap-x-5 gap-y-5 items-end">
                              <div className="text-[14px] font-medium flex flex-col gap-[12px] basis-[45%] lg:basis-[45%]">
                                  <div className=" text-[#141414] text-[12px] font-semibold flex gap-2 items-center"> <img src="/assets/icons/cars/mileage.svg"/> Mileage</div>
                                  <div className="bg-[#E8F2F8] w-full text-[#8184A3] py-2 px-3 rounded">{product?.details?.mileage} KM</div>
                              </div>
                              <div className="text-[14px] font-medium flex flex-col gap-[12px] basis-[45%] lg:basis-[45%]">
                                  <div className=" text-[#141414] text-[12px] font-semibold flex gap-2 items-center"> <img src="/assets/icons/cars/engine.svg"/> Engine Size</div>
                                  <div className="bg-[#E8F2F8] w-full text-[#8184A3] py-2 px-3 rounded">{product?.details?.engine_size} CC</div>
                              </div>
                              <div className="text-[14px] font-medium flex flex-col gap-[12px] basis-[45%] lg:basis-[45%]">
                                  <div className=" text-[#141414] text-[12px] font-semibold flex gap-2 items-center"> <img src="/assets/icons/cars/specs.svg"/> Registered Emirates</div>
                                  <div className="bg-[#E8F2F8] w-full text-[#8184A3] py-2 px-3 rounded">{product?.details?.registered_emirates}</div>
                              </div>
                              <div className="text-[14px] font-medium flex flex-col gap-[12px] basis-[45%] lg:basis-[45%]">
                                  <div className=" text-[#141414] text-[12px] font-semibold flex gap-2 items-center"> <img src="/assets/icons/cars/color.svg"/> Exterior Color</div>
                                  <div className="bg-[#E8F2F8] w-full text-[#8184A3] py-2 px-3 rounded">{product?.details?.exterior_color}</div>
                              </div>
                          </div>
                          {/* bid button */}
                          
                      </div>
                    </div>
                    <div className="max-w-[1000px] p-[12px] m-auto">
                        <CarDetails withImages={false} noLoading={true}/>
                    </div>
                    
                </div>
            }
        </>
            
    )
}
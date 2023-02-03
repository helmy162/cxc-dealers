import ProductDetailsCarousel from "../dashboard/ProductDetailsCarousel"
import { useDispatch, useSelector } from '../../redux/store';
import { getProduct } from '../../redux/slices/product';
import {useEffect, useMemo} from 'react';
import { Helmet } from "react-helmet-async";
import { useState } from "react";
// add bid form
import { RHFTextField } from "src/components/hook-form";
import { InputAdornment, Box } from "@mui/material";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import FormProvider from "src/components/hook-form/FormProvider";
import { LoadingButton } from '@mui/lab';
import CarDetails from "../dashboard/CarDetails";
import Pusher from "pusher-js";
import { useAuthContext } from "src/auth/useAuthContext";
import axiosInstance from 'src/utils/axios';
import { useParams } from "react-router";

export default function SingleCar(){
    const {name} = useParams();
    const {user} = useAuthContext();
    const { product, isLoading, checkout } = useSelector((state) => state.product);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getProduct(name));
  }, [dispatch]);

  console.log(product);
  const NewProductSchema = Yup.object().shape({
    bid: 
    product?.auction?.latest_bid ?
    Yup.number().min(product?.auction?.latest_bid?.bid + 500, 'You have to add at least 500 AED more than the highest bid')
    :
    Yup.number().min(product?.auction?.start_price, `Minimum bid is ${product?.auction?.start_price?.toLocaleString('en-US')} AED`)
    
});

  const defaultValues = useMemo(
    () => ({
      bid: product?.auction?.latest_bid?.bid + 500 || 0,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [product]
  );
    console.log(product);
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

  const [auctionID, setAuctionID] = useState(null);
  const [highestBid, setHighestBid] = useState(0);

  useEffect(() => {
    setHighestBid(product?.auction?.latest_bid?.bid);
    const access_token = user?.accessToken;
    const PUSHER_APP_KEY = "9d45400630a8fa077501";
    const chanelAuthEndpoint =
      "https://api.carsxchange.com/api/v1/pusher/auth-channel";
    const auctionID = product?.auction.id;
    setAuctionID(auctionID);
    let pusher = new Pusher(PUSHER_APP_KEY, {
      cluster: "eu",
      channelAuthorization: {
        endpoint: chanelAuthEndpoint,
        transport: "ajax",
        params: {},
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      },
    });
    const channel = pusher.subscribe(`private-car.auction.${auctionID}`);
    channel.bind("NewBid", (data) => {
        setHighestBid(data.auction.last_bid);
    });
  
    return () => {
      channel.unbind("NewBid");
      pusher.disconnect();
    };
  }, [auctionID, user, product]);


  const onSubmit = async (data) => {
    try {
        const mergedDate = {bid: data.bid, auction_id: product.auction.id, car_id: product.id};
        const res = await axiosInstance.post('dealer/bid', mergedDate);
        
    } catch (error) {
      console.error(error);
    }
  };

  const [timeRemaining, setTimeRemaining] = useState(null);
  const [canBid, setCanBid] = useState(true);

  useEffect(() => {
    const endDate = new Date(product?.auction?.end_at);
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const difference = endDate - currentTime;

      if (difference < 0) {
        clearInterval(intervalId);
        setTimeRemaining(null);
        setCanBid(false)
        return;
      }

      const hours = Math.floor(difference / 1000 / 60 / 60);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeRemaining(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [product]);
    
    return(
        <>
            {
                product &&
                <div>
                    <Helmet>
                        <title> {`${product.details.make} ${product.details.model} ${product.details.year} Bid`} </title>
                    </Helmet>
                    <div className="flex flex-col p-[24px] gap-[44px] lg:flex-row">
                        <div className="w-full lg:w-1/2">
                            <ProductDetailsCarousel product={product} />
                        </div>
                        <div className="flex flex-col gap-8 w-full lg:w-1/2">
                            {/* car name and timer */}
                            <div className="flex justify-between items-center">
                                <h1 className="text-[24px] font-semibold">{product.details.make} {product.details.model} {product.details.year}</h1>
                                <h2 className="text-[#8184A3] text-[16px] font-medium"> Auction ends in <span className="text-[#E32519]"> {timeRemaining ? timeRemaining : 'Expired'} </span></h2>
                            </div>
                            {/* prices section */}
                            <div className="min-h-[60px] bg-[#DFDFDF] flex p-[1px] gap-[1px] rounded-lg">
                                <div className="flex flex-col items-center justify-center basis-1/3 bg-white py-[12px] rounded-l-lg">
                                    <h1 className="text-[#8184A3] text-[14px] lg:text-[16px]">Seller's Price</h1>
                                    <h1 className="text-[#1E1E1E] text-[14px] lg:text-[16px] font-semibold">210,000 AED</h1>
                                </div>
                                <div className="flex flex-col items-center justify-center basis-1/3 bg-white py-[12px]">
                                    <h1 className="text-[#8184A3] text-[14px] lg:text-[16px]">Highest Bid</h1>
                                    <h1 className="text-[#1E1E1E] text-[14px] lg:text-[16px] font-semibold">{highestBid?.toLocaleString('en-US')} AED</h1>
                                </div>
                                <div className="flex flex-col items-center justify-center basis-1/3 bg-white py-[12px] rounded-r-lg">
                                    <h1 className="text-[#8184A3] text-[14px] lg:text-[16px]">Minimum Bid</h1>
                                    <h1 className="text-[#1E1E1E] text-[14px] lg:text-[16px] font-semibold">{product.auction.start_price?.toLocaleString('en-US')} AED</h1>
                                </div>
                            </div>
                            {/* specifications section */}
                            <div className="flex flex-wrap justify-center gap-x-5 gap-y-5 items-end">
                                <div className="text-[14px] font-medium flex flex-col gap-[12px] basis-[45%] lg:basis-[29%]">
                                    <div className=" text-[#141414] text-[12px] font-semibold flex gap-2 items-center"> <img src="/assets/icons/cars/mileage.svg"/> Mileage</div>
                                    <div className="bg-[#E8F2F8] w-full text-[#8184A3] py-2 px-3 rounded">{product.details.mileage}</div>
                                </div>
                                <div className="text-[14px] font-medium flex flex-col gap-[12px] basis-[45%] lg:basis-[29%]">
                                    <div className=" text-[#141414] text-[12px] font-semibold flex gap-2 items-center"> <img src="/assets/icons/cars/transmission.svg"/> Transmission</div>
                                    <div className="bg-[#E8F2F8] w-full text-[#8184A3] py-2 px-3 rounded">Automatic</div>
                                </div>
                                <div className="text-[14px] font-medium flex flex-col gap-[12px] basis-[45%] lg:basis-[29%]">
                                    <div className=" text-[#141414] text-[12px] font-semibold flex gap-2 items-center"> <img src="/assets/icons/cars/engine.svg"/> Engine</div>
                                    <div className="bg-[#E8F2F8] w-full text-[#8184A3] py-2 px-3 rounded">V10</div>
                                </div>
                                <div className="text-[14px] font-medium flex flex-col gap-[12px] basis-[45%] lg:basis-[29%]">
                                    <div className=" text-[#141414] text-[12px] font-semibold flex gap-2 items-center"> <img src="/assets/icons/cars/paint.svg"/> Paint</div>
                                    <div className="bg-[#E8F2F8] w-full text-[#8184A3] py-2 px-3 rounded">Parchery repainted</div>
                                </div>
                                <div className="text-[14px] font-medium flex flex-col gap-[12px] basis-[45%] lg:basis-[29%]">
                                    <div className=" text-[#141414] text-[12px] font-semibold flex gap-2 items-center"> <img src="/assets/icons/cars/specs.svg"/> Specs</div>
                                    <div className="bg-[#E8F2F8] w-full text-[#8184A3] py-2 px-3 rounded">GCC</div>
                                </div>
                                <div className="text-[14px] font-medium flex flex-col gap-[12px] basis-[45%] lg:basis-[29%]">
                                    <div className=" text-[#141414] text-[12px] font-semibold flex gap-2 items-center"> <img src="/assets/icons/cars/color.svg"/> Color</div>
                                    <div className="bg-[#E8F2F8] w-full text-[#8184A3] py-2 px-3 rounded">White</div>
                                </div>
                            </div>
                            {/* bid button */}
                            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} className="flex gap-4 items-start flex-wrap justify-center w-full bg-[#D9D9D926]/10 p-[20px] rounded-lg">
                                <RHFTextField
                                    name="bid"
                                    className="!w-2/6 !min-w-[200px] !bg-white rounded-lg"
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '4px', maxHeight: '48px' } }}
                                    label="Add Bid"
                                    placeholder="0.00"
                                    onChange={(event) =>
                                        setValue('bid', Number(event.target.value), { shouldValidate: true })
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
                                <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting} disabled={!canBid} className="max-h-[48px] !rounded">
                                    Add Bid
                                </LoadingButton>
                            </FormProvider>
                        </div>
                    </div>
                    <div className="max-w-[1000px] p-[12px] m-auto">
                        <CarDetails withImages={false}/>
                    </div>
                </div>
            }
        </>
            
    )
}
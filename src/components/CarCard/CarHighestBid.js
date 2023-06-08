import { useMemo, useEffect, useState } from "react";
import {
  Box,
  Typography
} from "@mui/material";

import SpecItem from './SpecItem';
import { useAuthContext } from "src/auth/useAuthContext";
import Status from './Status';

export default function CarHighestBid({ data, expired, mobile=false}) {

  const [auctionID, setAuctionID] = useState(null);
  const [highestBid, setHighestBid] = useState(0);
  const { user, pusher} = useAuthContext();
  useEffect(() => {
    if(!expired && auctionID)
    {
      data?.auction?.latest_bid ? setHighestBid(data?.auction?.latest_bid?.bid) : setHighestBid(data?.auction?.start_price);
      const auctionID = data?.auction?.id;
      setAuctionID(auctionID);
      const channel =  pusher.channels.channels[`private-car.auction.${auctionID}`] ??  pusher.subscribe(`private-car.auction.${auctionID}`);
      channel.bind("NewBid", (data) => {
          setHighestBid(data.auction.last_bid);
      });

      return () => {
        pusher.disconnect(`private-car.auction.${auctionID}`);
      };
    }
    else {
      setHighestBid(data?.auction?.latest_bid?.bid ?? null);
    }
  }, [auctionID, user, data]);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: { xs: 'column-reverse', sm: 'row'},
      justifyContent: { xs: 'flex-end', sm: 'center'},
      alignItems: { xs: 'flex-end', sm: 'center'},
      fontSize: { xs: '12px', sm: '18px'},
    }}>
      {
        highestBid?
        <>
          {
            !mobile ?
            <Typography color="#8184A3" mr={0.5} >
              Highest Bid:
            </Typography>
            :
            <Typography color="#8184A3" mr={0.5} sx={{fontSize:'8px'}} >
              Highest Bid
            </Typography>
          }
          
          <Typography color="#1D7DBD" fontWeight="bold" sx={{fontSize: { xs: '12px', sm: '18px'}}}>
            {highestBid?.toLocaleString('en-US')} AED 
          </Typography>
        </>
        :
        <>
          {
            !mobile ?
            <Typography color="#8184A3" mr={0.5} >
              Starting Price:
            </Typography>
            :
            <Typography color="#8184A3" mr={0.5} sx={{fontSize:'8px'}} >
              Starting Price
            </Typography>
          }
          <Typography color="#1D7DBD" fontWeight="bold" sx={{ fontSize: { xs: '12px', sm: '18px'}}}>
            {data?.auction?.start_price?.toLocaleString('en-US')} AED
          </Typography>
        </>
      }
      
    </Box>
  )
}
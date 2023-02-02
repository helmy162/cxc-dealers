import { useMemo, useEffect, useState } from "react";
import {
  Box,
  Typography
} from "@mui/material";

import SpecItem from './SpecItem';
import Pusher from "pusher-js";
import { useAuthContext } from "src/auth/useAuthContext";
import Status from './Status';

export default function InfoRow({ data }) {
  const image = useMemo(() => {
    return data.images && data?.images[0] ? `https://api.carsxchange.com/${data.images[0]}` : ''
  }, [data])

  const [auctionID, setAuctionID] = useState(null);
  const [highestBid, setHighestBid] = useState(0);
  const { user } = useAuthContext();
  useEffect(() => {
    data?.auction?.latest_bid ? setHighestBid(data?.auction?.latest_bid?.bid) : setHighestBid(data?.auction?.start_price);
    const access_token = user?.accessToken;
    const PUSHER_APP_KEY = "9d45400630a8fa077501";
    const chanelAuthEndpoint =
      "https://api.carsxchange.com/api/v1/pusher/auth-channel";
    const auctionID = data?.auction?.id;
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
  }, [auctionID, user, data]);

  return (
    <Box
      sx={{
        mt: '10px',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' }
      }}
    >
      <Box sx={{
        marginRight: { xs: '0px', sm: '20px' },
        maxWidth: { xs: '100%', sm: '265px' }
      }}>
        <img
          src={image}
          alt="car"
          style={{
            width: '100%',
            aspectRatio: '16/9',
            objectFit: 'cover',
            borderRadius: '8px'
          }}
        />
      </Box>
      <Box sx={{
        width: '100%'
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          fontSize: '18px',
          marginTop: { xs: '20px', sm: 0 }
        }}>
          <Typography
            color="#8184A3"
            mr={0.5}
          >
            Highest Bid:
          </Typography>
          <Typography
            color="#1D7DBD"
            fontWeight="bold"
          >AED {highestBid?.toLocaleString('en-US')}</Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '10px',
            width: '100%',
            marginTop: '24px',
            paddingBottom: { xs: '51px', sm: 0 }
          }}
        >
          <SpecItem>
            {data.details.mileage} km
          </SpecItem>
          <SpecItem>
            {data.details.engine.transmission}
          </SpecItem>
          <SpecItem>
            {data.details.exterior_color}
          </SpecItem>
          <SpecItem>
            {data.details.year} year
          </SpecItem>
          <SpecItem>
            {data.details.ggc}
          </SpecItem>
          <SpecItem>
            {data.details.engine.horsepower_hp} HP
          </SpecItem>
        </Box>
        
      </Box>
      
    </Box>
  )
}
import { useMemo, useEffect, useState } from "react";
import {
  Box,
  Typography
} from "@mui/material";

import SpecItem from './SpecItem';
import { useAuthContext } from "src/auth/useAuthContext";
import Status from './Status';

export default function InfoRow({ data, mobile=false}) {
  return (
    !mobile?
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '10px',
            width: '100%',
            marginTop: '24px',
          }}
        >
          <SpecItem>
            {data.details?.mileage} KM
          </SpecItem>
          <SpecItem>
            {data.details?.engine_size} CC
          </SpecItem>
          <SpecItem>
            {data.details?.exterior_color}
          </SpecItem>
          <SpecItem>
            {data.details?.specification}
          </SpecItem>
        </Box>
        :
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px',
            width: '100%',
            paddingBottom: '8px',
            borderBottom: '1px solid #F4F6F8'
          }}
        >
          <div className="flex items-center text-[#919EAB] text-[8px] gap-[2px]">
            <img src="/assets/icons/cars/mileage.svg" width={10}/>
            <p>
              {data.details?.mileage} KM
            </p>
          </div>
          <div className="flex items-center text-[#919EAB] text-[8px] gap-[2px]">
            <img src="/assets/icons/cars/license.svg" width={10}/>
            <p>
              {data.details?.registered_emirates} 
            </p>
          </div>
          <div className="flex items-center text-[#919EAB] text-[8px] gap-[2px]">
            <img src="/assets/icons/cars/engine.svg" width={10}/>
            <p>
              {data.details?.engine_size} CC
            </p>
          </div>
        </Box>
  )
}
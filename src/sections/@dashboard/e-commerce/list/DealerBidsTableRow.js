import PropTypes from 'prop-types';
import { useState, useEffect} from 'react';
import { sentenceCase } from 'change-case';
// @mui
import {
  Stack,
  Button,
  TableRow,
  Checkbox,
  MenuItem,
  TableCell,
  Icon,
  Link,
} from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/label';
import Image from '../../../../components/image';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import ConfirmDialog from '../../../../components/confirm-dialog';
// websocket
import { useAuthContext } from "src/auth/useAuthContext";
// ----------------------------------------------------------------------

DealerBidsTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  bid: PropTypes.number
};

export default function DealerBidsTableRow({
  row,
  onViewRow,
  bid,
  user,
  auction
}) {
  const { pusher} = useAuthContext();

  const { id, details, livestatus, timeRemaining, images} = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const [highestBid, setHighestBid] = useState( auction?.latest_bid?.bid || bid);

  useEffect(() => {
    const channel = pusher.subscribe(`private-car.auction.${auction?.id}`);
    channel.bind("NewBid", (data) => {
      setHighestBid(data.auction.last_bid)
    });
  
    return () => {
      channel.unbind("NewBid");
      pusher.unsubscribe();
    };
  }, []);

  const mainImages = images?.map((img) => ('https://api.carsxchange.com/storage/car_images/'+ img));

  if(row && details && livestatus){
    return (
      <>
        <TableRow hover >
          {
            mainImages && mainImages.length > 0 && mainImages[0] && mainImages[0].length > 0 ?
              <TableCell >
                <Image
                  alt="product"
                  src={mainImages[0]}
                  ratio="16/9"
                  sx={{borderRadius: '8px'}}
                />
              </TableCell>
            :
              <TableCell > No Image</TableCell>
                
          }
          
  
          <TableCell>
            <Stack direction="row" alignItems="center" spacing={2}>
              {
                livestatus === 'live' ?
                <Link
                noWrap
                color="inherit"
                variant="subtitle2"
                onClick={onViewRow}
                sx={{ cursor: 'pointer' }}
                >
                  #{id}
                </Link>
                :
                '#' + id
              }
              
            </Stack>
          </TableCell>
          <TableCell>{details.make}</TableCell>
          <TableCell>{details.model}</TableCell>
          <TableCell>{details.year}</TableCell>
  
          <TableCell align="center">
            <Label
              variant="soft"
              color={
                (livestatus === 'expired' && 'error') ||
                (livestatus === 'pending' && 'warning') ||
                (livestatus === 'upcoming' && 'secondary') ||
                (livestatus === 'live' && 'success') || 'warning'
              }
              sx={{ textTransform: 'capitalize', minWidth:'100px'}}
            >
              {timeRemaining ? timeRemaining : livestatus? sentenceCase(livestatus) : null }
            </Label>
          </TableCell>
          <TableCell>{bid}</TableCell>
          <TableCell>{highestBid}</TableCell>
          <TableCell align="right">
            {
              livestatus == 'expired' && bid== highestBid && <Iconify icon="mdi:crown" width={30} sx={{color:'#BF913B'}} className='animate-[bounce_2s_ease-in-out_infinite]'/>
            }
            {
              livestatus == 'live' && bid== highestBid && <Iconify icon="iconoir:leaderboard-star" width={30} sx={{color:'#BF913B'}} />
            }
            {
              livestatus == 'live' && bid!= highestBid && <Iconify icon="ph:x" width={30} sx={{color:'#B71D18'}} className='animate-pulse'/>
            }
            {
              livestatus == 'expired' && bid!= highestBid && <Iconify icon="mdi:close-box-outline" width={30} sx={{color:'#B71D18'}} />
            }
              
          </TableCell>
          
        </TableRow>
      </>
    );
  }
  else{
    return null;
  }
  
}

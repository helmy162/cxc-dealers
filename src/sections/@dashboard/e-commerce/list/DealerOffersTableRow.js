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

// ----------------------------------------------------------------------

DealerOffersTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  bid: PropTypes.number
};

export default function DealerOffersTableRow({
  row,
  onViewRow,
  amount,
}) {

  console.log('row');
 
  const { id, details, images} = row;

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


;

  const mainImages = images?.map((img) => ('https://api.carsxchange.com/storage/car_images/'+ img));

  if(row && details){
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
                <Link
                noWrap
                color="inherit"
                variant="subtitle2"
                onClick={onViewRow}
                sx={{ cursor: 'pointer' }}
                >
                  #{id}
                </Link>
              }
              
            </Stack>
          </TableCell>
          <TableCell>{details.make}</TableCell>
          <TableCell>{details.model}</TableCell>
          <TableCell>{details.year}</TableCell>
  


          <TableCell>{amount}</TableCell>

          
        </TableRow>
      </>
    );
  }
  else{
    return null;
  }
  
}

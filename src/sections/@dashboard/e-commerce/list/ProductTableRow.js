import PropTypes from 'prop-types';
import { useState } from 'react';
import { sentenceCase } from 'change-case';
// @mui
import {
  Stack,
  Button,
  TableRow,
  Checkbox,
  MenuItem,
  TableCell,
  IconButton,
  Link,
  TextField
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

ProductTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onAddHotDealRow: PropTypes.func,
  onremoveHotDealRow: PropTypes.func,
};

export default function ProductTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onAddHotDealRow,
  onremoveHotDealRow,
  onEditRow,
  onViewRow,
  columnVisibility,
}) {
  const { id, details, livestatus, timeRemaining, seller, created_at , end_date } = row;

  const inspection_date = new Date(created_at).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
  const auction_End_Date = new Date(end_date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  const [openConfirm, setOpenConfirm] = useState(false);
  const [openSellConfirm, setOpenSellConfirm] = useState(false);
  const [openremovefromhotdeal, setopenremovefromhotdeal] = useState(false);
  const [hotDealsCount, setHotDealsCount] = useState(7000);

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };
  const handleOpenSellConfirm = () => {
    setOpenSellConfirm(true);
  };
  const handleopenremovefromhotdeal = () => {
    setopenremovefromhotdeal(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };
  const handleSellCloseConfirm = () => {
    setOpenSellConfirm(false);
  };
  const handleremovefromhotdealCloseConfirm = () => {
    setopenremovefromhotdeal(false);
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  console.log(row.hot_deal)

  if(row && details && livestatus){
    return (
      <>
        <TableRow hover selected={selected}>
          <TableCell padding="checkbox">
            <Checkbox checked={selected} onClick={onSelectRow} />
          </TableCell>

          <TableCell>
            <Stack direction="row" alignItems="center" spacing={2}>

              <Link
                noWrap
                color="inherit"
                variant="subtitle2"
                onClick={onViewRow}
                sx={{ cursor: 'pointer' }}
              >
                #{id} 
              </Link>
              {row.hot_deal === 0 ? null:<Iconify icon="mingcute:fire-fill" color={'#f00'} />} 
            </Stack>
          </TableCell>

          {columnVisibility['make'] && <TableCell>{details.make}</TableCell>}
          {columnVisibility['model'] && <TableCell>{details.model}</TableCell>}
          {columnVisibility['year'] && <TableCell>{details.year}</TableCell>}
          {columnVisibility['seller_name'] && <TableCell>{seller?.name}</TableCell>}
          {columnVisibility['inspection_date'] && <TableCell>{inspection_date}</TableCell>}
          {columnVisibility['end_date'] && <TableCell>{auction_End_Date}</TableCell>}
         

          {columnVisibility['status'] && (
              <TableCell align="center">
                <Label
                    variant="soft"
                    color={
                        (livestatus === 'expired' && 'error') ||
                        (livestatus === 'pending' && 'warning') ||
                        (livestatus === 'upcoming' && 'secondary') ||
                        (livestatus === 'live' && 'success') ||
                        (livestatus === 'winned' && 'success') ||
                        (livestatus === 'lost' && 'error') ||
                        'warning'
                    }
                    sx={{ textTransform: 'capitalize', minWidth: '100px' }}
                >
                  {timeRemaining ? timeRemaining : livestatus ? sentenceCase(livestatus) : null} 
                </Label>
              </TableCell>
          )}
  
          <TableCell align="right">
            <IconButton color={openPopover ? 'primary' : 'default'} onClick={handleOpenPopover}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </TableCell>
        </TableRow>
  
        <MenuPopover
          open={openPopover}
          onClose={handleClosePopover}
          arrow="right-top"
          sx={{ width: 230 }}
        >
         
          {row.hot_deal === 0 ? ( <MenuItem
            onClick={() => {
              handleOpenSellConfirm();
              handleClosePopover();
            }}
            sx={{ color: 'green' }}
          >
           
            <Iconify icon="eva:done-all-outline" />
            Add to Hot Deals
          </MenuItem>  ) : ( 
          <MenuItem
            onClick={() => {
              handleopenremovefromhotdeal();
              handleClosePopover();
            }}
            sx={{ color: 'green' }}
          >
            <Iconify icon="eva:done-all-outline" />
            Remove From Hot Deals
          </MenuItem>)}
         
          <MenuItem
            onClick={() => {
              handleOpenConfirm();
              handleClosePopover();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="eva:trash-2-outline" />
            Delete
          </MenuItem>
  
          <MenuItem
            onClick={() => {
              onEditRow();
              handleClosePopover();
            }}
          >
            <Iconify icon="eva:edit-fill" />
            Edit
          </MenuItem>
        </MenuPopover>
  
        <ConfirmDialog
          open={openConfirm}
          onClose={handleCloseConfirm}
          title="Delete"
          content="Are you sure want to delete?"
          action={
            <Button variant="contained" color="error" onClick={onDeleteRow}>
              Delete
            </Button>
          }
        />
        <ConfirmDialog
          open={openSellConfirm}
          onClose={handleSellCloseConfirm}
          title="Add This car to hot deals"
          content="Are you sure want to add This car to hot deals?"
          action={

            <>
            <TextField
              label="Minimum offer starting price"
              type="number"
              value={hotDealsCount}
              onChange={(e) => setHotDealsCount(e.target.value)}
              style={{ left: '-25px' }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={ () =>(onAddHotDealRow(hotDealsCount)) }
            >
              Add
            </Button>
          </>
          }
        />
        <ConfirmDialog
          open={openremovefromhotdeal}
          onClose={handleremovefromhotdealCloseConfirm}
          title="Remove this car from hot deals"
          content="Are you sure want to Remove this car from hot deals?"
          action={
            <Button variant="contained" color="error" onClick={onremoveHotDealRow}>
              Remove
            </Button>
          }
        />
      </>
    );
  }
  else{
    return null;
  }
  
}

import PropTypes from 'prop-types';
import { useState } from 'react';
import { sentenceCase } from 'change-case';
// @mui
import {
  Stack,
  Button,
  TableRow,
  Checkbox,
  Radio,
  MenuItem,
  TableCell,
  IconButton,
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
import { useSnackbar } from '../../../../components/snackbar';
import { create } from 'lodash';
import axiosInstance from 'src/utils/axios';

// ----------------------------------------------------------------------

BidTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onSelectAccount: PropTypes.func,
  hasWinner: PropTypes.bool,
};

export default function BidTableRow({
  row,
  selected,
  onSelectAccount,
  hasWinner,
}) {
  const { dealer, time, bid, created_at} = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

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

  const AnnounceWinner = (bid) => {
    try {
      const response = axiosInstance.put('admin/auction/declare-winner', {
        auction_id: bid.auction_id,
        bid_id: bid.id,
        user_id: bid.user_id,
      });
      enqueueSnackbar('Winner was notified successfully', { variant: 'success' });
    } catch (error) {
      console.error(error);
    }
    handleCloseConfirm();
  }

  const date = new Date(created_at);
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();

  const id = dealer.id;
  const name = dealer.name;

  return (
    <>
      <TableRow hover selected={selected}>
        

        <TableCell align='center'>
            <Link
              noWrap
              color="inherit"
              variant="subtitle2"
              onClick={onSelectAccount}
              sx={{ cursor: 'pointer' }}
            >
              #{dealer.id}
            </Link>
        </TableCell>
        <TableCell align='center' id='name'>{name}</TableCell>
        <TableCell align='center'>{formattedDate} {formattedTime}</TableCell>
        <TableCell align='center'>{bid?.toLocaleString('en-US')} AED</TableCell>
        <TableCell align='center'>
          <Radio checked={selected} onClick={() => setOpenConfirm(true)} disabled={hasWinner}/>
        </TableCell>

      </TableRow>


      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Announce Winner"
        content={<>Are you sure want to announce {dealer.name} with {bid?.toLocaleString('en-US')} AED bid as the winner ? <br />{dealer.name} will be notified via email</>}
        action={
          <Button variant="contained" color="success" onClick={() => AnnounceWinner(row)}>
            Confirm
          </Button>
        }
      />
    </>
  );
}

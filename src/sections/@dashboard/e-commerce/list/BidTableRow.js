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
import { create } from 'lodash';

// ----------------------------------------------------------------------

ProductTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function ProductTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
  onViewRow,
}) {
  const { dealer, time, bid, created_at} = row;

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

  const AnnouceWinner = () => {
    console.log("Annouce Winner");
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
              onClick={onViewRow}
              sx={{ cursor: 'pointer' }}
            >
              #{dealer.id}
            </Link>
        </TableCell>
        <TableCell align='center' id='name'>{name}</TableCell>
        <TableCell align='center'>{formattedDate} {formattedTime}</TableCell>
        <TableCell align='center'>{bid?.toLocaleString('en-US')} AED</TableCell>
        <TableCell align='center'>
          <Radio checked={selected} onClick={() => setOpenConfirm(true)} />
        </TableCell>

      </TableRow>


      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Annouce Winner"
        content={<>Are you sure want to annouce {dealer.name} with {bid?.toLocaleString('en-US')} AED bid as the winner ? <br />{dealer.name} will be notified via email</>}
        action={
          <Button variant="contained" color="success" onClick={AnnouceWinner}>
            Confirm
          </Button>
        }
      />
    </>
  );
}

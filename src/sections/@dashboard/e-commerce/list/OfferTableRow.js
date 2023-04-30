import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { TableRow, TableCell, Link } from '@mui/material';
import { useSnackbar } from '../../../../components/snackbar';

// ----------------------------------------------------------------------

OfferTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onSelectAccount: PropTypes.func,
};

export default function OfferTableRow({
  row,
  selected,
  onSelectAccount,
}) {
  const { dealer, amount, created_at} = row;

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
        <TableCell align='center'>{amount?.toLocaleString('en-US')} AED</TableCell>

      </TableRow>
    </>
  );
}

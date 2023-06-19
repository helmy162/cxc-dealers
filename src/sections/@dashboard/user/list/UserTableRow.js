import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../../routes/paths';
// @mui
import {
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
} from '@mui/material';
// components
import Label from '../../../../components/label';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import ConfirmDialog from '../../../../components/confirm-dialog';
// import { phoneNumber } from 'src/_mock/assets';

// ----------------------------------------------------------------------

UserTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

export default function UserTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow, onSelectAccount }) {
  const navigate = useNavigate();

  const { id, name, phone, email, type, bid_limit, account_status} = row;

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
  if(row){
    return (
      <>
        <TableRow hover selected={selected}>
          <TableCell padding="checkbox">
            <Checkbox checked={selected} onClick={onSelectRow} />
          </TableCell>

          <TableCell>
            <Stack direction="row" alignItems="center" spacing={2}>
              {/* <Avatar alt={name} src={avatarUrl} /> */}

              <Typography variant="subtitle2" noWrap onClick={onSelectAccount} sx={{cursor:'pointer'}}>
                #{id}
              </Typography>
            </Stack>
          </TableCell>
          
          <TableCell>
            <Stack direction="row" alignItems="center" spacing={2}>
              {/* <Avatar alt={name} src={avatarUrl} /> */}

              <Typography variant="subtitle2" noWrap onClick={onSelectAccount} sx={{cursor:'pointer'}}>
                {name}
              </Typography>
            </Stack>
          </TableCell>

          <TableCell align="left">{email}</TableCell>

          <TableCell align="left">{phone}</TableCell>

          <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
            {bid_limit ?? '0'} AED
          </TableCell>
          <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
            {type}
          </TableCell>

          {/* <TableCell align="center">
            <Iconify
              icon={isVerified ? 'eva:checkmark-circle-fill' : 'eva:clock-outline'}
              sx={{
                width: 20,
                height: 20,
                color: 'success.main',
                ...(!isVerified && { color: 'warning.main' }),
              }}
            />
          </TableCell>*/}

          <TableCell align="left">
            <Label
              variant="soft"
              color={( account_status === 'inactive' && 'error') || 'success'}
              sx={{ textTransform: 'capitalize' }}
            >
              {account_status}
            </Label>
          </TableCell>

          <TableCell align="right">
            <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </TableCell>
        </TableRow>

        <MenuPopover
          open={openPopover}
          onClose={handleClosePopover}
          arrow="right-top"
          sx={{ width: 140 }}
        >
          <MenuItem
            onClick={() => {
              onEditRow();
              handleClosePopover();
            }}
          >
            <Iconify icon="eva:edit-fill" />
            Edit
          </MenuItem>

          {account_status === 'active' && (
              <MenuItem
                  onClick={() => {
                    handleOpenConfirm();
                    handleClosePopover();
                  }}
                  sx={{ color: 'error.main' }}
              >
                <Iconify icon="eva:trash-2-outline" />
                Deactivate
              </MenuItem>
          )}

        </MenuPopover>

        <ConfirmDialog
          open={openConfirm}
          onClose={handleCloseConfirm}
          title="Delete"
          content="Are you sure you want to deactivate this user's account?"
          action={
            <Button variant="contained" color="error" onClick={() => {
              onDeleteRow();
              handleCloseConfirm();
            }}>
              Deactivate
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

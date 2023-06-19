import PropTypes from 'prop-types';
import {useState} from 'react';
import {sentenceCase} from 'change-case';
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
} from '@mui/material';
// utils
import {fDate} from '../../../../utils/formatTime';
import {fCurrency} from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/label';
import Image from '../../../../components/image';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import ConfirmDialog from '../../../../components/confirm-dialog';

// ----------------------------------------------------------------------

AppointmentRow.propTypes = {
    row: PropTypes.object,
    selected: PropTypes.bool,
    onSelectRow: PropTypes.func,
    onDeleteRow: PropTypes.func,
    onEditRow: PropTypes.func,
    onViewRow: PropTypes.func,
    columnVisibility: PropTypes.object,
};

export default function AppointmentRow({row, selected, onSelectRow, onDeleteRow, onEditRow, onViewRow, columnVisibility}) {
    const {deal_id, deal_title, person_name, location, due_date, due_time} = row;

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

    if (row) {
        return (
            <>
                <TableRow hover selected={selected}>
                    <TableCell padding="checkbox">
                        <Checkbox checked={selected} onClick={onSelectRow}/>
                    </TableCell>

                    {columnVisibility['deal_id'] && (
                        <TableCell>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Link
                                    noWrap
                                    color="inherit"
                                    variant="subtitle2"
                                    onClick={onViewRow}
                                    sx={{cursor: 'pointer'}}
                                >
                                    #{deal_id}
                                </Link>
                            </Stack>
                        </TableCell>
                    )}

                    {columnVisibility['person_name'] && <TableCell>{person_name}</TableCell>}
                    {columnVisibility['deal_title'] && <TableCell>{deal_title}</TableCell>}
                    {columnVisibility['location'] && <TableCell>{location}</TableCell>}
                    {columnVisibility['due_date'] && <TableCell>{due_date + ' ' + due_time}</TableCell>}


                    <TableCell align="right">
                        <IconButton color={openPopover ? 'primary' : 'default'} onClick={handleOpenPopover}>
                            <Iconify icon="eva:more-vertical-fill"/>
                        </IconButton>
                    </TableCell>
                </TableRow>

                <MenuPopover
                    open={openPopover}
                    onClose={handleClosePopover}
                    arrow="right-top"
                    sx={{width: 140}}
                >
                    <MenuItem
                        onClick={() => {
                            handleOpenConfirm();
                            handleClosePopover();
                        }}
                        sx={{color: 'error.main'}}
                    >
                        <Iconify icon="eva:trash-2-outline"/>
                        Delete
                    </MenuItem>

                    <MenuItem
                        onClick={() => {
                            onEditRow();
                            handleClosePopover();
                        }}
                    >
                        <Iconify icon="eva:edit-fill"/>
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
            </>
        );
    } else {
        return null;
    }
}

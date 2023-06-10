import PropTypes from 'prop-types';
import {sentenceCase} from 'change-case';
// @mui
import {
    Stack,
    Button,
    Select,
    MenuItem,
    Checkbox,
    TextField,
    InputLabel,
    FormControl,
    OutlinedInput,
    InputAdornment,
    FormControlLabel,
} from '@mui/material';
// components
import Iconify from '../../../../components/iconify';

// ----------------------------------------------------------------------

ProductTableToolbar.propTypes = {
    isFiltered: PropTypes.bool,
    filterName: PropTypes.string,
    onFilterName: PropTypes.func,
    onResetFilter: PropTypes.func,
    filterStatus: PropTypes.array,
    onFilterStatus: PropTypes.func,
    statusOptions: PropTypes.array,
};

export default function ProductTableToolbar({
    isFiltered,
    filterName,
    filterStatus,
    onFilterName,
    statusOptions,
    columnOptions,
    onResetFilter,
    onFilterStatus,
    columnVisibility,
    onToggleColumnVisibility,
    onOpenColumnFilters,
    onCloseColumnFilters,
}) {
    return (
        <Stack
            spacing={2}
            alignItems="center"
            direction={{
                xs: 'column',
                md: 'row',
            }}
            sx={{px: 2.5, py: 3}}
        >
            <FormControl
                sx={{
                    width: {xs: 1, md: 240},
                }}
            >
                <InputLabel sx={{'&.Mui-focused': {color: 'text.primary'}}}>Status</InputLabel>
                <Select
                    multiple
                    value={filterStatus}
                    onChange={onFilterStatus}
                    input={<OutlinedInput label="Status"/>}
                    renderValue={(selected) => selected.map((value) => sentenceCase(value)).join(', ')}
                >
                    {statusOptions.map((option) => (
                        <MenuItem
                            key={option.value}
                            value={option.value}
                            sx={{
                                p: 0,
                                mx: 1,
                                borderRadius: 0.75,
                                typography: 'body2',
                                textTransform: 'capitalize',
                            }}
                        >
                            <Checkbox disableRipple size="small" checked={filterStatus.includes(option.value)}/>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                fullWidth
                value={filterName}
                onChange={onFilterName}
                placeholder="Search..."
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Iconify icon="eva:search-fill" sx={{color: 'text.disabled'}}/>
                        </InputAdornment>
                    ),
                }}
            />

            <FormControl
                sx={{
                    width: {xs: 1, md: 240},
                }}
            >
                <InputLabel sx={{'&.Mui-focused': {color: 'text.primary'}}}>Filters</InputLabel>
                <Select
                    multiple
                    value={columnOptions.filter((column) => columnVisibility[column.id]).map((column) => column.label)}
                    onChange={onOpenColumnFilters}
                    input={<OutlinedInput label="Filters"/>}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {columnOptions.filter((column) => column.id !== '').map((column) => (
                        <MenuItem key={column.id}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={columnVisibility[column.id]}
                                        onChange={() => onToggleColumnVisibility(column.id)}
                                    />
                                }
                                label={column.label}
                            />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {isFiltered && (
                <Button
                    color="error"
                    sx={{flexShrink: 0}}
                    onClick={onResetFilter}
                    startIcon={<Iconify icon="eva:trash-2-outline"/>}
                >
                    Clear
                </Button>
            )}
        </Stack>
    );
}

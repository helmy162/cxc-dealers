import {Helmet} from 'react-helmet-async';
import {useState, useRef, useEffect, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import axiosInstance from 'src/utils/axios';
import {
    Card,
    Table,
    Button,
    Tooltip,
    TableBody,
    Container,
    IconButton,
    TableContainer,
} from '@mui/material';
import {PATH_DASHBOARD} from '../../routes/paths';
import {useSettingsContext} from '../../components/settings';
import {useSnackbar} from "notistack";
import {ProductTableToolbar} from '../../sections/@dashboard/e-commerce/list';
import {
    useTable,
    emptyRows,
    TableNoData,
    TableSkeleton,
    TableEmptyRows,
    TableHeadCustom,
    TableSelectedAction,
    TablePaginationCustom,
} from '../../components/table';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import ConfirmDialog from '../../components/confirm-dialog';
import AppointmentRow from 'src/sections/@dashboard/e-commerce/list/AppointmentRow';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
import { debounce } from 'lodash';

const TABLE_HEAD = [
    {id: 'deal_id', label: 'Deal ID', align: 'left'},
    {id: 'person_name', label: 'Person Name', align: 'left'},
    {id: 'deal_title', label: 'Deal Title', align: 'left'},
    {id: 'location', label: 'Location', align: 'left'},
    {id: 'due_date', label: 'Due Date', align: 'left'},
    {id: ''},
];

const STATUS_OPTIONS = [
    {value: 'done', label: 'Done'},
    {value: 'today', label: 'Today'},
    {value: 'week', label: 'This week'},
    {value: 'month', label: 'This month'},
    {value: 'year', label: 'This year'},
];

const defaultVisibility = {
    deal_id: true,
    person_name: true,
    deal_title: true,
    location: true,
    due_date: true,
    '': true,
};

const DEBOUNCE_DELAY = 500;

const COLUMN_VISIBILITY_STORAGE_KEY = 'appointmentsColumnVisibility';

export default function AppointmentsPage() {
    const {
        dense,
        page,
        order,
        orderBy,
        rowsPerPage,
        setPage,
        // Selections
        selected,
        onSelectRow,
        onSelectAllRows,
        // Sorting
        onSort,
        onChangeDense,
        onChangeRowsPerPage,
    } = useTable({
        defaultOrderBy: 'due_date',
        defaultOrder: 'desc',
        defaultRowsPerPage: 25,
    });

    const {themeStretch} = useSettingsContext();

    const { enqueueSnackbar } = useSnackbar();

    const navigate = useNavigate();

    const [tableData, setTableData] = useState([]);

    const [filterName, setFilterName] = useState('');

    const [filterStatus, setFilterStatus] = useState([]);

    const [openConfirm, setOpenConfirm] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const [hasMoreItems, setHasMoreItems] = useState(true);

    const [isColumnFiltersOpen, setIsColumnFiltersOpen] = useState(false);

    const prevFilterStatusRef = useRef(filterStatus);

    const prevFilterNameRef = useRef(filterName);

    const debouncedGetActivities = useRef(
        debounce((done, hasDateFilter, query) => {
            getActivities(done, hasDateFilter, query)
                .then((data) => {
                    setIsLoading(false);
                    setTableData((prevTableData) => [...prevTableData, ...data.data]);
                    setHasMoreItems(data.additional_data.pagination.more_items_in_collection);
                })
                .catch((error) => {
                    setPage(0);
                    setTableData([]);
                    setIsLoading(false);
                    enqueueSnackbar('Error loading data from Pipedrive', { variant: 'error' });
                });
        }, DEBOUNCE_DELAY)
    ).current;

    const getActivities = useCallback(async (done, hasDateFilter, query = '') => {
        try {
            let params = {
                start: page * rowsPerPage,
                limit: rowsPerPage,
                done: done,
            };

            if (hasDateFilter) {
                params.start_date = hasDateFilter;
            }

            if (query !== '') {
                params.search = query;
            }

            const response = await axiosInstance.post('pipedrive/activities', params);

            // Return the response data
            return response.data;
        } catch (error) {
            throw error;
        }
    }, [page, rowsPerPage]);


    useEffect(() => {
        setIsLoading(true);
        const done = filterStatus.includes('done');
        const dateFilter = filterStatus.includes('today') || filterStatus.includes('week') || filterStatus.includes('month') || filterStatus.includes('year');
        const filterStatusHasChanged = filterStatus !== prevFilterStatusRef.current;
        const filterNameHasChanged = filterName !== prevFilterNameRef.current;

        if (filterStatusHasChanged || filterNameHasChanged) {
            setPage(0);
            setTableData([]);
        }

        if (page * rowsPerPage >= tableData.length || filterStatusHasChanged || filterNameHasChanged) {
            debouncedGetActivities(done, dateFilter, filterName);
        }

        // Update the previous filterStatus after the condition check
        prevFilterStatusRef.current = filterStatus;
    }, [page, filterStatus, filterName, debouncedGetActivities]);

    const dataInPage = tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const denseHeight = dense ? 60 : 80;

    const isFiltered = filterName !== '' || !!filterStatus.length;

    const isNotFound = (!tableData.length && !!filterName) || (!isLoading && !tableData.length);

    const onChangePageWithScroll = (event, newPage) => {
        setPage(newPage);
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    const saveColumnVisibilityToLocalStorage = (visibility) => {
        localStorage.setItem(COLUMN_VISIBILITY_STORAGE_KEY, JSON.stringify(visibility));
    };

    const getColumnVisibilityFromLocalStorage = () => {
        const visibility = localStorage.getItem(COLUMN_VISIBILITY_STORAGE_KEY);
        return visibility ? JSON.parse(visibility) : {};
    };

    const [columnVisibility, setColumnVisibility] = useState(() => {
        const savedColumnVisibility = getColumnVisibilityFromLocalStorage();
        return Object.keys(savedColumnVisibility).length !== 0 ? savedColumnVisibility : defaultVisibility;
    });

    useEffect(() => {
        saveColumnVisibilityToLocalStorage(columnVisibility);
    }, [columnVisibility]);

    const handleOpenColumnFilters = () => {
        setIsColumnFiltersOpen(true);
    };

    const handleCloseColumnFilters = () => {
        setIsColumnFiltersOpen(false);
    };

    const handleToggleColumnVisibility = (columnId) => {
        setColumnVisibility((prevVisibility) => ({
            ...prevVisibility,
            [columnId]: !prevVisibility[columnId],
        }));
    };

    const handleOpenConfirm = () => {
        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };

    const handleFilterName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const handleFilterStatus = (event) => {
        setPage(0);
        setFilterStatus(event.target.value);
    };

    const handleResetFilter = () => {
        setColumnVisibility(defaultVisibility);
        setFilterName('');
        setFilterStatus([]);
    };

    // TODO: Delete in Pipedrive
    const handleDeleteRow = async (id) => {
        // try {
        //     const response = await axiosInstance.delete(`admin/cars/${id}`);
        //     // check if the DELETE request was successful
        //     if (response.data.success) {
        //         const deleteRow = tableData.filter((row) => row.id !== id);
        //         setSelected([]);
        //         setTableData(deleteRow);
        //     }
        // } catch (error) {
        //     console.error('Error:', error);
        // }

        if (page > 0) {
            if (dataInPage.length < 2) {
                setPage(page - 1);
            }
        }
    };

    const handleDeleteRows = async (selectedRows) => {
        const deleteRows = tableData.filter((row) => !selectedRows.includes(row.id));
        selectedRows.forEach(async row => {
            // try {
            //   const response = await axiosInstance.delete(`admin/cars/${row}`);
            //   // check if the DELETE request was successful
            //   if (response.data.success) {
            //     setSelected([]);
            //     setTableData(deleteRows);
            //   }
            // } catch (error) {
            //   console.error('Error:', error);
            // }
        });

        if (page > 0) {
            if (selectedRows.length === dataInPage.length) {
                setPage(page - 1);
            } else if (selectedRows.length === tableData.length) {
                setPage(0);
            } else if (selectedRows.length > dataInPage.length) {
                const newPage = Math.ceil((tableData.length - selectedRows.length) / rowsPerPage) - 1;
                setPage(newPage);
            }
        }
    };

    const handleEditRow = (id) => {
        // TODO: edit Pipedrive inspection appointment in dialog
        navigate(PATH_DASHBOARD.car.edit(id));
    };

    const handleViewRow = (id) => {
        // TODO: display Pipedrive inspection appointment dialog
        navigate(PATH_DASHBOARD.car.view(id));
    };

    return (
        <>
            <Helmet>
                <title> Appointments List | CarsXchange</title>
            </Helmet>

            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Appointments List"
                    links={[
                        {name: 'Dashboard', href: PATH_DASHBOARD.root},
                        {
                            name: 'Appointments',
                        },
                    ]}
                />

                <Card>
                    <ProductTableToolbar
                        filterName={filterName}
                        filterStatus={filterStatus}
                        onFilterName={handleFilterName}
                        onFilterStatus={handleFilterStatus}
                        statusOptions={STATUS_OPTIONS}
                        columnOptions={TABLE_HEAD}
                        isFiltered={isFiltered}
                        onResetFilter={handleResetFilter}
                        onOpenColumnFilters={handleOpenColumnFilters}
                        onCloseColumnFilters={handleCloseColumnFilters}
                        columnVisibility={columnVisibility}
                        onToggleColumnVisibility={handleToggleColumnVisibility}
                    />

                    <TableContainer sx={{position: 'relative', overflow: 'unset'}}>
                        <TableSelectedAction
                            dense={dense}
                            numSelected={selected.length}
                            rowCount={tableData.length}
                            onSelectAllRows={(checked) =>
                                onSelectAllRows(
                                    checked,
                                    tableData.map((row) => row.id)
                                )
                            }
                            action={
                                <Tooltip title="Delete">
                                    <IconButton color="primary" onClick={handleOpenConfirm}>
                                        <Iconify icon="eva:trash-2-outline"/>
                                    </IconButton>
                                </Tooltip>
                            }
                        />

                        <Scrollbar>
                            <Table size={dense ? 'small' : 'medium'} sx={{minWidth: 960}}>
                                <TableHeadCustom
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD.filter((column) => columnVisibility[column.id])}
                                    rowCount={tableData.length}
                                    numSelected={selected.length}
                                    onSort={onSort}
                                    onSelectAllRows={(checked) =>
                                        onSelectAllRows(
                                            checked,
                                            tableData.map((row) => row.id)
                                        )
                                    }
                                />

                                <TableBody>
                                    {(isLoading ? [...Array(rowsPerPage)] : tableData)
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) =>
                                            row ? (
                                                <AppointmentRow
                                                    key={row.id}
                                                    row={row}
                                                    selected={selected.includes(row.id)}
                                                    columnVisibility={columnVisibility}
                                                    onSelectRow={() => onSelectRow(row.id)}
                                                    onDeleteRow={() => handleDeleteRow(row.id)}
                                                    onEditRow={() => handleEditRow(row.id)}
                                                    onViewRow={() => handleViewRow(row.id)}
                                                />
                                            ) : (
                                                !isNotFound && <TableSkeleton key={index} sx={{height: denseHeight}}/>
                                            )
                                        )}

                                    <TableEmptyRows
                                        height={denseHeight}
                                        emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                                    />

                                    <TableNoData isNotFound={isNotFound}/>
                                </TableBody>
                            </Table>
                        </Scrollbar>
                    </TableContainer>

                    <TablePaginationCustom
                        count={hasMoreItems ? tableData.length + rowsPerPage : tableData.length}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onPageChange={onChangePageWithScroll}
                        onRowsPerPageChange={onChangeRowsPerPage}
                        dense={dense}
                        onChangeDense={onChangeDense}
                    />
                </Card>
            </Container>

            <ConfirmDialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                title="Delete"
                content={
                    <>
                        Are you sure want to delete <strong> {selected.length} </strong> items?
                    </>
                }
                action={
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                            handleDeleteRows(selected);
                            handleCloseConfirm();
                        }}
                    >
                        Delete
                    </Button>
                }
            />
        </>
    );
}

import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axiosInstance from 'src/utils/axios';
// @mui
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
// redux
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import {
  useTable,
  getComparator,
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
import { useAuthContext } from 'src/auth/useAuthContext';
import axios from 'axios';
import AppointmentRow from 'src/sections/@dashboard/e-commerce/list/AppointmentRow';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'deal_id', label: 'Deal ID', align: 'left' },
  { id: 'person_name', label: 'Person Name', align: 'left' },
  { id: 'deal_title', label: 'Deal Title', align: 'left' },
  { id: 'location', label: 'Location', align: 'left' },
  { id: 'due_date', label: 'Due Date', align: 'left' },
  { id: '' },
];

const STATUS_OPTIONS = [
  { value: 'live', label: 'Live' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'pending', label: 'Pending' },
  { value: 'expired', label: 'Expired' },
];

// ----------------------------------------------------------------------

export default function AppointmentsPage() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({
    defaultOrderBy: 'add_time',
    defaultOrder: 'asc',
    defaultRowsPerPage: 25,
  });


  

  const { themeStretch } = useSettingsContext();

  const {user} = useAuthContext();

  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);

  const [filterName, setFilterName] = useState('');

  const [filterStatus, setFilterStatus] = useState([]);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [hasMoreItems, setHasMoreItems] = useState(true);

  const getActivities = async () => {
    try {

      const response = await axios .get('https://api.pipedrive.com/v1/activities/', {
        params: {
          api_token: 'ca9a75ff9eb76cda17ece86f09126b2e2bd4a49c',
          type: 'inspection_appintment',
          start: page * rowsPerPage,
          limit: rowsPerPage,
          done: 1
        },
      });
      setTableData( (previousValue) => [...response.data.data, ...previousValue]);
      setHasMoreItems(response.data.additional_data.pagination.more_items_in_collection)
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if(page * rowsPerPage >= tableData.length){
      setIsLoading(true);
      getActivities();
    }
    else{
      console.log(page * rowsPerPage);
      console.log(tableData.length);
    }

  }, [page]);

  console.log(tableData);

  
  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterStatus,
  });

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 60 : 80;

  const isFiltered = filterName !== '' || !!filterStatus.length;

  const isNotFound = (!dataFiltered.length && !!filterName) || (!isLoading && !dataFiltered.length);

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
      } else if (selectedRows.length === dataFiltered.length) {
        setPage(0);
      } else if (selectedRows.length > dataInPage.length) {
        const newPage = Math.ceil((tableData.length - selectedRows.length) / rowsPerPage) - 1;
        setPage(newPage);
      }
    }
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.car.edit(id));
  };

  const handleViewRow = (id) => {
    navigate(PATH_DASHBOARD.car.view(id));
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterStatus([]);
  };

  const onChangePageWithScroll = (event, newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title> Appointments List | CarsXchange</title>
      </Helmet>

      {
        isLoading && <LoadingScreen/>
      }
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Appointments List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Appointments',
            },
          ]}
        />

        <Card>
          {/* <ProductTableToolbar
            filterName={filterName}
            filterStatus={filterStatus}
            onFilterName={handleFilterName}
            onFilterStatus={handleFilterStatus}
            statusOptions={STATUS_OPTIONS}
            isFiltered={isFiltered}
            onResetFilter={handleResetFilter}
          /> */}

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
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
                    <Iconify icon="eva:trash-2-outline" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
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
                  {(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) =>
                      row ? (
                        <AppointmentRow
                          key={row.id}
                          row={row}
                          selected={selected.includes(row.id)}
                          onSelectRow={() => onSelectRow(row.id)}
                          onDeleteRow={() => handleDeleteRow(row.id)}
                          onEditRow={() => handleEditRow(row.id)}
                          onViewRow={() => handleViewRow(row.id)}
                        />
                      ) : (
                        !isNotFound && <TableSkeleton key={index} sx={{ height: denseHeight }} />
                      )
                    )}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={hasMoreItems? tableData.length + rowsPerPage : tableData.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePageWithScroll}
            onRowsPerPageChange={onChangeRowsPerPage}
            //
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

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filterName, filterStatus }) {
  const stabilizedThis = inputData?.map((el, index) => [{
    ...el,
    make: el?.details?.make,
    model: el?.details?.model,
    year: el?.details?.year,
    // seller_name: el?.seller_name, // uncomment when seller_name is ready
  }, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter( function(product){
      if 
      ( 
         product.id.toString().indexOf(filterName.toLowerCase()) !== -1
      || product?.details?.make.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 
      || product?.details?.model.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 
      || product?.details?.year.toString().indexOf(filterName.toLowerCase()) !== -1
      || '#' + product.id == filterName
      // || product.seller_name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 // uncomment when seller_name is ready
      )
        return true;
      return false;
    });
  }

  if (filterStatus.length) {
    inputData = inputData.filter((product) => filterStatus.includes(product.livestatus));
  }

  return inputData;
}

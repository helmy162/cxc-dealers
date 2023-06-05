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
import { useDispatch, useSelector } from '../../redux/store';
import { getStatus, getUserOffers } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD, PATH_DEALER } from '../../routes/paths';
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
import { useAuthContext } from '../../auth/useAuthContext';
// sections
import { DealerOffersTableRow } from '../../sections/@dashboard/e-commerce/list';
//car status
import { carStatus, carTimer } from '../../utils/status';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'image', label: 'Image', align: 'left' },
  { id: 'id', label: 'Car ID', align: 'left' },
  { id: 'make', label: 'Make', align: 'left' },
  { id: 'model', label: 'Model', align: 'left' },
  { id: 'year', label: 'Year', align: 'left' },
  { id: 'offer', label: 'My Offer', align: 'left' },
];

// ----------------------------------------------------------------------

export default function BidsPage() {
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
    defaultOrderBy: 'id',
    defaultOrder: 'desc',
  });

  const {user} = useAuthContext();

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { products, isLoading, productStatus, userOffers} = useSelector((state) => state.product);

  const [tableData, setTableData] = useState([]);

  const [filterName, setFilterName] = useState('');

  const [filterStatus, setFilterStatus] = useState([]);

  const [openConfirm, setOpenConfirm] = useState(false);

  

  useEffect(() => {
    dispatch(getUserOffers());
  }, [dispatch, user]);

  console.log(tableData);

  useEffect(() => {
    if (userOffers) {
      setTableData(userOffers);
    }
  }, [userOffers]);


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
    try {
        const response = await axiosInstance.delete(`admin/cars/${id}`);
        // check if the DELETE request was successful
        if (response.data.success) {
            const deleteRow = tableData.filter((row) => row.id !== id);
            setSelected([]);
            setTableData(deleteRow);
        }
    } catch (error) {
        console.error('Error:', error);
    }

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
};

  const handleDeleteRows = async (selectedRows) => {
    const deleteRows = tableData.filter((row) => !selectedRows.includes(row.id));
    selectedRows.forEach(async row => {
      try {
        const response = await axiosInstance.delete(`admin/cars/${row}`);
        // check if the DELETE request was successful
        if (response.data.success) {
          setSelected([]);
          setTableData(deleteRows);
        }
      } catch (error) {
        console.error('Error:', error);
      }
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
    navigate(PATH_DEALER.car(getCarFromBid(id)?.id));
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterStatus([]);
  };

  const getCarFromBid = (id) => {
    try {
        const car = tableData.find(car=> car.id == id);
        if (car) {
            return car;
        }
        else return;
    } catch (error) {
        console.error('Error:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title> My Offers | CarsXchange</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="My Bids"
          links={[
            { name: 'Car Bids' },
          ]}
          action={
            <Button
              component={RouterLink}
              to={PATH_DEALER.soldCars}
              variant="contained"
              startIcon={<Iconify icon="mdi:offer" />}
            >
              Make Offer
            </Button>
          }
        />

        <Card>
          

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
                  
                  selectBox={false}
                />

                <TableBody>
                  {(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) =>
                        row ? (            
                        <DealerOffersTableRow
                          key={row.id}
                          row={row.car}
                          amount={row.amount}
                          onViewRow={() => handleViewRow(getCarFromBid(row.car_id).id)}
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
            count={dataFiltered.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
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
    inputData = inputData.filter((product) => filterStatus.includes(product.status));
  }

  return inputData;
}

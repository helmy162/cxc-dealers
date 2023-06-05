import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import ConfirmDialog from '../../components/confirm-dialog';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import { useSnackbar } from '../../components/snackbar';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from '../../components/table';
// sections
import { SellerTableToolbar, SellerTableRow } from '../../sections/@dashboard/seller/list';
import { getSellers, resetSeller } from '../../redux/slices/user';
import { useDispatch, useSelector } from '../../redux/store';
// axios
import axiosInstance from 'src/utils/axios';
import { useAuthContext } from 'src/auth/useAuthContext';

// ----------------------------------------------------------------------



const STATUS_OPTIONS = [
  'all',
  'Pending',
  'Active'
];

const ROLE_OPTIONS = [
  'all',
  'Pending',
  'Active'
];

const TABLE_HEAD = [
  { id: 'id', label: 'ID', align: 'left'},
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'email', label: 'Email', align: 'left' },
  { id: 'phone', label: 'Phone Number', align: 'left' },
  { id: 'created_at', label: 'Created At', align: 'left' },
  { id: '' },
];



// ----------------------------------------------------------------------

export default function SellerListPage() {
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

  const { themeStretch } = useSettingsContext();

  const {user} = useAuthContext();

  const { sellers, isLoading } = useSelector((state) => state.user);

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSellers(user?.role));
    dispatch(resetSeller());
  }, [dispatch]);

  useEffect(() => {
    if (sellers && sellers.length) {
      setTableData(sellers);
    }
  }, [sellers]);

  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [filterName, setFilterName] = useState('');

  const [filterRole, setFilterRole] = useState('all');

  const [filterStatus, setFilterStatus] = useState('all');

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterRole,
    filterStatus,
  });

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 52 : 72;

  const isFiltered = filterName !== '' || filterRole !== 'all' || filterStatus !== 'all';

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterRole) ||
    (!dataFiltered.length && !!filterStatus);

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

  const handleDeleteRow = async (id) => {
    try {
        const response = await axiosInstance.delete(`admin/sellers/${id}`);

        if (response.data.success) {
            const deleteRow = tableData.filter((row) => row.id !== id);
            setSelected([]);
            setTableData(deleteRow);
            enqueueSnackbar('Seller deleted successfully', { variant: 'success' });
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
      const response = await axiosInstance.delete(`admin/sellers/${row}`);
      
      if (response.data.success) {
        setSelected([]);
        setTableData(deleteRows);
        enqueueSnackbar('Seller deleted successfully', { variant: 'success' });
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
  const handleAccountClick = (id) => {
    navigate(PATH_DASHBOARD.seller.edit(id)); // change edit to account
  }
  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.seller.edit(id));
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterRole('all');
    setFilterStatus('all');
  };

  return (
    <>
      <Helmet>
        <title> Seller: List | CarsXchange</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Seller List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Seller', href: PATH_DASHBOARD.seller.root },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.seller.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Seller
            </Button>
          }
        />

        <Card>
          

          <SellerTableToolbar
            isFiltered={isFiltered}
            filterName={filterName}
            onFilterName={handleFilterName}
            onResetFilter={handleResetFilter}
            hasFilterRole={false}
          />

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
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
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
                    .filter(row => row)
                    .map((row) => (
                      <SellerTableRow
                        key={row?.id}
                        row={row}
                        selected={selected.includes(row?.id)}
                        onSelectRow={() => onSelectRow(row?.id)}
                        onDeleteRow={() => handleDeleteRow(row?.id)}
                        onEditRow={() => handleEditRow(row?.id)}
                        onSelectAccount={() => handleAccountClick(row?.id)}
                      />
                    ))}

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

function applyFilter({ inputData, comparator, filterName}) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter( function(seller){
      if (
        seller.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 || 
        seller.phone.indexOf(filterName.toLowerCase()) !== -1 || 
        seller.email.indexOf(filterName.toLowerCase()) !== -1 ||
        '#' + seller.id ==  filterName
        )
        return true;
      return false;
    });
  }




  return inputData;
}

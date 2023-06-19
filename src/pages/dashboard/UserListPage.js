import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import {
  Tab,
  Tabs,
  Card,
  Table,
  Button,
  Tooltip,
  Divider,
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
import { UserTableToolbar, UserTableRow } from '../../sections/@dashboard/user/list';
import { getUsers } from '../../redux/slices/user';
import { useDispatch, useSelector } from '../../redux/store';
// axios
import axiosInstance from 'src/utils/axios';
import { useAuthContext } from 'src/auth/useAuthContext';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [
  'all',
  'Admin',
  'Inspector',
  'Dealer',
  'Closer',
  'Sales',
  'Inactive'
];

const ROLE_OPTIONS = [
  'all',
  'Admin',
  'Inspector',
  'Dealer',
  'Closer',
  'Sales'
];

const TABLE_HEAD = [
  { id: 'id', label: 'ID', align: 'left'},
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'email', label: 'Email', align: 'left' },
  { id: 'phone_number', label: 'Phone Number', align: 'left' },
  { id: 'bid_limit', label: 'Bid Limit', align: 'left' },
  { id: 'role', label: 'Role', align: 'left' },
  { id: 'account_status', label: 'Account Status', align: 'left' },
  { id: '' },
];

export default function UserListPage() {
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

  const { users, isLoading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers(user?.role));
  }, [dispatch]);

  useEffect(() => {
    if (users && users.length) {
      setTableData(users);
    }
  }, [users]);

  const navigate = useNavigate();

  const [tableData, setTableData] = useState([...users]);

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

  const handleFilterStatus = (event, newValue) => {
    setPage(0);
    setFilterStatus(newValue);
  };

  const handleFilterName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleFilterRole = (event) => {
    setPage(0);
    setFilterRole(event.target.value);
  };

  const handleDeleteRow = async (id) => {
    try {
      const response = await axiosInstance.delete(`admin/users/${id}`);
      // Check if the DELETE request was successful
      if (response.data.success) {
        const updatedData = tableData.map((row) => {
          if (row.id === id) {
            return { ...row, account_status: 'inactive' };
          }
          return row;
        });
        setSelected([]);
        setTableData(updatedData);
      }
    } catch (error) {
      console.error('Error:', error);
    }

    // If the current page is greater than the currently available pages after filtering, set the page to the last available page
    const lastPage = Math.max(0, Math.ceil(dataFiltered.length / rowsPerPage) - 1);
    if (page > lastPage) {
      setPage(lastPage);
    }
  };

  const handleDeleteRows = async (selectedRows) => {
    try {
      const deletePromises = selectedRows.map(async (id) => {
        const response = await axiosInstance.delete(`admin/users/${id}`);
        if (response.data.success) {
          return { id: id};
        }
      });

      const deletedRows = await Promise.all(deletePromises);

      const updatedData = tableData.map((row) => {
        const deletedRow = deletedRows.find((deleted) => deleted.id === row.id);
        if (deletedRow) {
          return { ...row, account_status: 'inactive' };
        }
        return row;
      });

      setSelected([]);
      setTableData(updatedData);
    } catch (error) {
      console.error('Error:', error);
    }

    const lastPage = Math.max(0, Math.ceil(dataFiltered.length / rowsPerPage) - 1);
    if (page > lastPage) {
      setPage(lastPage);
    }
  };

  const handleAccountClick = (id) => {
    navigate(PATH_DASHBOARD.user.edit(id)); // change edit to account
  }
  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.user.edit(id));
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterRole('all');
    setFilterStatus('all');
  };

  return (
    <>
      <Helmet>
        <title> User: List | CarsXchange</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="User List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Users', href: PATH_DASHBOARD.user.root },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.user.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New User
            </Button>
          }
        />

        <Card>
          <Tabs
            value={filterStatus}
            onChange={handleFilterStatus}
            sx={{
              px: 2,
              bgcolor: 'background.neutral',
            }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab key={tab} label={tab} value={tab} />
            ))}
          </Tabs>

          <Divider />

          <UserTableToolbar
            isFiltered={isFiltered}
            filterName={filterName}
            filterRole={filterRole}
            optionsRole={ROLE_OPTIONS}
            onFilterName={handleFilterName}
            onFilterRole={handleFilterRole}
            onResetFilter={handleResetFilter}
            hasFilterRole={filterStatus === 'all'}
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
                <Tooltip title="Deactivate">
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
                      <UserTableRow
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
            Are you sure want to deactivate <strong> {selected.length} </strong> accounts?
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

function applyFilter({ inputData, comparator, filterName, filterStatus, filterRole }) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(function (user) {
      if (
          user.name?.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
          (user.phone && user.phone.indexOf(filterName.toLowerCase()) !== -1) ||
          user.email?.indexOf(filterName.toLowerCase()) !== -1 ||
          '#' + user.id == filterName
      )
        return true;
      return false;
    });
  }

  if (filterStatus !== 'all') {
    if (filterStatus.toLowerCase() === 'inactive') {
      inputData = inputData.filter((user) => user.account_status.toLowerCase() === 'inactive');
    } else {
      inputData = inputData.filter((user) => filterStatus.toLowerCase().includes(user.type) && user.account_status.toLowerCase() === 'active');
    }
  }

  return inputData;
}

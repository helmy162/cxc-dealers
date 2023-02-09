import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useEffect, useState, useMemo } from 'react';
import { useParams, Route } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';

import { DatePicker, CalendarPicker } from '@mui/x-date-pickers';
import {
  TimePicker,
  MobileTimePicker,
  StaticTimePicker,
  DesktopTimePicker,
} from '@mui/x-date-pickers';
import { LoadingButton } from '@mui/lab';
import { Box, Tab, Tabs, Card, Grid, Divider, Container, Typography, Stack,
  Table,
  Button,
  Link,
  Tooltip,
  TableBody,
  IconButton,
  InputAdornment,
  TextField,
  TableContainer,} from '@mui/material';
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
import axiosInstance from 'src/utils/axios';
import {RHFTextField, RHFAutocomplete } from '../../components/hook-form';
import FormProvider from '../../components/hook-form';
import { sentenceCase } from 'change-case';
import Label from '../../components/label';
import Scrollbar from '../../components/scrollbar';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProduct, getProducts, addToCart, gotoStep } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';
import Markdown from '../../components/markdown';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import { SkeletonProductDetails } from '../../components/skeleton';
import { BidTableRow } from '../../sections/@dashboard/e-commerce/list';
// loading screen
import LoadingScreen from '../../components/loading-screen';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Dealer ID', align: 'left' },
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'time', label: 'Time of bid', align: 'left' },
  { id: 'bid', label: 'Highest Bid', align: 'left' },
  { id: '' },
];


// ----------------------------------------------------------------------

export default function EcommerceProductDetailsPage() {


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
    defaultOrderBy: 'createdAt',
  });

  const { themeStretch } = useSettingsContext();

  const { name } = useParams();

  const dispatch = useDispatch();

  const { product, isLoading, checkout } = useSelector((state) => state.product);
  
  // const product= cars.find(item => item.id===name)

  const [currentTab, setCurrentTab] = useState('inspection');

  // const [tableData, setTableData] = useState([...product.bidders]);

  const [tableData, setTableData] = useState([]);

  const [filterName, setFilterName] = useState('');

  const [filterStatus, setFilterStatus] = useState([]);


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



  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  };




  useEffect(() => {
    if (name) {
      dispatch(getProduct(name));
      dispatch(getProducts());
      setTableData([product?.auction?.latest_bid]);
    }
  }, [dispatch, name]);

  const auctionDurations = [
    '1 Hour',
    '2 Hours',
    '3 Hours',
    '6 Hours',
    '12 Hours',
    '24 Hours',
    '48 Hours',
    '72 Hours',
  ];

  const [auctionDate, setAuctionDate] = useState(new Date());
  const [auctionTime, setAuctionTime] = useState(new Date());
  const [duration, setDuration] = useState(auctionDurations[0]);
  const [inputValue, setInputValue] = useState('')

  

  const TABS = [
    {
      value: 'inspection',
      label: 'Inspection Details',
      component: product ? <Markdown children={`
      \n<p><strong> Inspection Status:</strong> <small> ${product?.seller_name} </small> </p>
      \n<p><strong> Online Price:</strong> <small> ${product?.seller_name} </small> </p>
      \n<p><strong> Asked Price:</strong> <small> ${product?.seller_name} </small> </p>
      \n<p><strong> Offered Price:</strong> <small> ${product?.seller_name} </small> </p>
      \n<p><strong> Inspector:</strong> <small> ${product?.seller_name} </small> </p>
      \n<p><strong> Inspector ID:</strong> <small> ${product?.seller_name} </small> </p>
      `} /> : null,
    },
    {
      value: 'auction',
      label: `Auction Details`,
      component: product ? <Markdown children={`
      \n<p><strong> Seller's Price:</strong> <small> ${product?.seller_name} </small> </p>
      \n<p><strong> Start Time:</strong> <small> ${product?.seller_name} </small> </p>
      \n<p><strong> Auction Date:</strong> <small> ${product?.seller_name} </small> </p>
      \n<p><strong> Auction Duration:</strong> <small> ${product?.seller_name} </small> </p>
      `} /> : null,
    },
    {
      value: 'seller',
      label: `Seller's Details`,
      component: product ? <Markdown children={`
      \n<p><strong> Seller's Name:</strong> <small> ${product?.seller_name} </small> </p>
      \n<p><strong> Seller's Email:</strong> <small> ${product?.seller_name} </small> </p>
      \n<p><strong> Seller's Phone:</strong> <small> ${product?.seller_name} </small> </p>
      \n<p><strong> Selling Date:</strong> <small> ${product?.seller_name} </small> </p>
      `} /> : null,
    }
  ];

  const NewProductSchema = Yup.object().shape({
    start_price: Yup.number().moreThan(0, 'Price should not be $0.00'),
    duration: Yup.string().required('Duration is required'),
    auctionDate: Yup.date().required('Auction date is required'),
    auctionTime: Yup.date().required('Auction time is required'),
  });

  const defaultValues = useMemo(
    () => ({
      start_price: product?.start_price || 0,
      duration: product?.duration || auctionDurations[0],
      auctionDate: product?.auctionDate || new Date(),
      auctionTime: product?.auctionTime || new Date(),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [product]
  );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const date = new Date(auctionDate.getFullYear(), auctionDate.getMonth(), auctionDate.getDate(), auctionTime.getHours(), auctionTime.getMinutes());
      const duration = data.duration;
      var parts = duration.split(" ");
      var hours = parts[0];
      var isoDuration = `PT${hours}H`;
      const mergedDate = {date: date, duration: isoDuration, start_price: data.start_price, car_id: product.id};
      console.log(mergedDate);
      const res = await axiosInstance.post('admin/auctions', mergedDate);
      console.log(res);
      await new Promise((resolve) => setTimeout(resolve, 500));
      // reset();
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };

  const [copySuccess, setCopySuccess] = useState('');
  
  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => {
        setCopySuccess("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [copySuccess]);

  return (
    <>
    {product && product.id == name && (
      <Helmet>
        <title>{`Cars: ${product?.id || ''} | CarsXchange`}</title>
      </Helmet>
    )}

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Car Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Cars',
              href: PATH_DASHBOARD.car.root,
            },
            (product && product.id == name)? { name: '#' + product?.id } : { name: '#' },
          ]}
        />
        {product && product.id == name && (
          <>
            <div style={{fontSize:'36px', fontWeight:'700', marginBottom:'50px', display:'flex', alignItems:'center', gap:'20px', flexWrap: 'wrap'}}>
              #{product?.id}

              <Label
                variant="soft"
                color={
                  (product?.status === 'expired' && 'error') ||
                  (product?.status === 'pending' && 'warning') ||
                  (product?.status === 'active' && 'success') || 'success'
                }
                sx={{ textTransform: 'capitalize', minWidth:'100px', fontSize:'18px', fontWeight:'600', padding:'6px 16px', minHeight:'fit-content', height:'unset', lineHeight:'unset',}}
              >
                {product?.status ? sentenceCase(product?.status) : ''}
              </Label>

              <Button
              component={RouterLink}
              to={PATH_DASHBOARD.car.details(name)} // need to edit
              variant="contained"
              startIcon={<Iconify icon="eva:file-text-outline" />}
              >
                View Inspection
              </Button>
              <Button
              onClick={() => {navigator.clipboard.writeText(window.location.origin + '/' + product?.id + '/inspection'); setCopySuccess('Copied!');}}
              variant="contained"
              startIcon={<Iconify icon="eva:copy-fill" />}
              >
                Copy Link
              </Button>
              <span className='text-[14px] ease-in-out'>
                {copySuccess}
              </span>
              
              
            </div>
            <Card style={{marginBottom:'50px'}}>
              <Tabs
                value={currentTab}
                onChange={(event, newValue) => setCurrentTab(newValue)}
                sx={{ px: 3, bgcolor: 'background.neutral' }}
              >
                {TABS.map((tab) => (
                  <Tab key={tab.value} value={tab.value} label={tab.label} />
                ))}
              </Tabs>

              <Divider />

              {TABS.map(
                (tab) =>
                  tab.value === currentTab && (
                    <Box
                      key={tab.value}
                      sx={{
                        ...{
                          p: 3,
                        },
                      }}
                    >
                      {tab.component}
                    </Box>
                  )
              )}
            </Card>

            <div style={{zIndex:'10000', marginBottom:'50px'}}>
              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} className="flex gap-4 items-center flex-wrap justify-center">
                <RHFTextField
                  name="start_price"
                  className="!w-1/6 !min-w-[200px]"
                  label="Start Price"
                  placeholder="0.00"
                  onChange={(event) =>
                    setValue('start_price', Number(event.target.value), { shouldValidate: true })
                  }
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <Box component="span" sx={{ color: 'text.disabled' }}>
                          AED
                        </Box>
                      </InputAdornment>
                    ),
                    type: 'number',
                  }}
                />

                <DatePicker
                  name="auctionDate"
                  label="Auction Date"
                  value={auctionDate}
                  onChange={function (newValue) {
                    setValue('auctionDate', newValue, { shouldValidate: true });
                    setAuctionDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} className="!w-fit"/>}
                  
                />

                <TimePicker
                  name="auctionTime"
                  ampm={false}
                  label="Auction Time"
                  value={auctionTime}
                  onChange={function (newValue) {
                    setValue('auctionTime', newValue, { shouldValidate: true });
                    setAuctionTime(newValue);
                  }}
                  renderInput={(params) => <TextField  {...params} className="!w-fit" />}
                />

                <RHFAutocomplete
                  className="!w-1/6 !min-w-[200px]"
                  name="duration"
                  label="Auction Duration"
                  value={duration}
                  onChange={function(_,newValue){
                    setDuration(newValue)
                    setValue('duration', newValue, { shouldValidate: true })
                  }}         
                  inputValue={inputValue}
                  onInputChange={(_, newInputValue) => {
                    setInputValue(newInputValue)
                  }}     
                  options={auctionDurations.map((option) => option)}
                  ChipProps={{ size: 'small' }}
                />

                <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                  Start Auction
                </LoadingButton>

              </FormProvider>
            {/* <ModernDatepicker
              date={auctionDate}
              format={'DD-MM-YYYY'}
              showBorder
              onChange={date => setAuctionDate(date)}
              placeholder={'Select a date'}
              className="datePicker"
            /> */}

            </div>
            
            <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
              <TableSelectedAction
                dense={dense}
                numSelected={0}
                rowCount={tableData.length}
                onSelectAllRows={(checked) =>
                  onSelectAllRows(
                    checked,
                    tableData.map((row) => row.id)
                  )
                }
                action={
                  <Tooltip title="Delete">
                    <IconButton color="primary" >
                      <Iconify icon="eva:trash-2-outline" />
                    </IconButton>
                  </Tooltip>
                }
              />

              <Scrollbar>
                <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                  <TableHeadCustom
                    selectBox={false}
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={tableData.length}
                    numSelected={0}
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
                          <BidTableRow
                            key={row.id}
                            row={row}
                            selected={selected.includes(row.id)}
                            onSelectRow={() => onSelectRow(row.id)}
                            onDeleteRow={() => handleDeleteRow(row.id)}
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
          </>
        )}
        {isLoading && <LoadingScreen />}
      </Container>
    </>
  );
  
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filterName, filterStatus }) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

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
         product.id.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
      || product.id.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
      || product.make.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 
      || product.model.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 
      || product.year.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 
      || product.seller_name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
      )
        return true;
      return false;
    });
  }

  if (filterStatus.length) {
    inputData = inputData.filter((product) => filterStatus.includes(product.auction));
  }

  return inputData;
}


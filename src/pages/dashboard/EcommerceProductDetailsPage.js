import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useEffect, useState, useMemo } from 'react';
import { useParams, Route } from 'react-router-dom';
import { Link as RouterLink, useNavigate} from 'react-router-dom';
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
import { getProduct, getProductAsAdmin, getStatus} from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';
import Markdown from '../../components/markdown';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import { SkeletonProductDetails } from '../../components/skeleton';
import { BidTableRow } from '../../sections/@dashboard/e-commerce/list';
import { ProductAuction } from '../../sections/@dashboard/e-commerce/details';
// loading screen
import LoadingScreen from '../../components/loading-screen';
//car status
import { carStatus, carTimer } from '../../utils/status';
// websocket
import Pusher from "pusher-js";
import { useAuthContext } from "src/auth/useAuthContext";

import ProductDetailsCarousel from './ProductDetailsCarousel';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'user_id', label: 'Dealer ID', align: 'center' },
  { id: 'user_name', label: 'Name', align: 'center' },
  { id: 'created_at', label: 'Time of bid', align: 'center' },
  { id: 'bid', label: 'Highest Bid', align: 'center' },
  { id: '', label: 'Winner?', align: 'center' },
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
    defaultOrderBy: 'bid',
    defaultOrder: 'desc',
  });

  const { themeStretch } = useSettingsContext();

  const { name } = useParams();
  const {user} = useAuthContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productAsAdmin, isLoading, checkout, product, productStatus} = useSelector((state) => state.product);

  useEffect(() => {
    if (name) {
      dispatch(getProductAsAdmin(name));
      dispatch(getProduct(name));
      dispatch(getStatus(product));
    }
  }, [dispatch, name]);

  useEffect(() => {
    if (productAsAdmin && productAsAdmin?.auction?.bids) {
      setTableData(productAsAdmin?.auction?.bids.filter((bid) => bid.dealer !== null));
    }
    else {
      setTableData([]);
    }
  }, [productAsAdmin]);

  // product status
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [livestatus, setLiveStatus] = useState(''); //live, expired, upcoming, pending
  useEffect(() => {
    
    if (livestatus !== 'expired' && livestatus !== 'pending') {
      const intervalId = setInterval(() => {
        const endAt = new Date(product?.auction?.end_at);
        const startAt = new Date(product?.auction?.start_at);
        const now = new Date();
        
        setLiveStatus(carStatus(productAsAdmin));
        setTimeRemaining(productAsAdmin.status == 'pending'? null : carTimer(startAt > now ? startAt - now : endAt - now));
      }, 1000);
  
      return () => clearInterval(intervalId);
    }
  }, [productStatus, product, productAsAdmin, dispatch]);
  
  // websocket for live status
  const [auctionID, setAuctionID] = useState(null);
  useEffect(() => {
    if (product?.auction?.id) {
      setAuctionID(product?.auction?.id);
    }
  }, [product]);
  
  useEffect(() => {
    const access_token = user?.accessToken;
    const PUSHER_APP_KEY = "9d45400630a8fa077501";
    const chanelAuthEndpoint =
      "https://api.carsxchange.com/api/v1/pusher/auth-channel";

    let pusher = new Pusher(PUSHER_APP_KEY, {
      cluster: "eu",
      channelAuthorization: {
        endpoint: chanelAuthEndpoint,
        transport: "ajax",
        params: {},
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      },
    });
    const channel = pusher.subscribe(`private-car.auction.${auctionID}`);
    channel.bind("NewBid", (data) => {
        dispatch(getProductAsAdmin(name));
    });
  
    return () => {
      channel.unbind("NewBid");
      pusher.unsubscribe();
    };
  }, [auctionID, user, product]);


  const [currentTab, setCurrentTab] = useState('inspection');
  const [tableData, setTableData] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [filterStatus, setFilterStatus] = useState([]);

  const [openConfirm, setOpenConfirm] = useState(false);
  
  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterStatus,
  });

  const dataInPage = dataFiltered?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 60 : 80;

  const isFiltered = filterName !== '' || !!filterStatus.length;

  const isNotFound = (!dataFiltered?.length && !!filterName) || (!isLoading && !dataFiltered?.length);



  const handleDeleteRow = (id) => {
    const deleteRow = tableData?.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  };

  const handleAccountClick = (id) => {
    navigate(PATH_DASHBOARD.user.edit(id)); // change edit to account
  }






  

  const TABS = [
    {
      value: 'inspection',
      label: 'Inspection Details',
      component: productAsAdmin ? <Markdown children={`
      \n<p><strong> Inspection Status:</strong> <small> Inspected </small> </p>
      \n<p><strong> Seller Price:</strong> <small> ${productAsAdmin?.details?.seller_price} AED </small> </p>
      \n<p><strong> Inspector Name:</strong> <small> Inspector Name </small> </p>
      `} /> : null,
    },
    {
      value: 'seller',
      label: `Seller's Details`,
      component: productAsAdmin ? <Markdown children={`
      \n<p><strong> Seller's Name:</strong> <small> ${productAsAdmin?.seller?.name} </small> </p>
      \n<p><strong> Seller's Email:</strong> <small> ${productAsAdmin?.seller?.email} </small> </p>
      \n<p><strong> Seller's Phone:</strong> <small> ${productAsAdmin?.seller?.phone} </small> </p>
      `} /> : null,
    },
    {
      value: 'id_images',
      label: 'ID Images',
      component: productAsAdmin ? <ProductDetailsCarousel product={productAsAdmin} type="id_images" /> : null,
    },
    {
      value: 'registration_card_images',
      label: 'Registration Card Images',
      component: productAsAdmin ? <ProductDetailsCarousel product={productAsAdmin} type="registration_card_images" /> : null,
    },
    {
      value: 'vin_images',
      label: 'VIN Images',
      component: productAsAdmin ? <ProductDetailsCarousel product={productAsAdmin} type="vin_images" /> : null,
    },
  ];

  

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
    {productAsAdmin && productAsAdmin.id == name && livestatus && (
      <Helmet>
        <title>{`Cars: ${productAsAdmin?.id || ''} | CarsXchange`}</title>
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
            (productAsAdmin && productAsAdmin.id == name)? { name: '#' + productAsAdmin?.id } : { name: '#' },
          ]}
        />
        {productAsAdmin && productAsAdmin.id == name && livestatus && (
          <>
            <div style={{fontSize:'36px', fontWeight:'700', marginBottom:'50px', display:'flex', alignItems:'center', gap:'20px', flexWrap: 'wrap'}}>
              #{productAsAdmin?.id}

              <Label
                variant="soft"
                color={
                  (livestatus === 'expired' && 'error') ||
                  (livestatus === 'pending' && 'warning') ||
                  (livestatus === 'approved' && 'success') ||
                  (livestatus === 'upcoming' && 'secondary') || 'success'
                }
                sx={{ textTransform: 'capitalize', minWidth:'100px', fontSize:'18px', fontWeight:'600', padding:'6px 16px', minHeight:'fit-content', height:'unset', lineHeight:'unset',}}
              >
                {timeRemaining ? timeRemaining : livestatus? sentenceCase(livestatus) : null}
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
              onClick={() => {navigator.clipboard.writeText(window.location.origin + '/' + productAsAdmin?.id + '/inspection'); setCopySuccess('Copied!');}}
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
              <ProductAuction productAsAdmin={productAsAdmin}/>
            </div>
            
            <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
              <TableSelectedAction
                dense={dense}
                numSelected={0}
                rowCount={tableData?.length}
                onSelectAllRows={(checked) =>
                  onSelectAllRows(
                    checked,
                    tableData?.map((row) => row.id)
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
                    rowCount={tableData?.length}
                    numSelected={0}
                    onSort={onSort}
                    onSelectAllRows={(checked) =>
                      onSelectAllRows(
                        checked,
                        tableData?.map((row) => row.id)
                      )
                    }
                  />

                  <TableBody>
                    {(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                      ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      ?.map((row, index) =>
                        row ? (
                          <BidTableRow
                            key={row.id}
                            row={row}
                            hasWinner={productAsAdmin?.auction?.winner_bid ? true : false}
                            selected={row.id === productAsAdmin?.auction?.winner_bid}
                            onSelectRow={() => onSelectRow(row.id)}
                            onDeleteRow={() => handleDeleteRow(row.id)}
                            onSelectAccount={() => handleAccountClick(row?.dealer?.id)}
                          />
                        ) : (
                          !isNotFound && <TableSkeleton key={index} sx={{ height: denseHeight }} />
                        )
                      )}

                    <TableEmptyRows
                      height={denseHeight}
                      emptyRows={emptyRows(page, rowsPerPage, tableData?.length)}
                    />

                    <TableNoData isNotFound={isNotFound} />
                  </TableBody>
                </Table>
              </Scrollbar>
            </TableContainer>
            <TablePaginationCustom
              count={dataFiltered?.length}
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
  const stabilizedThis = inputData?.map((el, index) => [{
    ...el,
    user_name: el?.dealer?.name,
  }, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis?.map((el) => el[0]);


  return inputData;
}


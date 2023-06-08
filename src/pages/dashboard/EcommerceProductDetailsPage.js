import { Helmet } from 'react-helmet-async';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link as RouterLink, useNavigate} from 'react-router-dom';
// @mui
import { Box, Tab, Tabs, Card, Grid, Divider, Container, Typography, 
  Table,
  Button,
  Tooltip,
  TableBody,
  IconButton,
  TableContainer,
  Stack,} from '@mui/material';
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

import { sentenceCase } from 'change-case';
import Label from '../../components/label';
import Scrollbar from '../../components/scrollbar';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProductAsAdmin, getStatus} from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';
import Markdown from '../../components/markdown';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import { BidTableRow, OfferTableRow } from '../../sections/@dashboard/e-commerce/list';
import { ProductAuction } from '../../sections/@dashboard/e-commerce/details';
// loading screen
import LoadingScreen from '../../components/loading-screen';
//car status
import { carStatus, carTimer } from '../../utils/status';
// websocket
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

const TABLE_HEAD2 = [
  { id: 'user_id', label: 'Dealer ID', align: 'center' },
  { id: 'user_name', label: 'Name', align: 'center' },
  { id: 'created_at', label: 'Time of offer', align: 'center' },
  { id: 'amount', label: 'Amount', align: 'center' },
];


// ----------------------------------------------------------------------

export default function EcommerceProductDetailsPage({onAuctionPage = false, noLoading = false}) {


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

  const {
    dense: dense2,
    page: page2,
    order: order2,
    orderBy: orderBy2,
    rowsPerPage: rowsPerPage2,
    setPage: setPage2,
    //
    selected: selected2,
    setSelected: setSelected2,
    onSelectRow: onSelectRow2,
    onSelectAllRows: onSelectAllRows2,
    //
    onSort: onSort2,
    onChangeDense: onChangeDense2,
    onChangePage: onChangePage2,
    onChangeRowsPerPage: onChangeRowsPerPage2,
  } = useTable({
    defaultOrderBy: 'amount',
    defaultOrder: 'desc',
  });

  const { themeStretch } = useSettingsContext();

  const { name } = useParams();
  const {user, pusher} = useAuthContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productAsAdmin, isLoading, checkout, productStatus} = useSelector((state) => state.product);

  useEffect(() => {
    if (name) {
      dispatch(getProductAsAdmin(name, user?.role));
      dispatch(getStatus(productAsAdmin));
    }
  }, [dispatch, name]);

  useEffect(() => {
    if (productAsAdmin && productAsAdmin?.auction?.bids) {
      setTableData(productAsAdmin?.auction?.bids.filter((bid) => bid.dealer !== null));
    }
    else {
      setTableData([]);
    }
    if(productAsAdmin && productAsAdmin?.offers) {
      setTableData2(productAsAdmin?.offers.filter((offer) => offer.dealer !== null));
    }
    else {
      setTableData2([]);
    }
  }, [productAsAdmin]);

  // product status
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [livestatus, setLiveStatus] = useState(''); //live, expired, upcoming, pending
  useEffect(() => {
      const intervalId = setInterval(() => {
        const endAt = new Date(productAsAdmin?.auction?.end_at);
        const startAt = new Date(productAsAdmin?.auction?.start_at);
        const now = new Date();
        
        setLiveStatus(productAsAdmin.status == 'pending'? 'pending' : carStatus(productAsAdmin));
        setTimeRemaining(productAsAdmin.status == 'pending'? null : startAt > now ? 'starts in ' + carTimer( startAt - now) : endAt < now ? null : 'ends after ' + carTimer(endAt - now));
      }, 1000);
      return () => clearInterval(intervalId);
  }, [productStatus, productAsAdmin, dispatch]);
  
  // websocket for live status
  const [auctionID, setAuctionID] = useState(null);
  useEffect(() => {
    if (productAsAdmin?.auction?.id) {
      setAuctionID(productAsAdmin?.auction?.id);
    }
  }, [productAsAdmin]);
  
  useEffect(() => {
    if(auctionID) {
      const channel =  pusher.channels.channels[`private-car.auction.${auctionID}`] ??  pusher.subscribe(`private-car.auction.${auctionID}`);
      channel.bind("NewBid", (data) => {
          dispatch(getProductAsAdmin(name, user?.role));
      });
    }
  }, [auctionID, user, productAsAdmin]);


  const [currentTab, setCurrentTab] = useState('inspection');
  const [tableData, setTableData] = useState([]);


  const [tableData2, setTableData2] = useState([]);
  
  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
  });

  const dataFiltered2 = applyFilter({
    inputData: tableData2,
    comparator: getComparator(order2, orderBy2),
  });

  const denseHeight = dense ? 60 : 80;
  const denseHeight2 = dense2 ? 60 : 80;


  const isNotFound = (!dataFiltered?.length ) || (!isLoading && !dataFiltered?.length);
  const isNotFound2 = (!dataFiltered2?.length) || (!isLoading && !dataFiltered2?.length);



  const handleAccountClick = (id) => {
    navigate(PATH_DASHBOARD.user.edit(id)); // change edit to account
  }






  

  const TABS = user?.role == 'admin' || user?.role == 'closer' ? 
  [
    {
      value: 'inspection',
      label: 'Inspection Details',
      component: productAsAdmin ? <Markdown children={`
      \n<p><strong> Inspection Status:</strong> <small> Inspected </small> </p>
      \n<p><strong> Seller Price:</strong> <small> ${productAsAdmin?.details?.seller_price} AED </small> </p>
      \n<p><strong> Inspector Name:</strong> <small> ${productAsAdmin?.inspector?.name} </small> </p>
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
  ]
  :
  [
    {
      value: 'inspection',
      label: 'Inspection Details',
      component: productAsAdmin ? <Markdown children={`
      \n<p><strong> Inspection Status:</strong> <small> Inspected </small> </p>
      \n<p><strong> Seller Price:</strong> <small> ${productAsAdmin?.details?.seller_price} AED </small> </p>
      \n<p><strong> Inspector Name:</strong> <small> ${productAsAdmin?.inspector?.name} </small> </p>
      `} /> : null,
    },
    {
      value: 'seller',
      label: `Seller's Details`,
      component: productAsAdmin ? <Markdown children={`
      \n<p><strong> Seller's Name:</strong> <small> ${productAsAdmin?.seller?.name} </small> </p>
      `} /> : null,
    }
  ]
  ;

  

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
        {!onAuctionPage && <CustomBreadcrumbs
          heading="Car Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Cars',
              href: PATH_DASHBOARD.car.root,
            },
            (productAsAdmin && productAsAdmin.id == name)? { name: '#' + productAsAdmin?.id } : { name: '#' },
          ]}
        />}
        {productAsAdmin && productAsAdmin.id == name && livestatus && (
          <>
          {
            !onAuctionPage && 
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
                {timeRemaining ? timeRemaining : livestatus? sentenceCase(livestatus) : null }
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
          }
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
            {
              user?.role == 'admin' || user?.role == 'sales'?
              <>
              {
                !onAuctionPage &&
                <div style={{zIndex:'10000', marginBottom:'50px'}}>
                  <ProductAuction productAsAdmin={productAsAdmin}/>
                </div>
              }
              
            
              <Typography variant="h4" sx={{ mb: 5 }}>
                Bids
              </Typography>
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

              <Typography variant="h4" sx={{ mb: 5 }}>
                Offers
              </Typography>

              <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                <TableSelectedAction
                  dense={dense2}
                  numSelected={0}
                  rowCount={tableData2?.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData2?.map((row) => row.id)
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
                  <Table size={dense2 ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                    <TableHeadCustom
                      selectBox={false}
                      order={order2}
                      orderBy={orderBy2}
                      headLabel={TABLE_HEAD2}
                      rowCount={tableData2?.length}
                      numSelected={0}
                      onSort={onSort2}
                      onSelectAllRows={(checked) =>
                        onSelectAllRows2(
                          checked,
                          tableData2?.map((row) => row.id)
                        )
                      }
                    />

                    <TableBody>
                      {(isLoading ? [...Array(rowsPerPage2)] : dataFiltered2)
                        ?.slice(page2 * rowsPerPage2, page2 * rowsPerPage2 + rowsPerPage2)
                        ?.map((row, index) =>
                          row ? (
                            <OfferTableRow
                              key={row.id}
                              row={row}
                              selected={row.id === productAsAdmin?.auction?.winner_bid}
                              onSelectAccount={() => handleAccountClick(row?.dealer?.id)}
                            />
                          ) : (
                            !isNotFound2 && <TableSkeleton key={index} sx={{ height: denseHeight2 }} />
                          )
                        )}

                      <TableEmptyRows
                        height={denseHeight2}
                        emptyRows={emptyRows(page2, rowsPerPage2, tableData2?.length)}
                      />

                      <TableNoData isNotFound={isNotFound2} />
                    </TableBody>
                  </Table>
                </Scrollbar>
              </TableContainer>
              <TablePaginationCustom
                count={dataFiltered2?.length}
                page={page2}
                rowsPerPage={rowsPerPage2}
                onPageChange={onChangePage2}
                onRowsPerPageChange={onChangeRowsPerPage2}
                //
                dense={dense2}
                onChangeDense={onChangeDense2}
              />
            </>
            :
              <Typography variant="h4" sx={{ mb: 5 }}>
                Highest Bid: {productAsAdmin?.auction?.latest_bid?.bid ? productAsAdmin?.auction?.latest_bid?.bid.toLocaleString('en-US') + ' AED' : 'No bids yet'}
              </Typography>

          }
          
          </>
        )}
        {isLoading && !noLoading && <LoadingScreen />}
      </Container>
    </>
  );
  
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator }) {
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


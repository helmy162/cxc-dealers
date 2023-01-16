import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useParams, Route } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Tab, Tabs, Card, Grid, Divider, Container, Typography, Stack,
  Table,
  Button,
  Link,
  Tooltip,
  TableBody,
  IconButton,
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
import { sentenceCase } from 'change-case';
import Label from '../../components/label';
import Scrollbar from '../../components/scrollbar';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProduct, addToCart, gotoStep } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';
import Markdown from '../../components/markdown';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import { SkeletonProductDetails } from '../../components/skeleton';
import { BidTableRow } from '../../sections/@dashboard/e-commerce/list';
// sections
import {
  ProductDetailsSummary,
  ProductDetailsReview,
  ProductDetailsCarousel,
} from '../../sections/@dashboard/e-commerce/details';
import CartWidget from '../../sections/@dashboard/e-commerce/CartWidget';

import { cars } from '../../_mock/assets/cars';
import CarPDF from './CarPDF.js';
import CarDetails from './CarDetails.js';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Dealer ID', align: 'left' },
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'time', label: 'Time of bid', align: 'left' },
  { id: 'bid', label: 'Highest Bid', align: 'left' },
  { id: '' },
];


const SUMMARY = [
  {
    title: '100% Original',
    description: 'Chocolate bar candy canes ice cream toffee cookie halvah.',
    icon: 'ic:round-verified',
  },
  {
    title: '10 Day Replacement',
    description: 'Marshmallow biscuit donut dragée fruitcake wafer.',
    icon: 'eva:clock-fill',
  },
  {
    title: 'Year Warranty',
    description: 'Cotton candy gingerbread cake I love sugar sweet.',
    icon: 'ic:round-verified-user',
  },
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

  const { isLoading, checkout } = useSelector((state) => state.product);
  
  const product= cars.find(item => item.id===name)

  const [currentTab, setCurrentTab] = useState('inspection');

  const [tableData, setTableData] = useState([...product.bidders]);

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
    }
  }, [dispatch, name]);


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
  const [pdfOpen, setPdfOpen] = useState(false);
  return (
    <>
      <Helmet>
        <title>{`Cars: ${product?.id || ''} | CarsXchange`}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Product Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Cars',
              href: PATH_DASHBOARD.car.root,
            },
            { name: '#' + product?.id },
          ]}
        />

        {product && (
          <>
            <div style={{fontSize:'36px', fontWeight:'700', marginBottom:'50px', display:'flex', alignItems:'center', gap:'20px'}}>
              #{product?.id}

              <Label
                variant="soft"
                color={
                  (product?.auction === 'expired' && 'error') ||
                  (product?.auction === 'wait_auction' && 'warning') ||
                  (product?.auction === 'active' && 'success') || 'success'
                }
                sx={{ textTransform: 'capitalize', minWidth:'100px', fontSize:'24px', minHeight:'fit-content', height:'unset', lineHeight:'unset'}}
              >
                {product?.auction ? sentenceCase(product?.auction) : ''}
              </Label>

              <Link
                href={PATH_DASHBOARD.car.details(name)}
                sx={{ display: 'table' }}
              >
                View Details
              </Link>
              
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
        {pdfOpen && (
          <CarDetails car={product} onClose={() => setPdfOpen(false)} />
        )}

        {isLoading && <SkeletonProductDetails />}
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


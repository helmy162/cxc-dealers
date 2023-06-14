import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Card,
  Table,
  Stack,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  CardHeader,
  Typography,
  TableContainer,
} from '@mui/material';
import {  useNavigate } from 'react-router-dom';
import Scrollbar from '../../../../components/scrollbar';
import { TableHeadCustom } from '../../../../components/table';
import { CustomAvatar } from 'src/components/custom-avatar';
import { PATH_DASHBOARD } from 'src/routes/paths';

// ----------------------------------------------------------------------

TopBidders.propTypes = {
  title: PropTypes.string,
  tableData: PropTypes.array,
  subheader: PropTypes.string,
  tableLabels: PropTypes.array,
};

export default function TopBidders({
  title,
  subheader,
  tableData,
  tableLabels,
  ...other
}) {
  const navigate = useNavigate();

  const handleAccountClick = (id) => {
    navigate(PATH_DASHBOARD.user.edit(id)); // change edit to account
  }
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 720 }}>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.map((row) => (
                <EcommerceBestSalesmanRow key={row.id} row={row} handleAccountClick={() => handleAccountClick(row.user_id)} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
    </Card>
  );
}

// ----------------------------------------------------------------------

EcommerceBestSalesmanRow.propTypes = {
  row: PropTypes.shape({
    user_id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    bid_count: PropTypes.number,
  }),
  handleAccountClick: PropTypes.func,
};

function EcommerceBestSalesmanRow({ row, handleAccountClick}) {
  return (
    <TableRow>
      <TableCell>
        <Typography variant="subtitle2" noWrap onClick={handleAccountClick} sx={{cursor:'pointer'}}>
          #{row.user_id}
        </Typography>
      </TableCell>
      <TableCell>
        <Stack direction="row" alignItems="center">
          <CustomAvatar alt={row.name} name={row.name} src={row.avatar} onClick={handleAccountClick} sx={{cursor:'pointer'}}/>
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" onClick={handleAccountClick} sx={{cursor:'pointer'}}> {row.name} </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {row.email}
            </Typography>
          </Box>
        </Stack>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2" noWrap>
          {row.bid_count}
        </Typography>
      </TableCell>
      

    </TableRow>
  );
}

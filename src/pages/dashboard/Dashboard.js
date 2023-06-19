import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid } from '@mui/material';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// components
import { useSettingsContext } from '../../components/settings';
// sections
import { TopBidders, TotalInspectedCars} from '../../sections/@dashboard/e-commerce/stats';
import { HOST_API_KEY } from 'src/config-global';
import axiosInstance from 'src/utils/axios';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';

// ----------------------------------------------------------------------

export default function Dashboard() {
    
  const { user } = useAuthContext();

  const theme = useTheme();

  const { themeStretch } = useSettingsContext();

  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getStats = async () => {
    try {
        const response = await axiosInstance.get('admin/stats');
        setStats(response.data);
        setIsLoading(false);
    } catch (error) {
        console.error(error);
    }
  };

    useEffect(() => {
        getStats();
    }, []);
  

  return (
    <>
      <Helmet>
        <title> Dashboard | CarsXchange</title>
      </Helmet>

      {isLoading && <LoadingScreen />}

     {
        stats &&
        <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>

          <Grid item xs={12} md={12}>
            <TotalInspectedCars
              title="Total Cars Inspected"
              percent={(stats.inspection_stats.this_week.slice(-1) - stats.inspection_stats.last_week_last_day)/ stats.inspection_stats.last_week_last_day * 100}
              total={stats.inspection_stats.total_inspected_cars}
              chart={{
                colors: [theme.palette.primary.main],
                series: stats.inspection_stats.this_week,
              }}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <TopBidders
              title="Top 5 Bidders"
              tableData={stats.top_bidders}
              tableLabels={[
                { id: 'user_id', label: 'ID' },
                { id: 'name', label: 'Dealer' },
                { id: 'bid_count', label: 'Total Bids Placed' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
     }
      
    </>
  );
}

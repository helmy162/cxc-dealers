import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
// @mui
import {
    Card,
    Container,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';

import CustomBreadcrumbs from '../../components/custom-breadcrumbs';

import { useAuthContext } from 'src/auth/useAuthContext';

import LoadingScreen from 'src/components/loading-screen/LoadingScreen';

export default function AppointmentsPage() {
    const [isLoading, setIsLoading] = useState(false);

    const { themeStretch } = useSettingsContext();

    const {user} = useAuthContext();

    return (
        <>
            <Helmet>
                <title> Calendar | CarsXchange</title>
            </Helmet>

            {
                isLoading && <LoadingScreen/>
            }

            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Calendar"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        {
                            name: 'Calendar',
                        },
                    ]}
                />
                <Card>
                    <div
                        style={{
                            width: '100%',
                            height: '600px',
                            overflow: 'auto',
                        }}
                    >
                        <iframe
                            src="https://calendar.google.com/calendar/embed?src=c_5e7e3b236308de435d62bbd0a1114383cb21b37779f5535a4a4d40239b6e1315%40group.calendar.google.com&ctz=Asia%2FDubai&showTitle=0"
                            style={{ border: 0, width: '100%', height: '100%' }}
                        ></iframe>
                    </div>
                </Card>
            </Container>
        </>
    );
};
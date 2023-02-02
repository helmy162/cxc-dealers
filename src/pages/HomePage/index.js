import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../routes/paths';
import { Button } from '@mui/material';
import Iconify from '../../components/iconify';

export default function HomePage() {
  const [cars, setCars] = useState([]);

  return (
    <div>
      <header>
        <h1>Welcome to the Car Exchange</h1>
      </header>
      <main>
        <h2>Available Cars</h2>
        <Button
          component={RouterLink}
          to={'/dashboard'} // need to edit
          variant="contained"
          startIcon={<Iconify icon="eva:file-text-outline" />}
          >
            Admin View
        </Button>
        <Button
          component={RouterLink}
          to={'/dealer'} // need to edit
          variant="contained"
          startIcon={<Iconify icon="eva:file-text-outline" />}
          >
            Dealer View
        </Button>
      </main>
      <footer>
        <p>Copyright © 2023 Car Exchange</p>
      </footer>
    </div>
  );
}

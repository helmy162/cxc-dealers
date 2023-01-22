import {
  useState,
  useEffect
} from 'react';

import axios from 'axios';

const endpoints = {
  GET_CARS: `${process.env.REACT_APP_HOST_API_KEY}cars`
}

export default function useCarsListingPage() {
  const [cars, setCars] = useState([]);

  const getCars = async () => {
    try {
      const { data: response } = await axios.get(endpoints.GET_CARS);
      console.log(response);
      setCars(response.data);
    } catch (error) {
      console.error('getCars error:', error);
    }
  }

  useEffect(() => {
    getCars();
  }, []);

  return {
    cars,
    setCars
  }
}
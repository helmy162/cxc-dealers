import {
  useState,
  useMemo,
  useEffect,
} from 'react';

import axios from 'axios';

const endpoints = {
  GET_CARS: `${process.env.REACT_APP_HOST_API_KEY}cars`
}

export default function useCarsListingPage() {
  const [cars, setCars] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);

  const isLoadMoreButtonVisible = useMemo(() => {
    return cars?.length !== total;
  }, [cars, total])

  const getCars = async (page) => {
    try {
      setLoading(true);
      const url = `${endpoints.GET_CARS}?page=${page}`

      const { data: response } = await axios.get(url);

      if (!total) {
        setTotal(response.total);
      }

      setCars((oldCars) => ([
        ...oldCars,
        ...response.data
      ]));
      setLoading(false);
    } catch (error) {
      console.error('getCars error:', error);
      setLoading(false);
    }
  }

  const loadMore = () => {
    setCurrentPage(currentPage + 1);
    getCars(currentPage + 1);
  }

  useEffect(() => {
    if (!cars.length) {
      getCars(currentPage);
    }
  }, []);

  return {
    isLoading,
    cars,
    total,
    isLoadMoreButtonVisible,
    loadMore,
  }
}
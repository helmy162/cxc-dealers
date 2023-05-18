import {
  useState,
  useMemo,
  useEffect,
} from 'react';

import axios from 'axios';
import axiosInstance from 'src/utils/axios';



export default function useCarsListingPage(expired) {
  const [cars, setCars] = useState([]); const [cars2, setCars2] = useState([]);
  const [total, setTotal] = useState(0); const [total2, setTotal2] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); const [currentPage2, setCurrentPage2] = useState(1);

  const isLoadMoreButtonVisible = useMemo(() => {
    return cars?.length !== total;
  }, [cars, total])

  const isLoadMoreButtonVisible2 = useMemo(() => {
    return cars2?.length !== total2;
  }, [cars2, total2])

  const getCars = async (page) => {
    try {
      setLoading(true);
      const { data: response } = await axiosInstance.get(expired? `cars/expired-auction?page=${page}` : `cars?page=${page}`);

      if (!total) {
        if(expired) setTotal2(response.total);
        else setTotal(response.total);
      }

      if(expired) setCars2((oldCars) => ([
        ...oldCars,
        ...response.data
      ]));
      else setCars((oldCars) => ([
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
    if(expired) {
      setCurrentPage2(currentPage2 + 1);
      getCars(currentPage2 + 1);
    }
    else{
      setCurrentPage(currentPage + 1);
      getCars(currentPage + 1);
    }
  }

  useEffect(() => {
    if ( (expired && !cars2.length) || (!expired && !cars.length) ) {
      getCars(currentPage);
    }
  }, [expired]);

  return {
    isLoading,
    cars,
    cars2,
    total,
    total2,
    isLoadMoreButtonVisible,
    isLoadMoreButtonVisible2,
    loadMore,
  }
}
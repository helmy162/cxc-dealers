import {  useEffect} from 'react';

import { useDispatch, useSelector } from '../../redux/store';
import { getProducts } from '../../redux/slices/product';

import CarDetails from './CarDetails';

export default function CarDetailsPage() {

    const { products } = useSelector((state) => state.product);

    const dispatch = useDispatch();

    useEffect(() => {
        if(!products || products.length == 0){
          dispatch(getProducts());
        }
      }, [dispatch, products]);
    
    return (
        <CarDetails />
    )
}

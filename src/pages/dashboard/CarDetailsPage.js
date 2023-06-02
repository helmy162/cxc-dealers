import {  useEffect} from 'react';

import { useDispatch, useSelector } from '../../redux/store';
import { getProducts } from '../../redux/slices/product';

import CarDetails from './CarDetails';

export default function CarDetailsPage() {

    
    return (
        <CarDetails />
    )
}

import { Helmet } from 'react-helmet-async';
import ListItem from './ListItem';
import { useRef, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useSettingsContext } from '../../components/settings';
import { cars } from '../../_mock/assets/cars';
import {
    Box,
    Stack,
    Container,
    Accordion,
    Typography,
    AccordionSummary,
    AccordionDetails,
    Tooltip
  } from '@mui/material';

import Iconify from '../../components/iconify';
import ProductDetailsCarousel from './ProductDetailsCarousel';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';

import { useDispatch, useSelector } from '../../redux/store';
import { getProduct, getProducts } from '../../redux/slices/product';

export default function CarDetails({ }) {
    const { themeStretch } = useSettingsContext();
    const { name } = useParams();
    const dispatch = useDispatch();

    const { product, isLoading, checkout } = useSelector((state) => state.product);
    console.log(useSelector((state) => state.product));
    let accordions = [];
    const [test, setTest]= useState([]);
    useEffect(() => {
          dispatch(getProduct(name));
          dispatch(getProducts());
    }, [dispatch, name]);
    
      useEffect(() => {
        if(product){
            console.log(product);
            if (product) {
                Object.keys(product).forEach(key => {
                    if (typeof product[key] === 'object' && key !== 'exterior' && key !== 'images') {
                        let listItems = []
                        for (let subKey in product[key]) {
                            if (product[key].hasOwnProperty(subKey)) {
                                listItems.push(<ListItem key={subKey} heading={formatString(subKey)} value={product[key][subKey]} />)
                            }
                        }
                        accordions.push(
                            <Accordion key={key} style={{boxShadow:'0 0px 13px rgb(0 0 0 / 8%)', borderRadius:'8px', marginTop:'10px'}} defaultExpanded>
                                <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                                    <h2 className="text-[24px] font-semibold capitalize mb-3">
                                        {formatString(key)}
                                    </h2>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ul className="flex flex-wrap justify-between text-left">
                                        {listItems}
                                    </ul>
                                </AccordionDetails>
                            </Accordion>
                        );
                    }
                });
            }
          }
          setTest(accordions);
        }, [product]);
    
    
    // screen width
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {const handleResize = () => setWidth(window.innerWidth); window.addEventListener('resize', handleResize); return () => { window.removeEventListener('resize', handleResize); };}, []);
    
   
    


    function formatString(str) {
        return str.replace(/_/g, " ").toLowerCase().replace(/(^|\s)\S/g, function(t) { return t.toUpperCase(); });
    }

    // just selecting last row
    const ulRef = useRef(null);
    useEffect(() => {
      const ul = ulRef.current;
      if (ul) {
        const lis = Array.from(ul.querySelectorAll('li'));
        const elementsPerRow = width>640? 4 : 2; const numRows = Math.ceil(lis.length / elementsPerRow); const lastRowStart = (numRows - 1) * elementsPerRow;
        const lastRow = lis.slice(lastRowStart, lastRowStart + elementsPerRow); lastRow.forEach(li => li.classList.add('last-row'));
      }
    }, []);

    return(
        <>
        {isLoading && <div>Loading...</div>}
        {!isLoading && (
        <section className='flex flex-col gap-[10px] details-section'>
            <h2 className="text-[24px] font-semibold capitalize mb-3">
                Insepction Report
            </h2>   
            
            <Accordion style={{boxShadow:'0 0px 13px rgb(0 0 0 / 8%)', borderRadius:'8px', marginTop:'10px'}} defaultExpanded>
                <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                    <h2 className="text-[24px] font-semibold capitalize mb-3">
                        Car Images
                    </h2>
                </AccordionSummary>
                <AccordionDetails className='max-w-[800px] m-auto'>
                    <ProductDetailsCarousel product={product} />
                </AccordionDetails>
            </Accordion>

            {test}
            {/* <Accordion style={{boxShadow:'0 0px 13px rgb(0 0 0 / 8%)', borderRadius:'8px', marginTop:'10px'}} defaultExpanded>
                <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                    <h2 className="text-[24px] font-semibold capitalize mb-3">
                        Car Details
                    </h2>
                </AccordionSummary>
                <AccordionDetails>
                <ul className="flex flex-wrap justify-between text-left">
                    {carDetails}
                </ul>
                </AccordionDetails>
            </Accordion> */}
            
            <Accordion style={{boxShadow:'0 0px 13px rgb(0 0 0 / 8%)', borderRadius:'8px', marginTop:'10px'}} defaultExpanded>
                <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                    <div className="secondary-heading block">
                        <h2 className="text-[24px] font-semibold capitalize mb-3">
                            Exterior Condition
                        </h2>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                <div className='relative max-h-[75vh] w-fit m-auto' >
                    <img src="/assets/illustrations/CarSkeleton.png" alt="Markers" className='w-auto max-h-[75vh]'/>
                    {product && product.exterior.markers.map((point, index) => {
                
                        
                        return(
                        <Tooltip key={index} title={point.defect} arrow>
                            <div className='w-[25px]  h-[25px] bg-[brown] absolute rounded-full text-white text-center cursor-pointer' style={{top: point.y + '%', left: point.x + '%'}}>
                                {index+1}
                            </div>
                        </Tooltip>
                    )
                    })}
                </div>
                    {/* <div>
                        <img src="/assets/illustrations/CarSkeleton.png" className='m-auto '/>
                    </div> */}
                </AccordionDetails>
            </Accordion>
        </section>
        )}
            {/* <Helmet>
                {
                    console.log(product)
                }
                <title> {product.make} {product.model} {product.year} - Insepction Report</title>
            </Helmet> */}
            
        </>
        

    )
}
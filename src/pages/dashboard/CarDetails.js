import { Helmet } from 'react-helmet-async';
import ListItem from './ListItem';
import { useRef, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
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

export default function CarDetails({ }) {
    const { name } = useParams();
    const car= cars.find(item => item.id===name);
    
    // screen width
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {const handleResize = () => setWidth(window.innerWidth); window.addEventListener('resize', handleResize); return () => { window.removeEventListener('resize', handleResize); };}, []);

    const carDetails = Object.keys(car).map(key => {
        if(key !== 'bidders'){
            return <ListItem key={key} heading={formatString(key)} value={car[key]} />
        }
    });

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


    const points = [
        { left: "12.5%", top: "35%", number: 1, title: "Scratch" },
        { left: "24.7%", top: "70.3%", number: 2, title: "Cosmetic Paint" },
        { left: "36.2%", top: "15.6%", number: 3, title: "Dent" },
        { left: "48.1%", top: "60.9%", number: 4, title: "Repainted" },
        { left: "58.5%", top: "30.2%", number: 5, title: "Repair" },
        { left: "67.9%", top: "80.7%", number: 6, title: "Scratch" },
        { left: "76.1%", top: "50.1%", number: 7, title: "Cosmetic Paint" },
        { left: "82.6%", top: "25.5%", number: 8, title: "Dent" },
        { left: "89.3%", top: "60.3%", number: 9, title: "Repainted" },
        { left: "95.5%", top: "40.6%", number: 10, title: "Repair" }
        ];

    return(
        <>
            <Helmet>
                <title> {car.make} {car.model} {car.year} - Insepction Report</title>
            </Helmet>
            <section className='flex flex-col gap-[10px] details-section'>
                <h2 className="text-[24px] font-semibold capitalize mb-3">
                    {car.make} {car.model} {car.year} - Insepction Report
                </h2>
                
                <Accordion style={{boxShadow:'0 0px 13px rgb(0 0 0 / 8%)', borderRadius:'8px', marginTop:'10px'}} defaultExpanded>
                    <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                        <h2 className="text-[24px] font-semibold capitalize mb-3">
                            Car Images
                        </h2>
                    </AccordionSummary>
                    <AccordionDetails className='max-w-[800px] m-auto'>
                        <ProductDetailsCarousel product={car} />
                    </AccordionDetails>
                </Accordion>

                <Accordion style={{boxShadow:'0 0px 13px rgb(0 0 0 / 8%)', borderRadius:'8px', marginTop:'10px'}} defaultExpanded>
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
                </Accordion>
                
                <Accordion style={{boxShadow:'0 0px 13px rgb(0 0 0 / 8%)', borderRadius:'8px', marginTop:'10px'}} defaultExpanded>
                    <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                        <div className="secondary-heading block">
                            <h2 className="text-[24px] font-semibold capitalize mb-3">
                                Car History
                            </h2>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ul className="flex flex-wrap justify-between text-left">
                            <li className='flex flex-wrap items-center justify-between basis-[49%] border-[1px] rounded-md px-[16px] py-[10px] min-w-[100%] sm:min-w-0 mb-[10px] '>
                                <div className='flex font-normal text-[#545252] basis-[50%] text-[14px]'>
                                    Radiator Condition
                                </div>
                                <div className='flex font-semibold justify-end basis-[50%] text-[#5AC35A] text-[14px]'>
                                    No Visible Fault
                                </div>
                            </li>
                            <li className='flex flex-wrap items-center justify-between basis-[49%] border-[1px] rounded-md px-[16px] py-[10px] min-w-[100%] sm:min-w-0 mb-[10px] '>
                                <div className='flex font-normal text-[#545252] basis-[50%] text-[14px]'>
                                    Engine Noise
                                </div>
                                <div className='flex font-semibold justify-end basis-[50%] text-[#FD4353] text-[14px]'>
                                Tappet Noise
                                </div>
                            </li>
                        </ul>
                    </AccordionDetails>
                </Accordion>

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
                        {points.map((point, index) => (
                            <Tooltip key={index} title={point.title} arrow>
                                <div className='w-[25px]  h-[25px] bg-[brown] absolute rounded-full text-white text-center cursor-pointer' style={{top: point.top, left: point.left}}>
                                    {point.number}
                                </div>
                            </Tooltip>
                        ))}
                    </div>
                        {/* <div>
                            <img src="/assets/illustrations/CarSkeleton.png" className='m-auto '/>
                        </div> */}
                    </AccordionDetails>
                </Accordion>
            </section>
        </>
        

    )
}
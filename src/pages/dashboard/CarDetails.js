import { Helmet } from 'react-helmet-async';
import ListItem from './ListItem';
import { useRef, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useSettingsContext } from '../../components/settings';
import LoadingScreen from '../../components/loading-screen';
import { cars } from '../../_mock/assets/cars';
import Lightbox from '../../components/lightbox';
import {
    Box,
    Stack,
    Container,
    Accordion,
    Typography,
    AccordionSummary,
    AccordionDetails,
    Tooltip,
    Button, List
  } from '@mui/material';

import Iconify from '../../components/iconify';
import ProductDetailsCarousel from './ProductDetailsCarousel';

import MarkerRow from 'src/sections/AddCar/ExteriorConditionStep/MarkerRow';

import { useDispatch, useSelector } from '../../redux/store';
import { getProduct, getProducts } from '../../redux/slices/product';

import Logo from '../../components/logo';

export default function CarDetails({withImages = true, noLoading=false}) {
    const { themeStretch } = useSettingsContext();
    const { name } = useParams();
    const dispatch = useDispatch();

    const { product, isLoading, checkout } = useSelector((state) => state.product);

    let accordions = [];
    const [allAccordions, setAllAccordions]= useState([]);
    useEffect(() => {
          dispatch(getProduct(name));
    }, [dispatch, name]);
    
    const [defectImages, setDefectImages] = useState([]);

    useEffect(() => {
        if(product && !isLoading || noLoading){
            if (product) {
                setDefectImages(product.exterior.markers.map(marker => 'https://api.carsxchange.com/storage/defect_images/'+ marker.photo));
                Object.keys(product).forEach(key => {
                    if (typeof product[key] === 'object' && key !== 'exterior' && key !== 'images' && key !=='seller_id' && key !=='seller' && key !=='auction' && key !=='bids' && key != 'registration_card_images') {
                        let listItems = []
                        for (let subKey in product[key]) {
                            if (product[key].hasOwnProperty(subKey) && product[key][subKey] !== null && product[key][subKey] !== "" && subKey !== 'engine' && subKey != 'seller_price' ) {
                                listItems.push(<ListItem key={subKey} heading={formatString(subKey)} value={formatString(product[key][subKey].toString())} isSpecs={key=='specs'} />)
                            }
                        }
                        accordions.push(
                            <Accordion key={key} style={{boxShadow:'0 0px 13px rgb(0 0 0 / 8%)', borderRadius:'8px', marginTop:'10px'}} defaultExpanded>
                                <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                                    <h2 className="text-[20px] font-semibold capitalize mb-3">
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
        setAllAccordions(accordions);
    }, [product, isLoading]);

    // Exterior Condition
    allAccordions.splice( 
        1, 0,
        (<Accordion style={{boxShadow:'0 0px 13px rgb(0 0 0 / 8%)', borderRadius:'8px', marginTop:'10px'}} defaultExpanded>
        <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
            <div className="secondary-heading block">
                <h2 className="text-[20px] font-semibold capitalize mb-3">
                    Exterior Condition
                </h2>
            </div>
        </AccordionSummary>
        <AccordionDetails className='flex justify-between flex-wrap'>
        <div className='relative max-h-[75vh] w-fit m-auto' >
            <img src="/assets/illustrations/CarSkeleton2.png" alt="Markers" className='w-auto max-h-[75vh]'/>
            {product && product.exterior.markers.map((point, index) => {
                return(
                <Tooltip key={index} title={point.defect} arrow onClick={() => handleOpenLightbox('https://api.carsxchange.com/storage/defect_images/'+ point.photo)}>
                    <div  className='w-[20px] h-[20px] text-[12px] sm:text-[16px] sm:w-[25px]  sm:h-[25px] bg-[brown] absolute rounded-full text-white text-center cursor-pointer' style={{top: point.y + '%', left: point.x + '%'}}>
                        {index+1}
                    </div>
                </Tooltip>
            )
            })}
        </div>
        <div className='basis-1/2'>
            <List>
            { product && product.exterior.markers.map((marker, key) => <MarkerRow  marker={marker} key={key} id={key} />)}
            </List>
        </div>
        <div className='basis-full mt-5'>
            <ListItem heading={'Exterior Comment'} value={product?.exterior?.exterior_comment} isSpecs={false}/>
            <ListItem heading={'Chassis'} value={formatString(product?.engine_transmission?.Chassis)} isSpecs={false}/>
            <ListItem heading={'Chassis Extension'} value={formatString(product?.engine_transmission?.Chassis_Extension)} isSpecs={false}/>
        </div>
        </AccordionDetails>
    </Accordion>),
    )


    
      const imagesLightbox = defectImages.map((img) => ({ src: img }));
      const [currentIndex, setCurrentIndex] = useState(0);

      const [selectedImage, setSelectedImage] = useState(-1);
    
      const handleOpenLightbox = (imageUrl) => {
        const imageIndex = imagesLightbox.findIndex((image) => image.src === imageUrl);
        setSelectedImage(imageIndex);
      };
    
      const handleCloseLightbox = () => {
        setSelectedImage(-1);
      };
    
    
    
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

    // copy to clipboard
    const [copySuccess, setCopySuccess] = useState('');
    useEffect(() => {
        if (copySuccess) {
        const timer = setTimeout(() => {
            setCopySuccess("");
        }, 3000);
        return () => clearTimeout(timer);
        }
    }, [copySuccess]);

    if (!isLoading && product || noLoading) {
        return(
            <>
            {
                withImages &&
                <Helmet>
                    <title> {`${product.details.make} ${product.details.model} ${product.details.year} Inspection Report`} </title>
                </Helmet>
            }
                <section className='flex flex-col gap-[10px] details-section'>
                    {
                        withImages ?
                        <>
                            <Logo/>
                            <h2 className="text-[24px] font-semibold capitalize mb-3 text-center">
                                {product.details.make} {product.details.model} {product.details.year} - Insepction Report
                            </h2>
                            <Button
                            onClick={() => {navigator.clipboard.writeText(window.location.origin + '/' + product?.id + '/inspection'); setCopySuccess('Copied!');}}
                            variant="contained"
                            startIcon={<Iconify icon="eva:copy-fill" />}
                            >
                                Copy Link
                            </Button>
                            <span className='text-[14px] ease-in-out'>
                                {copySuccess}
                            </span>
                        
                            <Accordion style={{boxShadow:'0 0px 13px rgb(0 0 0 / 8%)', borderRadius:'8px', marginTop:'10px'}} defaultExpanded>
                                <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                                    <h2 className="text-[20px] font-semibold capitalize mb-3">
                                        Car Images
                                    </h2>
                                </AccordionSummary>
                                <AccordionDetails className='max-w-[800px] m-auto'>
                                    <ProductDetailsCarousel product={product} />
                                </AccordionDetails>
                            </Accordion>
                        </>
                        :
                        null
                    }

                    {allAccordions}

                    <Lightbox
                        index={selectedImage}
                        slides={imagesLightbox}
                        open={selectedImage >= 0}
                        close={handleCloseLightbox}
                        onGetCurrentIndex={(index) => setCurrentIndex(index)}
                    />
                </section>
            </>
            

        )
    }
    else{
        return(
            <div className='h-[80vh] flex justify-center items-center'>
                <LoadingScreen />
            </div>
        )
    }
}

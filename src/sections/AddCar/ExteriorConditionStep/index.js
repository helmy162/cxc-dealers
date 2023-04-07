
import * as Yup from 'yup';
import ImageMarker from 'react-image-marker';
import React, { useState, useCallback, useEffect } from 'react';
import { Grid, Paper, Alert, MenuItem, Button, List, Box } from '@mui/material';
import { RHFSelect } from 'src/components/hook-form';
import MarkerRow from './MarkerRow';
import { Upload } from 'src/components/upload';
import { DEFECTS_OPTIONS } from './constants';
import imageCompression from 'browser-image-compression';
import { RHFTextField, RHFCheckbox } from 'src/components/hook-form';
import {  chassisOptions, chassisExtensionOptions, ENGINE_AND_TRANSMISSION_OPTIONS} from '../EngineAndTransmissionStep/constants';
import { renderAddCarSelect } from 'src/utils/forms';

const BoxButton = ({ color, type, selected, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color,
        width: '100px',
        height: '40px',
        border: '1px solid grey',
        borderRadius: '10px',
        cursor: 'pointer',
        margin: '50px',
      }}
    >
      <p style={{ color: 'white' }}>{type}</p>
    </div>
  );
};

const Label = ({ color, title }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div
        style={{
          backgroundColor: color,
          width: '18px',
          height: '18px',
          border: '2px solid black',
        }}
      ></div>
      <p style={{ marginLeft: '5px', marginTop: '0' }}>{title}</p>
    </div>
  );
};

const CarPartsPaint = ({ watch, setValue, markers, setMarkers, activeMarker, setActiveMarker, submittedMarkers, setSubmittedMarkers, isErrorDisplayed, setIsErrorDisplayed, file, setFile, partColor, setPartColor, change, setChange }) => {
  
  const [defect] = watch(['defect']);



  const colorList = ['white', 'orange', 'red', 'yellow', 'blue', 'grey'];
  const typeList = [
    'Original',
    'Damaged',
    'Repainted',
    'Portion Repainted',
    'Foiled',
    'Not Available',
  ];
  const partList = [
    'frontBumper',
    'hood',
    'top',
    'trunkLid',
    'backBumper',
    'rightFrontPanel',
    'rightFrontBumper',
    'leftFrontPanel',
    'leftFrontBumper',
    'rightFrontDoor',
    'rightBackDoor',
    'rightBack',
    'rightBackBumber',
    'leftFrontDoor',
    'leftBackDoor',
    'leftBack',
    'leftBackBumper',
  ];
  const fetchedData = {
    backBumper: 'Original',
    frontBumper: 'Original',
    hood: 'Damaged',
    leftBack: 'Original',
    leftBackBumper: 'Original',
    leftBackDoor: 'Repainted',
    leftFrontBumper: 'Original',
    leftFrontDoor: 'Damaged',
    leftFrontPanel: 'Original',
    rightBack: 'Original',
    rightBackBumber: 'Original',
    rightBackDoor: 'Original',
    rightFrontBumper: 'Original',
    rightFrontDoor: 'Foiled',
    rightFrontPanel: 'Original',
    top: 'Portion Repainted',
    trunkLid: 'Not Available',
  };

  const fields = [  
    { name: 'Chassis', label: 'Chassis', options: chassisOptions},
    { name: 'Chassis_Extension', label: 'Chassis Extension', options: chassisExtensionOptions},
  ];
  


  //SET URL to fetch from api
  // const url = '';
  // useEffect(async () => {
  //   const response = await fetch(url);
  //   const progressJson = await response.json();
  //   loadCurrentProgress(progressJson);
  // }, []);

  const loadCurrentProgress = (currentProgressJson) => {
    partList.forEach((part, index) => {
      let tempPart = partColor;
      tempPart[index] = typeList.indexOf(currentProgressJson[part]);
      setPartColor(tempPart);
    });
    setChange(change + 1);
  };

  const onSubmitButton = useCallback(() => {
    const lastMarker = markers[markers.length - 1];
    const newSubmittedMarkers = {...submittedMarkers, [partList[activeMarker]]: { ...lastMarker, defect: typeList[partColor[activeMarker] % 6], file }};
    const newSubmittedMarkers2 = {...submittedMarkers, [partList[activeMarker]]: typeList[partColor[activeMarker] % 6] };
    setSubmittedMarkers(newSubmittedMarkers2);
    setValue('markers', newSubmittedMarkers);
    setValue('defects', newSubmittedMarkers2);
    setActiveMarker(null);
    setFile(null);
    setValue('defect', '');
    setIsErrorDisplayed(false);
  }, [activeMarker, markers, submittedMarkers, setValue, file]);

  const [error, setError] = useState(null);

  const MAX_SIZE = 1000000; // 1 MB

  const handleDropSingleFile = useCallback(async (acceptedFiles) => {
    const newFile = acceptedFiles[0];
    if (newFile) {
      try {
        
        if (newFile.size > MAX_SIZE) {
          
          const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          };
          const compressedBlob = await imageCompression(newFile, options);
          const processedFile = new File([compressedBlob], `${Date.now()}_compressed.jpg`, { type: newFile.type, path: newFile.path });
          setFile(
            Object.assign(processedFile, {
              preview: URL.createObjectURL(processedFile),
            })
          );
        } else {
          setFile(
            Object.assign(newFile, {
                preview: URL.createObjectURL(newFile),
            })
            );
        }
      } catch (error) {
        setError(error.message);
      }
    }
  }, []);
  const handlePartClick = (idn) => {
      setActiveMarker(idn);
      switch (idn) {
        case 0:
          setPartColor({ ...partColor, 0: partColor[0] + 1 });
          break;
        case 1:
          setPartColor({ ...partColor, 1: partColor[1] + 1 });
          break;
        case 2:
          setPartColor({ ...partColor, 2: partColor[2] + 1 });
          break;
        case 3:
          setPartColor({ ...partColor, 3: partColor[3] + 1 });
          break;
        case 4:
          setPartColor({ ...partColor, 4: partColor[4] + 1 });
          break;
        case 5:
          setPartColor({ ...partColor, 5: partColor[5] + 1 });
          break;
        case 6:
          setPartColor({ ...partColor, 6: partColor[6] + 1 });
          break;
        case 7:
          setPartColor({ ...partColor, 7: partColor[7] + 1 });
          break;
        case 8:
          setPartColor({ ...partColor, 8: partColor[8] + 1 });
          break;
        case 9:
          setPartColor({ ...partColor, 9: partColor[9] + 1 });
          break;
        case 10:
          setPartColor({ ...partColor, 10: partColor[10] + 1 });
          break;
        case 11:
          setPartColor({ ...partColor, 11: partColor[11] + 1 });
          break;
        case 12:
          setPartColor({ ...partColor, 12: partColor[12] + 1 });
          break;
        case 13:
          setPartColor({ ...partColor, 13: partColor[13] + 1 });
          break;
        case 14:
          setPartColor({ ...partColor, 14: partColor[14] + 1 });
          break;
        case 15:
          setPartColor({ ...partColor, 15: partColor[15] + 1 });
          break;
        case 16:
          setPartColor({ ...partColor, 16: partColor[16] + 1 });
          break;
      }
      
  };
  useEffect(() => {
    if(activeMarker){
      const newSubmittedMarkers2 = {...submittedMarkers, [partList[activeMarker]]: typeList[partColor[activeMarker] % 6] };
      setSubmittedMarkers(newSubmittedMarkers2);
      setValue('defects', newSubmittedMarkers2);
      setActiveMarker(null);
      setFile(null);
      setValue('defect', '');
      setIsErrorDisplayed(false);
    }
}, [partColor]);


  const handleSubmit = () => {
    var partPaintType = {};
    for (let i = 0; i < 17; i++) {
      partPaintType[partList[i]] = typeList[partColor[i] % 6];
    }
  };



  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        id={change}
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}
      >
        <svg
          width="406"
          height="522"
          viewBox="0 0 812 1043"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="406" height="522" fill="white" />
          <path
            id="frontBumper"
            d="M477 132L486 147H324C324.833 145.5 327.6 140.7 332 133.5C336.4 126.3 331.833 122.167 329 121H255C254.2 83 264.667 66.5 270 63H540.5C550.1 63 554.167 101.667 555 121H482C474.4 121 475.5 128.333 477 132Z"
            stroke="black"
            fill={colorList[partColor[0] % 6]}
            style={{ cursor: 'pointer' }}
            onClick={() => handlePartClick(0)}
          >
            <title>Front Bumper</title>
          </path>
          <path
            id="hood"
            d="M268 331.5C374.8 269.1 495.833 305.5 543 331.5C543 272 533 209.5 528.5 184.5C524.9 164.5 504.333 155.5 494.5 153.5C398.5 145 359.5 151.5 324 153.5C288.5 155.5 281 184 281 184.5C274.833 217.833 263.6 293.9 268 331.5Z"
            stroke="black"
            fill={colorList[partColor[1] % 6]}
            style={{ cursor: 'pointer' }}
            onClick={() => handlePartClick(1)}
          >
            <title>Hood</title>
          </path>
          <path
            d="M543.5 339.5L513.5 439C399.1 421.4 321.167 431.667 296.5 439L268 339.5C373.6 271.1 495.667 311 543.5 339.5Z"
            fill="url(#paint0_linear_1_2)"
            stroke="#141414"
          />
          <path
            id="top"
            d="M300 445C374.4 426.2 472.667 437.167 512.5 445C490.5 555.4 501.667 653 510 688C389 719.5 300 688.5 300 688C327.5 579.5 299 445 300 445Z"
            stroke="black"
            fill={colorList[partColor[2] % 6]}
            style={{ cursor: 'pointer' }}
            onClick={() => handlePartClick(2)}
          >
            <title>Top</title>
          </path>
          <path
            d="M281 763C399.4 799.8 501 778.333 536.5 763L512 693.5C412.4 717.1 328.833 703.333 299.5 693.5L281 763Z"
            fill="url(#paint1_linear_1_2)"
            stroke="#141414"
          />
          <path
            id="trunkLid"
            d="M537 768L550.5 834.5C542.5 880 524 897 524.5 897C416 910.5 306 898 293 897C282.6 896.2 272 855 268 834.5L281 768C397 804 500 783 537 768Z"
            stroke="black"
            fill={colorList[partColor[3] % 6]}
            style={{ cursor: 'pointer' }}
            onClick={() => handlePartClick(3)}
          >
            <title>Trunk Lid</title>
          </path>
          <path
            d="M550.5 834.5L537 768C500 783 397 804 281 768L268 834.5M550.5 834.5C405.7 870.1 301.833 849.333 268 834.5M550.5 834.5C542.5 880 524 897 524.5 897C416 910.5 306 898 293 897C282.6 896.2 272 855 268 834.5"
            stroke="#141414"
          />
          <circle cx="409.5" cy="872.5" r="8" fill="#FFFBFB" stroke="black" />
          <rect
            x="407.5"
            y="867.5"
            width="4"
            height="10"
            fill="#FFFEFE"
            stroke="black"
          />
          <path
            d="M724.5 349.5L720 654.5L746 662.5L754.5 338.5L724.5 349.5Z"
            fill="#FCFCFC"
            stroke="#141414"
          />
          <path
            id="backBumper"
            d="M539.5 907.5H282V932.5C275.2 932.5 273.5 937.833 273.5 940.5C270.7 952.9 279.667 978 284.5 989C369.5 989.333 539.5 989.8 539.5 989C549.5 955.5 549 949 549 940.5C549 933.7 542.667 932.333 539.5 932.5V907.5Z"
            stroke="black"
            fill={colorList[partColor[4] % 6]}
            style={{ cursor: 'pointer' }}
            onClick={() => handlePartClick(4)}
          >
            <title>Back Bumper</title>
          </path>
          <path
            id="rightFrontPanel"
            d="M644.5 164.5L647 222C637.667 232.5 624.6 262.1 647 296.5C654.167 307.167 677.9 326.6 715.5 319C715.5 320 724 326 715.5 337.5C694.5 334.5 645 329.4 615 333C601.5 333.667 568.7 347.9 545.5 399.5C545.5 400 539.5 402 538.5 397.5C542 381.5 557.7 343.4 592.5 319C599 274.833 613.4 184.3 619 175.5C619.5 175.5 638 163 644.5 164.5Z"
            stroke="black"
            fill={colorList[partColor[5] % 6]}
            style={{ cursor: 'pointer' }}
            onClick={() => handlePartClick(5)}
          >
            <title>Right Front Panel</title>
          </path>
          <path
            id="rightFrontBumper"
            d="M644.5 164.5L647 222C665.8 198.4 700.5 197.167 715.5 199.5V139C686.3 122.6 657.667 125.167 647 128.5L644.5 164.5Z"
            stroke="black"
            fill={colorList[partColor[6] % 6]}
            style={{ cursor: 'pointer' }}
            onClick={() => handlePartClick(6)}
          >
            <title>Right Front Panel</title>
          </path>

          <path
            d="M621 142C619 143.6 619 175.5 619 175.5C634.6 165.5 642.5 164 644.5 164.5L647 128.5C642.2 128.9 623 140.4 621 142Z"
            fill="#FFA4A4"
            stroke="#141414"
          />
          <path
            d="M752 259.5C752 288.495 728.495 312 699.5 312C670.505 312 647 288.495 647 259.5C647 230.505 670.505 207 699.5 207C728.495 207 752 230.505 752 259.5Z"
            fill="#FCFCFC"
          />
          <path
            d="M752 259.5C752 288.495 728.495 312 699.5 312C670.505 312 647 288.495 647 259.5C647 230.505 670.505 207 699.5 207C728.495 207 752 230.505 752 259.5Z"
            fill="#FCFCFC"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M699.5 311C727.943 311 751 287.943 751 259.5C751 231.057 727.943 208 699.5 208C671.057 208 648 231.057 648 259.5C648 287.943 671.057 311 699.5 311ZM699.5 312C728.495 312 752 288.495 752 259.5C752 230.505 728.495 207 699.5 207C670.505 207 647 230.505 647 259.5C647 288.495 670.505 312 699.5 312Z"
            fill="#141414"
          />
          <path
            id="leftFrontPanel"
            d="M168 164.5L165.5 222C174.833 232.5 187.9 262.1 165.5 296.5C158.333 307.167 134.6 326.6 97 319C97 320 88.5001 326 97 337.5C118 334.5 167.5 329.4 197.5 333C211 333.667 243.8 347.9 267 399.5C267 400 273 402 274 397.5C270.5 381.5 254.8 343.4 220 319C213.5 274.833 199.1 184.3 193.5 175.5C193 175.5 174.5 163 168 164.5Z"
            stroke="black"
            fill={colorList[partColor[7] % 6]}
            style={{ cursor: 'pointer' }}
            onClick={() => handlePartClick(7)}
          >
            <title>Left Front Panel</title>
          </path>
          <path
            id="leftFrontBumper"
            d="M168 164.5L165.5 222C146.7 198.4 112 197.167 97 199.5V139C126.2 122.6 154.833 125.167 165.5 128.5L168 164.5Z"
            stroke="black"
            fill={colorList[partColor[8] % 6]}
            style={{ cursor: 'pointer' }}
            onClick={() => handlePartClick(8)}
          >
            <title>Left Front Bumper</title>
          </path>
          <path
            d="M191.5 142C193.5 143.6 193.5 175.5 193.5 175.5C177.9 165.5 170 164 168 164.5L165.5 128.5C170.3 128.9 189.5 140.4 191.5 142Z"
            fill="#FFA4A4"
            stroke="#141414"
          />
          <path
            d="M60.5 259.5C60.5 288.495 84.0051 312 113 312C141.995 312 165.5 288.495 165.5 259.5C165.5 230.505 141.995 207 113 207C84.0051 207 60.5 230.505 60.5 259.5Z"
            fill="#FCFCFC"
          />
          <path
            d="M60.5 259.5C60.5 288.495 84.0051 312 113 312C141.995 312 165.5 288.495 165.5 259.5C165.5 230.505 141.995 207 113 207C84.0051 207 60.5 230.505 60.5 259.5Z"
            fill="#FCFCFC"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M113 311C84.5573 311 61.5 287.943 61.5 259.5C61.5 231.057 84.5573 208 113 208C141.443 208 164.5 231.057 164.5 259.5C164.5 287.943 141.443 311 113 311ZM113 312C84.0051 312 60.5 288.495 60.5 259.5C60.5 230.505 84.0051 207 113 207C141.995 207 165.5 230.505 165.5 259.5C165.5 288.495 141.995 312 113 312Z"
            fill="#141414"
          />
          <path
            d="M611 483C611 492.941 608.761 501 606 501C603.239 501 601 492.941 601 483C601 473.059 603.239 465 606 465C608.761 465 611 473.059 611 483Z"
            fill="white"
          />
          <path
            id="rightFrontDoor"
            d="M586 355C524 421.4 511.167 499.667 512.5 530.5C612.9 507.7 688.667 513.333 714 519C715 469.333 717.1 367.8 717.5 359C717.9 350.2 715.5 346.5 708 341C700.5 335.5 627 338.5 610.5 341C594 343.5 587 355 586 355Z"
            stroke="black"
            fill={colorList[partColor[9] % 6]}
            style={{ cursor: 'pointer' }}
            onClick={() => handlePartClick(9)}
          >
            <title>Right Front Door</title>
          </path>
          <path
            d="M587 361C535.8 423 522.333 493.833 522 521.5L587 505.5L593.5 357L587 361Z"
            fill="url(#paint2_linear_1_2)"
            stroke="#141414"
          />
          <path
            d="M591.5 400C572.3 410.8 565.167 400.167 564 393.5C575.5 374.5 579 370.5 587 361C590.424 356.934 592.833 363.667 593.5 366C592.667 377.5 591.1 400.4 591.5 400Z"
            fill="#FCFCFC"
            stroke="#141414"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M608.572 495.46C609.446 492.312 610 487.907 610 483C610 478.093 609.446 473.688 608.572 470.54C608.133 468.959 607.628 467.752 607.11 466.963C606.566 466.134 606.17 466 606 466C605.83 466 605.434 466.134 604.89 466.963C604.372 467.752 603.867 468.959 603.428 470.54C602.554 473.688 602 478.093 602 483C602 487.907 602.554 492.312 603.428 495.46C603.867 497.041 604.372 498.248 604.89 499.037C605.434 499.866 605.83 500 606 500C606.17 500 606.566 499.866 607.11 499.037C607.628 498.248 608.133 497.041 608.572 495.46ZM606 501C608.761 501 611 492.941 611 483C611 473.059 608.761 465 606 465C603.239 465 601 473.059 601 483C601 492.941 603.239 501 606 501Z"
            fill="black"
          />
          <path
            id="rightBackDoor"
            d="M714 519.5L713 647C712.937 655 708 653.5 693.5 653.5C667.5 653.5 636.333 674.5 624 685C605 687 588 685 587.5 685C565.5 684 516 661.5 516 661C511 544.5 512.5 531 513 530.5C611 507.3 687.833 513.5 714 519.5Z"
            stroke="black"
            fill={colorList[partColor[10] % 6]}
            style={{ cursor: 'pointer' }}
            onClick={() => handlePartClick(10)}
          >
            <title>Right Back Door</title>
          </path>
          <path
            d="M586.5 531V668L524.5 645.5C520.9 613.1 521 559.333 521.5 536.5L586.5 531Z"
            fill="url(#paint3_linear_1_2)"
            stroke="#141414"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M608.572 655.46C609.446 652.312 610 647.907 610 643C610 638.093 609.446 633.688 608.572 630.54C608.133 628.959 607.628 627.752 607.11 626.964C606.566 626.134 606.17 626 606 626C605.83 626 605.434 626.134 604.89 626.964C604.372 627.752 603.867 628.959 603.428 630.54C602.554 633.688 602 638.093 602 643C602 647.907 602.554 652.312 603.428 655.46C603.867 657.041 604.372 658.248 604.89 659.037C605.434 659.866 605.83 660 606 660C606.17 660 606.566 659.866 607.11 659.037C607.628 658.248 608.133 657.041 608.572 655.46ZM606 661C608.761 661 611 652.941 611 643C611 633.059 608.761 625 606 625C603.239 625 601 633.059 601 643C601 652.941 603.239 661 606 661Z"
            fill="black"
          />
          <path
            id="rightBackPanel"
            d="M631 687.5C668.6 654.3 695 659 703.5 665.5C631.5 672.3 631.167 724.333 640 749.5L636.5 870.5C633 872.5 597 871 585.5 870.5C576.3 870.1 573.667 863.667 573.5 860.5V803.5C558.5 769.667 527.9 700.5 525.5 694.5C522.5 687 499 654.5 536 674C573 693.5 621 696 631 687.5Z"
            stroke="black"
            fill={colorList[partColor[11] % 6]}
            style={{ cursor: 'pointer' }}
            onClick={() => handlePartClick(11)}
          >
            <title>Right Back Panel</title>
          </path>
          <path
            d="M751 726.5C751 755.495 727.495 779 698.5 779C669.505 779 646 755.495 646 726.5C646 697.505 669.505 674 698.5 674C727.495 674 751 697.505 751 726.5Z"
            fill="#FCFCFC"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M698.5 778C726.943 778 750 754.943 750 726.5C750 698.057 726.943 675 698.5 675C670.057 675 647 698.057 647 726.5C647 754.943 670.057 778 698.5 778ZM698.5 779C727.495 779 751 755.495 751 726.5C751 697.505 727.495 674 698.5 674C669.505 674 646 697.505 646 726.5C646 755.495 669.505 779 698.5 779Z"
            fill="#141414"
          />
          <path
            d="M576.5 705V744.5C571.7 753.3 564.833 749.5 562 746.5L543 710C541.833 707.5 538.1 699.8 532.5 689C526.9 678.2 526.5 674.5 527 674L576.5 705Z"
            fill="url(#paint4_linear_1_2)"
            stroke="#141414"
          />
          <path
            id="rightBackBumper"
            d="M640 749.5C654.4 785.9 690.333 788 706.5 784.5L702 868.5C679.6 890.5 649 879.333 636.5 871L640 749.5Z"
            stroke="black"
            fill={colorList[partColor[12] % 6]}
            style={{ cursor: 'pointer' }}
            onClick={() => handlePartClick(12)}
          >
            <title>Right Back Bumper</title>
          </path>
          <path
            d="M617 847.5L620.5 871.5C608.5 872.3 592.167 871.167 585.5 870.5V848.5C585.5 844.9 588.5 844 590 844H611C615.4 844 616.833 846.333 617 847.5Z"
            fill="#FFA4A4"
            stroke="#141414"
          />
          <path
            d="M88 349.5L92.5 654.5L66.5 662.5L58 338.5L88 349.5Z"
            fill="#FCFCFC"
            stroke="#141414"
          />
          <path
            d="M201.5 483C201.5 492.941 203.739 501 206.5 501C209.261 501 211.5 492.941 211.5 483C211.5 473.059 209.261 465 206.5 465C203.739 465 201.5 473.059 201.5 483Z"
            fill="white"
          />
          <path
            id="leftFrontDoor"
            d="M226.5 355C288.5 421.4 301.333 499.667 300 530.5C199.6 507.7 123.833 513.333 98.5 519C97.5 469.333 95.4 367.8 95 359C94.6 350.2 97 346.5 104.5 341C112 335.5 185.5 338.5 202 341C218.5 343.5 225.5 355 226.5 355Z"
            stroke="black"
            fill={colorList[partColor[13] % 6]}
            style={{ cursor: 'pointer' }}
            onClick={() => handlePartClick(13)}
          >
            <title>Left Front Door</title>
          </path>
          <path
            d="M225.5 361C276.7 423 290.167 493.833 290.5 521.5L225.5 505.5L219 357L225.5 361Z"
            fill="url(#paint5_linear_1_2)"
            stroke="#141414"
          />
          <path
            d="M221 400C240.2 410.8 247.333 400.167 248.5 393.5C237 374.5 233.5 370.5 225.5 361C222.076 356.934 219.667 363.667 219 366C219.833 377.5 221.4 400.4 221 400Z"
            fill="#FCFCFC"
            stroke="#141414"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M203.928 495.46C203.054 492.312 202.5 487.907 202.5 483C202.5 478.093 203.054 473.688 203.928 470.54C204.367 468.959 204.872 467.752 205.39 466.963C205.934 466.134 206.33 466 206.5 466C206.67 466 207.066 466.134 207.61 466.963C208.128 467.752 208.633 468.959 209.072 470.54C209.946 473.688 210.5 478.093 210.5 483C210.5 487.907 209.946 492.312 209.072 495.46C208.633 497.041 208.128 498.248 207.61 499.037C207.066 499.866 206.67 500 206.5 500C206.33 500 205.934 499.866 205.39 499.037C204.872 498.248 204.367 497.041 203.928 495.46ZM206.5 501C203.739 501 201.5 492.941 201.5 483C201.5 473.059 203.739 465 206.5 465C209.261 465 211.5 473.059 211.5 483C211.5 492.941 209.261 501 206.5 501Z"
            fill="black"
          />
          <path
            id="leftBackDoor"
            d="M98.5 519.5L99.5 647C99.5627 655 104.5 653.5 119 653.5C145 653.5 176.167 674.5 188.5 685C207.5 687 224.5 685 225 685C247 684 296.5 661.5 296.5 661C301.5 544.5 300 531 299.5 530.5C201.5 507.3 124.667 513.5 98.5 519.5Z"
            stroke="black"
            fill={colorList[partColor[14] % 6]}
            style={{ cursor: 'pointer' }}
            onClick={() => handlePartClick(14)}
          >
            <title>Left Back Door</title>
          </path>
          <path
            d="M226 531V668L288 645.5C291.6 613.1 291.5 559.333 291 536.5L226 531Z"
            fill="url(#paint6_linear_1_2)"
            stroke="#141414"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M203.928 655.46C203.054 652.312 202.5 647.907 202.5 643C202.5 638.093 203.054 633.688 203.928 630.54C204.367 628.959 204.872 627.752 205.39 626.964C205.934 626.134 206.33 626 206.5 626C206.67 626 207.066 626.134 207.61 626.964C208.128 627.752 208.633 628.959 209.072 630.54C209.946 633.688 210.5 638.093 210.5 643C210.5 647.907 209.946 652.312 209.072 655.46C208.633 657.041 208.128 658.248 207.61 659.037C207.066 659.866 206.67 660 206.5 660C206.33 660 205.934 659.866 205.39 659.037C204.872 658.248 204.367 657.041 203.928 655.46ZM206.5 661C203.739 661 201.5 652.941 201.5 643C201.5 633.059 203.739 625 206.5 625C209.261 625 211.5 633.059 211.5 643C211.5 652.941 209.261 661 206.5 661Z"
            fill="black"
          />
          <path
            id="leftBackPanel"
            d="M181.5 687.5C143.9 654.3 117.5 659 109 665.5C181 672.3 181.333 724.333 172.5 749.5L176 870.5C179.5 872.5 215.5 871 227 870.5C236.2 870.1 238.833 863.667 239 860.5V803.5C254 769.667 284.6 700.5 287 694.5C290 687 313.5 654.5 276.5 674C239.5 693.5 191.5 696 181.5 687.5Z"
            stroke="black"
            fill={colorList[partColor[15] % 6]}
            style={{ cursor: 'pointer' }}
            onClick={() => handlePartClick(15)}
          >
            <title>Left Back Panel</title>
          </path>
          <path
            d="M61.5 726.5C61.5 755.495 85.0051 779 114 779C142.995 779 166.5 755.495 166.5 726.5C166.5 697.505 142.995 674 114 674C85.0051 674 61.5 697.505 61.5 726.5Z"
            fill="#FCFCFC"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M114 778C85.5573 778 62.5 754.943 62.5 726.5C62.5 698.057 85.5573 675 114 675C142.443 675 165.5 698.057 165.5 726.5C165.5 754.943 142.443 778 114 778ZM114 779C85.0051 779 61.5 755.495 61.5 726.5C61.5 697.505 85.0051 674 114 674C142.995 674 166.5 697.505 166.5 726.5C166.5 755.495 142.995 779 114 779Z"
            fill="#141414"
          />
          <path
            d="M236 705V744.5C240.8 753.3 247.667 749.5 250.5 746.5L269.5 710C270.667 707.5 274.4 699.8 280 689C285.6 678.2 286 674.5 285.5 674L236 705Z"
            fill="url(#paint7_linear_1_2)"
            stroke="#141414"
          />
          <path
            id="leftBackBumper"
            d="M172.5 749.5C158.1 785.9 122.167 788 106 784.5L110.5 868.5C132.9 890.5 163.5 879.333 176 871L172.5 749.5Z"
            stroke="black"
            fill={colorList[partColor[16] % 6]}
            style={{ cursor: 'pointer' }}
            onClick={() => handlePartClick(16)}
          >
            <title>Left Back Bumper</title>
          </path>
          <path
            d="M195.5 847.5L192 871.5C204 872.3 220.333 871.167 227 870.5V848.5C227 844.9 224 844 222.5 844H201.5C197.1 844 195.667 846.333 195.5 847.5Z"
            fill="#FFA4A4"
            stroke="#141414"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1_2"
              x1="282.5"
              y1="386.5"
              x2="530.5"
              y2="386.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#AEE2FF" />
              <stop offset="0.505208" stopColor="#FFFEFE" stopOpacity="0" />
              <stop offset="1" stopColor="#AEE2FF" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_1_2"
              x1="294.447"
              y1="748.966"
              x2="524.444"
              y2="748.966"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#AEE2FF" />
              <stop offset="0.505208" stopColor="#FFFEFE" stopOpacity="0" />
              <stop offset="1" stopColor="#AEE2FF" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_1_2"
              x1="553.5"
              y1="517"
              x2="591"
              y2="362.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#AEE2FF" />
              <stop offset="0.505208" stopColor="#FFFEFE" stopOpacity="0" />
              <stop offset="1" stopColor="#AEE2FF" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_1_2"
              x1="554"
              y1="672"
              x2="554"
              y2="523"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#AEE2FF" />
              <stop offset="0.505208" stopColor="#FFFEFE" stopOpacity="0" />
              <stop offset="1" stopColor="#AEE2FF" />
            </linearGradient>
            <linearGradient
              id="paint4_linear_1_2"
              x1="527"
              y1="670.5"
              x2="572"
              y2="755"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#AEE2FF" />
              <stop offset="0.505208" stopColor="#FFFEFE" stopOpacity="0" />
              <stop offset="1" stopColor="#AEE2FF" />
            </linearGradient>
            <linearGradient
              id="paint5_linear_1_2"
              x1="259"
              y1="517"
              x2="221.5"
              y2="362.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#AEE2FF" />
              <stop offset="0.505208" stopColor="#FFFEFE" stopOpacity="0" />
              <stop offset="1" stopColor="#AEE2FF" />
            </linearGradient>
            <linearGradient
              id="paint6_linear_1_2"
              x1="258.5"
              y1="672"
              x2="258.5"
              y2="523"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#AEE2FF" />
              <stop offset="0.505208" stopColor="#FFFEFE" stopOpacity="0" />
              <stop offset="1" stopColor="#AEE2FF" />
            </linearGradient>
            <linearGradient
              id="paint7_linear_1_2"
              x1="285.5"
              y1="670.5"
              x2="240.5"
              y2="755"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#AEE2FF" />
              <stop offset="0.505208" stopColor="#FFFEFE" stopOpacity="0" />
              <stop offset="1" stopColor="#AEE2FF" />
            </linearGradient>
          </defs>
        </svg>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '0px 50px',
          }}
        >
          <Label color={colorList[0]} title={typeList[0]} />
          <Label color={colorList[1]} title={typeList[1]} />
          <Label color={colorList[2]} title={typeList[2]} />
          <Label color={colorList[3]} title={typeList[3]} />
          <Label color={colorList[4]} title={typeList[4]} />
          <Label color={colorList[5]} title={typeList[5]} />
        </div>

        <Grid item sm={12} sx={{width: '100%'}}>
        <Box
          rowGap={2}
          columnGap={3}
          display="grid"
          gridTemplateColumns={{
            sm: 'repeat(1, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
        >
          { fields.map(field => renderAddCarSelect({...field, options: field.options || ENGINE_AND_TRANSMISSION_OPTIONS })) }
          <RHFTextField name="exterior_comment" label="Comments" multiline />
        </Box>
      </Grid>

      </div>
      

    </div>
  );
};

export default CarPartsPaint;

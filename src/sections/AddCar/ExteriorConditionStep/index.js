import * as Yup from 'yup';
import ImageMarker from 'react-image-marker';
import { useState, useCallback, useEffect } from 'react';
import { Grid, Paper, Alert, MenuItem, Button, List, Box } from '@mui/material';
import { RHFSelect } from 'src/components/hook-form';
import MarkerRow from './MarkerRow';
import { Upload } from 'src/components/upload';
import { DEFECTS_OPTIONS } from './constants';
import imageCompression from 'browser-image-compression';
import { RHFTextField, RHFCheckbox } from 'src/components/hook-form';
import {  chassisOptions, chassisExtensionOptions, ENGINE_AND_TRANSMISSION_OPTIONS} from '../EngineAndTransmissionStep/constants';
import { renderAddCarSelect } from 'src/utils/forms';
// ----------------------------------------------------------------------

export const ExteriorConditionSchema = Yup.object().shape({
  defect: Yup.string().nullable(),
  markers: Yup.array(),
});

export const ExteriorConditionDefaultValues = {
  defect: "",
  markers: [],
};

export default function ExteriorCondition({ watch, setValue, markers, setMarkers, activeMarker, setActiveMarker, submittedMarkers, setSubmittedMarkers, isErrorDisplayed, setIsErrorDisplayed, file, setFile }) {
  const [defect] = watch(['defect']);


  const onAddMarker = useCallback((marker) => {
    if (!activeMarker) {
      setMarkers([...markers, marker]);
      setActiveMarker({ ...marker, defect: '' });
    } else {
      setIsErrorDisplayed(true);
    }
  }, [markers, activeMarker])

  const onDeleteMarker = useCallback((key) => {
    setMarkers((markers) => {
      const newMarkers = [...markers];
      newMarkers.splice(key, 1);
      return newMarkers;
    });
    setSubmittedMarkers((markers) => {
      const newMarkers = [...markers];
      newMarkers.splice(key, 1);
      return newMarkers;
    });
  }, []);

  const onSubmitButton = useCallback(() => {
    const lastMarker = markers[markers.length - 1];
    const newSubmittedMarkers = [...submittedMarkers, { ...lastMarker, defect, file }];
    setSubmittedMarkers(newSubmittedMarkers);
    setValue('markers', newSubmittedMarkers);
    setActiveMarker(null);
    setFile(null);
    setValue('defect', '');
  }, [defect, markers, submittedMarkers, setValue, file]);

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

  const fields = [  
    { name: 'Chassis', label: 'Chassis', options: chassisOptions},
    { name: 'Chassis_Extension', label: 'Chassis Extension', options: chassisExtensionOptions},
  ];
  


  return (
    <Grid container spacing={2}>
      <Grid item sm={6}>
        <ImageMarker
          src="/assets/illustrations/CarSkeleton2.png"
          markers={markers}
          onAddMarker={onAddMarker}
        />
      </Grid>
      <Grid item sm={6}>
        { isErrorDisplayed && <Alert severity='warning'>You should describe the previous mark first</Alert>}
        {error && <Alert severity='warning'>{error}</Alert>}
        <List>
          { submittedMarkers.map((marker, key) => <MarkerRow onDeleteButtonClick={onDeleteMarker} marker={marker} key={key} id={key} />)}
        </List>
        {activeMarker && <Paper variant="outlined" sx={{ borderRadius: 2, borderColor: 'divider', padding: '1rem' }}>
          <RHFSelect name="defect" label="Defect" sx={{marginBottom: '1rem'}}>
            {DEFECTS_OPTIONS.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
          </RHFSelect>
          <Upload accept={{ 'image/*': [] }} file={file} name={submittedMarkers.length} onDrop={handleDropSingleFile} onDelete={() => setFile(null)} sx={{marginBottom: '1rem'}} />
          <Button
            type="button"
            onClick={onSubmitButton} 
            variant="outlined"
            disabled={!defect  || error}
          >
            Add marker</Button>
        </Paper>}
      </Grid>
      <Grid item sm={12}>
        <Box
          rowGap={2}
          columnGap={3}
          display="grid"
          gridTemplateColumns={{
            sm: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
        >
          { fields.map(field => renderAddCarSelect({...field, options: field.options || ENGINE_AND_TRANSMISSION_OPTIONS })) }
          <RHFTextField name="exterior_comment" label="Comments" multiline />
        </Box>
      </Grid>
    </Grid>
    
  );
}

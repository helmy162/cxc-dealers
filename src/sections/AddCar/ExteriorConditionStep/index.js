import * as Yup from 'yup';
import ImageMarker from 'react-image-marker';
import { useState, useCallback } from 'react';
import { Grid, Paper, Alert, MenuItem, Button, List } from '@mui/material';
import { RHFSelect } from 'src/components/hook-form';
import MarkerRow from './MarkerRow';
import { Upload } from 'src/components/upload';
import { DEFECTS_OPTIONS } from './constants';
// ----------------------------------------------------------------------

export const ExteriorConditionSchema = Yup.object().shape({
  defect: Yup.string().nullable(),
  markers: Yup.array(),
});

export const ExteriorConditionDefaultValues = {
  defect: "",
  markers: [],
};

export default function ExteriorCondition({ watch, setValue }) {
  const [defect] = watch(['defect']);

  const [markers, setMarkers] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [submittedMarkers, setSubmittedMarkers] = useState([]);
  const [isErrorDisplayed, setIsErrorDisplayed] = useState(false);

  const [file, setFile] = useState(null);

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
  }, [defect, markers, submittedMarkers, setValue, file]);

  const [error, setError] = useState(null);

  const handleDropSingleFile = useCallback((acceptedFiles) => {
    const newFile = acceptedFiles[0];
    if (newFile) {
        if(newFile.size > 4000000) {
            setError('File too big! Image size should be less than 4MB.');
        } else {
            setFile(
            Object.assign(newFile, {
                preview: URL.createObjectURL(newFile),
            })
            );
            setError('');
        }
    }
}, []);


  return (
    <Grid container spacing={2}>
      <Grid item sm={6}>
        <ImageMarker
          src="/assets/illustrations/CarSkeleton.png"
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
          <Upload file={file} name={submittedMarkers.length} onDrop={handleDropSingleFile} onDelete={() => setFile(null)} sx={{marginBottom: '1rem'}} />
          <Button
            type="button"
            onClick={onSubmitButton} 
            variant="outlined"
            disabled={!defect || !file || error}
          >
            Add marker</Button>
        </Paper>}
      </Grid>
    </Grid>
    
  );
}

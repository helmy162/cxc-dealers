import * as Yup from 'yup';
import ImageMarker from 'react-image-marker';
import { useState, useCallback } from 'react';
import { Grid, Paper, Alert, MenuItem, Button, List } from '@mui/material';
import { RHFSelect } from 'src/components/hook-form';
import MarkerRow from './MarkerRow';
import { Upload } from 'src/components/upload';
// ----------------------------------------------------------------------

const DEFECTS_OPTIONS = [
  "Scratch",
  "Cosmetic Paint",
  "Dent",
  "Repainted",
  "Repair"
];


export const ExteriorConditionSchema = Yup.object().shape({
  defect: Yup.string().nullable(),
});

export const ExteriorConditionDefaultValues = {
  defect: "",
};

export default function ExteriorCondition({ watch }) {
  const [defect] = watch(['defect']);
  const [markers, setMarkers] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [submittedMerkers, setSubmittedMarkers] = useState([]);
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
    setSubmittedMarkers([...submittedMerkers, { ...lastMarker, defect }]);
    setActiveMarker(null)
  }, [defect, markers, submittedMerkers]);

  const handleDropSingleFile = useCallback((acceptedFiles) => {
    const newFile = acceptedFiles[0];
    if (newFile) {
      setFile(
        Object.assign(newFile, {
          preview: URL.createObjectURL(newFile),
        })
      );
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
        <List>
          { submittedMerkers.map((marker, key) => <MarkerRow onDeleteButtonClick={onDeleteMarker} marker={marker} key={key} id={key} />)}
        </List>
        {activeMarker && <Paper variant="outlined" sx={{ borderRadius: 2, borderColor: 'divider', padding: '1rem' }}>
          <RHFSelect name="defect" label="Defect" value="Scratch" sx={{marginBottom: '1rem'}}>
            {DEFECTS_OPTIONS.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
          </RHFSelect>
          <Upload file={file} onDrop={handleDropSingleFile} onDelete={() => setFile(null)} sx={{marginBottom: '1rem'}} />
          <Button
            type="button"
            onClick={onSubmitButton} 
            variant="outlined"
            disabled={!defect}
          >
            Add marker</Button>
        </Paper>}
      </Grid>
    </Grid>
    
  );
}

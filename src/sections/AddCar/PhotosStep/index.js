import * as Yup from 'yup';
import { Box, Stack, Alert } from "@mui/material";
import { useCallback } from "react";
import { RHFUpload } from "src/components/hook-form";
import { useState } from 'react';

export const PhotosSchema = Yup.object().shape({
  images: Yup.array()
});
export const PhotosDefaultValues = {
  images: []
};

export default function PhotosStep ({ watch, setValue }) {
  const images = watch('images');
  const [error, setError] = useState(null);
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const newFiles = acceptedFiles.map(file => {
        if(file.size > 4000000){
          setError("file size should be less than 4MB")
          return;
        }
        setError(null)
        return Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
      });
      if (acceptedFiles && acceptedFiles.length) {
        const filteredImages = newFiles.filter(image => image !== undefined);
        setValue('images', [...filteredImages, ...images], { shouldValidate: true });
        console.log([...filteredImages, ...images])
      }
    },
    [setValue, images]
  );

  const handleRemoveFile = (_0, idx) => {
    const newFiles = [...images];
    newFiles.splice(idx, 1);
    setValue('images', newFiles);
  };

  return (
    <Stack spacing={3}>
      <Box
        rowGap={2}
        columnGap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
        }}
      >
        {error && <Alert severity='error'>{error}</Alert>}
        <RHFUpload
          name='images'
          multiple
          thumbnail
          onDrop={handleDrop}
          onRemove={handleRemoveFile}
        />
      </Box>
    </Stack>
  )  
}

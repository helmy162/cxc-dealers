import * as Yup from 'yup';
import { Box, Stack, Alert } from "@mui/material";
import { useCallback } from "react";
import { RHFUpload } from "src/components/hook-form";

export const PhotosSchema = Yup.object().shape({
  images: Yup.array()
});
export const PhotosDefaultValues = {
  images: []
};

export default function PhotosStep ({ errors, watch, setValue }) {
  const images = watch('images');

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const newFiles = acceptedFiles.map(file => {
        return Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
      });

      if (acceptedFiles && acceptedFiles.length) {
        setValue('images', [...newFiles, ...images], { shouldValidate: true });
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
      {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
      <Box
        rowGap={2}
        columnGap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
        }}
      >
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
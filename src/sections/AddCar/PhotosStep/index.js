import * as Yup from 'yup';
import { Box, Stack, Alert } from "@mui/material";
import { useCallback, useState, useEffect } from "react";
import { RHFUpload } from "src/components/hook-form";

const MAX_SIZE = 1000000; // 1 MB

export const PhotosSchema = Yup.object().shape({
  images: Yup.array().required().min(1)
});
export const PhotosDefaultValues = {
  images: []
};

export default function PhotosStep ({ watch, setValue }) {

  const [error, setError] = useState(null);

  const images = watch('images')

  const handleDrop = useCallback(
    async (acceptedFiles) => {
      const newFiles = [];
      for (let i = 0; i < acceptedFiles.length; i++) {
        const file = acceptedFiles[i];
        if (file.size > MAX_SIZE) {
          const image = new Image();
          image.src = URL.createObjectURL(file);
          await new Promise((resolve) => {
            image.onload = resolve;
          });

          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const scale = Math.min(1920 / image.width, 1920 / image.height);
          canvas.width = image.width * scale;
          canvas.height = image.height * scale;
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

          canvas.toBlob(async (blob) => {
            const processedFile = new File([blob], `${i}_${Date.now()}_compressed.jpg`, { type: file.type, path: file.path });
            newFiles.push(processedFile);
            if (newFiles.length === acceptedFiles.length) {
              const processedFiles = newFiles.map((file, index) => {
                return Object.assign(file, {
                  preview: URL.createObjectURL(file),
                  id: `${index}_${Date.now()}_${file.name}`
                });
              });
              console.log(processedFiles);
              setValue('images', [...processedFiles, ...images]);
            }
          }, "image/jpeg", 0.9);
        } else {
          newFiles.push(file);
        }
      }
      
      if (newFiles.length === acceptedFiles.length) {
        const processedFiles = newFiles.map((file, index) => {
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
            id: `${index}_${Date.now()}_${file.name}`
          });
        });
        setValue('images', [...processedFiles, ...images]);
      }
      
    },
    [images]
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

import * as Yup from 'yup';
import { Box, Stack, Alert } from "@mui/material";
import { useCallback, useState, useEffect } from "react";
import { RHFUpload } from "src/components/hook-form";
import imageCompression from 'browser-image-compression';

const MAX_SIZE = 4000000; // 4 MB

export const PhotosSchema = Yup.object().shape({
  images: Yup.array().required().min(1)
});
export const PhotosDefaultValues = {
  images: []
};

export default function PhotosStep ({ watch, setValue }) {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setValue('images', images);
  }, [images, setValue]);

  const handleDrop = useCallback(
    async (acceptedFiles) => {
      const newFiles = [];
      for (let i = 0; i < acceptedFiles.length; i++) {
        const file = acceptedFiles[i];
        if (file.size > MAX_SIZE) {
          const options = {
            maxSizeMB: MAX_SIZE / 1000000,
            maxWidthOrHeight: 720,
            useWebWorker: true,
          };
          const compressedBlob = await imageCompression(file, options);
          const processedFile = new File([compressedBlob], `${i}_${Date.now()}_compressed.jpg`, { type: file.type, path: file.path });
          newFiles.push(processedFile);
        } else {
          newFiles.push(file);
        }
      }
      
      const processedFiles = newFiles.map((file, index) => {
        return Object.assign(file, {
          preview: URL.createObjectURL(file),
          id: `${index}_${Date.now()}_${file.name}`
        });
      });
      setImages([...processedFiles, ...images]);
      
    },
    [images]
  );

  const handleRemoveFile = (_0, idx) => {
    const newFiles = [...images];
    newFiles.splice(idx, 1);
    setImages(newFiles);
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

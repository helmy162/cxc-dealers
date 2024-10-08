import * as Yup from 'yup';
import { Box, Stack, Alert, Typography } from "@mui/material";
import { useCallback, useState, useEffect } from "react";
import { RHFUpload } from "src/components/hook-form";

const MAX_SIZE = 1000000; // 1 MB

export const PrivateSchema = Yup.object().shape({
  id_images: Yup.array(),
  registration_card_images: Yup.array(),
  vin_images: Yup.array(),
  insurance_images: Yup.array(),
});
export const PrivateDefaultValues = {
  id_images: [],
  registration_card_images: [],
  vin_images: [],
  insurance_images: [],
};

export default function Private ({ watch, setValue}) {

  const idImages = watch("id_images");
  const registrationCardImages = watch("registration_card_images");
  const vinImages = watch("vin_images");


  const handleIdImagesDrop = useCallback(
    async (acceptedFiles) => {
      // Process and set state for id images
      const newFiles = await processImages(acceptedFiles);
      setValue("id_images", [...idImages, ...newFiles]);
    },
    [idImages]
  );

  const handleRegistrationCardImagesDrop = useCallback(
    async (acceptedFiles) => {
      // Process and set state for registration card images
      const newFiles = await processImages(acceptedFiles);
      setValue( "registration_card_images", [...registrationCardImages, ...newFiles]);
    },
    [registrationCardImages]
  );

  const handleVinImagesDrop = useCallback(
    async (acceptedFiles) => {
      // Process and set state for vin images
      const newFiles = await processImages(acceptedFiles);
      setValue( "vin_images", [...vinImages, ...newFiles]);
    },
    [vinImages]
  );


  const handleRemoveFile = (removedFile, idx, fieldName) => {
    // Remove file from the appropriate array based on field name
    switch(fieldName) {
      case "idImages":
        const newIDImages = [...idImages];
        newIDImages.splice(idx, 1);
        setValue("id_images",newIDImages);
        break;
      case "registrationCardImages":
        const newRegistrationCardImages = [...registrationCardImages];
        newRegistrationCardImages.splice(idx, 1);
        setValue( "registration_card_images", newRegistrationCardImages);
        break;
      case "vinImages":
        const newVinImages = [...vinImages];
        newVinImages.splice(idx, 1);
        setValue( "vin_images", newVinImages);
        break;
      default:
        break;
    }
  };

  const processImages = useCallback(async (acceptedFiles) => {
    let images = [];
    let newFiles = [];
  
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
  
        const blob = await new Promise((resolve) => {
          canvas.toBlob(resolve, "image/jpeg", 0.9);
        });
        const processedFile = new File([blob], `${i}_${Date.now()}_compressed.jpg`, {
          type: file.type,
          path: file.path,
        });
        newFiles.push(processedFile);
      } else {
        newFiles.push(file);
      }
    }
  
    const processedFiles = newFiles.map((file, index) => {
      return Object.assign(file, {
        preview: URL.createObjectURL(file),
        id: `${index}_${Date.now()}_${file.name}`,
      });
    });
    images = [...processedFiles, ...images];
  
    return images;
  }, []);
  
  

  return (
    <Stack spacing={3}>
      <Box
        rowGap={2}
        columnGap={3}
        display="grid"
        gridTemplateColumns={{
          md: 'repeat(1, 1fr)',
          lg: 'repeat(2, 1fr)',
        }}
      >
        <Box>
          <Typography variant="h4" >ID Images</Typography>
          <RHFUpload
            name="id_images"
            multiple
            thumbnail
            onDrop={handleIdImagesDrop}
            onRemove={(removedFile, idx) => handleRemoveFile(removedFile, idx, "idImages")}
          />
        </Box>
        <Box>
          <Typography variant="h4" > Registration Card Images</Typography>
          <RHFUpload
            name="registration_card_images"
            multiple
            thumbnail
            onDrop={handleRegistrationCardImagesDrop}
            onRemove={(removedFile, idx) => handleRemoveFile(removedFile, idx, "registrationCardImages")}
          />
        </Box>
        <Box>
          <Typography variant="h4" >VIN Images</Typography>
          <RHFUpload
            name="vin_images"
            multiple
            thumbnail
            onDrop={handleVinImagesDrop}
            onRemove={(removedFile, idx) => handleRemoveFile(removedFile, idx, "vinImages")}
          />
        </Box>
        
      </Box>
    </Stack>
  )  
}

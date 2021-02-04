import { Box, CircularProgress, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import axios from 'axios';
import React, { useState } from 'react';
import usePhotoUploadStyles from './PhotoUpload.styles';

type PhotoUploadPropsType = {
  errorHandler: (message: string) => void;
  onCompleted: (id: number) => void;
  removePhoto: (id: number) => void;
  disabled: boolean;
};

export default function PhotoUpload({
  errorHandler,
  onCompleted,
  removePhoto,
  disabled,
}: PhotoUploadPropsType) {
  const classes = usePhotoUploadStyles();
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [id, setId] = useState<number>(0);

  const onFileSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (event.target.files[0].size < 5000000) {
        setLoading(true);
        const reader = new FileReader();
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event: ProgressEvent<FileReader>) => {
          setImage(event.target.result as string);
        };
        const result = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/upload`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percentCompleted);
            },
          }
        );
        setLoading(false);
        setId(result.data.id);
        console.log(result.data);
        onCompleted(result.data.id);
      } else {
        errorHandler('Maksymalny rozmiar zdjęcia to 5MB.');
      }
    } catch (error) {
      console.log('Upload error:', error);
      errorHandler('Błąd wysyłania zdjęcia.');
    }
  };

  const onRemovePhoto = () => {
    // Remove from servere here too
    console.log(id);
    setId(0);
    setImage(null);
    removePhoto(id);
  };

  return (
    <Box
      className={disabled ? `${classes.box} ${classes.disabled}` : classes.box}
    >
      {!loading && !id && (
        <PhotoCameraIcon
          className={
            disabled ? `${classes.icon} ${classes.disabled}` : classes.icon
          }
        />
      )}
      {loading && (
        <CircularProgress
          className={classes.progress}
          variant="determinate"
          value={uploadProgress}
        />
      )}
      {image && (
        <img
          style={{ opacity: loading ? 0.3 : null }}
          className={classes.preview}
          src={image}
          alt=""
        />
      )}
      {!id && !disabled && (
        <label className={classes.label}>
          <input
            onChange={onFileSelected}
            className={classes.input}
            type="file"
            accept="image/*"
          />
        </label>
      )}
      {!!id && (
        <IconButton
          aria-label="delete"
          onClick={onRemovePhoto}
          className={classes.delete}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      )}
    </Box>
  );
}

import { Box, CircularProgress, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import axios from 'axios';
import React, { useState } from 'react';
import { useDeletePhotoMutation } from '../../generated/graphql';
import usePhotoUploadStyles from './PhotoUpload.styles';

type PhotoUploadPropsType = {
  errorHandler: (message: string) => void;
  onCompleted: (id: number, image: string, index: number) => void;
  removePhoto: (id: number, index: number) => void;
  image: string | null;
  id: number;
  index: number;
};

export default function PhotoUpload({
  errorHandler,
  onCompleted,
  removePhoto,
  image,
  id,
  index,
}: PhotoUploadPropsType) {
  const classes = usePhotoUploadStyles();
  const [deletePhotoFromServer] = useDeletePhotoMutation({
    errorPolicy: 'ignore',
  });
  const [imageFile, setImageFile] = useState<string | null>(image);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const onFileSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (event.target.files[0].size < 5000000) {
        let test = '';
        setLoading(true);
        const reader = new FileReader();
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = async (event: ProgressEvent<FileReader>) => {
          test = event.target.result as string;
          setImageFile(test);
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
          onCompleted(result.data.id, test, index);
        };
      } else {
        errorHandler('Maksymalny rozmiar zdjęcia to 5MB.');
      }
    } catch (error) {
      console.log('Upload error:', error);
      errorHandler('Błąd wysyłania zdjęcia.');
    }
  };

  const onRemovePhoto = () => {
    setImageFile(null);
    deletePhotoFromServer({
      variables: {
        id: id,
      },
    });
    removePhoto(id, index);
  };

  return (
    <Box className={classes.box}>
      {!loading && !id && <PhotoCameraIcon className={classes.icon} />}
      {loading && (
        <CircularProgress
          className={classes.progress}
          variant="determinate"
          value={uploadProgress}
        />
      )}
      {imageFile && (
        <img
          style={{ opacity: loading ? 0.3 : null }}
          className={classes.preview}
          src={imageFile}
          alt=""
        />
      )}
      {!id && (
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

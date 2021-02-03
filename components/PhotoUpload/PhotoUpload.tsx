import {
  Box,
  CircularProgress,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
} from '@material-ui/core';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useState } from 'react';
import axios from 'axios';

const usePhotoUploadStyles = makeStyles((theme: Theme) =>
  createStyles({
    disabled: {
      cursor: 'initial',
      color: `${theme.palette.grey[100]} !important`,
      backgroundColor: `${theme.palette.grey[300]} !important`
    },
    box: {
      position: 'relative',
      height: 100,
      backgroundColor: theme.palette.primary[100],
      borderRadius: theme.shape.borderRadius,
      transition: theme.transitions.create(['background-color']),
      '& button': {
        opacity: 0,
      },
      '&:hover': {
        backgroundColor: theme.palette.primary[200],
        '& img': {
          opacity: 0.5,
        },
        '& button': {
          opacity: 1,
        },
      },
    },
    input: {
      visibility: 'hidden',
    },
    label: {
      zIndex: 998,
      position: 'relative',
      display: 'block',
      width: '100%',
      height: '100%',
      cursor: 'pointer',
    },
    preview: {
      width: 'auto',
      height: 'auto',
      maxHeight: '100%',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: theme.shape.borderRadius,
      transition: theme.transitions.create(['opacity']),
    },
    progress: {
      zIndex: 999,
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -20,
      marginLeft: -20,
    },
    icon: {
      color: theme.palette.primary[400],
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    delete: {
      backgroundColor: 'white',
      color: theme.palette.grey[600],
      position: 'absolute',
      zIndex: 999,
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      transition: theme.transitions.create(['opacity']),
      '&:hover': {
        backgroundColor: 'white',
      },
    },
  })
);

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
    <Box className={disabled ? `${classes.box} ${classes.disabled}` : classes.box}>
      {!loading && !id && <PhotoCameraIcon className={disabled ? `${classes.icon} ${classes.disabled}` : classes.icon} />}
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

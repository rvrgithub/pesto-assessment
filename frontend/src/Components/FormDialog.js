import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {  enqueueSnackbar } from 'notistack';
export default function FormDialog({ setOpen, open }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema), // Using Yup for validation
  });

  const handleClose = () => {
    setOpen(false);
  };

  const hanldeDataSubmit = (data) => {
    console.log("data", data)
    fetch(`http://localhost:4000/post-todo`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        enqueueSnackbar("Data added Successfully !!",{variant:"success"})
        console.log('Data sent successfully:', data);
        reset();
        handleClose();
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
        }}
        onSubmit={handleSubmit(hanldeDataSubmit)}
      >
        <DialogTitle>Create Your Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            {...register('title')}
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            error={!!errors.title} // Checking for errors
            helperText={errors.title ? errors.title.message : ''}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            {...register('description')}
            error={!!errors.description} // Checking for errors
            helperText={errors.description ? errors.description.message : ''}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" color="primary" variant="contained">ADD</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

// Define your validation schema using Yup
const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
});

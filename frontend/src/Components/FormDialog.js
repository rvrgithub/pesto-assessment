import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem, Select } from '@mui/material';
import { useForm } from 'react-hook-form';
export default function FormDialog({ setOpen, open }) {
  const { register, handleSubmit, reset } = useForm();
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
        console.log('Data sent successfully:', data);
        reset();
        handleClose();
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });

  }

  React.useEffect(() => {
    hanldeDataSubmit();
  }, [])
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
        <DialogTitle>Create You Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            {...register('title')}
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            {...register('description')}
          />
          {/* <Select
          // value={selectedOption}
          >
            <MenuItem disabled value="" style={{ color: 'black' }}>
              Status
            </MenuItem>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="success">Success</MenuItem>
          </Select> */}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
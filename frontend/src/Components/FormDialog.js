import React, { useEffect, useMemo } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { enqueueSnackbar } from "notistack";
import { api, token } from "../App";

export default function FormDialog({ setOpen, open, edit = false, rowData, setEdit, setRowData }) {
  // Define validation schema using yup
  const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    status: yup.string().required("Status is required")
  });

  // Set default form values based on whether it's an edit or add operation
  const defaultValues = useMemo(() => ({
    title: edit ? (rowData.title || "") : "",
    description: edit ? (rowData.description || "") : "",
    status: edit ? (rowData.status || "") : "",
  }), [edit, rowData]);

  // Form management using react-hook-form
  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  // Set form values for edit mode
  if (edit) {
    setValue("title", rowData.title);
    setValue("description", rowData.description);
    setValue("status", rowData.status);
  }

  // Close dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Handle form submission
  const handleDataSubmit = (data) => {
    const url = edit ? `${api}/update-todo/${rowData._id}` : `${api}/post-todo`;
    const method = edit ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((responseData) => {
        const message = edit ? "Data updated successfully!" : "Data added successfully!";
        enqueueSnackbar(message, { variant: "success" });
        console.log("Data sent successfully:", responseData);
        reset();
        handleClose();
        setRowData({
          title: "",
          description: "",
          status: ""
        })
        setEdit(false)

      })
      .catch((error) => {
        console.error("Error sending data:", error);
        enqueueSnackbar(error.message, { variant: "error" });
      });
  };

  // Reset form when edit mode changes
  useEffect(() => {
    if (!edit) {
      reset()
    }
  }, [edit])

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
        }}
        onSubmit={handleSubmit(handleDataSubmit)}
      >
        <DialogTitle>Create Your Todo</DialogTitle>
        <DialogContent>
          {/* Input fields */}
          <TextField
            autoFocus
            {...register("title")}
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            error={!!errors.title}
            helperText={errors.title ? errors.title.message : ""}
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
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description ? errors.description.message : ""}
          />
          {/* Select field for status */}
          <FormControl variant="standard" sx={{ m: 1, minWidth: "95%" }}>
            <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              name="status"
              {...register("status")}
            >
              <MenuItem disabled value="">Status</MenuItem>
              <MenuItem value="inprogress">In Progress</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="done">Done</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          {/* Cancel button */}
          <Button onClick={handleClose}>Cancel</Button>
          {/* Submit button */}
          <Button type="submit" color="primary" variant="contained">
            {edit ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

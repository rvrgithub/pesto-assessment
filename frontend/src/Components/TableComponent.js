import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {
    Box,
    Button,
    CircularProgress,
    Container,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    Typography,
} from "@mui/material";
import FormDialog from "./FormDialog";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { enqueueSnackbar } from "notistack";
import { DrawerComponent } from "./DrawerComponent";
import { token } from "../App";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2), // Add padding to the root container
        [theme.breakpoints.down("sm")]: {
            textAlign: "center", // Center align on small screens
        },
    },

    button: {
        marginLeft: theme.spacing(1), // Add margin between select and button
    },

    textField: {
        marginRight: theme.spacing(1), // Adjust as needed
    },
    resetButton: {
        animation: '$spin 2s linear infinite',
    },
    '@keyframes spin': {
        '0%': {
            transform: 'rotate(0deg)',
        },
        '100%': {
            transform: 'rotate(360deg)',
        },
    },
}));
const columns = [
    { id: "title", label: "Title", minWidth: 170, align: "left" },
    {
        id: "description",
        label: "Description",
        minWidth: 170,
        align: "left",
    },
    {
        id: "status",
        label: "Status",
        minWidth: 170,
        align: "left",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "edit",
        label: "Edit",
        minWidth: 170,
        align: "center",
        format: (value) => value.toLocaleString("en-US"),
    },
];

export const TableComponent = () => {
    // .................. States .........................
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [editId, setEditId] = useState();
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState([]);
    const [edit, setEdit] = useState(false);
    const [editValue, setEditValue] = useState([]);
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [reset, setReset] = useState(false)

    // ................. Variables .......................
    const classes = useStyles();
    // ..................funciton ...................
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const getData = () => {
        console.log("");
        fetch(
            `http://localhost:4000/get-todo?page=${page + 1
            }&limit=${rowsPerPage}&search=${search}`,{
                headers:{
                Authorization: `Bearer ${token}`,
        
                }}
        )
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((error) => console.log("error", error));
    };

    const deleteTodo = (id) => {
        console.log("id", id);

        fetch(`http://localhost:4000/delete-todo/${id}`, { method: "DELETE",
            headers:{
            Authorization: `Bearer ${token}`,
    
            } })
            .then((res) => res.json())
            .then(() => {
                enqueueSnackbar("Data Delete Successfully !!", { variant: "success" })
                getData()
            })
            .catch((error) => enqueueSnackbar(error.message, { variant: "error" })
            );
    };



    const createTodo = () => {
        setOpen(true);
    };

    const SearchStatus = () => {
        console.log(search);
    };

    const handleFilterValue = (e) => {
        const filter = e.target.value;
        if (filter === "all") {
            setSearch(data);
        } else {
            setSearch(filter);
        }
    };


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        console.log("target value", event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    // const handleEditeValue = (value) => {
    //     // Add your edit logic here
    //     console.log("targetValue ", value);
    //     fetch(`http://localhost:4000/update-todo/${editId}`, {
    //         method: "PUT",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({
    //             status: value,
    //         }),
    //     })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             if (data.status) {
    //                 enqueueSnackbar("Data Update Successfully !!", { variant: "success" })
    //                 getData();
    //             }
    //         })
    //         .catch((err) => enqueueSnackbar(err.message, { variant: "error" }));
    //     handleClose();
    // };

    const handleColor = (value) => {
        // console.log("value", value)
        if (value === "pending") {
            return "red";
        } else if (value === "inprogress") {
            return "#ffc107";
        } else {
            return "green";
        }
    };

    const resetButton = () => {
        setReset(true);
        setSearch("")
    }

    useEffect(() => {
        getData();
        SearchStatus();
        getData();
        SearchStatus();

        const interval = setInterval(() => {
            setReset(false);
            setLoader(false);
        }, 1000); // Reset after 1 second

        return () => clearInterval(interval); // Cleanup function to clear interval on component unmount
    }, [page, rowsPerPage, search, open]);
    return (
        <Container sx={{ width: "100%", overflow: "hidden" }}>
            <FormDialog setOpen={setOpen} open={open} editId={editId} edit={edit} />
            <Box className={classes.root}>
                <DrawerComponent />
                <Grid container alignItems="center">
                    <Grid item xs={12} sm={4}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={createTodo}
                            className={classes.button}
                        >
                            + create
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={8} container justifyContent="flex-end">
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            {!search ?
                                <InputLabel id="demo-simple-select-standard-label" sx={{ position: "relative" }}>Status</InputLabel>
                                : ""}
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={search}
                                onChange={(e) => handleFilterValue(e)}
                            >
                                <MenuItem disabled value="">
                                    Status
                                </MenuItem>
                                <MenuItem value="inprogress">Inprogress</MenuItem>
                                <MenuItem value="pending">Pending</MenuItem>
                                <MenuItem value="success">Done</MenuItem>
                            </Select>
                        </FormControl>
                        <IconButton onClick={resetButton} className={reset ? classes.resetButton : ""}>
                            <RestartAltIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>
            <Paper
                sx={{ width: "100%", overflow: "hidden", border: "1px solid #e5e5e5" }}
            >
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table
                        stickyHeader
                        aria-label="sticky table"
                        className={classes.table}
                        wrapperStyle={{ overflow: "visible" }}
                        bodyStyle={{ overflow: "visible" }}
                    >
                        <TableHead style={{ background: "gray" }}>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth, background: "gray" }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        {!loader ? (
                            <TableBody>
                                {data
                                    ? data?.message?.map((row, rowIndex) => (
                                        <TableRow key={row.table} hover>
                                            {columns.map((column, columnIndex) => (
                                                <TableCell
                                                    key={column.id}
                                                    align="left"
                                                    sx={{
                                                        padding: "1px",
                                                        textAlign:
                                                            column.id === "description" ||
                                                                column.id === "title" ||
                                                                column.id === "status"
                                                                ? "left"
                                                                : "center",
                                                        paddingLeft: "10px",
                                                        fontWeight: column.id === "title" ? "bold" : "",
                                                    }}
                                                >
                                                    {column.id === "status" ? (
                                                        <Box
                                                            component={"span"}
                                                            sx={{
                                                                padding: "10px 20px",
                                                                background: handleColor(row[column.id]),
                                                                borderRadius: "10px ",
                                                                textAlign: "center",
                                                            }}
                                                        >
                                                            {row[column.id]}
                                                        </Box>
                                                    ) : column.id === "edit" ? (
                                                        <div>
                                                            <IconButton
                                                                aria-label="edit"
                                                                aria-controls="edit-menu"
                                                                aria-haspopup="true"
                                                                onClick={(e) => {
                                                                    handleClick(e);
                                                                    setEditId(row._id);
                                                                    setOpen(true);
                                                                    setEdit(true)

                                                                }}
                                                            >
                                                                <EditIcon />
                                                            </IconButton>
                                                            <IconButton
                                                                aria-label="edit"
                                                                aria-controls="edit-menu"
                                                                aria-haspopup="true"
                                                                color="error"
                                                                onClick={() => deleteTodo(row._id)}
                                                            >
                                                                <DeleteIcon />
                                                            </IconButton>
                                                            {/* <Menu
                                                                id="edit-menu"
                                                                anchorEl={anchorEl}
                                                                keepMounted
                                                                open={Boolean(anchorEl)}
                                                                onClose={handleClose}
                                                            >
                                                                <MenuItem
                                                                    value="inprogress"
                                                                    onClick={(e) =>
                                                                        handleMenuItemClick("inprogress")
                                                                    }
                                                                >
                                                                    In progress
                                                                </MenuItem>
                                                                <MenuItem
                                                                    value="all"
                                                                    onClick={() =>
                                                                        handleMenuItemClick("pending")
                                                                    }
                                                                >
                                                                    Pending
                                                                </MenuItem>
                                                                <MenuItem
                                                                    value="all"
                                                                    onClick={() => handleMenuItemClick("done")}
                                                                >
                                                                    Done
                                                                </MenuItem>
                                                            </Menu> */}
                                                            {/* 
                                                            {!edit ? <FormDialog setOpen={setOpen} open={open} /> : ""} */}
                                                        </div>
                                                    ) : (
                                                        row[column.id]
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                    : <Typography variant="h4" gutterBottom>
                                        No Data found
                                    </Typography>}
                            </TableBody>
                        ) : (

                            <TableHead>
                                <TableCell colSpan={4}>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        height="50px" // Adjust as needed for your layout
                                    >
                                        <CircularProgress
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                        />
                                    </Box>
                                </TableCell>
                            </TableHead>
                        )}
                    </Table>
                </TableContainer>
                <TablePagination
                    style={{ background: "#e5e5e5" }}
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={data?.totalItems ?? 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Container>
    );
};



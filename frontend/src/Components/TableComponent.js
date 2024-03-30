import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Box, Button, Container, IconButton, ListItemIcon, ListItemText, Menu, TextField } from '@mui/material';
import FormDialog from './FormDialog';
// import { FormDialog } from './FormDialog';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: "space-between",
        '::-webkit-scrollbar': {
            display: 'none',
        },
    },
    textField: {
        marginRight: theme.spacing(1), // Adjust as needed
    },
    select: {
        minWidth: 120,
        backgroundColor: '#ecf3fe',
        color: 'white',
        borderRadius: "5px",
        '&:hover': {
            backgroundColor: 'gray',
            border: "0"
        },
    },
    // table: {
    //     scrollbarWidth: "none" /* Firefox */,
    //     maxHeight: 440,
    //     border: "20px solid red",
    //     "table::-webkit-scrollbar": {
    //         display: "none"
    //     } /* Chrome */,
    //     overflow: 'hidden',
    // }
}));
const columns = [
    { id: 'title', label: 'Title', minWidth: 170, align: 'center', },
    {
        id: 'description',
        label: 'Description',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'status',
        label: 'Status',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'edit',
        label: 'Edit',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'delete',
        label: 'Delete',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
];



export const TableComponent = () => {
    const [page, setPage] = useState(0);
    // const [limit, setLimit] = useState(5);
    const [search, setSearch] = useState("")
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [data, setData] = useState([]);
    const classes = useStyles();

    const getData = () => {
        console.log("")
        fetch(`http://localhost:4000/get-todo?page=${page + 1}&limit=${rowsPerPage}&search=${search}`)
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((error) => console.log("error", error));
    }


    const deleteTodo = (id) => {
        console.log("id", id)
        fetch(`http://localhost:4000/delete-todo/${id}`,
            { method: 'DELETE' })
            .then((res) => res.json())
            .then(() => getData())
            .catch((error) => console.log("error", error));
    }



    const [open, setOpen] = useState(false);

    const createTodo = () => {
        setOpen(true);
    }

    const SearchStatus = () => {
        console.log(search)
    }

    const handleFilterValue = (e) => {
        const filter = e.target.value;
        if (filter == "all") {
            setSearch(data);
        }
        else {
            setSearch(filter)
        }
    }





    // ...........update ..

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        console.log("target value", event.currentTarget)
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (id, value) => {
        // Add your edit logic here
        console.log("targetValue ", value, id)
        fetch(`http://localhost:4000/update-todo/${id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                status: value
            })
        }).then((res) => res.json()).then((data) => console.log("Data", data)).catch((err) => console.log("err", err))
        handleClose();
    };

    useEffect(() => {
        getData();
        deleteTodo();
        SearchStatus();
    }, [page, rowsPerPage, search])
    return (
        <Container sx={{ width: '100%', overflow: 'hidden' }}>
            <FormDialog setOpen={setOpen} open={open} />
            <Box className={classes.root}>
                <Box>TodoPlay</Box>
                <Box>
                    <Select
                        value={search}
                        className={classes.select}
                        onChange={(e) => handleFilterValue(e)}
                    >
                        <MenuItem disabled value="" style={{ color: 'black' }}>
                            Status
                        </MenuItem>
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="success">Done</MenuItem>
                    </Select>
                    <Button variant="contained" color="error" onClick={createTodo} >+ create</Button>
                </Box>
            </Box>
            <Paper sx={{ width: '100%', overflow: 'hidden', border: "1px solid #e5e5e5" }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table" className={classes.table} wrapperStyle={{ overflow: 'visible' }} bodyStyle={{ overflow: 'visible' }} >
                        <TableHead style={{ background: "gray" }}>
                            <TableRow >
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth, background: "gray", }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data ? data?.message?.map((row, rowIndex) => (
                                <TableRow key={row.table} hover>
                                    {columns.map((column, columnIndex) => (
                                        <TableCell
                                            key={column.id}
                                            align="center"
                                            sx={{ padding: "1px", textAlign: column.id === "description" || column.id === "title" || column.id === "status" ? "left" : "center", paddingLeft: "20px" }}
                                        >
                                            {column.id === "edit" ? (
                                                <div>
                                                    <IconButton
                                                        aria-label="edit"
                                                        aria-controls="edit-menu"
                                                        aria-haspopup="true"
                                                        onClick={handleClick}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                    <Menu

                                                        id="edit-menu"
                                                        anchorEl={anchorEl}
                                                        keepMounted
                                                        open={Boolean(anchorEl)}
                                                        onClose={handleClose}
                                                    >
                                                        <MenuItem value="inprogress" onClick={(e) => handleMenuItemClick(row._id, "inprogress")}>In progress</MenuItem>
                                                        <MenuItem value="all" onClick={() => handleMenuItemClick(row._id, "pending")}>Pending</MenuItem>
                                                        <MenuItem value="all" onClick={() => handleMenuItemClick(row._id, "done")}>Done</MenuItem>
                                                    </Menu>
                                                </div>
                                            ) : ""}

                                            {column.id === "delete" ? (
                                                <DeleteIcon
                                                    fontSize="10pz"
                                                    style={{ color: "red", alignItem: "center", textAlign: "left" }}
                                                    onClick={() => deleteTodo(row._id)}
                                                />
                                            ) : ""}

                                            {row[column.id]
                                            }
                                        </TableCell>
                                    ))}
                                </TableRow>
                            )) : ""}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    style={{ background: "#e5e5e5" }}
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={data.totalItems}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Container>
    );
}





// import * as React from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import { useEffect, useState } from 'react';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { makeStyles } from '@material-ui/core/styles';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import { Box, Button, Container, IconButton, Menu, TextField } from '@mui/material';
// import FormDialog from './FormDialog';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: "space-between"
//   },
//   textField: {
//     marginRight: theme.spacing(1), // Adjust as needed
//   },
//   select: {
//     minWidth: 120,
//     backgroundColor: '#ecf3fe',
//     color: 'white',
//     borderRadius: "5px",
//     '&:hover': {
//       backgroundColor: 'gray',
//       border: "0"
//     },
//   },
//   // New CSS styles for title and description
//   title: {
//     fontWeight: 'bold',
//     marginLeft: theme.spacing(2), // Adjust as needed
//   },
//   description: {
//     marginLeft: theme.spacing(2), // Adjust as needed
//     color: '#555', // Adjust text color as needed
//   },
// }));

// const columns = [
//   { id: 'title', label: 'Title', minWidth: 170, align: 'center', },
//   {
//     id: 'description',
//     label: 'Description',
//     minWidth: 170,
//     align: 'center',
//   },
//   {
//     id: 'status',
//     label: 'Status',
//     minWidth: 170,
//     align: 'center',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'edit',
//     label: 'Edit',
//     minWidth: 170,
//     align: 'center',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'delete',
//     label: 'Delete',
//     minWidth: 170,
//     align: 'center',
//     format: (value) => value.toLocaleString('en-US'),
//   },
// ];

// export const TableComponent = () => {
//   const [page, setPage] = useState(0);
//   const [search, setSearch] = useState("")
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const [data, setData] = useState([]);
//   const classes = useStyles();

//   const getData = () => {
//     fetch(`http://localhost:4000/get-todo?page=${page + 1}&limit=${rowsPerPage}&search=${search}`)
//       .then((res) => res.json())
//       .then((data) => setData(data))
//       .catch((error) => console.log("error", error));
//   }

//   const deleteTodo = (id) => {
//     fetch(`http://localhost:4000/delete-todo/${id}`,
//       { method: 'DELETE' })
//       .then((res) => res.json())
//       .then(() => getData())
//       .catch((error) => console.log("error", error));
//   }

//   const [open, setOpen] = useState(false);

//   const createTodo = () => {
//     setOpen(true);
//   }

//   const SearchStatus = () => {
//     console.log(search)
//   }

//   const handleFilterValue = (e) => {
//     const filter = e.target.value;
//     if (filter === "all") {
//       setSearch(data);
//     }
//     else {
//       setSearch(filter)
//     }
//   }

//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleMenuItemClick = (id, value) => {
//     fetch(`http://localhost:4000/update-todo/${id}`, {
//       method: "PUT",
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         status: value
//       })
//     }).then((res) => res.json()).then((data) => console.log("Data", data)).catch((err) => console.log("err", err))
//     handleClose();
//   };

//   useEffect(() => {
//     getData();
//     deleteTodo();
//     SearchStatus();
//   }, [page, rowsPerPage, search])

//   return (
//     <Container sx={{ width: '100%', overflow: 'hidden' }}>
//       <FormDialog setOpen={setOpen} open={open} />
//       <Box className={classes.root}>
//         <Box>
//           <span className={classes.title}>TodoPlay</span>
//           <span className={classes.description}>Description</span>
//         </Box>
//         <Box>
//           <Select
//             value={search}
//             className={classes.select}
//             onChange={(e) => handleFilterValue(e)}
//           >
//             <MenuItem disabled value="" style={{ color: 'black' }}>
//               Status
//             </MenuItem>
//             <MenuItem value="all">All</MenuItem>
//             <MenuItem value="pending">Pending</MenuItem>
//             <MenuItem value="success">Done</MenuItem>
//           </Select>
//           <Button variant="contained" color="error" onClick={createTodo} >+ create</Button>
//         </Box>
//       </Box>
//       <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//         <TableContainer sx={{ maxHeight: 440 }}>
//           <Table stickyHeader aria-label="sticky table">
//             <TableHead>
//               <TableRow>
//                 {columns.map((column) => (
//                   <TableCell
//                     key={column.id}
//                     align={column.align}
//                     style={{ minWidth: column.minWidth }}
//                   >
//                     {column.label}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {data ? data?.message?.map((row, rowIndex) => (
//                 <TableRow key={row.table} hover>
//                   {columns.map((column, columnIndex) => (
//                     <TableCell
//                       key={column.id}
//                       align="center"
//                       sx={{ padding: "1px" }}
//                     >
//                       {column.id === "edit" ? (
//                         <div>
//                           <IconButton
//                             aria-label="edit"
//                             aria-controls="edit-menu"
//                             aria-haspopup="true"
//                             onClick={handleClick}
//                           >
//                             <EditIcon />
//                           </IconButton>
//                           <Menu

//                             id="edit-menu"
//                             anchorEl={anchorEl}
//                             keepMounted
//                             open={Boolean(anchorEl)}
//                             onClose={handleClose}
//                           >
//                             <MenuItem value="inprogress" onClick={(e) => handleMenuItemClick(row._id, "inprogress")}>In progress</MenuItem>
//                             <MenuItem value="all" onClick={() => handleMenuItemClick(row._id, "pending")}>Pending</MenuItem>
//                             <MenuItem value="all" onClick={() => handleMenuItemClick(row._id, "done")}>Done</MenuItem>
//                           </Menu>
//                         </div>
//                       ) : ""}

//                       {column.id === "delete" ? (
//                         <DeleteIcon
//                           fontSize="10pz"
//                           style={{ color: "red", alignItem: "center" }}
//                           onClick={() => deleteTodo(row._id)}
//                         />
//                       ) : ""}

//                       {row[column.id]
//                       }
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               )) : ""}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[10, 25, 100]}
//           component="div"
//           count={data.totalItems}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//     </Container>
//   );
// }

// import * as React from "react";
// import PropTypes from "prop-types";
// import { alpha } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";
// import TableSortLabel from "@mui/material/TableSortLabel";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Paper from "@mui/material/Paper";
// import Checkbox from "@mui/material/Checkbox";
// import IconButton from "@mui/material/IconButton";
// import Tooltip from "@mui/material/Tooltip";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Switch from "@mui/material/Switch";
// import DeleteIcon from "@mui/icons-material/Delete";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import { visuallyHidden } from "@mui/utils";
// import StyleProducts from "./Product.module.css";
// import "./product.css";
// function createData(id, name, calories, fat, carbs, protein) {
//   return {
//     id,
//     name,
//     calories,
//     fat,
//     carbs,
//     protein,
//   };
// }

// const rows = [
//   createData(1, "Cupcake", 305, 3.7),
//   createData(2, "Donut", 452, 25.0),
//   createData(3, "Eclair", 262, 16.0),
//   createData(4, "Frozen yoghurt", 159, 6.0),
//   createData(6, "Honeycomb", 408, 3.2),
//   createData(7, "Ice cream sandwich", 237, 9.0),
//   createData(8, "Jelly Bean", 375, 0.0),
//   createData(9, "KitKat", 518, 26.0),
//   createData(10, "Lollipop", 392, 0.2),
//   createData(11, "Marshmallow", 318, 0),
//   createData(12, "Nougat", 360, 19.0),
//   createData(13, "Oreo", 437),
// ];

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === "desc"
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// const headCells = [
//   {
//     id: " arabicName",
//     numeric: false,
//     disablePadding: true,
//     label: "الاسم العربي",
//   },
//   {
//     id: "name",
//     numeric: true,
//     disablePadding: false,
//     label: "name in English",
//   },
//   {
//     id: "price",
//     numeric: true,
//     disablePadding: false,
//     label: "سعر",
//   },
//   {
//     id: "serialNumber",
//     numeric: true,
//     disablePadding: false,
//     label: "رقم سري",
//   },

// ];

// function EnhancedTableHead(props) {
//   const {
//     onSelectAllClick,
//     order,
//     orderBy,
//     numSelected,
//     rowCount,
//     onRequestSort,
//   } = props;
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };

//   return (
//     <TableHead>
//       <TableRow >
//         <TableCell padding="checkbox">
//           <Checkbox
//             color="primary"
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={rowCount > 0 && numSelected === rowCount}
//             onChange={onSelectAllClick}
//             inputProps={{
//               "aria-label": "select all desserts",
//             }}
//           />
//         </TableCell>
//         {headCells.map((headCell) => (
//           <TableCell
//             sx={{ color: "red" }}
//             key={headCell.id}
//             align={headCell.numeric ? "right" : "left"}
//             padding={headCell.disablePadding ? "none" : "normal"}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : "asc"}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <Box component="span" sx={visuallyHidden}>
//                   {order === "desc" ? "sorted descending" : "sorted ascending"}
//                 </Box>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// EnhancedTableHead.propTypes = {
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(["asc", "desc"]).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// };

// function EnhancedTableToolbar(props) {
//   const { numSelected } = props;

//   return (
//     <Toolbar
//       sx={{
//         pl: { sm: 2 },
//         pr: { xs: 1, sm: 1 },
//         ...(numSelected > 0 && {
//           bgcolor: (theme) =>
//             alpha(
//               theme.palette.primary.main,
//               theme.palette.action.activatedOpacity
//             ),
//         }),
//       }}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           sx={{ flex: "1 1 100%" }}
//           color="inherit"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography
//           sx={{ flex: "1 1 100%" }}
//           variant="h6"
//           id="tableTitle"
//           component="div"
//         >
//           Nutrition
//         </Typography>
//       )}

//       {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton>
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton>
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   );
// }

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

// export default function EnhancedTable() {
//   const [order, setOrder] = React.useState("asc");
//   const [orderBy, setOrderBy] = React.useState("calories");
//   const [selected, setSelected] = React.useState([]);
//   const [page, setPage] = React.useState(0);
//   const [dense, setDense] = React.useState(false);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === "asc";
//     setOrder(isAsc ? "desc" : "asc");
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelected = rows.map((n) => n.id);
//       setSelected(newSelected);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event, id) => {
//     const selectedIndex = selected.indexOf(id);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, id);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1)
//       );
//     }
//     setSelected(newSelected);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleChangeDense = (event) => {
//     setDense(event.target.checked);
//   };

//   const isSelected = (id) => selected.indexOf(id) !== -1;

//   // Avoid a layout jump when reaching the last page with empty rows.
//   const emptyRows =
//     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

//   const visibleRows = React.useMemo(
//     () =>
//       stableSort(rows, getComparator(order, orderBy)).slice(
//         page * rowsPerPage,
//         page * rowsPerPage + rowsPerPage
//       ),
//     [order, orderBy, page, rowsPerPage]
//   );

//   return (
//     <Box sx={{ width: "100%" }}>
//       <Paper sx={{ width: "100%", mb: 2 }}>
//         <EnhancedTableToolbar numSelected={selected.length} />
//         <TableContainer>
//           <Table
//             sx={{ minWidth: 750 }}
//             aria-labelledby="tableTitle"
//             size={dense ? "small" : "medium"}
//           >
//             <EnhancedTableHead
//               numSelected={selected.length}
//               order={order}
//               orderBy={orderBy}
//               onSelectAllClick={handleSelectAllClick}
//               onRequestSort={handleRequestSort}
//               rowCount={rows.length}
//             />
//             <TableBody>
//               {visibleRows.map((row, index) => {
//                 const isItemSelected = isSelected(row.id);
//                 const labelId = `enhanced-table-checkbox-${index}`;

//                 return (
//                   <TableRow
//                     hover
//                     onClick={(event) => handleClick(event, row.id)}
//                     role="checkbox"
//                     aria-checked={isItemSelected}
//                     tabIndex={-1}
//                     key={row.id}
//                     selected={isItemSelected}
//                     sx={{ cursor: "pointer" }}
//                   >
//                     <TableCell padding="checkbox">
//                       <Checkbox
//                         color="primary"
//                         checked={isItemSelected}
//                         inputProps={{
//                           "aria-labelledby": labelId,
//                         }}
//                       />
//                     </TableCell>
//                     <TableCell
//                       component="th"
//                       id={labelId}
//                       scope="row"
//                       padding="none"
//                     >
//                       {row.name}
//                     </TableCell>
//                     <TableCell align="right">{row.calories}</TableCell>
//                     <TableCell align="right">{row.fat}</TableCell>
//                     <TableCell align="right">{row.carbs}</TableCell>
//                     <TableCell align="right">{row.protein}</TableCell>
//                   </TableRow>
//                 );
//               })}
//               {emptyRows > 0 && (
//                 <TableRow
//                   style={{
//                     height: (dense ? 33 : 53) * emptyRows,
//                   }}
//                 >
//                   <TableCell colSpan={6} />
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//     <Box sx={{ width: "100%" }}>
//   <Paper sx={{ width: "100%", mb: 2 }}>
//     <EnhancedTableToolbar numSelected={selected.length} />
//     <TableContainer>
//       {/* ... (existing code) */}
//     </TableContainer>
//     <TablePagination
//       sx={{ float: "right" }}
//       rowsPerPageOptions={[5, 10, 25]}
//       component="div"
//       count={rows.length}
//       rowsPerPage={rowsPerPage}
//       page={page}
//       onPageChange={handleChangePage}
//       onRowsPerPageChange={handleChangeRowsPerPage}
// labelRowsPerPage="عدد الصفحات:"
// labelDisplayedRows={({ from, to, count }) =>
//   `${from}-${to === -1 ? count : to} من ${count}`
// }
//     />
//   </Paper>
//   <FormControlLabel
//     control={<Switch checked={dense} onChange={handleChangeDense} />}
//     label="تكثيف الحشو"
//   />
// </Box>
//   </Paper>
//   <FormControlLabel
//     control={<Switch checked={dense} onChange={handleChangeDense} />}
//     label="Dense padding"
//   />
// </Box>
//   );
// }

// import { DataGrid } from '@mui/x-data-grid';

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import {
//   DataGridPremium,
//   GridToolbar,
//   useGridApiRef,
//   useKeepGroupedColumnsHidden,
// } from '@mui/x-data-grid-premium';
// import { useDemoData } from '@mui/x-data-grid-generator';

// export default function DataGridPremiumDemo() {
//   const { data, loading } = useDemoData({
//     dataSet: 'Commodity',
//     rowLength: 100,
//     editable: true,
//     visibleFields: [
// 'الاسم العربي',
//       'quantity',
//       'name in English',
//       'سعر',
//       'رقم سري',

//     ],
//   });
//   const apiRef = useGridApiRef();

//   const initialState = useKeepGroupedColumnsHidden({
//     apiRef,
//     initialState: {
//       ...data.initialState,
//       rowGrouping: {
//         ...data.initialState?.rowGrouping,
//         model: ['Commodity'],
//       },
//       sorting: {
//         sortModel: [{ field: '__row_group_by_columns_group__', sort: 'asc' }],
//       },
//       aggregation: {
//         model: {
//           quantity: 'sum',
//         },
//       },
//     },
//   });

//   return (
//     <Box sx={{ height: 520, width: '100%' }}>
//       <DataGridPremium
//         {...data}
//         apiRef={apiRef}
//         loading={loading}
//         disableRowSelectionOnClick
//         initialState={initialState}
//         slots={{ toolbar: GridToolbar }}
//       />
//     </Box>
//   );
// }
/////////////////////////////////Axios////////////////////////////////////////////
// import React, { useEffect, useState } from 'react';
// import Box from '@mui/material/Box';
// import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import TablePagination from '@mui/material/TablePagination';

// import './product.css';

// const ProductTable = () => {
//   const [latestNews, setLatestNews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchLatestNews = async () => {
//       try {
//         const response = await fetch(`${process.env.REACT_APP_API}product/getall`);
//         const data = await response.json();
//         setLatestNews(data);
//       } catch (error) {
//         console.error('Error fetching latest news:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLatestNews();
//   }, []);

//   const columns = [
//     { field: 'الإسم ', headerName: 'الإسم', flex: 1 },
//     { field: 'name in english ', headerName: 'name in english ', flex: 1 },
//     {
//       field: 'date',
//       headerName: 'Date',
//       flex: 1,
//       type: 'date',
//       valueGetter: (params) => new Date(params.row.date),
//     },
//     { field: 'سعر', headerName: 'سعر', flex: 2 },
//     { field: 'رقم سري', headerName: 'رقم سري', flex: 1 },
//     // Add more columns as needed
//   ];

//   return (
//     <Box sx={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={latestNews}
//         columns={columns}
//         loading={loading}
//         disableRowSelectionOnClick
//         pagination
//         pageSize={5} // Set the default number of rows per page
//         rowsPerPageOptions={[5, 10, 25]} // Specify options for the number of rows per page
//         components={{
//           Toolbar: GridToolbar,
//           Pagination: (props) => (
//             <TablePagination
//               {...props}
//               labelRowsPerPage="عدد الصفحات:"
//               labelDisplayedRows={({ from, to, count }) =>
//                 `${from}-${to === -1 ? count : to} من ${count}`
//               }
//               nextIconButtonProps={{
//                 style: { left: 'unset', right: 0, transform: 'rotateY(180deg)' },
//               }}
//               prevIconButtonProps={{
//                 style: { left: 0, right: 'unset', transform: 'rotateY(0deg)' },
//               }}
//             />
//           ),
//         }}
//       />
//     </Box>
//   );
// };

// export default ProductTable;

///////////////////////////////////////////////////////////////
// import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import { DataGrid, GridToolbar } from '@mui/x-data-grid';

// import './product.css';

// const ProductTable = () => {
//   // Sample static data for testing
//   const sampleData = [
//     {
//       id: 1,
//       الإسم: 'Product 1',
//       'name in english': 'Product 1 (English)',
//       date: '2022-01-20',
//       سعر: 100,
//       'رقم سري': 'ABC123',
//     },
//     {
//       id: 2,
//       الإسم: 'Product 2',
//       'name in english': 'Product 2 (English)',
//       date: '2022-01-21',
//       سعر: 150,
//       'رقم سري': 'XYZ456',
//     },
//     {
//       id: 3,
//       الإسم: 'Product 3',
//       'name in english': 'Product 2 (English)',
//       date: '2022-01-21',
//       سعر: 150,
//       'رقم سري': 'XYZ456',
//     },
//     {
//       id: 4,
//       الإسم: 'Product 4',
//       'name in english': 'Product 2 (English)',
//       date: '2022-01-21',
//       سعر: 150,
//       'رقم سري': 'XYZ456',
//     },
//     {
//       id: 5,
//       الإسم: 'Product 5',
//       'name in english': 'Product 2 (English)',
//       date: '2022-01-21',
//       سعر: 150,
//       'رقم سري': 'XYZ456',
//     },
//     {
//       id: 6,
//       الإسم: 'Product 6',
//       'name in english': 'Product 2 (English)',
//       date: '2022-01-21',
//       سعر: 150,
//       'رقم سري': 'XYZ456',
//     },
//     {
//       id: 7,
//       الإسم: 'Product 7',
//       'name in english': 'Product 2 (English)',
//       date: '2022-01-21',
//       سعر: 150,
//       'رقم سري': 'XYZ456',
//     },
//     {
//       id: 8,
//       الإسم: 'Product 8',
//       'name in english': 'Product 2 (English)',
//       date: '2022-01-21',
//       سعر: 150,
//       'رقم سري': 'XYZ456',
//     },
//     {
//       id: 9,
//       الإسم: 'Product 9',
//       'name in english': 'Product 2 (English)',
//       date: '2022-01-21',
//       سعر: 150,
//       'رقم سري': 'XYZ456',
//     },
//     {
//       id: 10,
//       الإسم: 'Product 10',
//       'name in english': 'Product 2 (English)',
//       date: '2022-01-21',
//       سعر: 150,
//       'رقم سري': 'XYZ456',
//     },
//     {
//       id: 11,
//       الإسم: 'Product 11',
//       'name in english': 'Product 2 (English)',
//       date: '2022-01-21',
//       سعر: 150,
//       'رقم سري': 'XYZ456',
//     },
//     {
//       id: 12,
//       الإسم: 'Product 12',
//       'name in english': 'Product 2 (English)',
//       date: '2022-01-21',
//       سعر: 150,
//       'رقم سري': 'XYZ456',
//     },
//     {
//       id: 13,
//       الإسم: 'Product 13',
//       'name in english': 'Product 2 (English)',
//       date: '2022-01-21',
//       سعر: 150,
//       'رقم سري': 'XYZ456',
//     },
//     {
//       id: 13,
//       الإسم: 'Product 13',
//       'name in english': 'Product 2 (English)',
//       date: '2022-01-21',
//       سعر: 150,
//       'رقم سري': 'XYZ456',
//     },
//     // Add more sample data as needed
//   ];

//   const columns = [
//     { field: 'الإسم', headerName: 'الإسم', flex: 1 },
//     { field: 'name in english', headerName: 'name in english', flex: 1 },
//     {
//       field: 'date',
//       headerName: 'Date',
//       flex: 1,
//       type: 'date',
//       valueGetter: (params) => new Date(params.row.date),
//     },
//     { field: 'سعر', headerName: 'سعر', flex: 2 },
//     { field: 'رقم سري', headerName: 'رقم سري', flex: 1 },
//     // Add more columns as needed
//   ];

//   const [page, setPage] = useState(0);
//   const [pageSize, setPageSize] = useState(5);

//   const handlePageChange = (params) => {
//     setPage(params.page);
//   };

//   const handlePageSizeChange = (params) => {
//     setPageSize(params.pageSize);
//     setPage(0);
//   };

//   const data = {
//     rows: sampleData,
//     columns,
//     page,
//     pageSize,
//     rowCount: sampleData.length,
//     pageSizeOptions: [5, 10, 25],
//   };

//   return (
//     <Box sx={{ height: 400, width: '100%' }}>
//    <div style={{ height: 400, width: '100%' }}>
//       <DataGrid
//         {...data}
//         initialState={{
//           ...data.initialState,
//           pagination: { paginationModel: { pageSize: 5 } },
//         }}
//         pageSizeOptions={[5, 10, 25]}
//         labelRowsPerPage="عدد الصفحات:"
//       />
//     </div>
//     </Box>
//   );
// };

// export default ProductTable;

///////////////////////wpagination with filtration ///////////
import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, FilterToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import "./product.css";
import { Button } from "@mui/material";

import axios from "axios";

const ProductTable = () => {
  const handleRowClickDelete = async (params) => {
    const productId = params.row.id;

    try {
      // Send a DELETE request to the API to delete the product
      await axios.delete(`${process.env.REACT_APP_API}product/${productId}`);

      // If the delete request is successful, you may want to update the UI accordingly
      // For example, you can filter out the deleted row from the displayed data
      const updatedData = sampleData.filter((row) => row.id !== productId);
      // Set the updated data to the state or wherever you store your data
      // setSampleData(updatedData);
    } catch (error) {
      console.error("Error deleting product:", error);
      // Handle error, show a notification, etc.
    }
  };
  // Sample static data for testing
  const sampleData = [
    {
      id: 72287362676,
      الإسم: "rayannn",
      "name in english": "Product 1 (English)",
      date: "2022-01-20",
      سعر: 100,
      "رقم سري": "ABC123",
    },
    {
      id: 2,
      الإسم: "Product 2",
      "name in english": "Product 2 (English)",
      date: "2022-01-21",
      سعر: 150,
      "رقم سري": "XYZ456",
    },
    {
      id: 3,
      الإسم: "Product 3",
      "name in english": "Product 2 (English)",
      date: "2022-01-21",
      سعر: 150,
      "رقم سري": "XYZ456",
    },
    {
      id: 4,
      الإسم: "Product 4",
      "name in english": "Product 2 (English)",
      date: "2022-01-21",
      سعر: 150,
      "رقم سري": "XYZ456",
    },
    {
      id: 5,
      الإسم: "Product 5",
      "name in english": "Product 2 (English)",
      date: "2022-01-21",
      سعر: 150,
      "رقم سري": "XYZ456",
    },
    {
      id: 6,
      الإسم: "Product 6",
      "name in english": "Product 2 (English)",
      date: "2022-01-21",
      سعر: 150,
      "رقم سري": "XYZ456",
    },
    {
      id: 7,
      الإسم: "Product 7",
      "name in english": "Product 2 (English)",
      date: "2022-01-21",
      سعر: 150,
      "رقم سري": "XYZ456",
    },
    {
      id: 8,
      الإسم: "Product 8",
      "name in english": "Product 2 (English)",
      date: "2022-01-21",
      سعر: 150,
      "رقم سري": "XYZ456",
    },
    {
      id: 9,
      الإسم: "Product 9",
      "name in english": "Product 2 (English)",
      date: "2022-01-21",
      سعر: 150,
      "رقم سري": "XYZ456",
    },
    {
      id: 10,
      الإسم: "Product 10",
      "name in english": "Product 2 (English)",
      date: "2022-01-21",
      سعر: 150,
      "رقم سري": "XYZ456",
    },
    {
      id: 11,
      الإسم: "Product 11",
      "name in english": "Product 2 (English)",
      date: "2022-01-21",
      سعر: 150,
      "رقم سري": "XYZ456",
    },
    {
      id: 12,
      الإسم: "Product 12",
      "name in english": "Product 2 (English)",
      date: "2022-01-21",
      سعر: 150,
      "رقم سري": "XYZ456",
    },
    {
      id: 13,
      الإسم: "Product 13",
      "name in english": "Product 2 (English)",
      date: "2022-01-21",
      سعر: 150,
      "رقم سري": "XYZ456",
    },
    {
      id: 13,
      الإسم: "rayannn",
      "name in english": "Product 2 (English)",
      date: "2022-01-21",
      سعر: 150,
      "رقم سري": "XYZ456",
    },
    // Add more sample data as needed
  ];

  const columns = [
    { field: "الإسم", headerName: "الإسم", flex: 1 },
    { field: "name in english", headerName: "name in english", flex: 1 },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      type: "date",
      valueGetter: (params) => new Date(params.row.date),
    },
    { field: "سعر", headerName: "سعر", flex: 2 },
    { field: "رقم سري", headerName: "رقم سري", flex: 1 },
    // Add more columns as needed
    {
      field: "delete", // Add a delete column
      headerName: "Delete",
      flex: 1,
      cellClassName: "delete-cell",

      renderCell: (params) => (
        <Button
          variant="outlined"
          color="secondary"
          sx={{
            color: "var(--brown-color)",
            borderColor: "var(--blue-color) ",
            "&:hover": {
              boxShadow: "0px 0px 10px 3px rgba(0,0,0,0.5)",
              backgroundColor: "var(--blue-color)",
            },
          }}
          onClick={() => handleRowClickDelete(params)}
        >
          Delete
        </Button>
      ),
    },
  ];
  const navigate = useNavigate();

  const handleRowClick = (params, event) => {
    // Check if the clicked element is the delete button
    const isDeleteButton =
      event.target.tagName.toLowerCase() === "button" &&
      event.target.textContent.toLowerCase() === "delete";

    // If it's the delete button, trigger the delete functionality
    if (isDeleteButton) {
      handleRowClickDelete(params);
    } else {
      // Otherwise, navigate to the product details page
      navigate(`/products/${params.id}`);
    }
  };

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [filterModel, setFilterModel] = useState({ items: [] }); // State for filter model

  const handlePageChange = (params) => {
    setPage(params.page);
  };

  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
    setPage(0);
  };

  const data = {
    rows: sampleData,
    columns,
    page,
    pageSize,
    rowCount: sampleData.length,
    pageSizeOptions: [10, 25, 50, 75, 100],
    filterModel,
  };

  return (
    <Box
      sx={{ height: 400, width: "100%", backgroundColor: "var(--main-color)" }}
    >
      <Button
        fullWidth
        type="submit"
        onClick={() => (window.location.href = "/")}
        sx={{
          margin: "10px",
          height: "3rem",
          width: "5rem",
          // border: '2px solid #368681',
          backgroundColor: "var(--brown-color)",
          color: "var(--main-color)",

          "&:hover": {
            // boxShadow: '0px 0px 10px 3px rgba(0,0,0,0.5)',
            backgroundColor: "var(--blue-color)",
            color: "var(--brown-color)",
          },
        }}
        color="primary"
      >
        أضف منتج
      </Button>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          sx={{ minHeight: "60vh" }}
          {...data}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onRowClick={(params, event) => handleRowClick(params, event)}
          filterMode="server" // Optional: Use server-side filtering
          onFilterModelChange={(model) => setFilterModel(model)}
          initialState={{
            ...data.initialState,
            //pagination
            // pagination: { paginationModel: { pageSize: 5 } },
            filter: {
              //filter
              ...data.initialState?.filter,
              filterModel: {
                items: [
                  {
                    field: "rating",
                    operator: ">",
                    value: "2.5",
                  },
                ],
              },
            },
          }}
          pageSizeOptions={[10, 25, 50, 75, 100]}
          slots={{
            toolbar: GridToolbar,
          }}
        />
      </div>
    </Box>
  );
};

export default ProductTable;
